import { Suspense, lazy, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import StorySection from "@/components/StorySection";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import GithubActivity from "@/components/GithubActivity";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const CursorParticles = lazy(() => import("@/components/ui/CursorParticles"));
const Hero3D = lazy(() => import("@/components/Hero3D"));

const pathToSectionId: Record<string, string> = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/experience": "experience",
  "/experiece": "experience",
  "/contact": "contact",
};

const App = () => {
  useEffect(() => {
    const scrollToPathSection = () => {
      const normalized = window.location.pathname.toLowerCase().replace(/\/+$/, "") || "/";
      const sectionId = pathToSectionId[normalized] ?? "home";
      const target = document.getElementById(sectionId);
      if (!target) {
        return;
      }

      const navOffset = 88;
      const top = window.scrollY + target.getBoundingClientRect().top - navOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
    };

    // Re-run after layout settles (lazy sections/canvas can shift positions).
    const timers = [0, 250, 800].map((delay) => window.setTimeout(scrollToPathSection, delay));
    window.addEventListener("popstate", scrollToPathSection);
    window.addEventListener("load", scrollToPathSection);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("popstate", scrollToPathSection);
      window.removeEventListener("load", scrollToPathSection);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <TooltipProvider>
        <Sonner />
        <Suspense fallback={null}>
          <CursorParticles />
        </Suspense>
        <ScrollProgress />
        <Navbar />
        <main>
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
          <StorySection />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <GithubActivity />
          <Contact />
        </main>
        <Footer />
      </TooltipProvider>
    </LazyMotion>
  );
};

export default App;
