import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { experiences } from "@/data/experience";

const typeColors: Record<string, string> = {
  internship: "bg-primary/20 text-primary border-primary/30",
  hackathon: "bg-accent/20 text-accent border-accent/30",
  project: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  achievement: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  academic: "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

const Experience = () => {
  return (
    <SectionWrapper id="experience" className="pb-14">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">JOURNEY</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Experience & <span className="gradient-text">Achievements</span>
        </h2>
      </div>

      <ScrollStack
        useWindowScroll
        className="max-w-3xl mx-auto"
        itemDistance={140}
        itemStackDistance={12}
        stackPosition="14%"
        scaleEndPosition="8%"
        baseScale={0.92}
        itemScale={0.02}
        rotationAmount={0}
        blurAmount={0}
      >
        {experiences.map((exp) => (
          <ScrollStackItem key={exp.id}>
            <div className="rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`text-xs px-2.5 py-1 rounded-full border ${typeColors[exp.type] ?? typeColors.project}`}>
                  {exp.type}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{exp.period}</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
              <p className="text-sm text-primary mb-2">{exp.organization}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{exp.description}</p>
              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </SectionWrapper>
  );
};

export default Experience;
