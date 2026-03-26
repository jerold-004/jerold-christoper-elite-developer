import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { projects, type Project } from "@/data/projects";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  const resolveLink = (link: string) => {
    const value = link.trim();
    if (!value || value === "#") return "";
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
  };

  const hasLink = (link?: string) => Boolean(link && resolveLink(link));

  const isPandiyinProject = (project: Project) =>
    /pandiyin\s*nature/i.test(project.title) || /pandiyin/i.test(project.live);

  const liveCtaLabel = (project: Project) =>
    isPandiyinProject(project) ? "Visit Site" : "Live Demo";

  return (
    <SectionWrapper id="projects">
      <div className="text-center mb-16">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">PORTFOLIO</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Featured <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={staggerItem}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`project-card-fx group h-full ${project.featured ? "ring-2 ring-primary/60 shadow-[0_0_36px_hsl(var(--primary)/0.25)] lg:scale-[1.02]" : ""}`}
          >
            <div className="project-card-overlay" />

            <div className="project-card-content flex flex-col h-full min-h-[36rem]">
              {/* Image */}
              <div className="relative overflow-hidden h-56 rounded-t-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                {(project.badge || project.engagement) && (
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {project.badge && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
                        {project.badge}
                      </span>
                    )}
                    {project.engagement && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-black/70 text-white border border-white/20 font-semibold">
                        {project.engagement}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-3 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Impact */}
                <p className="text-xs text-accent pt-2 font-medium">{project.impact}</p>

                {/* Actions */}
                <div className={`mt-auto pt-5 gap-3 ${hasLink(project.live) ? "grid grid-cols-2" : "grid grid-cols-1"}`}>
                  <button
                    type="button"
                    onClick={() => openProjectDetails(project)}
                    className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
                  >
                    Learn More
                  </button>
                  {hasLink(project.live) && (
                    <a
                      href={resolveLink(project.live)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {liveCtaLabel(project)}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0 overflow-hidden">
          {selectedProject && (
            <>
              <DialogHeader className="sticky top-0 z-10 border-b bg-background px-6 py-5 pr-14">
                <DialogTitle className="text-xl md:text-2xl">{selectedProject.title}</DialogTitle>
                {(selectedProject.badge || selectedProject.engagement) && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {selectedProject.badge && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary text-primary-foreground font-semibold">
                        {selectedProject.badge}
                      </span>
                    )}
                    {selectedProject.engagement && (
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/25 font-semibold">
                        {selectedProject.engagement}
                      </span>
                    )}
                  </div>
                )}
              </DialogHeader>

              <div className="max-h-[calc(85vh-7.5rem)] overflow-y-auto px-6 pb-6 pt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Project Overview</p>
                  <DialogDescription className="text-sm md:text-base leading-relaxed">
                    {selectedProject.overview || selectedProject.description}
                  </DialogDescription>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Problem</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.problem}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                </div>

                {!!selectedProject.challenges?.length && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-2">Challenges Faced</p>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {selectedProject.challenges.map((challenge) => (
                        <li key={challenge}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProject.deployment && (
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Deployment and Real-World Usage</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.deployment}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Impact</p>
                  <p className="text-sm text-accent leading-relaxed">{selectedProject.impact}</p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  {hasLink(selectedProject.live) && (
                    <a
                      href={resolveLink(selectedProject.live)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {liveCtaLabel(selectedProject)}
                    </a>
                  )}
                  {hasLink(selectedProject.github) && (
                    <a
                      href={resolveLink(selectedProject.github as string)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default Projects;
