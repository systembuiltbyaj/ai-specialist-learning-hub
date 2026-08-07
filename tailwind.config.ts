import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (from workwithaj.ajautomate.co) ──
        bg: "#08060e",
        surface: {
          DEFAULT: "#13102a",
          2: "#1b1640",
        },
        line: "#2a2250",
        muted: "#9b93be",
        text: "#f3f1fb",
        // Brand gold
        gold: {
          DEFAULT: "#f6cb1f",
          soft: "#ffe066",
          dim: "#d4a800",
        },
        // Brand violet
        violet: {
          DEFAULT: "#5e17eb",
          soft: "#7c5cfc",
          light: "#ac4bff",
        },
        // Accent palette for reference cards (harmonized to brand).
        neon: {
          teal: "#f6cb1f", // aliased to gold so primary chrome reads brand-gold
          pink: "#ff6ba3",
          yellow: "#ffd95e",
          blue: "#4d9fff",
          purple: "#7c5cfc",
          orange: "#ff9c6e",
        },
        // Legacy surface aliases.
        navy: {
          DEFAULT: "#08060e",
          deep: "#08060e",
          panel: "#13102a",
          card: "#13102a",
          border: "#2a2250",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(94,23,235,0.20)",
        "glow-gold": "0 0 36px rgba(246,203,31,0.18)",
        card: "0 10px 40px rgba(0,0,0,0.5)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        float: "float 5s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
