import type { Config } from "tailwindcss";

// Every colour is a CSS variable (RGB channels) defined per theme in
// app/globals.css, so one class name — `text-gold`, `bg-surface` — renders
// correctly in both the light "lavender glass" and dark "midnight glass" themes.
// Change a colour in globals.css, not here.
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: token("bg"),
        surface: {
          DEFAULT: token("surface"),
          2: token("surface-2"),
        },
        line: token("line"),
        muted: token("muted"),
        text: token("text"),
        // Highlight text. Deepened in the light theme so it stays readable on white.
        gold: {
          DEFAULT: token("gold"),
          soft: token("gold-soft"),
          dim: token("gold-dim"),
          // Bright brand gold for fills (buttons, stars), always paired with `onaccent` text.
          fill: token("gold-fill"),
        },
        violet: {
          DEFAULT: token("violet"),
          soft: token("violet-soft"),
          light: token("violet-light"),
        },
        neon: {
          teal: token("gold"),
          pink: token("pink"),
          yellow: token("yellow"),
          blue: token("blue"),
          purple: token("violet-soft"),
          orange: token("orange"),
        },
        success: token("success"),
        danger: token("danger"),
        // Text that sits on a bright gold fill — dark ink in both themes.
        onaccent: token("onaccent"),
        // Legacy surface aliases.
        navy: {
          DEFAULT: token("bg"),
          deep: token("bg"),
          panel: token("surface"),
          card: token("surface"),
          border: token("line"),
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-gold": "var(--shadow-glow-gold)",
        card: "var(--shadow-card)",
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
