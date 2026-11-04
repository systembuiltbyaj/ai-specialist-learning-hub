import type { DictCategory } from "@/data/dictionary";
import type { AcronymCategory } from "@/data/acronyms";
import type { ToolCategory } from "@/app/lib/types";

// Single-colour line glyphs drawn in currentColor, so they sit white on an
// .icon-tile and violet on a muted tile in both themes. No hooks: usable from
// server and client components alike.
const PATHS = {
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  prompt: (
    <>
      <path d="M4 5h16v11H9l-5 4V5Z" />
      <path d="m8 8.5 2 2-2 2M12 12.5h3.5" />
    </>
  ),
  agent: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4m0 0-5.6 6.4M12 11l5.6 6.4" />
    </>
  ),
  sparkle: <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />,
  workflow: (
    <>
      <rect x="3" y="4" width="7" height="5" rx="1.5" />
      <rect x="14" y="15" width="7" height="5" rx="1.5" />
      <path d="M10 6.5h3.5a2 2 0 0 1 2 2V15" />
    </>
  ),
  funnel: <path d="M4 5h16l-6 7.5v5.5l-4 2v-7.5L4 5Z" />,
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v4" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4" width="16" height="7" rx="1.5" />
      <rect x="4" y="13" width="16" height="7" rx="1.5" />
      <path d="M8 7.5h.01M8 16.5h.01" />
    </>
  ),
  chart: <path d="M4 20V11M10 20V5M16 20v-7M3 20h18" />,
  send: <path d="m4 12 16-8-6 16-2.5-6.5L4 12Z" />,
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  table: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M3.5 14.5h17M9.5 9.5v10" />
    </>
  ),
  book: (
    <>
      <path d="M12 5.5C10 4.2 7 3.9 4.5 4.4v13c2.5-.5 5.5-.2 7.5 1.1 2-1.3 5-1.6 7.5-1.1v-13C17 3.9 14 4.2 12 5.5Z" />
      <path d="M12 5.5v13" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 12h.01" />
    </>
  ),
  wrench: <path d="M14.5 4.5a4.5 4.5 0 0 0-4.9 6L4 16.1V20h3.9l5.6-5.6a4.5 4.5 0 0 0 6-4.9l-2.7 2.7-3-.9-.9-3 2.6-2.8Z" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  cross: <path d="M6 6l12 12M18 6 6 18" />,
} as const;

export type GlyphName = keyof typeof PATHS;

export default function Glyph({ name, className = "h-5 w-5" }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

// One glyph per real category. Typed as full records so adding a category to
// the data fails the typecheck here instead of rendering a blank tile.
export const DICT_GLYPH: Record<DictCategory, GlyphName> = {
  "AI Foundations": "chip",
  Prompting: "prompt",
  "Agentic AI": "agent",
  Claude: "sparkle",
  "Automation Platforms": "workflow",
  GoHighLevel: "funnel",
  "Web/Dev": "code",
};

export const ACRONYM_GLYPH: Record<AcronymCategory, GlyphName> = {
  "AI & ML Core": "chip",
  "Models & Training": "layers",
  "Prompting & Techniques": "prompt",
  "Agents & Protocols": "plug",
  "Speech, Vision & Media": "eye",
  "Eval, Safety & Data": "shield",
  "Dev & Infrastructure": "server",
  "Business & Product": "chart",
  "Automation & Comms": "send",
};

export const TOOL_GLYPH: Record<ToolCategory, GlyphName> = {
  "AI Models": "chip",
  "Coding Agents": "code",
  "Agent Platforms": "agent",
  "Automation Platforms": "workflow",
};
