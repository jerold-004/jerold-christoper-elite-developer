import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
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

  const resolveLiveLink = (link: string) => {
    const value = link.trim();
    if (!value || value === "#") return "";
    if (/^https?:\/\//i.test(value)) return value;
    return `https://${value}`;
  };

  const hasLiveDemo = (link: string) => Boolean(resolveLiveLink(link));

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
            className="project-card-fx group h-full"
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
                <div className="mt-auto pt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => openProjectDetails(project)}
                    className="flex-1 inline-flex items-center justify-center rounded-lg px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]"
                  >
                    Learn More
                  </button>
                  {hasLiveDemo(project.live) && (
                    <a
                      href={resolveLiveLink(project.live)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
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
              </DialogHeader>

              <div className="max-h-[calc(85vh-7.5rem)] overflow-y-auto px-6 pb-6 pt-4 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Description</p>
                  <DialogDescription className="text-sm md:text-base leading-relaxed">
                    {selectedProject.description}
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

                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Impact</p>
                  <p className="text-sm text-accent leading-relaxed">{selectedProject.impact}</p>
                </div>

                {hasLiveDemo(selectedProject.live) && (
                  <div className="pt-2">
                    <a
                      href={resolveLiveLink(selectedProject.live)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Live Demo
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default Projects;
