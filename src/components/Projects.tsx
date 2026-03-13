import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { projects } from "@/data/projects";

const Projects = () => {
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
            className="glass rounded-2xl overflow-hidden gradient-border group"
          >
            {/* Image */}
            <div className="relative overflow-hidden h-48">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

              {/* Hover links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
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
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Projects;
