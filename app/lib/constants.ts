// Static brand + navigation constants used across the app.

// tailwind.config.ts is the single source of truth for the palette. These
// mirror it for the few places that need a raw hex (e.g. the theme-color meta
// tag) — if you change a colour, change it in Tailwind first, then here.
export const BRAND = {
  name: "AJ Learning Hub",
  statement: "I Don't Chase Growth. I Engineer The System Behind It.",
  owner: "Allen Bactad",
  handle: "System-BuiltBy AJ",
  colors: {
    bg: "#08060e", // tailwind `bg`
    accent: "#f6cb1f", // tailwind `gold.DEFAULT`
    violet: "#5e17eb", // tailwind `violet.DEFAULT`
    text: "#f3f1fb", // tailwind `text`
  },
} as const;

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

// Sidebar is organized into groups.
export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Learning Hub",
    items: [
      { label: "Home", href: "/", description: "Overview & stats", icon: "⌁" },
      // No count here on purpose — a hardcoded number goes stale the moment the
      // dictionary grows. The live count renders on the home page from DICTIONARY.
      { label: "Tech Dictionary", href: "/dictionary", description: "AI & automation terms, explained", icon: "▤" },
      { label: "Tools Comparison", href: "/tools", description: "Models, agents & platforms", icon: "▦" },
      { label: "Resources", href: "/resources", description: "Saved learning + progress", icon: "◆" },
      { label: "Claude Hub", href: "/claude-hub", description: "Skills, MCPs & framework", icon: "✦" },
      { label: "GHL Hub", href: "/ghl-hub", description: "Build & learn GoHighLevel", icon: "◑" },
      { label: "AI Automation Hub", href: "/automation-hub", description: "Zapier · Make · n8n", icon: "⚙" },
      { label: "Updates", href: "/updates", description: "Weekly AI news feed", icon: "❯" },
    ],
  },
  {
    title: "Workspace",
    items: [
      { label: "Quiz Mode", href: "/quiz", description: "Auto-built exams from the dictionary", icon: "🧪" },
      { label: "Interview", href: "/interview", description: "Interview questions & answers", icon: "🎤" },
      { label: "Presentation", href: "/presentation", description: "Client pitch & self-pitch scripts", icon: "▶" },
      { label: "Tasks", href: "/tasks", description: "Plan your week", icon: "✓" },
    ],
  },
  {
    title: "Reference",
    items: [
      { label: "Acronym Decoder", href: "/acronyms", description: "Every AI acronym in plain English", icon: "🔤" },
      { label: "Dev Tools Universe", href: "/dev-tools", description: "Editors · LLMs · domains · stack", icon: "✸" },
      { label: "Web Dev Guide", href: "/web-guide", description: "HTML→AI stacks, from zero", icon: "⌘" },
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
