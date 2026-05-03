"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden"
      style={{ borderTop: "1px solid rgba(124,92,252,0.10)" }}>

      {/* Violet top glow line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,252,0.30), transparent)" }} />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left — branding */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}
          className="flex items-center gap-3">
          <div className="w-5 h-[1px]" style={{ background: "rgba(124,92,252,0.30)" }} />
          <span className="text-xs tracking-[0.2em] uppercase text-[rgba(170,155,220,0.30)]">
            © 2026 Mohammed Arshad P P
          </span>
        </motion.div>

        {/* Center — role */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[10px] tracking-[0.3em] uppercase text-[rgba(124,92,252,0.25)]">
          Front-End &amp; MERN Stack Developer · Kozhikode, Kerala
        </motion.div>

        {/* Right — portfolio link */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3">
          <a href="https://mhd-arshad-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[rgba(124,92,252,0.38)] hover:text-[rgba(124,92,252,0.75)] transition-colors duration-300">
            Portfolio
          </a>
          <div className="w-5 h-[1px]" style={{ background: "rgba(124,92,252,0.30)" }} />
        </motion.div>
      </div>
    </footer>
  );
}
