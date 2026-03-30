import * as React from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import { Plus } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/** Snappier shared layout + faster modal close than heavy springs. */
export const sharedLayoutTransition = {
  layout: { type: "tween" as const, duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
};

export interface ExpandableCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  title: string;
  src: string;
  description: string;
  badge?: string;
  engagement?: string;
  children?: React.ReactNode;
  className?: string;
  classNameExpanded?: string;
  /** Classes for the open/close icon button on the collapsed card. */
  triggerButtonClassName?: string;
  /**
   * When true, the small preview card is not rendered. Use with external triggers (e.g. Learn More).
   * The overlay opens on mount; closing runs exit animation then calls `onOpenChange(false)`.
   */
  hideTrigger?: boolean;
  /**
   * Stable id (e.g. project id) to share layoutIds with an external trigger (carousel) for the
   * same expanding animation as the default collapsed card.
   */
  layoutSyncId?: string;
  /** Fires after the close exit animation completes. */
  onOpenChange?: (open: boolean) => void;
}

export function layoutIdsForSync(layoutSyncId: string) {
  return {
    card: `ec-card-${layoutSyncId}`,
    image: `ec-image-${layoutSyncId}`,
    description: `ec-description-${layoutSyncId}`,
    title: `ec-title-${layoutSyncId}`,
    button: `ec-button-${layoutSyncId}`,
  } as const;
}

export function ExpandableCard({
  title,
  src,
  description,
  badge,
  engagement,
  children,
  className,
  classNameExpanded,
  triggerButtonClassName,
  hideTrigger = false,
  layoutSyncId,
  onOpenChange,
  ...motionDivProps
}: ExpandableCardProps) {
  const [active, setActive] = React.useState(() => (hideTrigger ? true : false));
  const cardRef = React.useRef<HTMLDivElement>(null);
  const isClosingRef = React.useRef(false);
  const id = React.useId();
  const layoutSuffix = `${id}`;
  const sync = layoutSyncId ? layoutIdsForSync(layoutSyncId) : null;

  const requestClose = React.useCallback(() => {
    if (!active) return;
    isClosingRef.current = true;
    setActive(false);
  }, [active]);

  React.useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        requestClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [active, requestClose]);

  const handleExitComplete = () => {
    if (!isClosingRef.current) return;
    isClosingRef.current = false;
    onOpenChange?.(false);
  };

  const headerBadges = Boolean(badge || engagement);

  const outerLayoutId = sync
    ? sync.card
    : hideTrigger
      ? undefined
      : `card-${title}-${layoutSuffix}`;
  const imageLayoutId = sync
    ? sync.image
    : hideTrigger
      ? undefined
      : `image-${title}-${layoutSuffix}`;
  const descriptionLayoutId = sync
    ? sync.description
    : hideTrigger
      ? undefined
      : `description-${description}-${layoutSuffix}`;
  const titleLayoutId = sync
    ? sync.title
    : hideTrigger
      ? undefined
      : `title-${title}-${layoutSuffix}`;
  const buttonLayoutId = sync
    ? sync.button
    : hideTrigger
      ? undefined
      : `button-${title}-${layoutSuffix}`;

  const overlay = (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {active && (
        <motion.div
          key="expandable-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex flex-col pointer-events-none"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md z-10 pointer-events-auto"
          />
          <div className="relative flex-1 grid place-items-center z-[100] sm:mt-16 pointer-events-none min-h-0">
            <motion.div
              layoutId={outerLayoutId}
              ref={cardRef}
              className={cn(
                "w-full max-w-[850px] h-full max-h-[min(100dvh,900px)] flex flex-col overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] sm:rounded-t-3xl bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 relative pointer-events-auto",
                classNameExpanded,
              )}
              {...motionDivProps}
              transition={sharedLayoutTransition}
            >
              <motion.div layoutId={imageLayoutId} transition={sharedLayoutTransition}>
                <div className="relative before:absolute before:inset-x-0 before:bottom-[-1px] before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-zinc-950 before:from-zinc-50">
                  <img
                    src={src}
                    alt={title}
                    className="w-full h-80 object-cover object-center"
                  />
                </div>
              </motion.div>
              <div className="relative h-full before:fixed before:inset-x-0 before:bottom-0 before:h-[70px] before:z-50 before:bg-gradient-to-t dark:before:from-zinc-950 before:from-zinc-50">
                <div className="flex justify-between items-start p-8 h-auto gap-4">
                  <div className="min-w-0">
                    <motion.h3
                      layoutId={titleLayoutId}
                      id={hideTrigger ? `card-title-${layoutSuffix}` : undefined}
                      className="font-semibold text-black dark:text-white text-4xl sm:text-4xl"
                      transition={sharedLayoutTransition}
                    >
                      {title}
                    </motion.h3>
                    {headerBadges ? (
                      <motion.div
                        layoutId={descriptionLayoutId}
                        transition={sharedLayoutTransition}
                        className="mt-2 flex flex-wrap gap-2"
                      >
                        {badge && (
                          <Badge variant="default" className="text-[11px] px-2.5 py-1 font-semibold">
                            {badge}
                          </Badge>
                        )}
                        {engagement && (
                          <Badge
                            variant="secondary"
                            className="text-[11px] px-2.5 py-1 font-semibold bg-black/70 text-white border border-white/20 hover:bg-black/80 dark:bg-white/10 dark:text-white dark:border-white/20"
                          >
                            {engagement}
                          </Badge>
                        )}
                      </motion.div>
                    ) : (
                      <motion.p
                        layoutId={descriptionLayoutId}
                        className="text-zinc-500 dark:text-zinc-400 text-lg mt-0.5"
                        transition={sharedLayoutTransition}
                      >
                        {description}
                      </motion.p>
                    )}
                  </div>
                  <motion.button
                    type="button"
                    aria-label="Close card"
                    layoutId={buttonLayoutId}
                    className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    transition={sharedLayoutTransition}
                    onClick={requestClose}
                  >
                    <motion.div
                      animate={{ rotate: active ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="size-5" strokeWidth={2} />
                    </motion.div>
                  </motion.button>
                </div>
                <div className="relative px-6 sm:px-8">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-500 dark:text-zinc-400 text-base pb-10 flex flex-col items-start gap-4 overflow-auto [&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium"
                  >
                    {children}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay}

      {!hideTrigger && (
        <motion.div
          role="dialog"
          aria-labelledby={`card-title-${layoutSuffix}`}
          aria-modal="true"
          layoutId={`card-${title}-${layoutSuffix}`}
          onClick={() => setActive(true)}
          className={cn(
            "p-3 flex flex-col justify-between items-center bg-zinc-50 shadow-sm dark:shadow-none dark:bg-zinc-950 rounded-2xl cursor-pointer border border-gray-200/70 dark:border-zinc-900",
            className,
          )}
        >
          <div className="flex gap-4 flex-col">
            <motion.div layoutId={`image-${title}-${layoutSuffix}`}>
              <img
                src={src}
                alt={title}
                className="w-64 h-56 rounded-lg object-cover object-center"
              />
            </motion.div>
            <div className="flex justify-between items-center gap-3 w-full">
              <div className="flex flex-col min-w-0">
                <motion.p
                  layoutId={`description-${description}-${layoutSuffix}`}
                  className="text-zinc-500 dark:text-zinc-400 md:text-left text-sm font-medium"
                >
                  {description}
                </motion.p>
                <motion.h3
                  id={`card-title-${layoutSuffix}`}
                  layoutId={`title-${title}-${layoutSuffix}`}
                  className="text-black dark:text-white md:text-left font-semibold"
                >
                  {title}
                </motion.h3>
              </div>
              <motion.button
                type="button"
                aria-label="Open card"
                layoutId={`button-${title}-${layoutSuffix}`}
                className={cn(
                  "h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-zinc-50 dark:bg-zinc-950 text-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-950 dark:text-white/70 text-black/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  triggerButtonClassName,
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(true);
                }}
              >
                <motion.div
                  animate={{ rotate: active ? 45 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
