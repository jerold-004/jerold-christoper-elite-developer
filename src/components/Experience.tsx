import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { experiences } from "@/data/experience";

const typeColors: Record<string, string> = {
  internship: "bg-primary/20 text-primary border-primary/30",
  hackathon: "bg-accent/20 text-accent border-accent/30",
  project: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  achievement: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const Experience = () => {
  return (
    <SectionWrapper id="experience">
      <div className="text-center mb-16">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">JOURNEY</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Experience & <span className="gradient-text">Achievements</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto"
      >
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-blue-500 to-accent md:-translate-x-[1px]" />

        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            variants={staggerItem}
            className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 ${
              index % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-primary -translate-x-[5px] md:-translate-x-[6px] mt-6 z-10" />

            {/* Spacer */}
            <div className="hidden md:block flex-1" />

            {/* Card */}
            <div className="flex-1 ml-10 md:ml-0">
              <div className="glass rounded-2xl p-6 gradient-border hover:bg-card/80 transition-all duration-300">
                <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                  <span className={`text-xs px-2.5 py-1 rounded-full border ${typeColors[exp.type]}`}>
                    {exp.type}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                <p className="text-sm text-primary mb-2">{exp.organization}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                {exp.tech && (
                  <div className={`flex flex-wrap gap-1.5 mt-3 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Experience;
