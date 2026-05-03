"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";

function useCounter(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const inc = target / (duration / 16);
    const timer = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

function StatCard({ value, suffix, label, isVisible, index }: {
  value: number; suffix: string; label: string; isVisible: boolean; index: number;
}) {
  const count = useCounter(value, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="relative p-4 border-l-2 border-[rgba(124,92,252,0.3)]"
    >
      <div className="text-2xl font-bold text-heading">
        {count}<span className="text-accent text-lg ml-1">{suffix}</span>
      </div>
      <div className="text-[10px] tracking-widest uppercase text-[rgba(170,155,220,0.5)]">{label}</div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-12%" });

  return (
    <section ref={sectionRef} id="about"
      className="relative py-32 md:py-48 px-6 overflow-hidden"
      style={{ position: "relative", zIndex: 10 }}
    >
      {/* HUD line accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(124,92,252,0.2)] to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Status Window - Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3"
          >
            <div className="relative p-1 bg-gradient-to-br from-[rgba(124,92,252,0.5)] to-transparent rounded-tr-[4rem]">
              <div className="p-10 rounded-tr-[4rem] border border-[rgba(124,92,252,0.2)]">
                <div className="w-24 h-24 rounded-2xl border border-[rgba(124,92,252,0.3)] flex items-center justify-center mb-8 relative group">
                  <span className="text-4xl font-bold text-accent group-hover:scale-110 transition-transform">MA</span>
                  <div className="absolute -inset-2 border border-[rgba(124,92,252,0.2)] rounded-2xl -z-10 group-hover:rotate-6 transition-transform" />
                </div>
                
                <div className="mb-8">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Rank: S-Tier Developer</div>
                  <h3 className="text-2xl font-bold text-heading">Mohammed Arshad</h3>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-4 h-1 bg-accent rounded-full" />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-[rgba(170,155,220,0.5)] uppercase tracking-widest">Strength</span>
                    <span className="text-accent">React / Next.js</span>
                  </div>
                  <div className="h-1 w-full bg-[rgba(124,92,252,0.1)] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={isInView ? { width: "95%" } : {}} className="h-full bg-accent" />
                  </div>
                  
                  <div className="flex justify-between text-xs pt-2">
                    <span className="text-[rgba(170,155,220,0.5)] uppercase tracking-widest">Agility</span>
                    <span className="text-[rgba(0,212,255,1)]">Framer Motion</span>
                  </div>
                  <div className="h-1 w-full bg-[rgba(0,212,255,0.1)] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={isInView ? { width: "90%" } : {}} className="h-full bg-[rgba(0,212,255,1)]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Description & Stats */}
          <div className="flex-1">
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent mb-6 block font-bold">[ System Notification ]</span>
              <h2 className="text-5xl md:text-7xl font-bold text-heading mb-10 leading-tight">
                Infinite <span className="gradient-text">Growth</span><br />
                Constant Detail.
              </h2>
              
              <p className="text-lg text-[rgba(170,155,220,0.8)] leading-relaxed mb-12 max-w-2xl font-light">
                Results-driven Front-End Developer with <span className="text-accent font-bold">3+ years</span> of experience. 
                Like a player in a dungeon, I constantly level up my skills in React.js and UI optimization. 
                My quest is to build the most <span className="italic text-white">immersive and high-performance</span> web experiences.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
                <StatCard value={3}   suffix="+"    label="Level (Years)"  isVisible={isInView} index={0} />
                <StatCard value={10}  suffix="K"    label="Daily Quest Score" isVisible={isInView} index={1} />
                <StatCard value={20}  suffix="+"    label="Boss Projects"    isVisible={isInView} index={2} />
              </div>

              <div className="flex flex-wrap gap-4">
                 <div className="px-6 py-3 border border-[rgba(124,92,252,0.3)] rounded-full text-xs uppercase tracking-widest text-accent flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Status: Active & Searching
                 </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
