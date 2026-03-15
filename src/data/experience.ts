export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  type: "internship" | "hackathon" | "project" | "achievement" | "academic";
  description: string;
  tech?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "1",
    title: "B.E CSE (AI & ML) Student",
    organization: "Sri Sairam Engineering College",
    period: "2024 — Present",
    type: "academic",
    description: "Pursuing Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning, with focus on practical full-stack and ML product development.",
    tech: ["Python", "Java", "Machine Learning", "DSA"],
  },
  {
    id: "2",
    title: "Fraud Detection in UPI — FDT2",
    organization: "Personal/Academic Project",
    period: "2025 — 2026",
    type: "project",
    description: "Developed an ML-based UPI fraud detection solution for identifying suspicious transaction patterns with data-driven risk scoring.",
    tech: ["Python", "LangChain", "Scikit-learn", "FastAPI"],
  },
  {
    id: "3",
    title: "PathFindAR — Intelligent Navigation Platform",
    organization: "Personal/Academic Project",
    period: "2025",
    type: "project",
    description: "Built an intelligent navigation platform combining real-time mapping and modern web technologies for accessible route guidance.",
    tech: ["Unity", "React", "Node.js", "Maps APIs"],
  },
  {
    id: "4",
    title: "Open Source Contributor",
    organization: "GitHub — JEROLD-creator653",
    period: "2025 — Present",
    type: "achievement",
    description: "Maintained active open-source contributions with 506 contributions in the last year across 14 repositories, including Fraud-Detection-in-UPI---FDT2 and pathfindar-navigate-your-world.",
    tech: ["Git", "GitHub", "Open Source"],
  },
  {
    id: "5",
    title: "GitHub Achievements — Pull Shark & YOLO",
    organization: "GitHub Profile Achievements",
    period: "2025 — Present",
    type: "achievement",
    description: "Earned GitHub profile achievements including Pull Shark and YOLO through active collaboration and pull request contributions.",
    tech: ["GitHub", "Pull Requests", "Collaboration"],
  },
];
