import type { Level } from "@/app/lib/content/types";

// One glyph per difficulty, shared by the learning paths and the project library
// so a level reads the same everywhere: a sprout, a bolt, a crown.
const PATHS: Record<Level, React.ReactNode> = {
  Beginner: (
    <>
      <path d="M12 20v-7" />
      <path d="M12 13c0-4 3-7 8-7 0 4-3 7-8 7Z" />
      <path d="M12 15c0-3-2.5-5.5-7-5.5 0 3 2.5 5.5 7 5.5Z" />
    </>
  ),
  Intermediate: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  Advanced: (
    <>
      <path d="m3 7 4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7Z" />
      <path d="M5 21h14" />
    </>
  ),
};

export default function LevelIcon({ level, className = "h-5 w-5" }: { level: Level; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[level]}
    </svg>
  );
}
