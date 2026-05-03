"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";
import { clsx } from "clsx";

const skillGroups = [
  {
    group: "Languages",
    icon: "⌨️",
    accentColor: "rgba(124,92,252,0.85)",
    items: [
      { name: "JavaScript (ES6+)", level: 96 },
      { name: "TypeScript",        level: 88 },
      { name: "HTML5",             level: 98 },
      { name: "CSS3 / SASS",       level: 93 },
    ],
  },
  {
    group: "Frameworks & Libraries",
    icon: "⚛️",
    accentColor: "rgba(0,212,255,0.85)",
    items: [
      { name: "React.js",     level: 96 },
      { name: "Redux",        level: 85 },
      { name: "Tailwind CSS", level: 96 },
      { name: "Bootstrap 5",  level: 92 },
      { name: "Material UI",  level: 82 },
    ],
  },
  {
    group: "MERN & Backend",
    icon: "🛢️",
    accentColor: "rgba(16,185,129,0.85)",
    items: [
      { name: "Node.js",     level: 72 },
      { name: "Express.js",  level: 70 },
      { name: "MongoDB",     level: 68 },
      { name: "RESTful APIs",level: 90 },
      { name: "JWT Auth",    level: 80 },
    ],
  },
  {
    group: "Design & Tools",
    icon: "🎨",
    accentColor: "rgba(240,192,64,0.85)",
    items: [
      { name: "Figma",      level: 90 },
      { name: "Adobe XD",   level: 78 },
      { name: "Photoshop",  level: 70 },
      { name: "Vite / npm", level: 88 },
    ],
  },
  {
    group: "AI & Productivity",
    icon: "🤖",
    accentColor: "rgba(236,72,153,0.85)",
    items: [
      { name: "Prompt Engineering", level: 88 },
      { name: "GitHub Copilot",     level: 85 },
      { name: "Cursor AI",          level: 82 },
      { name: "Figma AI",           level: 78 },
    ],
  },
  {
    group: "Architecture & UX",
    icon: "🏗️",
    accentColor: "rgba(245,158,11,0.85)",
    items: [
      { name: "React Hooks & Context",    level: 92 },
      { name: "Responsive / Mobile-First",level: 97 },
      { name: "WCAG 2.1 Accessibility",   level: 80 },
      { name: "Glassmorphism / 3D UI",    level: 88 },
    ],
  },
];

function SkillItem({ name, level, index, isInView, barColor }: {
  name: string; level: number; index: number; isInView: boolean; barColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      {/* Circular outer effect on hover */}
      <motion.div
        className="absolute -inset-4 border-2 border-dashed rounded-full pointer-events-none opacity-0"
        animate={hovered ? { opacity: 0.4, rotate: 360, scale: 1.1 } : { opacity: 0, rotate: 0, scale: 0.8 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ borderColor: barColor }}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between mb-1.5">
          <span className={clsx(
            "text-sm font-light transition-colors duration-300",
            hovered ? "text-white" : "text-[rgba(170,155,220,0.7)]"
          )}>{name}</span>
          <span className="text-[10px] text-[rgba(170,155,220,0.4)]">{level}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-[rgba(124,92,252,0.1)] overflow-hidden border border-[rgba(124,92,252,0.1)]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${barColor}, rgba(124,92,252,0.6))` }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{ duration: 1.1, delay: 0.2 + index * 0.035, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  let globalIdx = 0;

  return (
    <section ref={sectionRef} id="skills"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(ellipse, rgba(124,92,252,0.1) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <span className="hero-label mb-4 block">System Status: Capabilities</span>
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extralight tracking-tight text-heading leading-tight">
            Mastered <span className="gradient-text"><TypeWriter text="Skills" cycleWords={["React", "Canvas", "Motion", "AI", "Tools"]} pauseMs={1800} cursor /></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: gi * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 rounded-[2.5rem] border border-[rgba(124,92,252,0.15)] hover:border-[rgba(124,92,252,0.4)] transition-all duration-500 group"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: group.accentColor }} />
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl border border-[rgba(124,92,252,0.2)]">
                  {group.icon}
                </div>
                <div className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: group.accentColor }}>
                  {group.group}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                {group.items.map((skill) => {
                  const idx = globalIdx++;
                  return (
                    <SkillItem
                      key={skill.name}
                      {...skill}
                      index={idx}
                      isInView={isInView}
                      barColor={group.accentColor}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
