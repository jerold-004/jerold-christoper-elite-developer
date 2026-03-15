import { useEffect, useRef } from "react";

const CursorParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number }>>([]);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const animationId = useRef<number>();
  const lastSpawnTime = useRef(0);
  const isDarkRef = useRef(document.documentElement.classList.contains("dark"));

  // Keep isDarkRef in sync with the theme (no re-renders needed)
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      isDarkRef.current = root.classList.contains("dark");
    };
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if touch device
    if ("ontouchstart" in window) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = (time: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const isDark = isDarkRef.current;

      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.current.active && time - lastSpawnTime.current > 22) {
        lastSpawnTime.current = time;
        for (let i = 0; i < 2; i++) {
          particles.current.push({
            x: mouse.current.x,
            y: mouse.current.y,
            vx: (Math.random() - 0.5) * 1.9,
            vy: (Math.random() - 0.5) * 1.9,
            life: 1,
            size: Math.random() * 2 + 1.4,
          });
        }
      }

      // Update and draw particles
      particles.current = particles.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.022;
        p.size *= 0.988;

        if (p.life <= 0) return false;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        if (isDark) {
          gradient.addColorStop(0, `hsla(190, 95%, 72%, ${p.life * 0.95})`);
          gradient.addColorStop(0.5, `hsla(250, 90%, 74%, ${p.life * 0.6})`);
          gradient.addColorStop(1, `hsla(190, 95%, 65%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(244, 86%, 52%, ${p.life * 0.92})`);
          gradient.addColorStop(0.5, `hsla(196, 85%, 45%, ${p.life * 0.58})`);
          gradient.addColorStop(1, `hsla(196, 85%, 42%, 0)`);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      if (particles.current.length > 84) {
        particles.current = particles.current.slice(-84);
      }

      if (mouse.current.active || particles.current.length > 0) {
        animationId.current = requestAnimationFrame(animate);
        return;
      }

      animationId.current = undefined;
    };

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };

      if (!animationId.current) {
        animationId.current = requestAnimationFrame(animate);
      }
    };

    const handleLeave = () => {
      mouse.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99]"
    />
  );
};

export default CursorParticles;
