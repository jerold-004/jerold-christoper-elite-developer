import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Globe,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { layoutIdsForSync, sharedLayoutTransition } from "@/components/ui/expandable-card";
import { useMediaQuery } from "@/hooks/use-media-query";

export interface SpotlightItem {
  name: string;
  /** Stable id for shared layout animation with ExpandableCard (portfolio projects). */
  id?: string;
  /** Short line under the title area; matches ExpandableCard `description` (badge · engagement). */
  subtitle?: string;
  /** Shown when `badge` / `engagement` are not set (e.g. demo testimonials). */
  title?: string;
  badge?: string;
  engagement?: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  liveUrl?: string;
  /** Label for the live / web link button (e.g. "Live Demo" vs "Visit Site"). */
  liveLabel?: string;
}

const defaultItems: SpotlightItem[] = [
  {
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977807477-a579eda91fa2?q=80&w=600&auto=format&fit=crop",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist, InsightX",
    description:
      "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions. Their dashboarding capabilities went above and beyond our expectations.",
    imageUrl:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product, NovaLabs",
    description:
      "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership.",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
];

function resolveSocialLinks(c: SpotlightItem) {
  const links: { icon: typeof Github; url: string; label: string }[] = [];
  const add = (url: string | undefined, icon: typeof Github, label: string) => {
    if (url && url.trim() && url !== "#") links.push({ icon, url, label });
  };
  add(c.githubUrl, Github, "GitHub");
  add(c.liveUrl, Globe, "Live demo");
  add(c.twitterUrl, Twitter, "Twitter");
  add(c.youtubeUrl, Youtube, "YouTube");
  add(c.linkedinUrl, Linkedin, "LinkedIn");
  if (links.length === 0) {
    return [
      { icon: Github, url: c.githubUrl || "#", label: "GitHub" },
      { icon: Twitter, url: c.twitterUrl || "#", label: "Twitter" },
      { icon: Youtube, url: c.youtubeUrl || "#", label: "YouTube" },
      { icon: Linkedin, url: c.linkedinUrl || "#", label: "LinkedIn" },
    ];
  }
  return links;
}

export interface TestimonialCarouselProps {
  className?: string;
  items?: SpotlightItem[];
  /** When set, shows Learn More + live link buttons instead of social icon row (portfolio projects). */
  onLearnMore?: (item: SpotlightItem) => void;
}

function SpotlightBadgeRow({
  item,
  align = "start",
  descriptionLayoutId,
  badgesOnly = false,
}: {
  item: SpotlightItem;
  align?: "start" | "center";
  descriptionLayoutId?: string;
  /** When true (portfolio), only render badge row — subtitle line is handled by the parent. */
  badgesOnly?: boolean;
}) {
  const hasBadges = Boolean(item.badge || item.engagement);
  const rowClass = align === "center" ? "justify-center" : "justify-start";
  if (hasBadges) {
    const row = (
      <div className={cn("flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start", rowClass)}>
        {item.badge && (
          <Badge
            variant="default"
            className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 font-semibold leading-tight max-w-full whitespace-normal text-center sm:text-left"
          >
            {item.badge}
          </Badge>
        )}
        {item.engagement && (
          <Badge
            variant="secondary"
            className="text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 font-semibold leading-tight max-w-full whitespace-normal text-center sm:text-left bg-black/70 text-white border border-white/20 hover:bg-black/80 dark:bg-white/10 dark:text-white dark:border-white/20"
          >
            {item.engagement}
          </Badge>
        )}
      </div>
    );
    if (descriptionLayoutId) {
      return (
        <motion.div
          layoutId={descriptionLayoutId}
          transition={sharedLayoutTransition}
          className="mb-3 md:mb-4"
        >
          {row}
        </motion.div>
      );
    }
    return <div className={cn("mb-3 md:mb-4", rowClass)}>{row}</div>;
  }
  if (badgesOnly) {
    return null;
  }
  if (item.title) {
    return (
      <p
        className={cn(
          "text-sm font-medium text-muted-foreground mb-4",
          align === "center" && "text-center",
        )}
      >
        {item.title}
      </p>
    );
  }
  return null;
}

export function TestimonialCarousel({ className, items, onLearnMore }: TestimonialCarouselProps) {
  const list = items && items.length > 0 ? items : defaultItems;
  const [currentIndex, setCurrentIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleNext = () => setCurrentIndex((index) => (index + 1) % list.length);
  const handlePrevious = () =>
    setCurrentIndex((index) => (index - 1 + list.length) % list.length);

  const current = list[currentIndex];
  const displaySocial = useMemo(() => resolveSocialLinks(current), [current]);
  const showProjectActions = Boolean(onLearnMore);
  const liveHref = current.liveUrl?.trim();
  const hasLiveLink = Boolean(liveHref && liveHref !== "#");
  const liveButtonLabel = current.liveLabel ?? "Live Demo";

  const lid =
    isDesktop && showProjectActions && current.id ? layoutIdsForSync(current.id) : null;
  const headlineLine = current.subtitle ?? current.title ?? "";
  const hasMetaBadges = Boolean(current.badge || current.engagement);
  /** Remount layout roots when the slide changes so Framer Motion pairs the correct `layoutId` per project. */
  const layoutRootKey =
    showProjectActions && current.id ? `spotlight-layout-${current.id}` : `spotlight-slide-${currentIndex}`;

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      <motion.div
        key={layoutRootKey}
        layoutId={lid?.card}
        transition={sharedLayoutTransition}
        className="hidden md:flex relative items-center"
      >
        <motion.div
          key={`${layoutRootKey}-image`}
          layoutId={lid?.image}
          transition={sharedLayoutTransition}
          className="w-[470px] h-[470px] rounded-3xl overflow-hidden bg-muted flex-shrink-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={current.imageUrl}
                alt={current.name}
                width={470}
                height={470}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="bg-card rounded-3xl shadow-2xl border border-border p-8 ml-[-80px] z-10 max-w-xl flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id ?? current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-6">
                {showProjectActions && headlineLine && !hasMetaBadges ? (
                  <motion.p
                    key={`${layoutRootKey}-desc`}
                    layoutId={lid?.description}
                    transition={sharedLayoutTransition}
                    className="text-muted-foreground text-lg mb-2"
                  >
                    {headlineLine}
                  </motion.p>
                ) : null}
                <motion.h2
                  key={`${layoutRootKey}-title`}
                  layoutId={lid?.title}
                  transition={sharedLayoutTransition}
                  className="text-2xl font-bold text-foreground mb-2"
                >
                  {current.name}
                </motion.h2>
                <SpotlightBadgeRow
                  item={current}
                  align="start"
                  descriptionLayoutId={lid?.description}
                  badgesOnly={showProjectActions}
                />
              </div>

              <p className="text-foreground text-base leading-relaxed mb-8">{current.description}</p>

              {showProjectActions ? (
                <div
                  className={cn(
                    "w-full gap-3",
                    hasLiveLink ? "grid grid-cols-1 sm:grid-cols-2" : "flex flex-col",
                  )}
                >
                  <motion.button
                    key={`${layoutRootKey}-cta`}
                    type="button"
                    layoutId={lid?.button}
                    transition={sharedLayoutTransition}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "w-full rounded-full font-semibold transition-transform duration-200 hover:scale-[1.02]",
                    )}
                    onClick={() => onLearnMore?.(current)}
                  >
                    Learn More
                  </motion.button>
                  {hasLiveLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-primary/40 font-semibold hover:bg-primary/10"
                    >
                      <a href={liveHref} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                        {liveButtonLabel}
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {displaySocial.map(({ icon: IconComponent, url, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center transition-colors hover:opacity-90 hover:scale-105 cursor-pointer"
                      aria-label={label}
                    >
                      <IconComponent className="w-5 h-5 text-background" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="md:hidden max-w-sm mx-auto text-center bg-transparent">
        <div className="w-full aspect-square bg-muted rounded-3xl overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full h-full"
            >
              <img
                src={current.imageUrl}
                alt={current.name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {showProjectActions && headlineLine && !hasMetaBadges ? (
                <p className="text-muted-foreground text-sm font-medium mb-2">{headlineLine}</p>
              ) : null}
              <h2 className="text-xl font-bold text-foreground mb-2">{current.name}</h2>
              <SpotlightBadgeRow
                item={current}
                align="center"
                badgesOnly={showProjectActions}
              />
              <p className="text-foreground text-sm leading-relaxed mb-6">{current.description}</p>

              {showProjectActions ? (
                <div
                  className={cn(
                    "w-full gap-3 max-w-sm mx-auto",
                    hasLiveLink ? "grid grid-cols-2" : "grid grid-cols-1",
                  )}
                >
                  <Button
                    type="button"
                    onClick={() => onLearnMore?.(current)}
                    className="w-full rounded-full font-semibold transition-transform duration-200 hover:scale-[1.02]"
                  >
                    Learn More
                  </Button>
                  {hasLiveLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-primary/40 font-semibold hover:bg-primary/10"
                    >
                      <a href={liveHref} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4" />
                        {liveButtonLabel}
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex justify-center flex-wrap gap-3">
                  {displaySocial.map(({ icon: IconComponent, url, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center transition-colors hover:opacity-90 cursor-pointer"
                      aria-label={label}
                    >
                      <IconComponent className="w-5 h-5 text-background" />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous"
          className="w-12 h-12 rounded-full bg-muted border border-border shadow-md flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>

        <div className="flex gap-2">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors cursor-pointer",
                i === currentIndex ? "bg-foreground" : "bg-muted-foreground/50",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next"
          className="w-12 h-12 rounded-full bg-muted border border-border shadow-md flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
}
