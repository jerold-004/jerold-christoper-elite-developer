

# Implementation Plan: Jerold Christoper's Elite Portfolio

GitHub username confirmed: **JEROLD-creator653**

This is a large build with 20+ new files. Here's the concise implementation plan:

## Phase 1: Foundation
- Install dependencies: `framer-motion`, `@react-three/fiber`, `@react-three/drei`, `lenis`, `react-github-calendar`, `@emailjs/browser` (for contact form)
- Set up dark theme globals, gradient accent colors (purple→blue→cyan), glassmorphism utilities in `index.css`
- Create animation utilities in `src/lib/animations.ts` (fadeUp, fadeIn, staggerChildren, scaleHover)
- Create data files: `src/data/projects.ts`, `src/data/skills.ts` with impressive placeholder content

## Phase 2: Layout & Navigation
- **Navbar** — sticky, blur backdrop, scroll-aware opacity, animated underline hovers, Lenis smooth scroll integration
- **ScrollProgress** — thin gradient bar at top using Framer Motion `useScroll`
- **CursorParticles** — canvas-based particle trail following cursor (desktop only)
- **SectionWrapper** — reusable scroll-triggered fade/slide wrapper
- **AnimatedText** — typing effect + text reveal component

## Phase 3: Sections (top to bottom)
1. **Hero3D** — React Three Fiber scene with floating shapes, typing animation, gradient bg, parallax mouse, profile image, two glowing CTAs
2. **StorySection** — 3 scroll-triggered cinematic panels (Problem Solver / Builder / AI Enthusiast)
3. **About** — glassmorphism card, animated bio, profile image
4. **Skills** — grouped cards (Frontend/Backend/AI-ML/Tools) with hover glow + stagger animations
5. **Projects** — 3D showcase attempt + responsive grid with glassmorphism cards, tech tags, links
6. **Experience** — vertical timeline with scroll-triggered entries
7. **GithubActivity** — contribution calendar using `react-github-calendar` with username `JEROLD-creator653`
8. **Contact** — working form (EmailJS or similar), social links with glow hover
9. **Footer** — minimal "© 2026 Jerold Christoper"

## Phase 4: Polish
- Lenis smooth scrolling wrapper on entire app
- Responsive breakpoints for mobile/tablet/desktop
- Performance optimization (lazy loading Three.js, reducing particle count on mobile)

## Technical Notes
- Three.js scenes will use `@react-three/fiber` + `@react-three/drei` for helpers
- Contact form will use EmailJS (client-side email service, no backend needed) — you'll need to provide your EmailJS credentials, or I can set it up with Lovable Cloud
- All animations use the shared `animations.ts` utilities for consistency
- Dark mode is the default and only theme (no toggle needed)

## File Count
~25 new files, 2-3 modified files (App.tsx, index.css, main.tsx)

Ready to implement on approval.

