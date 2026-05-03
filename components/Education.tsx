"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";

const education = [
  {
    period: "2019 — 2022",
    degree: "Bachelor of Computer Application",
    short: "BCA",
    institution: "ISBM University",
    description: "Completed Bachelor of Computer Application with a focus on web technologies, software development, database management, and computer science fundamentals.",
    tags: ["Computer Science", "Web Dev", "DBMS"],
    rarity: "Unique Grade",
  },
];

const languages = [
  { name: "Malayalam", level: "Native",   pct: 100, color: "rgba(124,92,252,1)" },
  { name: "English",   level: "Fluent",   pct: 90,  color: "rgba(0,212,255,1)" },
  { name: "Hindi",     level: "Proficient", pct: 65,  color: "rgba(240,192,64,1)" },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Left: Achievements/Education */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="mb-16"
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent mb-4 block font-bold">[ Achievements: Education ]</span>
              <h2 className="text-5xl md:text-6xl font-bold text-heading tracking-tight">
                Academic <span className="gradient-text">Records</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <div className="relative p-10 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-10 items-center">
                    
                    {/* Medal Icon */}
                    <div className="w-24 h-24 rounded-full border-4 border-[rgba(124,92,252,0.2)] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                       <span className="text-3xl font-black text-accent">{edu.short}</span>
                       <div className="absolute bottom-1 w-full text-[8px] text-center font-bold text-accent uppercase tracking-tighter">Graduated</div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                       <div className="text-accent text-xs font-bold mb-2 uppercase tracking-widest">{edu.rarity}</div>
                       <h3 className="text-2xl font-bold text-heading mb-2">{edu.degree}</h3>
                       <div className="text-[rgba(170,155,220,0.5)] text-sm mb-4">{edu.institution} · {edu.period}</div>
                       <p className="text-sm text-[rgba(170,155,220,0.4)] leading-relaxed font-light">
                         {edu.description}
                       </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Language Proficiency */}
          <div className="lg:w-1/3">
             <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="p-10 rounded-[3rem] border border-[rgba(124,92,252,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-accent/20" />
              <h3 className="text-xl font-bold text-heading mb-10 tracking-tight">Passive Skills: Languages</h3>
              
              <div className="space-y-12">
                {languages.map((lang, i) => (
                  <div key={i} className="relative">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1">{lang.name}</div>
                        <div className="text-[10px] text-[rgba(170,155,220,0.5)]">{lang.level}</div>
                      </div>
                      <div className="text-lg font-bold text-heading">{lang.pct}%</div>
                    </div>
                    
                    {/* Circle skill indicators */}
                    <div className="flex gap-2">
                       {Array.from({ length: 10 }).map((_, idx) => (
                         <motion.div 
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{ delay: 0.5 + i * 0.1 + idx * 0.05 }}
                          className="w-full h-2 rounded-full transition-colors duration-500"
                          style={{ 
                            background: idx < lang.pct / 10 ? lang.color : "rgba(255,255,255,0.05)",
                            boxShadow: idx < lang.pct / 10 ? `0 0 10px ${lang.color}` : "none"
                          }}
                         />
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
