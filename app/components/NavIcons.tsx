// Colorful gradient SVG icons, one per nav route.
// No hooks → safe in both server and client components.
// Stroke uses a per-icon linear gradient (gold/violet/accent) so each icon
// reads as colorful rather than a flat glyph.

type IconDef = {
  from: string;
  to: string;
  body: React.ReactNode;
};

const G = "#f6cb1f"; // gold
const V = "#5e17eb"; // violet
const VL = "#7c5cfc"; // violet light
const P = "#ff6ba3"; // pink
const B = "#4d9fff"; // blue
const O = "#ff9c6e"; // orange
const Y = "#ffd95e"; // yellow

const ICONS: Record<string, IconDef> = {
  "/": {
    from: G,
    to: V,
    body: (
      <>
        <path d="M3 10.8 12 3l9 7.8" />
        <path d="M5.5 9.5V20h13V9.5" />
        <path d="M10 20v-5h4v5" />
      </>
    ),
  },
  "/dictionary": {
    from: VL,
    to: P,
    body: (
      <>
        <path d="M12 5.5C10 4.2 7 3.9 4.5 4.4v13c2.5-.5 5.5-.2 7.5 1.1 2-1.3 5-1.6 7.5-1.1v-13C17 3.9 14 4.2 12 5.5Z" />
        <path d="M12 5.5v13" />
      </>
    ),
  },
  "/tools": {
    from: G,
    to: B,
    body: (
      <>
        <line x1="4" y1="8" x2="20" y2="8" />
        <circle cx="9" cy="8" r="2.2" />
        <line x1="4" y1="16" x2="20" y2="16" />
        <circle cx="15" cy="16" r="2.2" />
      </>
    ),
  },
  "/resources": {
    from: P,
    to: V,
    body: <path d="M6 3.5h12v17l-6-4.2-6 4.2v-17Z" />,
  },
  "/ghl-hub": {
    from: G,
    to: P,
    body: (
      <>
        <path d="M3 4.5h18l-7 8.5v6l-4 2v-8z" />
      </>
    ),
  },
  "/automation-hub": {
    from: B,
    to: V,
    body: (
      <>
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="18" cy="12" r="2.2" />
        <circle cx="6" cy="18" r="2.2" />
        <path d="M8.2 6H14a2 2 0 0 1 2 2v1.8" />
        <path d="M15.8 12H10a2 2 0 0 0-2 2v1.8" />
      </>
    ),
  },
  "/claude-hub": {
    from: G,
    to: V,
    body: (
      <path d="M12 2.5c.7 4.8 3 7.1 7.8 7.8-4.8.7-7.1 3-7.8 7.8-.7-4.8-3-7.1-7.8-7.8C9 9.6 11.3 7.3 12 2.5Z" />
    ),
  },
  "/updates": {
    from: O,
    to: G,
    body: (
      <>
        <path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 2 5.5 2 5.5H4s2-1 2-5.5Z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </>
    ),
  },
  "/acronyms": {
    from: B,
    to: P,
    body: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
        <path d="M7 14.5l2-5 2 5" />
        <path d="M7.6 13h2.8" />
        <path d="M14 9.5v5h2.5a1.6 1.6 0 0 0 0-3.2H14" />
      </>
    ),
  },
  "/quiz": {
    from: G,
    to: B,
    body: (
      <>
        <path d="M5 4.5h14v15H5z" />
        <path d="M8.5 9h7" />
        <path d="M8.5 12.5h7" />
        <path d="M8.5 16h4" />
        <circle cx="17" cy="6.5" r="3.5" fill="none" />
        <path d="M15.7 6.4l1 1 1.6-1.9" />
      </>
    ),
  },
  "/interview": {
    from: V,
    to: P,
    body: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M6 11a6 6 0 0 0 12 0" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <line x1="8.5" y1="21" x2="15.5" y2="21" />
      </>
    ),
  },
  "/tasks": {
    from: G,
    to: V,
    body: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M8.5 9l2 2 3.5-3.5" />
        <line x1="8.5" y1="15" x2="15.5" y2="15" />
      </>
    ),
  },
  "/presentation": {
    from: P,
    to: V,
    body: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M12 16v3" />
        <path d="M9 21h6" />
        <path d="M10 8.5l4 2.5-4 2.5z" />
      </>
    ),
  },
  "/dev-tools": {
    from: B,
    to: V,
    body: (
      <>
        <circle cx="12" cy="12" r="2.4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </>
    ),
  },
  "/web-guide": {
    from: Y,
    to: B,
    body: (
      <>
        <path d="M8 7 3 12l5 5" />
        <path d="M16 7l5 5-5 5" />
        <line x1="13.5" y1="5" x2="10.5" y2="19" />
      </>
    ),
  },
};

export default function NavIcon({
  href,
  className = "h-5 w-5",
}: {
  href: string;
  className?: string;
}) {
  const icon = ICONS[href] ?? ICONS["/"];

  // Icons inherit currentColor so the link state owns the colour. Seven
  // per-route gradients competed with the content and made gold meaningless.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icon.body}
    </svg>
  );
}
