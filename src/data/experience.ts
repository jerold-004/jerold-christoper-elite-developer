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
    title: "Machine Learning Intern",
    organization: "Euclid Technologies, Bangalore",
    period: "Jun 2025 — Aug 2025",
    type: "internship",
    description: "Completed a machine learning internship focused on practical model development and applied AI workflows. Worked on cardiovascular disease prediction and real-time license plate recognition solutions.",
    tech: ["Python", "Machine Learning", "Computer Vision", "OpenCV", "scikit-learn"],
  },
  {
    id: "3",
    title: "PathFindAR — Intelligent Navigation Platform",
    organization: "Personal/Academic Project",
    period: "2025 — Present (ongoing)",
    type: "project",
    description: "Built an intelligent navigation platform combining real-time mapping and modern web technologies for accessible route guidance.",
    tech: ["Unity", "React", "Node.js", "Maps APIs"],
  },
  {
    id: "4",
    title: "Open Source Contributor",
    organization: "GitHub — JEROLD-creator653",
    period: "2025 — 2026",
    type: "achievement",
    description: "Maintained active open-source contributions with 506 contributions in the last year across 14 repositories, including Fraud-Detection-in-UPI---FDT2 and pathfindar-navigate-your-world.",
    tech: ["Git", "GitHub", "Open Source"],
  },
  {
    id: "5",
    title: "Fraud Detection in UPI — FDT2",
    organization: "Personal/Academic Project",
    period: "2025 — 2026",
    type: "project",
    description: "Developed an ML-based UPI fraud detection solution for identifying suspicious transaction patterns with data-driven risk scoring.",
    tech: ["Python", "LangChain", "Scikit-learn", "FastAPI"],
  },
  {
    id: "6",
    title: "National Level Hackathon — 2nd Place Winner",
    organization: "24-Hour National Hackathon (St. Joseph’s Institute of Technology)",
    period: "2026",
    type: "achievement",
    description: "Secured 2nd place in a 24-hour national-level hackathon conducted by St. Joseph’s Institute of Technology. Developed an AI-powered UPI fraud detection system, implementing real-time machine learning models to identify suspicious transaction patterns and enhance digital payment security.",
    tech: ["Hackathon", "AI/ML", "Fraud Detection","FinTech","Real-time Systems"],
  },
];
