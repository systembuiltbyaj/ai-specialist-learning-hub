import NavIcon from "@/app/components/NavIcons";

// The 3D violet glyph that sits top-right of every page header: three stacked
// slabs with the page's icon on the top face, and a light trail sweeping past.
// CSS-only (see .glyph in globals.css), so it costs no image requests.
export default function HeroGlyph({ href, className = "" }: { href: string; className?: string }) {
  return (
    <div aria-hidden className={`glyph pointer-events-none select-none ${className}`}>
      <svg className="glyph-trail -translate-y-1/2" viewBox="0 0 480 160" fill="none">
        <defs>
          <linearGradient id="glyph-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgb(var(--swoosh))" stopOpacity="0" />
            <stop offset="0.55" stopColor="rgb(var(--swoosh))" stopOpacity="0.9" />
            <stop offset="1" stopColor="rgb(var(--swoosh))" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M0 150 C 140 150, 220 40, 330 70 S 450 40, 480 10" stroke="url(#glyph-trail)" strokeWidth="2.5" />
        <path d="M0 150 C 140 150, 220 40, 330 70 S 450 40, 480 10" stroke="url(#glyph-trail)" strokeWidth="10" opacity="0.18" />
      </svg>
      <div className="glyph-stack">
        <span className="glyph-slab" />
        <span className="glyph-slab" />
        <span className="glyph-slab">
          <NavIcon href={href} className="h-11 w-11" />
        </span>
      </div>
    </div>
  );
}
