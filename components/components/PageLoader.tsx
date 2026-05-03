"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [phase, setPhase] = useState<"spinning" | "typing" | "done">("spinning");
  const [typed, setTyped] = useState("");
  const subtitle = "Front-End Developer";

  useEffect(() => {
    // Phase 1 — spin letters in (1.2s)
    const t1 = setTimeout(() => setPhase("typing"), 1200);

    return () => clearTimeout(t1);
  }, []);

  // Phase 2 — typewriter for subtitle
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(subtitle.slice(0, i));
      if (i >= subtitle.length) {
        clearInterval(interval);
        // Phase 3 — exit after subtitle finishes
        setTimeout(() => setPhase("done"), 900);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505]"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient ring */}
          <motion.div
            className="absolute w-[320px] h-[320px] rounded-full border border-white/[0.05]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[220px] h-[220px] rounded-full border border-white/[0.08]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: -360 }}
            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          />

          {/* M — spins in from left */}
          <div className="flex items-end gap-4 mb-6">
            <motion.span
              className="text-[clamp(4rem,12vw,8rem)] font-extralight tracking-[0.15em] text-white/90 leading-none"
              initial={{ opacity: 0, rotateY: -180, x: -60 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ perspective: 800 }}
            >
              M
            </motion.span>

            {/* divider dot */}
            <motion.span
              className="text-white/20 text-2xl mb-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.85 }}
            >
              ·
            </motion.span>

            {/* A — spins in from right */}
            <motion.span
              className="text-[clamp(4rem,12vw,8rem)] font-extralight tracking-[0.15em] text-white/90 leading-none"
              initial={{ opacity: 0, rotateY: 180, x: 60 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{ perspective: 800 }}
            >
              A
            </motion.span>
          </div>

          {/* Typewriter subtitle */}
          <motion.div
            className="h-5 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "typing" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[11px] tracking-[0.35em] uppercase text-white/35 font-light">
              {typed}
              <span
                style={{
                  display: "inline-block",
                  width: "1px",
                  height: "0.9em",
                  background: "rgba(255,255,255,0.4)",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                  animation: "tw-blink 1s step-start infinite",
                }}
              />
            </span>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-white/[0.08] overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-white/40 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.0, ease: "easeInOut", delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
