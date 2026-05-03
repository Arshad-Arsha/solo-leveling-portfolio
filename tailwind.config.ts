import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        bg:      "#060912",
        surface: "#0c1020",
        accent:  "#7c5cfc",   /* electric violet */
        accent2: "#00d4ff",   /* cyber cyan */
        gold:    "#f0c040",   /* hunter gold */
      },
      animation: {
        "spin-slow":  "spin 8s linear infinite",
        float:        "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "rune-pulse": "runePulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%":       { opacity: "1" },
        },
        runePulse: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(124,92,252,0.3)" },
          "50%":       { boxShadow: "0 0 24px rgba(124,92,252,0.7)" },
        },
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "violet-gradient":
          "linear-gradient(135deg, #7c5cfc 0%, #00d4ff 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
