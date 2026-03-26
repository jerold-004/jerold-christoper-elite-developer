export interface Project {
  id: string;
  title: string;
  description: string;
  overview?: string;
  problem: string;
  solution: string;
  challenges?: string[];
  deployment?: string;
  tech: string[];
  impact: string;
  image: string;
  github?: string;
  live: string;
  badge?: string;
  engagement?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "nueral-search",
    title: "Fraud Detection in UPI Transactions",
   description: "AI-powered real-time fraud detection system for UPI transactions with ensemble machine learning, biometric, and live monitoring dashboards.",
    problem: "The rapid growth of UPI transactions has increased the risk of digital payment fraud. Traditional rule-based fraud detection systems rely on static thresholds and predefined patterns, making them ineffective against evolving fraud techniques and often producing high false positives.",
    solution: "Developed an AI-powered real-time fraud detection platform that evaluates UPI transactions using ensemble machine learning models to generate risk scores. Transactions are classified as allow, delay, or block, while live dashboards enable monitoring and adaptive threshold control.This project is build for Project DeepBlue S11, a buildathoon conducted bt Mastek.",
    challenges: [
      "Reducing false positives while preserving strong fraud protection for genuine users.",
      "Supporting real-time risk scoring under high transaction throughput.",
      "Balancing explainability for governance teams with model performance.",
    ],
    deployment: "Deployed as a live web application with monitoring support for real-time fraud analysis workflows.",
    tech: ["Python", "FastAPI", "React", "PostgreSQL","Redis", "Machine Learning (Isolation Forest, Random Forest, XGBoost)", "WebSockets", "JWT Authentication", "WebAuthn Biometric Security", "Render Deployment"],
    impact: "Provides real-time fraud risk scoring, live monitoring, and governance control, improving fraud detection accuracy while maintaining a seamless and secure user experience.",
    image: "https://cdn.sanity.io/images/9sed75bn/production/470934de877c88a13171081ae22e98994ce9cbd7-1792x1008.png?auto=format",
    badge: "Production Ready Prototype",
    engagement: "Project DeepBlue S11 - Mastek",
    featured: true,
    live: "https://fdt2-tenzornex.vercel.app/",
  },
  {
    id: "devflow",
    title: "PathFindAR Solutions",
    description: "AR-based indoor navigation platform that guides users through complex buildings using real-time augmented reality directions.",
    problem: "GPS signals do not work reliably indoors, making traditional navigation apps ineffective. Large buildings like hospitals, airports, malls, and campuses have complex layouts. Static signboards and floor maps are often confusing or poorly placed. Visitors waste time searching for departments, gates, or stores. People often depend on staff or security for directions. Navigation confusion can lead to missed appointments and delays.",
    solution: "Built an AR-based mobile navigation system for indoor environments. The smartphone camera detects surroundings using AR technology and overlays real-time navigation arrows on the floor view. Users can search and select destinations inside buildings and receive step-by-step visual guidance through corridors and turns, reducing confusion and saving time in large buildings.",
    challenges: [
      "Handling unstable indoor signals and map alignment across different building layouts.",
      "Keeping AR guidance accurate while users move through turns and floor transitions.",
      "Optimizing mobile performance for smooth navigation overlays in real time.",
    ],
    deployment: "Published for practical demonstrations of indoor routing scenarios across complex campus-like spaces.",
    tech: ["Unity", "AR Foundation", "ARCore", "C#", "Mobile Sensors", "Indoor Mapping Algorithms","scikit-image","OpenCV (cv2)","NetworkX","FastAPI","Uvicorn"],
    impact: "Enables faster and easier navigation in complex indoor spaces, reducing search time and improving visitor experience.",
    image: "https://tryon.kivisense.com/blog/wp-content/uploads/2024/07/AR-navigagtion.jpg",
    badge: "Developing MVP",
    engagement: "Live in Lab Project",
    featured: true,
    live: "https://pathfindar-solutions.web.app/",
  },
  {
    id: "medai",
    title: "FindIT-Campus",
    description: "Campus lost-and-found platform for students to report and recover misplaced items quickly and effortlessly, avoiding the frustration of lost things.",
    problem: "Students frequently lose essential belongings like ID cards, books, keys, and electronics on campus. Traditional lost-and-found systems rely on notice boards or office desks, making discovery slow and inefficient. Many items remain unclaimed because students cannot easily broadcast lost items or identify found ones across the campus community.",
    solution: "Built a mobile application where students post lost or found items with photos, descriptions, and location details. The platform enables quick browsing, filtering, and direct contact between owners and finders. A centralized digital feed ensures items are visible to the entire campus, dramatically improving recovery chances.",
    challenges: [
      "Creating clear item matching flows that work with partial descriptions and photos.",
      "Designing trust-friendly interactions between finders and owners.",
      "Ensuring feed usability for large campus communities with frequent updates.",
    ],
    deployment: "Deployed as a campus-focused application model to streamline reporting and recovery workflows.",
    tech: ["Flutter", "Node.js", "Express", "PostgreSQL", "JWT", "Riverpod", "Dio", "Multer"],
    impact: "Enables fast campus-wide reporting of lost and found items, improving recovery rates and significantly reducing time spent searching.",
    image: "https://i.ibb.co/PZpYkTh9/file-00000000bfbc71fabe026d6cd0c10aeb.png",
    badge: "Prototype",
    engagement: "Flutter Workshop Project",
    featured: true,
    live: "https://find-it-campus.vercel.app",
  },
  {
    id: "collab-ide",
    title: "FoodSaver.AI",
    description: "AI-powered food rescue platform connecting donors, volunteers, and NGOs to list surplus meals, match pickups, and deliver food safely before expiry",
    problem: "Every day restaurants, events, and households discard large amounts of edible food while many people nearby struggle with hunger. There is no simple real-time digital platform connecting food donors with people or NGOs who need it, causing preventable food waste and missed opportunities to feed communities efficiently.",
    solution: "FoodSaver is a web platform that connects donors with surplus food to nearby NGOs and individuals in real time. Users can post food details such as type, quantity, and pickup location, while recipients quickly discover and claim available food through a location-based system, reducing waste and ensuring edible food reaches people who need it.",
    challenges: [
      "Coordinating time-sensitive pickup flows before food quality declines.",
      "Balancing donor simplicity with verification and safety requirements.",
      "Designing clear location-based matching for volunteers and recipients.",
    ],
    deployment: "Deployed as a working web platform prototype to validate real-time surplus-food recovery workflows.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Router DOM", "TanStack React Query", "React Hook Form", "Zod", "Recharts", "Leaflet", "React Leaflet", "Framer Motion", "Sonner", "ESLint", "PostCSS", "Node.js", "npm", "Vercel"],
    impact: "Speeds food recovery, improves successful donations, and cuts waste by making pickup, matching, and impact tracking seamless city-wide.",
    image: "https://cdn.prod.website-files.com/68221876a451e35e835cf2ca/68dc93dbc79bac3e91d70cb9_ChatGPT%20Image%20Sep%2030%2C%202025%2C%2007_37_04%20PM-p-1080.png",
    badge: "Prototype",
    engagement: "Hackathon",
    featured: true,
    live: "https://foodaver-ai.vercel.app",
  },
  {
    id: "fintech-dashboard",
    title: "Pandiyin Nature In Pack",
    description: "Production-ready e-commerce platform for natural products business delivered as a freelance solution and actively used daily by real customers now.",
    overview: "Pandiyin Nature is a business-focused e-commerce web application created for a client who needed a scalable digital storefront for natural and organic products. The platform was designed to support real product discovery, cart operations, checkout conversion, and daily operations for a live business environment.",
    problem: "The client needed to move from offline/manual sales operations to a reliable online commerce experience where customers could browse products, place orders, and trust the buying process on both mobile and desktop.",
    solution: "Implemented a modern full-stack e-commerce experience with structured product catalog management, dynamic cart workflows, responsive UX patterns, and production deployment practices suitable for real-world traffic and business usage.",
    challenges: [
      "Managing product data and category organization while keeping the storefront fast and easy to browse.",
      "Designing a frictionless cart and checkout flow that reduces drop-offs across mobile and desktop devices.",
      "Maintaining reliable product availability behavior with real-time updates and inventory-aware interactions.",
      "Balancing visual polish with performance so pages remain smooth for users with varying network speeds.",
    ],
    deployment: "Deployed as a live production system for a real client business, with active users placing orders through the platform.",
    tech: ["React", "Node.js","supabase", "Razorpay","PostgreSQL (via Supabase)","deployment on Vercel","shadcn/ui patterns","Radix UI primitives"],
    impact: "Enabled the business to establish a real online sales channel, improve digital reach, and deliver a professional buying experience that supports day-to-day commerce.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=800&fit=crop",
    live: "https://pandiyin-natureinpack.vercel.app/",
    badge: "Live Project",
    engagement: "Client Work",
    featured: true,
  },
];
