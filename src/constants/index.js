// index.js
export const servicesData = [
  {
    title: "Web Applications",
    description: "Modern full stack products built for real-world use",
    items: [
      { title: "MERN Stack Apps", description: "" },
      { title: "React / Next.js Frontends", description: "" },
      { title: "Auth & Role Systems", description: "" },
      { title: "Booking Platforms", description: "" },
    ],
  },
  {
    title: "APIs & Backends",
    description: "Scalable backend systems and database-driven applications",
    items: [
      { title: "REST APIs", description: "" },
      { title: "Node.js / Express", description: "" },
      { title: "MongoDB / PostgreSQL", description: "" },
      { title: "Server-side Logic", description: "" },
    ],
  },
  {
    title: "ML & Data Systems",
    description: "Applied machine learning for detection, analysis, and forecasting",
    items: [
      { title: "Anomaly Detection", description: "" },
      { title: "NLP Classification", description: "" },
      { title: "Forecasting Models", description: "" },
      { title: "Feature Engineering", description: "" },
    ],
  },
  {
    title: "Deployment",
    description: "From local development to production-ready deployment",
    items: [
      { title: "VPS Hosting", description: "" },
      { title: "Nginx / PM2", description: "" },
      { title: "Domain & SSL", description: "" },
      { title: "Production Debugging", description: "" },
    ],
  },
];
export const projects = [
  {
    id: 1,
    domain: "AI / Machine Learning",
    name: "AI Scam Detection System",
    description:
      "Built an NLP-based fraud detection system for job postings using TF-IDF, feature engineering, and XGBoost.",
    github: "https://github.com/dhiraj-001/AI-Scam-Detection-Suite",
    live: "",
    image: "/assets/projects/scam-detection.png",
    bgImage: "/assets/backgrounds/scam-detection.png",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Scikit-learn" },
      { id: 3, name: "XGBoost" },
      { id: 4, name: "Pandas" },
      { id: 5, name: "Streamlit" },
    ],
  },
  {
    id: 2,
    domain: "AI / Machine Learning",
    name: "AI Spend Intelligence System",
    description:
      "Developed an anomaly detection and forecasting system to detect duplicate payments, cost leakage, and financial inefficiencies.",
    github: "https://github.com/dhiraj-001/AI-for-Enterprise-Cost-Intelligence-Autonomous-Action/tree/main/Cost-Anomaly-Detection",
    live: "",
    image: "/assets/projects/Cost-anomly.png",
    bgImage: "/assets/backgrounds/Cost-anomly.png",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "Isolation Forest" },
      { id: 3, name: "Pandas" },
      { id: 4, name: "Streamlit" },
    ],
  },
  {
    id: 3,
    domain: "AI / Machine Learning",
    name: "Smart Tourist Safety System",
    description:
      "Built a real-time anomaly detection system using GPS telemetry, movement features, and context-aware detection logic.",
    github: "https://github.com/dhiraj-001/Tourist-Safety-Multi-Modal-Anomaly-Detection",
    live: "",
    image: "/assets/projects/anomaly-movement.png",
    bgImage: "/assets/backgrounds/anomaly-movement.png",
    frameworks: [
      { id: 1, name: "Python" },
      { id: 2, name: "FastAPI" },
      { id: 3, name: "Isolation Forest" },
      { id: 4, name: "GPS Analytics" },
    ],
  },
    {
    id: 4,
    domain: "Full Stack Development",
    name: "UpTradeLevel MLM Platform",
    description:
      "Developed a full-stack MLM platform featuring a referral-based network system, financial modules, JWT authentication, and role-based admin controls.",
    github: "", 
    live: "", 
    image: "/assets/projects/mlm.png",
    bgImage: "/assets/backgrounds/mlm.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express" },
      { id: 4, name: "JWT" },
      { id: 5, name: "PM2" },
    ],
  },
  {
    id: 5,
    domain: "Full Stack Development",
    name: "University Guest House Booking System",
    description:
      "Developed a full-stack booking platform with authentication, role-based access control, REST APIs, and VPS deployment.",
    github: "",
    live: "https://booking-system-aus-frontend.vercel.app/",
    image: "/assets/projects/booking-system.png",
    bgImage: "/assets/backgrounds/booking-system.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "Express" },
      { id: 4, name: "MongoDB" },
      { id: 5, name: "REST API" },
    ],
  },
  {
    id: 6,
    domain: "Full Stack Development",
    name: "Ghost Invoice Generator",
    description:
      "Built a privacy-first, client-side invoice generator featuring a live A4 split-screen preview, Zustand state management, and Indian business compliance.",
    github: "",
    live: "",
    image: "/assets/projects/ghost-invoice.png",
    bgImage: "/assets/backgrounds/ghost-invoice.png",
    frameworks: [
      { id: 1, name: "React" },
      { id: 2, name: "Zustand" },
      { id: 3, name: "Tailwind CSS" },
      { id: 4, name: "Shadcn UI" },
      { id: 5, name: "Vite" },
    ],
  },
  {
    id: 7,
    domain: "Full Stack Development",
    name: "Totem Management CRM",
    description:
      "Developed a comprehensive agency CRM to streamline digital marketing workflows, client management, and customized course offerings.",
    github: "",
    live: "",
    image: "/assets/projects/totem.png",
    bgImage: "/assets/backgrounds/totem.png",
    frameworks: [
      { id: 1, name: "Next.js" },
      { id: 2, name: "Node.js" },
      { id: 3, name: "MongoDB" },
      { id: 4, name: "Tailwind CSS" },
    ],
  },

];


export const socials = [
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/dhiraj-gogoi-330008274/",
    icon: "mdi:linkedin" 
  },
  { 
    name: "GitHub", 
    href: "https://github.com/dhiraj-001/",
    icon: "mdi:github" 
  },
  { 
    name: "Twitter", 
    href: "https://x.com/DhirajG01",
    icon: "ri:twitter-x-fill" // Modern X logo
  },
];