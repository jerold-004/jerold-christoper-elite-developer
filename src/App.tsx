import { Suspense, lazy, useEffect } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Lenis from "lenis";
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

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
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
