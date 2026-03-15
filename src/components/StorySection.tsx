import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { fadeUp, staggerContainer, staggerItem, swapInOut } from "@/lib/animations";
import Stack from "@/components/ui/Stack";

const stories = [
  {
    title: "Problem Solver",
    subtitle: "Engineering elegant solutions",
    description:
      "I break down complex challenges into manageable pieces and build systems that scale. From optimizing algorithms to architecting distributed systems, I thrive on turning chaos into clarity.",
    gradient: "from-primary/20 to-transparent",
  },
  {
    title: "Builder",
    subtitle: "Crafting digital experiences",
    description:
      "I believe in shipping fast and iterating often. From full-stack web platforms to real-time collaborative tools, I build products that people love to use.",
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    title: "AI Enthusiast",
    subtitle: "Pushing the boundaries of intelligence",
    description:
      "Machine learning isn't just a buzzword for me — it's a passion. I develop ML models that solve real-world problems, from medical diagnostics to natural language understanding.",
    gradient: "from-accent/20 to-transparent",
  },
];

const StorySection = () => {
  const [activeStory, setActiveStory] = useState(0);

  const storyCards = useMemo(
    () =>
      stories.map((story, index) => (
        <div
          key={story.title}
          className={`w-full h-full rounded-3xl bg-gradient-to-br ${story.gradient} glass border border-border/30 flex items-center justify-center`}
        >
          <span className="text-8xl md:text-9xl font-bold text-foreground/10">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )),
    [],
  );

  const currentStory = stories[activeStory] ?? stories[0];

  return (
    <section className="relative py-32 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 md:px-12"
      >
        <motion.div
          variants={staggerItem}
          className="grid items-center gap-10 md:gap-16 md:grid-cols-[minmax(280px,420px)_1fr]"
        >
          <motion.div variants={fadeUp} className="w-full max-w-sm md:max-w-md md:justify-self-start">
            <div className="w-full aspect-square">
              <Stack
                cards={storyCards}
                randomRotation={false}
                sensitivity={180}
                sendToBackOnClick
                autoplay
                autoplayDelay={2500}
                pauseOnHover
                mobileClickOnly
                onTopCardChange={setActiveStory}
              />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.title}
                variants={swapInOut}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-4"
                style={{ willChange: "transform, opacity" }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05, duration: 0.35 }}
                  className="text-sm font-mono text-primary tracking-wider uppercase"
                >
                  {String(activeStory + 1).padStart(2, "0")}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.38 }}
                  className="text-3xl md:text-5xl font-bold gradient-text"
                >
                  {currentStory.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.38 }}
                  className="text-lg text-muted-foreground"
                >
                  {currentStory.subtitle}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.42 }}
                  className="text-muted-foreground leading-relaxed max-w-xl"
                >
                  {currentStory.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StorySection;
