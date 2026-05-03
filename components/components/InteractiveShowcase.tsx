"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const spawnParticle = (): Particle => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0002,
      vy: -Math.random() * 0.0003 - 0.0001,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      life: Math.random(),
    });

    particlesRef.current = Array.from({ length: 60 }, spawnParticle);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Violet mouse glow
      const gx = mouseRef.current.x * w;
      const gy = mouseRef.current.y * h;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, 300);
      grad.addColorStop(0, "rgba(124,92,252,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      particlesRef.current.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.003;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.3) {
          p.vx += dx * 0.00002;
          p.vy += dy * 0.00002;
        }

        if (p.life <= 0 || p.y < -0.05 || p.x < -0.05 || p.x > 1.05) {
          particlesRef.current[i] = spawnParticle();
          return;
        }

        const alpha = Math.min(1, p.life * 3) * p.opacity;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0
          ? `rgba(0,212,255,${alpha * 0.7})`
          : `rgba(124,92,252,${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const words = [
  "Obsessing",
  "Crafting",
  "Building",
  "Designing",
  "Engineering",
  "Innovating",
];

function CyclingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="gradient-text inline-block"
    >
      {words[index]}
    </motion.span>
  );
}

export default function InteractiveShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const featureCards = [
    {
      icon: "⚡",
      title: "Performance",
      desc: "60fps animations, optimized rendering, zero layout shift.",
      accentColor: "rgba(240,192,64,0.85)",
    },
    {
      icon: "✦",
      title: "Aesthetics",
      desc: "Awwwards-level design systems with purposeful motion.",
      accentColor: "rgba(124,92,252,0.85)",
    },
    {
      icon: "∞",
      title: "Interaction",
      desc: "Magnetic, responsive, alive — every element has intention.",
      accentColor: "rgba(0,212,255,0.85)",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      <ParticleCanvas />

      {/* Parallax blobs */}
      <motion.div style={{ y: y1, background: "radial-gradient(ellipse, rgba(124,92,252,0.07) 0%, transparent 70%)" }}
        className="pointer-events-none absolute left-1/4 top-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
      />
      <motion.div style={{ y: y2, background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)" }}
        className="pointer-events-none absolute right-1/4 bottom-1/4 w-[300px] h-[300px] rounded-full blur-[80px]"
      />

      {/* Scrolling marquee banner */}
      <div className="overflow-hidden py-12 mb-20 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#060912] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#060912] to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl font-black tracking-tighter uppercase text-white/[0.03] outline-text"
              style={{ WebkitTextStroke: "1px rgba(124,92,252,0.1)" }}
            >
              React · Next.js · TypeScript · Framer Motion · Canvas · Tailwind ·
              UI Engineering · Interactive Design ·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-accent mb-8 block font-bold">[ Design Philosophy ]</span>
            <h2 className="text-6xl md:text-8xl font-bold text-heading leading-[0.9] mb-10 tracking-tighter">
              Always <CyclingWord /><br />
              on Detail.
            </h2>
            <p className="text-xl text-[rgba(170,155,220,0.5)] font-light max-w-xl mx-auto leading-relaxed">
              Every pixel, every interaction, every animation — crafted with intention.
              Premium frontend engineering for the discerning web.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="relative p-10 rounded-[3rem] border border-[rgba(124,92,252,0.1)] group hover:border-[rgba(124,92,252,0.3)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                style={{ background: `linear-gradient(90deg, transparent, ${item.accentColor}, transparent)` }} />
              
              <div className="text-5xl mb-8 transform group-hover:scale-110 transition-transform duration-500 block">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-heading mb-4 tracking-tight"
                style={{ color: item.accentColor }}>{item.title}</h3>
              <p className="text-sm text-[rgba(170,155,220,0.5)] leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
