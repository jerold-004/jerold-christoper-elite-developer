export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "✨" },
      { name: "Three.js", icon: "🧊" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Express", icon: "⚡" },
      { name: "MongoDB", icon: "🍃" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "Java", icon: "☕" },
      { name: "REST APIs", icon: "🔗" },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "PyTorch", icon: "🔥" },
      { name: "Scikit-learn", icon: "📊" },
      { name: "OpenCV", icon: "👁️" },
      { name: "NLP", icon: "💬" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
      { name: "Linux", icon: "🐧" },
      { name: "Figma", icon: "🎯" },
      { name: "CI/CD", icon: "🔄" },
    ],
  },
];
