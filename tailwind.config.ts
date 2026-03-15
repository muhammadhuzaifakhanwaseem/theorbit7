import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mint: {
          50: "#f0fdf6",
          100: "#dcfce9",
          200: "#bbf7d4",
          300: "#90edb8",
          400: "#4ade87",
          500: "#22c55e",
          DEFAULT: "#A8EBC7",
          light: "#C6F4DA",
          pale: "#E6FAF0",
        },
        forest: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#0a2e1a",
          DEFAULT: "#1A3D2B",
          dark: "#112618",
          mid: "#1F4A34",
          deep: "#0D1F15",
        },
      },
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-left": "slideLeft 0.8s ease forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        orbit: "orbit 20s linear infinite",
        "orbit-reverse": "orbit 30s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(rgba(168,235,199,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(168,235,199,0.05) 1px, transparent 1px)",
        "radial-mint": "radial-gradient(ellipse at center, rgba(168,235,199,0.15) 0%, transparent 70%)",
        "hero-gradient": "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(168,235,199,0.3) 0%, rgba(13,31,21,0) 60%)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      boxShadow: {
        "mint-glow": "0 0 40px rgba(168,235,199,0.2)",
        "mint-glow-lg": "0 0 80px rgba(168,235,199,0.25)",
        "card": "0 1px 0 rgba(168,235,199,0.08), 0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 1px 0 rgba(168,235,199,0.15), 0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,235,199,0.1)",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
export default config;
