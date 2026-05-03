"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";

const experiences = [
  {
    period: "Sep 2023 — Present",
    role: "Software Developer",
    company: "Posibolt Solutions Pvt. Ltd.",
    location: "Kozhikode, Kerala",
    description: "Architecting React modules serving 10,000+ daily active users. Spearheading migration from vanilla JS to React.js for enhanced component reusability. Optimizing bundle sizes via code-splitting and lazy loading in Vite. Maintaining 98% design fidelity converting Figma prototypes with Tailwind CSS and Bootstrap.",
    tags: ["React.js", "Vite", "Tailwind CSS", "Bootstrap", "TypeScript", "Figma"],
    rankColor: "#f0c040", // Gold
    rankLabel: "S",
    questTitle: "Legacy System Migration",
  },
  {
    period: "Mar 2022 — Aug 2023",
    role: "Web Developer",
    company: "The Chandraz",
    location: "Malappuram, Kerala",
    description: "Deployed web applications for home care services reaching 5,000+ users. Translated 20+ Figma design prototypes into production-ready web components adhering to brand guidelines. Enhanced performance through strategic image optimization and asset minification.",
    tags: ["JavaScript", "HTML5", "CSS3", "Figma", "Responsive Design"],
    rankColor: "#7c5cfc", // Violet
    rankLabel: "A",
    questTitle: "Service Deployment Initiative",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="experience"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 text-accent mb-4">
            <div className="w-10 h-[1px] bg-accent" />
            <span className="text-xs uppercase tracking-[0.5em] font-bold">Quest Log</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-heading">
            Chronicles of <span className="gradient-text">Growth</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-20">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group"
            >
              <div className="flex flex-col md:flex-row gap-12 items-start">

                {/* Quest Marker */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center animate-spin-slow"
                    style={{ borderColor: exp.rankColor, opacity: 0.3 }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                      style={{ color: "#060912", border: `2px solid ${exp.rankColor}`, boxShadow: `0 0 20px ${exp.rankColor}` }}>
                      {exp.rankLabel}
                    </div>
                  </div>
                </div>

                {/* Quest Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[rgba(170,155,220,0.5)] mb-1">
                        {exp.period} · {exp.location}
                      </div>
                      <h3 className="text-2xl font-bold text-heading group-hover:text-accent transition-colors">
                        {exp.questTitle}
                      </h3>
                      <div className="text-accent text-sm mt-1">{exp.role} @ {exp.company}</div>
                    </div>
                  </div>

                  <div className="relative p-8 rounded-3xl border border-[rgba(124,92,252,0.1)] group-hover:border-[rgba(124,92,252,0.3)] transition-all duration-500">
                    <p className="text-[rgba(170,155,220,0.7)] leading-relaxed mb-8 font-light">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md text-[10px] uppercase tracking-wider border border-[rgba(124,92,252,0.1)] text-[rgba(170,155,220,0.5)] group-hover:text-accent group-hover:border-accent/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative vertical line */}
      <motion.div
        initial={{ height: 0 }}
        animate={isInView ? { height: "100%" } : {}}
        className="absolute left-[3.75rem] top-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(124,92,252,0.2)] to-transparent hidden md:block -z-10"
      />
    </section>
  );
}
