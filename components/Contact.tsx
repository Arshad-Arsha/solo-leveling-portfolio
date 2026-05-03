"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Globe, Github, ArrowUpRight } from "lucide-react";

const links = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Mail Box",
    value: "mohammedarshadpp123@gmail.com",
    href: "mailto:mohammedarshadpp123@gmail.com",
    color: "#7c5cfc",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "Network Hub",
    value: "linkedin.com/in/arshad",
    href: "https://www.linkedin.com/in/mohammed-arshad-p-p-349681246/",
    color: "#00d4ff",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "Source Vault",
    value: "github.com/mohammedarshad",
    href: "https://github.com/",
    color: "#ffffff",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} id="contact"
      className="relative py-32 md:py-64 px-6 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* System Modal Design */}
          <div className="absolute -inset-2 bg-accent/20 blur-2xl opacity-20" />
          <div className="relative border-2 border-accent/20 p-12 md:p-20 rounded-[4rem] text-center overflow-hidden">
            
            {/* Header Accent */}
            <div className="absolute top-0 left-0 w-full h-12 bg-accent/5 flex items-center justify-center border-b border-accent/10">
               <span className="text-[10px] font-black uppercase tracking-[1em] text-accent/40">New Message Request</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <h2 className="text-4xl md:text-6xl font-black text-heading mb-8 tracking-tighter leading-tight">
                Invite <span className="text-accent underline underline-offset-8 decoration-accent/30">Mohammed</span><br />
                to your party?
              </h2>
              
              <p className="text-[rgba(170,155,220,0.6)] text-lg font-light mb-16 max-w-lg mx-auto">
                Currently open for legendary difficulty quests (high-end frontend roles) and creative guild collaborations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                 {links.map((link, i) => (
                   <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-white/5 hover:bg-white/10 hover:border-accent/30 transition-all group"
                   >
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ color: link.color }}>
                       {link.icon}
                     </div>
                     <div className="text-center">
                       <div className="text-[9px] uppercase tracking-widest text-accent/50 mb-1">{link.label}</div>
                       <div className="text-[11px] text-white/40 truncate w-24 group-hover:text-white transition-colors">Arshad Connect</div>
                     </div>
                   </motion.a>
                 ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <motion.a
                  href="mailto:mohammedarshadpp123@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 rounded-full bg-accent text-black font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-[0_0_30px_rgba(124,92,252,0.4)]"
                 >
                   Accept Request <ArrowUpRight className="w-4 h-4" />
                 </motion.a>
                 
                 <motion.a
                  href="https://mhd-arshad-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  className="px-10 py-5 rounded-full border-2 border-white/10 text-white/60 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                 >
                   View Logs
                 </motion.a>
              </div>
            </motion.div>

            {/* Background elements */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/5 blur-3xl rounded-full" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/5 blur-3xl rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
