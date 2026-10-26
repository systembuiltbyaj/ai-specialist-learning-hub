// Static brand + navigation constants used across the app.

// app/globals.css (the --c-* variables) is the single source of truth for the
// palette. These mirror it for the few places that need a raw hex (e.g. the
// theme-color meta tag) — if you change a colour, change it there first, then here.
export const BRAND = {
  name: "SystemLab by AJ",
  shortName: "SystemLab",
  tagline: "Learn AI & automation by building real systems",
  statement: "I Don't Chase Growth. I Engineer The System Behind It.",
  owner: "Allen Bactad",
  handle: "System-BuiltBy AJ",
  colors: {
    bg: "#f4f1fc", // --c-bg, light theme
    bgDark: "#0b081a", // --c-bg, dark theme
    accent: "#f6cb1f", // --c-gold-fill
    violet: "#5e17eb", // --c-violet
  },
} as const;

// Shared by the pre-paint script in app/layout.tsx and ThemeToggle — one key, two readers.
export const THEME_STORAGE_KEY = "lh.theme.v1";

export interface NavItem {
  label: string;
  href: string;
  description: string;
  icon: string; // emoji glyph — lightweight, no icon dependency
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

// Sidebar is organized into groups: learn first, then look things up, then the hubs.
export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Learn",
    items: [
      { label: "Home", href: "/", description: "Overview & where to start", icon: "⌁" },
      { label: "Learning Paths", href: "/learn", description: "Beginner → advanced lessons", icon: "🎓" },
      { label: "Projects", href: "/projects", description: "Hands-on builds, step by step", icon: "🛠" },
      { label: "Flashcards", href: "/flashcards", description: "Spaced review of every term", icon: "🃏" },
      { label: "Quiz Mode", href: "/quiz", description: "Practice or exam on any subject", icon: "🧪" },
      { label: "My Progress", href: "/me", description: "Streak, bookmarks & weak spots", icon: "📈" },
    ],
  },
  {
    title: "Reference",
    items: [
      // No count here on purpose — a hardcoded number goes stale the moment the
      // dictionary grows. The live count renders on the home page from DICTIONARY.
      { label: "Tech Dictionary", href: "/dictionary", description: "AI & automation terms, explained", icon: "▤" },
      { label: "Acronym Decoder", href: "/acronyms", description: "Every AI acronym in plain English", icon: "🔤" },
      { label: "Tools Comparison", href: "/tools", description: "Models, agents & platforms", icon: "▦" },
      { label: "Dev Tools Universe", href: "/dev-tools", description: "Editors · LLMs · domains · stack", icon: "✸" },
      { label: "Web Dev Guide", href: "/web-guide", description: "HTML→AI stacks, from zero", icon: "⌘" },
    ],
  },
  {
    title: "Hubs",
    items: [
      { label: "Claude Hub", href: "/claude-hub", description: "Skills, MCPs & framework", icon: "✦" },
      { label: "GHL Hub", href: "/ghl-hub", description: "Build & learn GoHighLevel", icon: "◑" },
      { label: "AI Automation Hub", href: "/automation-hub", description: "Zapier · Make · n8n", icon: "⚙" },
      { label: "Updates", href: "/updates", description: "AI news archive", icon: "❯" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Interview", href: "/interview", description: "Prep, practice & discovery playbook", icon: "🎤" },
      { label: "Tasks", href: "/tasks", description: "Move cards across the board", icon: "✓" },
      { label: "Resources", href: "/resources", description: "Saved links & study hours", icon: "◆" },
    ],
  },
];

// Flat list (used by Home module grid + Footer).
export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export const TERM_CATEGORIES = [
  "All",
  "Concepts",
  "Tools",
  "GHL-Specific",
  "Automation",
] as const;

export const TOOL_CATEGORIES = [
  "AI Models",
  "Coding Agents",
  "Agent Platforms",
  "Automation Platforms",
] as const;

export const RESOURCE_CATEGORIES = [
  "All",
  "Jobpost",
  "GHL",
  "Claude",
  "AI Automation",
] as const;
