import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import PillNav from "@/components/ui/PillNav";

export interface NavbarItem {
  label: string;
  href: string;
}

const defaultNavItems: NavbarItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  items?: NavbarItem[];
  brand?: string;
}

const hrefToPath = (href: string): string => {
  const id = href.replace("#", "").trim().toLowerCase();
  if (!id || id === "home") {
    return "/";
  }

  return `/${id}`;
};

const Navbar = ({ items = defaultNavItems, brand = "JC" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const { resolvedTheme, setTheme } = useTheme();

  const sectionMap = useMemo(
    () => new Map(items.map((item) => [item.href.replace("#", ""), item.label])),
    [items],
  );

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 14);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [mobileOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const id = entry.target.getAttribute("id") ?? "";
          const label = sectionMap.get(id);

          if (label) {
            const target = items.find((item) => item.label === label);
            if (target) {
              setActiveHref(target.href);
            }
          }
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.01,
      },
    );

    items.forEach((item) => {
      const target = document.querySelector(item.href);
      if (target) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, [items, sectionMap]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const navigateTo = (item: NavbarItem) => {
    setActiveHref(item.href);
    setMobileOpen(false);
    const target = document.querySelector(item.href);
    target?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState({}, "", hrefToPath(item.href));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 relative ${
          scrolled
            ? "backdrop-blur-xl bg-background/55 border-b border-border/60 shadow-lg shadow-black/10 dark:shadow-black/40"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <motion.a
            href="/"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ label: "Home", href: "#home" });
            }}
          >
            {brand}
          </motion.a>

          {/* Center: Pill Nav – perfectly centred in the bar */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            <PillNav
              showLogo={false}
              className="no-logo"
              items={items}
              activeHref={activeHref}
              initialLoadAnimation
              onNavigate={navigateTo}
              baseColor="hsl(var(--primary))"
              pillColor="hsl(var(--primary) / 0.10)"
              hoveredPillTextColor="hsl(var(--foreground))"
              pillTextColor="hsl(var(--foreground))"
            />
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden md:inline-flex h-10 w-10 rounded-full border border-border/70 bg-card/70 text-foreground transition-colors duration-300 hover:bg-secondary items-center justify-center"
            >
              {mounted && resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-foreground block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-foreground block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-foreground block"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed inset-0 z-40 glass-strong md:hidden flex flex-col items-center justify-center gap-8"
          >
            {items.map((item, i) => (
              <motion.button
                key={item.label}
                type="button"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                onClick={() => navigateTo(item)}
                className="text-2xl font-semibold text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </motion.button>
            ))}

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="mt-2 h-11 px-5 rounded-full border border-border/70 bg-card/70 text-foreground font-medium flex items-center gap-2"
            >
              {mounted && resolvedTheme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  Light Mode
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
