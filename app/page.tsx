"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Dynamically import the heavy canvas hero (no SSR)
const FaceScroll = dynamic(() => import("@/components/FaceScroll"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#060912] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] animate-pulse" />
      
      <div className="relative mb-12 flex items-center justify-center">
        {/* Summoning Portal Background (My Addition Idea) */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: 360,
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-80 h-80 bg-[radial-gradient(circle,rgba(124,92,252,0.3)_0%,transparent_70%)] blur-3xl rounded-full"
        />

        {/* Concentric Rotating Rings (My Addition Idea) */}
        <motion.div 
          animate={{ rotate: 360, borderColor: ["#7c5cfc", "#00d4ff", "#7c5cfc"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute w-48 h-48 border-[3px] border-dashed rounded-full opacity-20"
        />
        <motion.div 
          animate={{ rotate: -360, borderColor: ["#00d4ff", "#f0c040", "#00d4ff"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 border-2 border-dotted rounded-full opacity-10"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-64 h-64 border border-accent/20 rounded-full"
        />

        <div className="flex gap-4 relative z-10">
          <motion.span 
            initial={{ opacity: 0, x: -30, filter: "blur(15px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-accent to-accent2 drop-shadow-[0_0_20px_rgba(124,92,252,0.6)]"
          >
            M
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 30, filter: "blur(15px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-accent2 to-gold drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]"
          >
            A
          </motion.span>

          {/* Logo Scanline (My Addition Idea) */}
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 w-full h-1 bg-white/20 blur-sm pointer-events-none"
          />
        </div>
      </div>

      <div className="text-[10px] tracking-[0.5em] uppercase text-accent font-bold animate-pulse relative z-10">
        Initializing System
      </div>
      <div className="mt-4 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative z-10">
        <motion.div 
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative bg-[#060912] overflow-x-hidden">
      <Navbar />

      {/* 1. Hero scrollytelling — 400vh canvas sequence */}
      <FaceScroll />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 2. About */}
      <About />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 3. Experience */}
      <Experience />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 4. Education */}
      <Education />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 4. Skills */}
      <Skills />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 5. Projects */}
      <Projects />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 6. Interactive Showcase */}
      <InteractiveShowcase />

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* 7. Contact */}
      <Contact />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
