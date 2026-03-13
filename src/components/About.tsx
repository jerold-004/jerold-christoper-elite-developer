import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

const About = () => {
  return (
    <SectionWrapper id="about">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image */}
        <motion.div variants={staggerItem} className="flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden gradient-border">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl glass glow-primary flex items-center justify-center">
              <span className="text-sm font-mono text-primary">AIML</span>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div variants={staggerItem} className="space-y-6">
          <p className="text-sm font-mono text-primary tracking-wider">ABOUT ME</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Crafting the future, <span className="gradient-text">one line at a time</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Jerold Christoper is a Computer Science (AIML) student and full-stack developer
            passionate about building scalable web applications and AI-powered systems.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            He enjoys solving complex problems and creating impactful digital products
            using modern technologies. With a strong foundation in both frontend and backend
            development, combined with expertise in machine learning, he bridges the gap
            between intelligent systems and beautiful user experiences.
          </p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-4 pt-4"
          >
            {[
              { label: "Projects", value: "15+" },
              { label: "Contributions", value: "500+" },
              { label: "Technologies", value: "20+" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};

export default About;
