"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { clsx } from "clsx";

const navLinks = [
  { label: "About",      href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500",
          scrolled
            ? "border-b border-[rgba(124,92,252,0.14)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">

          {/* Logo — rune monogram */}
          <motion.a
            href="#"
            className="text-sm font-light tracking-[0.35em] uppercase text-[rgba(124,92,252,0.85)] hover:text-[rgba(124,92,252,1)] transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            M A
          </motion.a>

          {/* Center divider */}
          <motion.div
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-3"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-4 h-[1px] bg-[rgba(124,92,252,0.25)]" />
            <div className="w-4 h-[1px] bg-[rgba(124,92,252,0.25)]" />
          </motion.div>

          {/* Desktop links */}
          <motion.ul
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="text-[11px] tracking-[0.2em] uppercase text-[rgba(170,155,220,0.45)] hover:text-[rgba(124,92,252,0.95)] transition-colors duration-300 font-light"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </motion.ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-[rgba(124,92,252,0.7)] origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-5 h-[1px] bg-[rgba(124,92,252,0.7)]"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-5 h-[1px] bg-[rgba(124,92,252,0.7)] origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — dungeon portal */}
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.4 }}
      >
        {navLinks.map((link, i) => (
          <motion.button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            initial={false}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: menuOpen ? i * 0.07 : 0 }}
            className="text-2xl font-extralight tracking-[0.15em] uppercase text-[rgba(170,155,220,0.65)] hover:text-[rgba(124,92,252,0.95)] transition-colors duration-300"
          >
            {link.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
