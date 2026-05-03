"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import TypeWriter from "@/components/TypeWriter";

const TOTAL_FRAMES = 80;
const getFramePath = (i: number) =>
  `/video-split/ffout${String(i + 1).padStart(3, "0")}.gif`;

function HeroText({
  children, visible, position = "center", delay = 0, sub,
}: {
  children: React.ReactNode; visible: boolean;
  position?: "left" | "right" | "center"; delay?: number; sub?: string;
}) {
  const pos = position === "left" ? "items-start text-left pl-8 md:pl-20"
    : position === "right" ? "items-end text-right pr-8 md:pr-20"
    : "items-center text-center";
  return (
    <motion.div
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none z-10 ${pos}`}
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(8px)" }}
      transition={{ duration: 1.1, delay: visible ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {sub && <span className="hero-label mb-3 block">{sub}</span>}
      <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-extralight tracking-[-0.04em] text-heading leading-none">
        {children}
      </h2>
    </motion.div>
  );
}

export default function FaceScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number>(0);
  const displayFrameRef = useRef(0);
  const progressRef = useRef(0);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }[]>([]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeText, setActiveText] = useState<"hero" | "precision" | "titanium" | "hear">("hero");
  const [showHero, setShowHero] = useState(true);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const imgs = new Array<HTMLImageElement>(TOTAL_FRAMES);
    imagesRef.current = imgs;
    const done = () => {
      loaded++;
      setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === TOTAL_FRAMES) setIsLoaded(true);
    };
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = done; img.onerror = done;
      imgs[i] = img;
    }
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002, vy: (Math.random() - 0.5) * 0.0002,
      size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.2 + 0.04,
    }));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const drawFrame = useCallback((fi: number, ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const p = progressRef.current;
    ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, w, h);

    // Scroll-driven glow
    const gs = Math.min(w, h) * (0.5 + p * 0.35);
    const wa = Math.max(0, Math.sin(p * Math.PI)) * 0.07;
    const ca = Math.max(0, (p - 0.75) / 0.25) * 0.06;
    const wg = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, gs);
    wg.addColorStop(0, `rgba(55,38,18,${wa})`); wg.addColorStop(1, "transparent");
    ctx.fillStyle = wg; ctx.fillRect(0, 0, w, h);
    const cg = ctx.createRadialGradient(w/2, h*0.65, 0, w/2, h*0.65, gs*0.85);
    cg.addColorStop(0, `rgba(18,28,58,${ca})`); cg.addColorStop(1, "transparent");
    ctx.fillStyle = cg; ctx.fillRect(0, 0, w, h);

    // Frame image — cover
    const img = imagesRef.current[fi];
    if (img?.complete && img.naturalWidth > 0) {
      const sc = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      ctx.drawImage(img, (w - img.naturalWidth * sc) / 2, (h - img.naturalHeight * sc) / 2, img.naturalWidth * sc, img.naturalHeight * sc);
    }

    // Particles
    particlesRef.current.forEach(pt => {
      pt.x += pt.vx; pt.y += pt.vy;
      if (pt.x < 0) pt.x = 1; if (pt.x > 1) pt.x = 0;
      if (pt.y < 0) pt.y = 1; if (pt.y > 1) pt.y = 0;
      ctx.beginPath(); ctx.arc(pt.x * w, pt.y * h, pt.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${pt.opacity})`; ctx.fill();
    });

    // Vignette
    const vig = ctx.createRadialGradient(w/2, h/2, h*0.15, w/2, h/2, h*0.95);
    vig.addColorStop(0, "transparent"); vig.addColorStop(0.65, "rgba(5,5,5,0.15)"); vig.addColorStop(1, "rgba(5,5,5,0.85)");
    ctx.fillStyle = vig; ctx.fillRect(0, 0, w, h);

    // Top/bottom bars
    const tb = ctx.createLinearGradient(0, 0, 0, h * 0.18);
    tb.addColorStop(0, "rgba(5,5,5,0.92)"); tb.addColorStop(1, "transparent");
    ctx.fillStyle = tb; ctx.fillRect(0, 0, w, h * 0.18);
    const bb = ctx.createLinearGradient(0, h * 0.82, 0, h);
    bb.addColorStop(0, "transparent"); bb.addColorStop(1, "rgba(5,5,5,0.92)");
    ctx.fillStyle = bb; ctx.fillRect(0, h * 0.82, w, h * 0.18);
  }, []);

  // rAF loop — fixed canvas, maps to TOTAL page scroll
  useEffect(() => {
    if (!isLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    let lastText = "hero";

    const loop = () => {
      // Map total page scroll → frames (0 = top, 1 = very bottom)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      // Animation plays over the first 60% of total page scroll
      // Animation plays across the FULL page scroll — start to very end
      const v = maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0;
      progressRef.current = v;
      const target = v * (TOTAL_FRAMES - 1);
      displayFrameRef.current += (target - displayFrameRef.current) * 0.10;

      const fi = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(displayFrameRef.current)));
      drawFrame(fi, ctx, canvas.width, canvas.height);

      // Show/hide hero text overlays (only visible in top ~30vh of scroll)
      const heroVisible = window.scrollY < window.innerHeight * 0.8;
      setShowHero(heroVisible);

      // Text state (based on v within the animation zone)
      const next: "hero" | "precision" | "titanium" | "hear" =
        v < 0.08 ? "hero" : v < 0.45 ? "precision" : v < 0.75 ? "titanium" : "hear";
      if (next !== lastText) { lastText = next; setActiveText(next); }

      rafRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(rafRef.current); };
  }, [isLoaded, drawFrame]);

  return (
    <>
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]">
          <p className="mb-6 text-[10px] tracking-[0.35em] uppercase text-white/30">Loading Experience</p>
          <div className="h-[1px] w-48 rounded-full overflow-hidden bg-white/[0.08]">
            <div className="h-full rounded-full bg-white/60 transition-all duration-200" style={{ width: `${loadProgress}%` }} />
          </div>
          <p className="mt-4 text-[10px] tracking-widest text-white/20">{loadProgress}%</p>
        </div>
      )}

      {/* Fixed canvas — always behind everything, covers full viewport */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" style={{ zIndex: 0 }} />

      {/* Hero text overlays — fixed, only visible near top of page */}
      {showHero && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="w-5 h-[1px] bg-white/25" />
            {/* <span className="hero-label tracking-[0.3em]">M A — Mohammed Arshad</span> */}
            <div className="w-5 h-[1px] bg-white/25" />
          </div>

          {/* <HeroText visible={activeText === "hero"} position="center">
            <span className="gradient-text tracking-[0.25em]">
              <TypeWriter text="M A" immediate cursor />
            </span><br />
            <span className="text-[clamp(1rem,2.5vw,1.8rem)] font-light tracking-[0.35em] text-white/40 mt-3 block">
              <TypeWriter text="Mohammed Arshad" immediate cursor={false} />
            </span>
          </HeroText> */}

          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ opacity: activeText === "hero" ? 1 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-label">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/35 to-transparent animate-pulse" />
          </motion.div>
        </div>
      )}

      {/* Spacer — pushes page content down so first screen is just the animation */}
      <div style={{ height: "100vh" }} />
    </>
  );
}
