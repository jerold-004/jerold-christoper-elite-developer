import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";

// ─── Globe constants ──────────────────────────────────────────────────────────
const GLOBE_R        = 2.4;
const PARTICLE_COUNT = 250;
const NODE_COUNT     = 70;
const FLOW_COUNT     = 90;
const MORPH_DURATION         = 3.0;
const CONNECTION_REVEAL_TIME = 0.8; // seconds for lines to "flow" in after sphere forms

function sphereFib(n: number, r: number): Float32Array {
  const pos    = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2;
    const rxy = Math.sqrt(1 - y * y);
    const phi = golden * i;
    pos[i * 3]     = rxy * Math.cos(phi) * r;
    pos[i * 3 + 1] = y * r;
    pos[i * 3 + 2] = rxy * Math.sin(phi) * r;
  }
  return pos;
}

type GlobeEdge = [number, number];

// ─── CHANGE 1: replaces buildGlobeEdgesDistributed ───────────────────────────
// Connects every particle to its 2 nearest neighbours → ~6000 edges,
// uniform coverage across the whole globe, no polar clustering.
function buildEdgesFullCoverage(pos: Float32Array, n: number): GlobeEdge[] {
  const edges:   GlobeEdge[] = [];
  const edgeSet: Set<number> = new Set();
  for (let i = 0; i < n; i++) {
    const ax = pos[i * 3], ay = pos[i * 3 + 1], az = pos[i * 3 + 2];
    const candidates: [number, number][] = [];
    for (let delta = 1; delta <= 20; delta++) {
      const j = i + delta;
      if (j >= n) break;
      const dx = ax - pos[j * 3], dy = ay - pos[j * 3 + 1], dz = az - pos[j * 3 + 2];
      candidates.push([j, dx * dx + dy * dy + dz * dz]);
    }
    candidates.sort((a, b) => a[1] - b[1]);
    for (let ki = 0; ki < 2 && ki < candidates.length; ki++) {
      const j   = candidates[ki][0];
      const key = i * 100_000 + j;
      if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([i, j]); }
    }
  }
  return edges;
}

// ─── CHANGE 2: Fisher-Yates shuffle helper ───────────────────────────────────
// Randomises which scatter origin maps to which fibonacci target so the
// mid-morph cloud has no spiral structure.
function shuffleMap(n: number): Uint16Array {
  const idx = new Uint16Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
  }
  return idx;
}

const GlobePoints = memo(function GlobePoints({
  positions,
  isDark,
  positionAttributeRef,
}: {
  positions: Float32Array;
  isDark: boolean;
  positionAttributeRef: React.MutableRefObject<THREE.BufferAttribute | null>;
}) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          usage={THREE.DynamicDrawUsage}
          ref={positionAttributeRef}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={isDark ? "#89e5e9" : "#2f14e1"}
        transparent
        opacity={isDark ? 500.0 : 500.0}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
});

const NodePoints = memo(function NodePoints({
  pos,
  isDark,
}: {
  pos: Float32Array;
  isDark: boolean;
}) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[pos, 3]}
          count={pos.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color={isDark ? "#bae6fd" : "#1e40af"}
        transparent
        opacity={isDark ? 0.88 : 0.95}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
});

const ConnectionLines = memo(function ConnectionLines({
  positionsRef,
  edges,
  isDark,
  connectionRevealRef,
}: {
  positionsRef: React.MutableRefObject<Float32Array>;
  edges: GlobeEdge[];
  isDark: boolean;
  connectionRevealRef: React.MutableRefObject<number>;
}) {
  const linePos               = useMemo(() => new Float32Array(edges.length * 6), [edges.length]);
  const positionAttributeRef  = useRef<THREE.BufferAttribute | null>(null);

  useFrame(() => {
    if (!positionAttributeRef.current) return;
    const reveal = connectionRevealRef.current;

    const particlePos = positionsRef.current;
    const buf         = linePos;

    for (let i = 0; i < edges.length; i++) {
      const [a, b] = edges[i];
      const i6     = i * 6;

      const ax = particlePos[a * 3];
      const ay = particlePos[a * 3 + 1];
      const az = particlePos[a * 3 + 2];
      const bx = particlePos[b * 3];
      const by = particlePos[b * 3 + 1];
      const bz = particlePos[b * 3 + 2];

      // Line "flows" from node a toward node b as reveal goes 0 → 1
      buf[i6]     = ax;
      buf[i6 + 1] = ay;
      buf[i6 + 2] = az;
      buf[i6 + 3] = ax + (bx - ax) * reveal;
      buf[i6 + 4] = ay + (by - ay) * reveal;
      buf[i6 + 5] = az + (bz - az) * reveal;
    }
    positionAttributeRef.current.needsUpdate = true;
  });

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePos, 3]}
          count={linePos.length / 3}
          usage={THREE.DynamicDrawUsage}
          ref={positionAttributeRef}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={isDark ? "#7dd3fc" : "#0ea5e9"}
        transparent
        opacity={isDark ? 0.15 : 0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  );
});

interface FlowSeed {
  edgeIdx: number;
  offset:  number;
  speed:   number;
}

const FlowParticles = ({
  positionsRef,
  edges,
  isDark,
  connectionRevealRef,
}: {
  positionsRef: React.MutableRefObject<Float32Array>;
  edges: GlobeEdge[];
  isDark: boolean;
  connectionRevealRef: React.MutableRefObject<number>;
}) => {
  const seeds = useMemo<FlowSeed[]>(
    () =>
      edges.length === 0
        ? []
        : Array.from({ length: FLOW_COUNT }, (_, i) => ({
            edgeIdx: Math.floor((i / FLOW_COUNT) * edges.length),
            offset:  (i * 0.6180339) % 1,
            speed:   0.10 + (i % 9) * 0.022,
          })),
    [edges.length],
  );

  const buf       = useMemo(() => new Float32Array(FLOW_COUNT * 3), []);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    // Only show flow after lines have fully appeared
    if (!pointsRef.current || edges.length === 0 || connectionRevealRef.current < 1) return;
    const particlePos = positionsRef.current;
    const t           = clock.elapsedTime;

    seeds.forEach(({ edgeIdx, offset, speed }, i) => {
      const [a, b] = edges[edgeIdx];
      const p      = (offset + t * speed) % 1;

      buf[i * 3]     = particlePos[a * 3]     + (particlePos[b * 3]     - particlePos[a * 3])     * p;
      buf[i * 3 + 1] = particlePos[a * 3 + 1] + (particlePos[b * 3 + 1] - particlePos[a * 3 + 1]) * p;
      buf[i * 3 + 2] = particlePos[a * 3 + 2] + (particlePos[b * 3 + 2] - particlePos[a * 3 + 2]) * p;
    });

    const attr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    if (attr) attr.needsUpdate = true;
  });

  if (edges.length === 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[buf, 3]}
          count={FLOW_COUNT}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={isDark ? "#f9a8d4" : "#ef0b39"}
        transparent
        opacity={isDark ? 0.95 : 0.98}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
};

function ParticleGlobe({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const groupRef             = useRef<THREE.Group>(null);
  const timeRef              = useRef(0);
  const morphProgressRef     = useRef(0);
  const positionAttributeRef = useRef<THREE.BufferAttribute | null>(null);

  const { startPositions, targetPositions, nodePos, edges } = useMemo(() => {
    const targetPositions = sphereFib(PARTICLE_COUNT, GLOBE_R);

    // ── CHANGE 3: shuffled start positions ───────────────────────────────────
    // Old code assigned rawScatter[i] → target[i].
    // Fibonacci targets 0,1,2… are ordered along a spiral, so at t=0.5 every
    // particle is mid-way along a spiral path → visible dark helix artefact.
    // Shuffle breaks that 1-to-1 mapping so mid-morph is a shapeless cloud.
    const rawScatter = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      rawScatter[i * 3]     = (Math.random() - 0.5) * 16;
      rawScatter[i * 3 + 1] = (Math.random() - 0.5) * 10;
      rawScatter[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const map            = shuffleMap(PARTICLE_COUNT);
    const startPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const src              = map[i] * 3;
      startPositions[i * 3]     = rawScatter[src];
      startPositions[i * 3 + 1] = rawScatter[src + 1];
      startPositions[i * 3 + 2] = rawScatter[src + 2];
    }
    // ─────────────────────────────────────────────────────────────────────────

    const step    = Math.floor(PARTICLE_COUNT / NODE_COUNT);
    const nodePos = new Float32Array(NODE_COUNT * 3);
    for (let ni = 0; ni < NODE_COUNT; ni++) {
      const gi           = ni * step;
      nodePos[ni * 3]     = targetPositions[gi * 3];
      nodePos[ni * 3 + 1] = targetPositions[gi * 3 + 1];
      nodePos[ni * 3 + 2] = targetPositions[gi * 3 + 2];
    }

    // ── CHANGE 4: full-coverage edges (replaces buildGlobeEdgesDistributed) ──
    const edges = buildEdgesFullCoverage(targetPositions, PARTICLE_COUNT);
    // ─────────────────────────────────────────────────────────────────────────

    return { startPositions, targetPositions, nodePos, edges };
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    arr.set(startPositions);
    return arr;
  }, [startPositions]);

  const positionsRef         = useRef<Float32Array>(positions);
  const morphDone            = useRef(false);
  const connectionRevealTime = useRef(0);
  const connectionRevealRef  = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current || !positionAttributeRef.current) return;

    if (morphProgressRef.current < 1) {
      timeRef.current += delta;
      const t     = Math.min(timeRef.current / MORPH_DURATION, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      morphProgressRef.current = eased;

      const posAttr = positionAttributeRef.current;
      const buf     = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3   = i * 3;
        buf[i3]     = startPositions[i3]     + (targetPositions[i3]     - startPositions[i3])     * eased;
        buf[i3 + 1] = startPositions[i3 + 1] + (targetPositions[i3 + 1] - startPositions[i3 + 1]) * eased;
        buf[i3 + 2] = startPositions[i3 + 2] + (targetPositions[i3 + 2] - startPositions[i3 + 2]) * eased;
      }

      positionsRef.current = buf as Float32Array;
      posAttr.needsUpdate  = true;

      if (eased >= 1) morphDone.current = true;
    }

    // After sphere forms, animate connection lines "flowing" in over CONNECTION_REVEAL_TIME
    if (morphDone.current && connectionRevealRef.current < 1) {
      connectionRevealTime.current += delta;
      const t   = Math.min(connectionRevealTime.current / CONNECTION_REVEAL_TIME, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      connectionRevealRef.current = eased;
    } else if (morphDone.current) {
      connectionRevealRef.current = 1;
    }

    const speed = 0.2 * (0.2 + morphProgressRef.current * 0.8);
    groupRef.current.rotation.y += speed * delta;

    const targetScale = isMobile ? 0.7 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group ref={groupRef}>
      <GlobePoints
        positions={positions}
        isDark={isDark}
        positionAttributeRef={positionAttributeRef}
      />
      <NodePoints pos={nodePos} isDark={isDark} />
      <ConnectionLines
        positionsRef={positionsRef}
        edges={edges}
        isDark={isDark}
        connectionRevealRef={connectionRevealRef}
      />
      <FlowParticles
        positionsRef={positionsRef}
        edges={edges}
        isDark={isDark}
        connectionRevealRef={connectionRevealRef}
      />
    </group>
  );
}

const Hero3D = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root      = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-background to-primary/10" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(250_85%_65%_/_0.08),_transparent_50%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(190_90%_50%_/_0.06),_transparent_50%)]" />

      <div className="absolute inset-0 z-[1] will-change-transform">
        {/* Simple client-side mobile breakpoint; safe in Vite SPA */}
        {/*
          We compute isMobile inside render to avoid extra hooks;
          this does not affect animation because ParticleGlobe keeps
          its own refs for all runtime state.
        */}
        {typeof window !== "undefined" && (
          (() => {
            const isMobile = window.innerWidth < 768;
            return (
        <Canvas
          dpr={[1, 1.25]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, isMobile ? 8 : 6], fov: 55 }}
          performance={{ min: 0.6 }}
          shadows={false}
        >
          <ParticleGlobe isDark={isDark} isMobile={isMobile} />
        </Canvas>
            );
          })()
        )}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.45 }}
        className="relative z-[3] text-center px-6 max-w-4xl mx-auto"
      >
        <motion.h1
          variants={fadeUp}
          custom={0}
          className="text-[clamp(1.6rem,5vw,4.8rem)] font-semibold mb-6 leading-tight whitespace-nowrap"
          style={{ willChange: "transform, opacity" }}
        >
          Hi, I'm{" "}
          <span className="gradient-text text-glow">Jerold Christoper</span>
        </motion.h1>

        <motion.div
          variants={fadeUp}
          custom={1}
          className="text-lg md:text-xl text-muted-foreground mb-10 h-8"
          style={{ willChange: "transform, opacity" }}
        >
          <AnimatedText
            texts={["AI Engineer – Vision Systems", "Machine Learning Engineer – Applied Systems", "Intelligent Systems Developer","Full Stack Developer","Computational Intelligence Engineer",]}
            className="inline-flex items-center justify-center"
          />
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={2}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -2 }}
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
            href="/Resume_updated.pdf"
            download="Jerold_Christoper_Resume.pdf"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 rounded-full border border-primary/50 text-foreground font-semibold text-sm hover:bg-primary/10 transition-all"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-[4] bottom-8 left-1/2 -translate-x-1/2 will-change-transform"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero3D;
