import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PillNav.css";

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface PillNavProps {
  logoText?: string;
  logoHref?: string;
  showLogo?: boolean;
  items: PillNavItem[];
  activeHref: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  onNavigate?: (item: PillNavItem) => void;
}

const isHashLink = (href: string) => href.startsWith("#");

const PillNav = ({
  logoText = "JC",
  logoHref = "#home",
  showLogo = true,
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "hsl(var(--foreground))",
  pillColor = "hsl(var(--background))",
  hoveredPillTextColor = "hsl(var(--background))",
  pillTextColor,
  initialLoadAnimation = true,
  onNavigate,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) {
          return;
        }

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const hoverLabel = pill.querySelector(".pill-label-hover");

        if (label) {
          gsap.set(label, { y: 0 });
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: h + 12, opacity: 0 });
        }

        tlRefs.current[index]?.kill();

        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        }

        if (hoverLabel) {
          gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => undefined);
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0 });
    }

    if (initialLoadAnimation) {
      if (logoRef.current) {
        gsap.set(logoRef.current, { scale: 0 });
        gsap.to(logoRef.current, { scale: 1, duration: 0.6, ease });
      }

      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
        gsap.to(navItemsRef.current, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => {
      window.removeEventListener("resize", onResize);
      activeTweenRefs.current.forEach((tween) => tween?.kill());
      tlRefs.current.forEach((timeline) => timeline?.kill());
      logoTweenRef.current?.kill();
    };
  }, [ease, initialLoadAnimation, items]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) {
      return;
    }

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) {
      return;
    }

    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const handleLogoEnter = () => {
    if (!logoRef.current) {
      return;
    }

    logoTweenRef.current?.kill();
    gsap.set(logoRef.current, { rotate: 0 });
    logoTweenRef.current = gsap.to(logoRef.current, {
      rotate: 360,
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const navigateTo = (item: PillNavItem) => {
    onNavigate?.(item);
    setIsMobileMenuOpen(false);

    if (isHashLink(item.href)) {
      const target = document.querySelector(item.href);
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onClickItem = (event: React.MouseEvent<HTMLAnchorElement>, item: PillNavItem) => {
    if (isHashLink(item.href)) {
      event.preventDefault();
      navigateTo(item);
    }
  };

  const onClickLogo = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!showLogo) {
      return;
    }

    if (!isHashLink(logoHref)) {
      return;
    }

    event.preventDefault();
    const homeItem = { label: "Home", href: logoHref };
    navigateTo(homeItem);
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);

    const hamburger = hamburgerRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    const menu = mobileMenuRef.current;
    if (!menu) {
      return;
    }

    if (next) {
      gsap.set(menu, { visibility: "visible" });
      gsap.fromTo(
        menu,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease,
          transformOrigin: "top center",
        },
      );
      return;
    }

    gsap.to(menu, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease,
      transformOrigin: "top center",
      onComplete: () => {
        gsap.set(menu, { visibility: "hidden" });
      },
    });
  };

  const cssVars = {
    ["--base" as string]: baseColor,
    ["--pill-bg" as string]: pillColor,
    ["--hover-text" as string]: hoveredPillTextColor,
    ["--pill-text" as string]: resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
        {showLogo && (
          <a
            className="pill-logo"
            href={logoHref}
            aria-label="Home"
            onMouseEnter={handleLogoEnter}
            onClick={onClickLogo}
            ref={logoRef}
          >
            <span>{logoText}</span>
          </a>
        )}

        <div className="pill-nav-items desktop-only" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => (
              <li key={item.href || `item-${i}`} role="none">
                <a
                  role="menuitem"
                  href={item.href}
                  className={`pill${activeHref === item.href ? " is-active" : ""}`}
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                  onClick={(event) => onClickItem(event, item)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{item.label}</span>
                    <span className="pill-label-hover gradient-text" aria-hidden="true">
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="mobile-menu-button mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
          type="button"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className="mobile-menu-popover mobile-only" ref={mobileMenuRef} style={cssVars}>
        <ul className="mobile-menu-list">
          {items.map((item, i) => (
            <li key={item.href || `mobile-item-${i}`}>
              <a
                href={item.href}
                className={`mobile-menu-link${activeHref === item.href ? " is-active" : ""}`}
                onClick={(event) => onClickItem(event, item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
