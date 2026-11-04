import NavIcon from "@/app/components/NavIcons";
import HeroGlyph from "@/app/components/HeroGlyph";
import StatStrip, { type StripStat } from "@/app/components/StatStrip";

export type HeaderStat = StripStat;

// The header every section page shares: a violet eyebrow, the icon tile and a
// two-tone title, a short description, the 3D glyph on the right, and the
// page's own numbers in a stat strip underneath.
export default function PageHeader({
  href,
  eyebrow,
  title,
  accent,
  children,
  stats = [],
  actions,
}: {
  // The route whose sidebar icon fills the tile and the glyph.
  href: string;
  eyebrow?: string;
  title: string;
  // Trailing word(s) of the title, set in violet.
  accent?: string;
  children?: React.ReactNode;
  stats?: StripStat[];
  actions?: React.ReactNode;
}) {
  return (
    <div className="space-y-5">
      <header className="relative">
        <HeroGlyph href={href} className="absolute -top-2 right-6 hidden h-40 w-40 md:grid" />
        <div className="relative max-w-2xl md:pr-40">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <div className="mt-1.5 flex items-center gap-3.5">
            <span className="icon-tile h-11 w-11 sm:h-12 sm:w-12">
              <NavIcon href={href} className="h-6 w-6" />
            </span>
            <h1 className="page-title">
              {title}
              {accent && (
                <>
                  {" "}
                  <span className="title-accent">{accent}</span>
                </>
              )}
            </h1>
          </div>
          {children && <div className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{children}</div>}
          {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </header>
      {stats.length > 0 && <StatStrip stats={stats} />}
    </div>
  );
}
