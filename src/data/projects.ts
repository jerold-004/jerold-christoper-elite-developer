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
    id: "nueral-search",
    title: "Fraud Detection in UPI Transactions",
   description: "AI-powered real-time fraud detection system for UPI transactions with ensemble machine learning, biometric, and live monitoring dashboards.",
    problem: "The rapid growth of UPI transactions has increased the risk of digital payment fraud. Traditional rule-based fraud detection systems rely on static thresholds and predefined patterns, making them ineffective against evolving fraud techniques and often producing high false positives.",
    solution: "Developed an AI-powered real-time fraud detection platform that evaluates UPI transactions using ensemble machine learning models to generate risk scores. Transactions are classified as allow, delay, or block, while live dashboards enable monitoring and adaptive threshold control.",
    tech: ["Python", "FastAPI", "React", "PostgreSQL","Redis", "Machine Learning (Isolation Forest, Random Forest, XGBoost)", "WebSockets", "JWT Authentication", "WebAuthn Biometric Security", "Render Deployment"],
    impact: "Provides real-time fraud risk scoring, live monitoring, and governance control, improving fraud detection accuracy while maintaining a seamless and secure user experience.",
    image: "https://cdn.sanity.io/images/9sed75bn/production/470934de877c88a13171081ae22e98994ce9cbd7-1792x1008.png?auto=format",
    github: "https://github.com/JEROLD-creator653",
    live: "https://fdt2-tenzornex.vercel.app/",
  },
  {
    id: "devflow",
    title: "PathFindAR Solutions",
    description: "AR-based indoor navigation platform that guides users through complex buildings using real-time augmented reality directions.",
    problem: "GPS signals do not work reliably indoors, making traditional navigation apps ineffective. Large buildings like hospitals, airports, malls, and campuses have complex layouts. Static signboards and floor maps are often confusing or poorly placed. Visitors waste time searching for departments, gates, or stores. People often depend on staff or security for directions. Navigation confusion can lead to missed appointments and delays.",
    solution: "Built an AR-based mobile navigation system for indoor environments. The smartphone camera detects surroundings using AR technology and overlays real-time navigation arrows on the floor view. Users can search and select destinations inside buildings and receive step-by-step visual guidance through corridors and turns, reducing confusion and saving time in large buildings.",
    tech: ["Unity", "AR Foundation", "ARCore", "C#", "Mobile Sensors", "Indoor Mapping Algorithms","scikit-image","OpenCV (cv2)","NetworkX","FastAPI","Uvicorn"],
    impact: "Enables faster and easier navigation in complex indoor spaces, reducing search time and improving visitor experience.",
    image: "https://tryon.kivisense.com/blog/wp-content/uploads/2024/07/AR-navigagtion.jpg",
    github: "https://github.com/JEROLD-creator653",
    live: "https://pathfindar-solutions.web.app/",
  },
  {
    id: "medai",
    title: "FindIT-Campus",
    description: "Campus lost-and-found platform for students to report and recover misplaced items quickly and effortlessly, avoiding the frustration of lost things.",
    problem: "Students frequently lose essential belongings like ID cards, books, keys, and electronics on campus. Traditional lost-and-found systems rely on notice boards or office desks, making discovery slow and inefficient. Many items remain unclaimed because students cannot easily broadcast lost items or identify found ones across the campus community.",
    solution: "Built a mobile application where students post lost or found items with photos, descriptions, and location details. The platform enables quick browsing, filtering, and direct contact between owners and finders. A centralized digital feed ensures items are visible to the entire campus, dramatically improving recovery chances.",
    tech: ["Flutter", "Node.js", "Express", "PostgreSQL", "JWT", "Riverpod", "Dio", "Multer"],
    impact: "Enables fast campus-wide reporting of lost and found items, improving recovery rates and significantly reducing time spent searching.",
    image: "https://i.ibb.co/PZpYkTh9/file-00000000bfbc71fabe026d6cd0c10aeb.png",
    github: "https://github.com/JEROLD-creator653",
    live: "#",
  },
  {
    id: "collab-ide",
    title: "FoodSaver.AI",
    description: "AI-powered food rescue platform connecting donors, volunteers, and NGOs to list surplus meals, match pickups, and deliver food safely before expiry",
    problem: "Every day restaurants, events, and households discard large amounts of edible food while many people nearby struggle with hunger. There is no simple real-time digital platform connecting food donors with people or NGOs who need it, causing preventable food waste and missed opportunities to feed communities efficiently.",
    solution: "FoodSaver is a web platform that connects donors with surplus food to nearby NGOs and individuals in real time. Users can post food details such as type, quantity, and pickup location, while recipients quickly discover and claim available food through a location-based system, reducing waste and ensuring edible food reaches people who need it.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Router DOM", "TanStack React Query", "React Hook Form", "Zod", "Recharts", "Leaflet", "React Leaflet", "Framer Motion", "Sonner", "ESLint", "PostCSS", "Node.js", "npm", "Vercel"],
    impact: "Speeds food recovery, improves successful donations, and cuts waste by making pickup, matching, and impact tracking seamless city-wide.",
    image: "https://cdn.prod.website-files.com/68221876a451e35e835cf2ca/68dc93dbc79bac3e91d70cb9_ChatGPT%20Image%20Sep%2030%2C%202025%2C%2007_37_04%20PM-p-1080.png",
    github: "https://github.com/JEROLD-creator653",
    live: "https://foodaver-ai.vercel.app",
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
