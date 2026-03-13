import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillCategories } from "@/data/skills";

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <div className="text-center mb-16">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">TECH STACK</p>
        <h2 className="text-3xl md:text-4xl font-bold">
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
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={staggerItem}
            className="glass rounded-2xl p-6 gradient-border group hover:bg-card/80 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-6 gradient-text">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-default"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span className="text-sm text-foreground">{skill.name}</span>
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
