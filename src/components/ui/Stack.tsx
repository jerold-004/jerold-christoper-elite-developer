import { motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import "./Stack.css";

type StackItem = {
  id: number;
  content: React.ReactNode;
};

type AnimationConfig = {
  stiffness: number;
  damping: number;
};

type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: React.ReactNode[];
  animationConfig?: AnimationConfig;
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  onTopCardChange?: (index: number) => void;
};

type CardRotateProps = {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
};

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [22, -22]);
  const rotateY = useTransform(x, [-100, 100], [-22, 22]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.28}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = true,
  autoplay = true,
  autoplayDelay = 3200,
  pauseOnHover = true,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  onTopCardChange,
}: StackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.35 });
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const stackSeed = useMemo<StackItem[]>(() => {
    return cards
      .map((content, index) => ({ id: index + 1, content }))
      .reverse();
  }, [cards]);

  const [stack, setStack] = useState<StackItem[]>(stackSeed);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    setStack(stackSeed);
  }, [stackSeed]);

  useEffect(() => {
    if (!stack.length || !onTopCardChange) {
      return;
    }

    const topCard = stack[stack.length - 1];
    onTopCardChange(topCard.id - 1);
  }, [onTopCardChange, stack]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const sendToBack = (id: number) => {
    setStack((prev) => {
      const next = [...prev];
      const index = next.findIndex((card) => card.id === id);

      if (index === -1) {
        return prev;
      }

      const [card] = next.splice(index, 1);
      next.unshift(card);

      return next;
    });
  };

  useEffect(() => {
    if (!autoplay || stack.length <= 1 || isPaused || !isInView) {
      return;
    }

    const interval = setInterval(() => {
      setStack((prev) => {
        if (prev.length <= 1) {
          return prev;
        }

        const next = [...prev];
        const topCard = next.pop();

        if (!topCard) {
          return prev;
        }

        next.unshift(topCard);
        return next;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isInView, isPaused, stack.length]);

  return (
    <div
      ref={containerRef}
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        const depth = stack.length - index - 1;
        const randomRotate = randomRotation ? Math.random() * 10 - 5 : 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: depth * 2.1 + randomRotate,
                scale: 1 - depth * 0.045,
                y: depth * 6,
                opacity: 1 - depth * 0.12,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
