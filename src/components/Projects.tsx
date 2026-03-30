import { useMemo, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  TestimonialCarousel,
  type SpotlightItem,
} from "@/components/ui/profile-card-testimonial-carousel";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { projects, type Project } from "@/data/projects";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
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

  const spotlightLine = (p: Project) =>
    [p.badge, p.engagement].filter(Boolean).join(" · ") || p.tech.slice(0, 3).join(" · ");

  const spotlightItems: SpotlightItem[] = useMemo(
    () =>
      projects.map((p) => {
        const gh = resolveLink(p.github ?? "");
        const live = resolveLink(p.live);
        const hasMeta = Boolean(p.badge || p.engagement);
        return {
          id: p.id,
          name: p.title,
          subtitle: spotlightLine(p),
          badge: p.badge,
          engagement: p.engagement,
          title: hasMeta ? undefined : p.tech.slice(0, 3).join(" · "),
          description: p.description,
          imageUrl: p.image,
          githubUrl: gh || undefined,
          liveUrl: live || undefined,
          liveLabel: isPandiyinProject(p) ? "Visit Site" : "Live Demo",
        };
      }),
    [],
  );

  return (
    <SectionWrapper id="projects">
      <div className="text-center mb-16">
        <p className="text-sm font-mono text-primary tracking-wider mb-4">PORTFOLIO</p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Featured <span className="gradient-text">Projects</span>
        </h2>
      </div>

      <LayoutGroup id="projects-expand">
        <div className="mb-20">
          <TestimonialCarousel
            items={spotlightItems}
            onLearnMore={(item) => {
              const project = item.id
                ? projects.find((p) => p.id === item.id)
                : projects.find((p) => p.title === item.name);
              if (project) openProjectDetails(project);
            }}
          />
        </div>

        {selectedProject && (
          <ExpandableCard
            key={selectedProject.id}
            hideTrigger
            layoutSyncId={selectedProject.id}
            title={selectedProject.title}
            src={selectedProject.image}
            description={spotlightLine(selectedProject)}
            badge={selectedProject.badge}
            engagement={selectedProject.engagement}
            onOpenChange={(open) => {
              if (!open) setSelectedProject(null);
            }}
            classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium"
          >
          <div>
            <h4 className="text-base font-semibold">Project Overview</h4>
            <p className="text-sm md:text-base leading-relaxed">
              {selectedProject.overview || selectedProject.description}
            </p>
          </div>

          <div>
            <h4 className="text-base font-semibold">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 pt-2">
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
            <h4 className="text-base font-semibold">Problem</h4>
            <p className="text-sm leading-relaxed">{selectedProject.problem}</p>
          </div>

          <div>
            <h4 className="text-base font-semibold">Solution</h4>
            <p className="text-sm leading-relaxed">{selectedProject.solution}</p>
          </div>

          {!!selectedProject.challenges?.length && (
            <div>
              <h4 className="text-base font-semibold">Challenges Faced</h4>
              <ul className="space-y-2 text-sm list-disc pl-5">
                {selectedProject.challenges.map((challenge) => (
                  <li key={challenge}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedProject.deployment && (
            <div>
              <h4 className="text-base font-semibold">Deployment and Real-World Usage</h4>
              <p className="text-sm leading-relaxed">{selectedProject.deployment}</p>
            </div>
          )}

          <div>
            <h4 className="text-base font-semibold">Impact</h4>
            <p className="text-sm text-accent leading-relaxed">{selectedProject.impact}</p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            {hasLink(selectedProject.live) && (
              <a
                href={resolveLink(selectedProject.live)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
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
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 border border-primary/40 text-foreground text-sm font-semibold hover:bg-primary/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
          </div>
          </ExpandableCard>
        )}
      </LayoutGroup>
    </SectionWrapper>
  );
};

export default Projects;
