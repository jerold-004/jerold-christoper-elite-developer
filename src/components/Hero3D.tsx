import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import AnimatedText from "@/components/ui/AnimatedText";
import { fadeUp } from "@/lib/animations";

function FloatingShape({ position, color, speed = 1, size = 1 }: { position: [number, number, number]; color: string; speed?: number; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed * 0.2) * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={size}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <FloatingShape position={[-3, 2, -2]} color="#7c3aed" speed={0.8} size={1.5} />
      <FloatingShape position={[3, -1, -3]} color="#3b82f6" speed={1.2} size={1} />
      <FloatingShape position={[0, 3, -4]} color="#06b6d4" speed={0.6} size={0.8} />
      <FloatingShape position={[-2, -2, -2]} color="#8b5cf6" speed={1} size={0.6} />
      <FloatingShape position={[4, 1, -5]} color="#2563eb" speed={0.9} size={1.2} />
    </>
  );
}

const Hero3D = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(250_85%_65%_/_0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(190_90%_50%_/_0.05),_transparent_50%)]" />

      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Scene />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm md:text-base font-mono text-primary mb-4 tracking-wider"
        >
          &lt;hello world /&gt;
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Hi, I'm{" "}
          <span className="gradient-text text-glow">Jerold Christoper</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg md:text-xl text-muted-foreground mb-10 h-8"
        >
          <AnimatedText
            texts={[
              "Full Stack Developer",
              "AI/ML Enthusiast",
              "Problem Solver",
              "Open Source Contributor",
            ]}
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(250 85% 65% / 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold text-sm transition-all"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsl(250 85% 65% / 0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full border border-primary/50 text-foreground font-semibold text-sm hover:bg-primary/10 transition-all"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero3D;
