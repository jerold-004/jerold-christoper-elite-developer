export interface Skill {
  name: string;
  iconUrl?: string;
  /** If true, invert the icon color in dark mode (for dark/black logos) */
  invertInDark?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

const devicon = (slug: string, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", iconUrl: devicon("react") },
      { name: "Next.js", iconUrl: devicon("nextjs"), invertInDark: true },
      { name: "TypeScript", iconUrl: devicon("typescript") },
      { name: "Tailwind CSS", iconUrl: devicon("tailwindcss") },
      { name: "Framer Motion", iconUrl: devicon("framermotion"), invertInDark: true },
      { name: "Three.js", iconUrl: devicon("threejs"), invertInDark: true },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", iconUrl: devicon("nodejs") },
      { name: "Express", iconUrl: devicon("express"), invertInDark: true },
      { name: "MongoDB", iconUrl: devicon("mongodb") },
      { name: "PostgreSQL", iconUrl: devicon("postgresql") },
      { name: "Java", iconUrl: devicon("java") },
      { name: "REST APIs", iconUrl: devicon("postman") },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Python", iconUrl: devicon("python") },
      { name: "TensorFlow", iconUrl: devicon("tensorflow") },
      { name: "Matplotlib", iconUrl: devicon("matplotlib") },
      { name: "Scikit-learn", iconUrl: devicon("scikitlearn") },
      { name: "OpenCV", iconUrl: devicon("opencv") },
      { name: "Pandas", iconUrl: devicon("pandas"), invertInDark: true },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", iconUrl: devicon("git") },
      { name: "Docker", iconUrl: devicon("docker") },
      { name: "Supabase", iconUrl: devicon("supabase") },
      { name: "Linux", iconUrl: devicon("linux") },
      { name: "Unity", iconUrl: devicon("unity"), invertInDark: true },
      { name: "Android Studio", iconUrl: devicon("androidstudio") },
    ],
  },
];
