export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: "internship" | "hackathon" | "project" | "achievement";
  description: string;
  tech?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "1",
    title: "Full Stack Developer Intern",
    organization: "TechCorp Solutions",
    period: "Jun 2025 — Aug 2025",
    type: "internship",
    description: "Built scalable microservices and React dashboards serving 50K+ users. Optimized API response times by 40%.",
    tech: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    id: "2",
    title: "1st Place — National AI Hackathon",
    organization: "HackForGood 2025",
    period: "Mar 2025",
    type: "hackathon",
    description: "Won first place among 200+ teams by building an AI-powered accessibility tool for visually impaired users.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
  },
  {
    id: "3",
    title: "ML Research Assistant",
    organization: "University AI Lab",
    period: "Jan 2025 — May 2025",
    type: "internship",
    description: "Conducted research on transformer architectures for medical image segmentation. Published a workshop paper.",
    tech: ["PyTorch", "Python", "OpenCV"],
  },
  {
    id: "4",
    title: "Open Source Contributor",
    organization: "Major OSS Projects",
    period: "2024 — Present",
    type: "achievement",
    description: "Contributed to popular open-source projects including React ecosystem tools and ML libraries. 500+ GitHub contributions.",
  },
  {
    id: "5",
    title: "Smart Campus IoT Platform",
    organization: "University Capstone Project",
    period: "Sep 2024 — Dec 2024",
    type: "project",
    description: "Led a team of 4 to build an IoT-based campus management system with real-time energy monitoring and optimization.",
    tech: ["React", "Node.js", "MQTT", "PostgreSQL", "Raspberry Pi"],
  },
];
