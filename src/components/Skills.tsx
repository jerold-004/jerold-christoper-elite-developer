import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillCategories } from "@/data/skills";

type TechItemAnimationCustom = {
  index: number;
  direction: 1 | -1;
};

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const techItemVariants: Variants = {
  hidden: ({ direction }: TechItemAnimationCustom) => ({
    opacity: 0,
    x: 28 * direction,
    filter: "blur(4px)",
  }),
  visible: ({ index }: TechItemAnimationCustom) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 2.5,
      delay: index * 0.07,
      ease: smoothEase,
      staggerChildren: 0.08,
    },
  }),
};

const techIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.28, ease: smoothEase },
  },
};

const techTextVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: smoothEase },
  },
};

const Skills = () => {

  return (
    <SectionWrapper id="skills" className="relative overflow-hidden">
      <div className="text-center mb-14">
        <p className="text-xs md:text-sm font-mono text-primary tracking-[0.24em] mb-3">TECH STACK</p>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Technologies I <span className="gradient-text">work with</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            variants={staggerItem}
            className="glass rounded-2xl p-6 gradient-border group hover:bg-card/80 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-6 gradient-text">{category.title}</h3>
            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  custom={{
                    index: skillIndex,
                    direction: (categoryIndex % 2 === 0 ? -1 : 1) as 1 | -1,
                  }}
                  variants={techItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.45 }}
                  style={{ willChange: "transform, opacity, filter" }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
                >
                  {skill.iconUrl ? (
                    <motion.span
                      variants={techIconVariants}
                      className="inline-flex h-7 w-7 items-center justify-center shrink-0"
                    >
                      <img
                        src={skill.iconUrl}
                        alt={`${skill.name} logo`}
                        loading="lazy"
                        className={`h-5 w-5 object-contain${
                          skill.invertInDark ? " dark:invert" : ""
                        }`}
                      />
                    </motion.span>
                  ) : null}
                  <motion.span variants={techTextVariants} className="text-sm text-foreground">
                    {skill.name}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Skills;
