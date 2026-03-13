export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  impact: string;
  image: string;
  github: string;
  live: string;
}

export const projects: Project[] = [
  {
    id: "neural-search",
    title: "Neural Search Engine",
    description: "AI-powered semantic search engine with natural language understanding and real-time indexing.",
    problem: "Traditional keyword-based search fails to understand user intent and context.",
    solution: "Built a transformer-based semantic search system using embeddings and vector databases for context-aware retrieval.",
    tech: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "Redis"],
    impact: "95% search accuracy improvement over keyword-based search, serving 10K+ queries/day.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
  {
    id: "devflow",
    title: "DevFlow — CI/CD Platform",
    description: "Full-stack CI/CD platform with real-time build monitoring and automated deployments.",
    problem: "Small teams lack affordable, user-friendly CI/CD tools with intelligent pipeline optimization.",
    solution: "Created an end-to-end pipeline platform with ML-driven build optimization and failure prediction.",
    tech: ["Next.js", "Node.js", "Docker", "MongoDB", "WebSocket", "AWS"],
    impact: "Reduced average deployment time by 60% for beta users with zero-downtime releases.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
  {
    id: "medai",
    title: "MedAI Diagnostics",
    description: "Machine learning platform for early disease detection from medical imaging data.",
    problem: "Delayed diagnosis due to shortage of radiologists and manual image analysis bottlenecks.",
    solution: "Developed CNN-based models for automated anomaly detection in X-rays and MRI scans.",
    tech: ["Python", "PyTorch", "Scikit-learn", "React", "Flask", "OpenCV"],
    impact: "Achieved 92% accuracy on test datasets, reducing diagnostic time from hours to seconds.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
  {
    id: "collab-ide",
    title: "CollabIDE — Real-time Code Editor",
    description: "Collaborative code editor with real-time syncing, video chat, and AI code suggestions.",
    problem: "Remote pair programming tools lack seamless real-time collaboration with intelligent assistance.",
    solution: "Built a CRDT-based collaborative editor with WebRTC video and GPT-powered code completion.",
    tech: ["React", "TypeScript", "Node.js", "WebRTC", "Redis", "Socket.IO"],
    impact: "Used by 500+ developers in hackathons, enabling real-time collaboration across 15+ countries.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
  {
    id: "fintech-dashboard",
    title: "FinPulse Analytics",
    description: "Real-time financial analytics dashboard with ML-powered trend prediction.",
    problem: "Retail investors lack access to institutional-grade analytics and predictive market insights.",
    solution: "Created a responsive dashboard with live market feeds, sentiment analysis, and LSTM-based forecasting.",
    tech: ["React", "Tailwind CSS", "Python", "TensorFlow", "PostgreSQL", "D3.js"],
    impact: "Served 2K+ active users with real-time portfolio tracking and 78% trend prediction accuracy.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
];
