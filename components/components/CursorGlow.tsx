"use client";

import { useEffect, useRef, useState } from "react";

// Colours cycle as mouse dwells — gold leads to match text palette
const GLOW_COLORS = [
  "rgba(212,175,55,0.22)",   // 🟡 golden  (default)
  "rgba(245,226,122,0.18)",  // 🟡 light gold
  "rgba(220,38,38,0.16)",    // 🔴 red
  "rgba(34,197,94,0.15)",    // 🟢 green
  "rgba(244,63,94,0.16)",    // 🌹 rose
];

export default function CursorGlow() {
  const glowRef  = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -500, y: -500 });
  const rafRef   = useRef<number>(0);
  const colorIdx = useRef(0);
  const colorTimer = useRef<NodeJS.Timeout | null>(null);
  const [color, setColor] = useState(GLOW_COLORS[0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    // Cycle colour every 2.5s for ambient variety
    colorTimer.current = setInterval(() => {
      colorIdx.current = (colorIdx.current + 1) % GLOW_COLORS.length;
      setColor(GLOW_COLORS[colorIdx.current]);
    }, 2500);

    // Smooth follow via lerp in rAF
    let cx = -500, cy = -500;
    let tx = -500, ty = -500;

    const loop = () => {
      const { x, y } = mouseRef.current;
      tx = x; ty = y;

      // Large glow — slow lerp (laggy, dreamy)
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      }

      // Small sharp trail — fast lerp
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${tx - 12}px, ${ty - 12}px)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      if (colorTimer.current) clearInterval(colorTimer.current);
    };
  }, []);

  return (
    <>
      {/* Large ambient glow — follows mouse with lag */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[5]"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            transition: "background 1.8s ease",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Small sharp dot — follows mouse instantly */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[5]"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color.replace(/[\d.]+\)$/, "0.55)")} 0%, transparent 100%)`,
            transition: "background 1.8s ease",
            filter: "blur(4px)",
          }}
        />
      </div>
    </>
  );
}
