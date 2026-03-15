import React, { useEffect, useRef, useCallback, Children, cloneElement, isValidElement } from 'react';
import type { ReactNode, ReactElement } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  /** injected by ScrollStack — do not pass manually */
  _stickyTop?: number;
  _index?: number;
  _total?: number;
  _stackDistance?: number;
  _baseScale?: number;
  _itemScale?: number;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  _stickyTop = 80,
  _index = 0,
  _stackDistance = 12,
}) => (
  <div
    className={`scroll-stack-card w-full rounded-[2.5rem] bg-card border border-border p-10 box-border origin-top ${itemClassName}`.trim()}
    style={{
      position: 'sticky',
      top: _stickyTop + _index * (_stackDistance ?? 12),
      zIndex: _index + 1,
      willChange: 'transform',
      backfaceVisibility: 'hidden',
      transition: 'transform 0.15s ease',
    }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** px gap between each card's sticky top — creates the layered offset look */
  stackDistance?: number;
  /** px from top of viewport where first card sticks (should be below navbar) */
  stickyTop?: number;
  /** scale of the bottom-most card when fully stacked */
  baseScale?: number;
  /** scale reduction per card buried in stack */
  itemScale?: number;
  // legacy props kept for API compat — ignored in sticky model
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stackDistance = 12,
  stickyTop = 80,
  baseScale = 0.95,
  itemScale = 0.025,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ScrollStackItemProps>[];
  const total = items.length;

  const tick = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.scroll-stack-card');

    // Figure out how many cards are currently "stuck" at their sticky position
    // A card is stuck when its top equals (or is above) its sticky top value
    let topStuckIndex = -1;
    cards.forEach((card, i) => {
      const expectedTop = stickyTop + i * stackDistance;
      const rect = card.getBoundingClientRect();
      if (rect.top <= expectedTop + 1) {
        topStuckIndex = i;
      }
    });

    // Scale each card that is buried under the current top card
    cards.forEach((card, i) => {
      if (i > topStuckIndex) {
        // Not yet stuck — reset
        card.style.transform = '';
      } else {
        // Buried cards scale down the deeper they are
        const depth = topStuckIndex - i;
        const scale = Math.max(baseScale, 1 - depth * itemScale);
        card.style.transform = `scale(${scale})`;
      }
    });
  }, [stickyTop, stackDistance, baseScale, itemScale]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      {items.map((child, i) =>
        cloneElement(child, {
          _stickyTop: stickyTop,
          _index: i,
          _total: total,
          _stackDistance: stackDistance,
          _baseScale: baseScale,
          _itemScale: itemScale,
          itemClassName: [
            (child.props as ScrollStackItemProps).itemClassName ?? '',
            i < total - 1 ? 'mb-5' : '',
          ].filter(Boolean).join(' '),
        } as Partial<ScrollStackItemProps>)
      )}
    </div>
  );
};

export default ScrollStack;
