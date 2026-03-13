import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

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
  return (
    <section className="relative py-32 overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto px-6 md:px-12 space-y-32"
      >
        {stories.map((story, index) => (
          <motion.div
            key={story.title}
            variants={staggerItem}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-12 md:gap-20`}
          >
            {/* Text */}
            <motion.div
              variants={fadeUp}
              className="flex-1 space-y-4"
            >
              <p className="text-sm font-mono text-primary tracking-wider uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text">
                {story.title}
              </h2>
              <p className="text-lg text-muted-foreground">{story.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                {story.description}
              </p>
            </motion.div>

            {/* Visual */}
            <motion.div
              variants={fadeUp}
              className="flex-1 w-full max-w-sm"
            >
              <div
                className={`aspect-square rounded-3xl bg-gradient-to-br ${story.gradient} glass border border-border/30 flex items-center justify-center`}
              >
                <span className="text-8xl md:text-9xl font-bold text-foreground/5">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default StorySection;
