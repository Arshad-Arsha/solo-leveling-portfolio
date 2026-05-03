"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Interactive Dashboard",
    description: "Real-time data visualization platform using React.js and Chart.js with WebSocket integration. Delivered live metrics, analytics panels and dynamic chart updates.",
    stack: ["React.js", "Chart.js", "WebSocket", "REST API"],
    accent: "rgba(0,212,255,1)",
    rarity: "S-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 2,
    title: "UI Component Library",
    description: "Created 30+ reusable React components — reducing team development time by 50%. Covers forms, modals, data tables, charts, and animated layouts.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Storybook"],
    accent: "rgba(124,92,252,1)",
    rarity: "A-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 3,
    title: "Pokémon Discovery App",
    description: "Immersive Pokédex with infinite scrolling, drag & drop ordering, and persistent localStorage. Powered by TanStack Query for seamless data fetching.",
    stack: ["React", "TanStack Query", "Infinite Scroll", "Drag & Drop"],
    accent: "rgba(239,68,68,1)",
    rarity: "B-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 4,
    title: "Chatbot Flow Builder",
    description: "Visual no-code chatbot conversation builder. Drag, connect, and configure nodes with React Flow and Zustand state management.",
    stack: ["React Flow", "Zustand", "TypeScript", "Node Editor"],
    accent: "rgba(240,192,64,1)",
    rarity: "S-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 5,
    title: "GTG Perfume Landing Page",
    description: "Luxury perfume brand landing with an interactive rotating product ring, cinematic scroll storytelling and 40% improvement in user engagement.",
    stack: ["React", "Framer Motion", "CSS Transforms", "GSAP"],
    accent: "rgba(16,185,129,1)",
    rarity: "A-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 6,
    title: "HR Analytics Dashboard",
    description: "Comprehensive HR data platform with real-time analytics, employee performance charts, department insights and role-based access via JWT.",
    stack: ["React", "Recharts", "Tailwind CSS", "JWT Auth"],
    accent: "rgba(236,72,153,1)",
    rarity: "S-Rank",
    demo:   "https://mhd-arshad-portfolio.vercel.app/",
    github: "https://github.com/",
  },
];

function ProjectCard({ p, index, isInView }: { p: typeof projects[0]; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group cursor-pointer"
    >
      <div className="border border-[rgba(124,92,252,0.1)] p-1 transition-all duration-500 group-hover:border-[rgba(124,92,252,0.3)]">
        
        {/* Item Preview Box */}
        <div className="relative h-64 overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity"
            style={{ 
              backgroundImage: `radial-gradient(circle at center, ${p.accent}, transparent 70%)` 
            }}
          />
          <div className="text-8xl font-black text-white/[0.03] select-none group-hover:scale-110 transition-transform duration-700">
            {String(p.id).padStart(2, "0")}
          </div>
          
          {/* Rarity Badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-white/10 rounded-md">
            <span className="text-[9px] uppercase tracking-widest font-bold" style={{ color: p.accent }}>
              {p.rarity} Item
            </span>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 flex gap-2">
             <a href={p.demo} target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black hover:scale-110 transition-transform">
               <ArrowUpRight className="w-5 h-5" />
             </a>
             <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform">
               <Github className="w-5 h-5" />
             </a>
          </div>
        </div>

        {/* Item Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-heading mb-3 transition-colors group-hover:text-accent">
            {p.title}
          </h3>
          <p className="text-sm text-[rgba(170,155,220,0.5)] leading-relaxed mb-6 h-12 overflow-hidden text-ellipsis">
            {p.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {p.stack.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] uppercase tracking-widest text-[rgba(170,155,220,0.3)]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative frame elements */}
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[rgba(124,92,252,0.3)] pointer-events-none group-hover:border-accent transition-colors" />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[rgba(124,92,252,0.3)] pointer-events-none group-hover:border-accent transition-colors" />
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-8%" });

  return (
    <section ref={sectionRef} id="projects"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent mb-4 block font-bold">[ Inventory: Collection ]</span>
            <h2 className="text-5xl md:text-7xl font-bold text-heading tracking-tight">
              Artifact <span className="gradient-text">Showcase</span>
            </h2>
          </div>
          <p className="text-[rgba(170,155,220,0.5)] max-w-sm text-sm font-light leading-relaxed">
            A collection of high-rarity projects developed during various dungeon raids (professional experience).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => <ProjectCard key={p.id} p={p} index={i} isInView={isInView} />)}
        </div>
      </div>
    </section>
  );
}
