import type { AccentKey, RefCard } from "@/app/lib/types";
import { TOKEN, tint } from "@/app/lib/color";
import HubIcon from "./HubIcon";

// Seed accents are named keys; these resolve them to theme tokens so the same
// card reads on both the dark and the light theme.
const ACCENT: Record<AccentKey, string> = {
  teal: TOKEN.gold,
  pink: TOKEN.pink,
  yellow: TOKEN.amber,
  blue: TOKEN.blue,
  purple: TOKEN.purple,
  orange: TOKEN.orange,
};

export function accentColor(key: AccentKey): string {
  return ACCENT[key];
}

// A reference card in the hub look: monogram tile, name with its pill and badge,
// tagline, description, tags and the "Best for" line. Renders every field the
// shared RefCard does, so swapping it in drops nothing.
// `compact` drops the long description, for overview cards whose full version
// sits one tab away.
export default function RefTile({
  card,
  edge = "top",
  compact = false,
}: {
  card: RefCard;
  edge?: "top" | "left";
  compact?: boolean;
}) {
  const color = ACCENT[card.accent];
  const edgeStyle = edge === "top" ? { borderTopColor: color, borderTopWidth: 2 } : { borderLeftColor: color, borderLeftWidth: 3 };

  return (
    <article className="card card-hover flex h-full flex-col p-5" style={edgeStyle}>
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="icon-tile-muted h-10 w-10 font-display text-base font-extrabold"
          style={{ color, borderColor: tint(color, 35), backgroundColor: tint(color, 12) }}
        >
          {card.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold leading-snug text-text">{card.name}</h3>
          {(card.pill || card.badge) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              {card.pill && (
                <span
                  className="rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
                  style={{ color, backgroundColor: tint(color, 14) }}
                >
                  {card.pill}
                </span>
              )}
              {card.badge && <span className={`badge badge-${card.badge.kind} ml-0`}>{card.badge.label}</span>}
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-sm font-medium leading-snug text-text/90">{card.tagline}</p>
      {!compact && <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{card.desc}</p>}

      {card.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}

      {card.bestFor && (
        <div className="mt-auto pt-4">
          <p className="flex items-start gap-2 border-t border-violet-soft/15 pt-3 text-[0.75rem] leading-snug text-muted">
            <span style={{ color }} className="pt-px">
              <HubIcon name="bolt" className="h-3.5 w-3.5" />
            </span>
            <span>
              <span className="font-semibold" style={{ color }}>
                Best for:
              </span>{" "}
              {card.bestFor}
            </span>
          </p>
        </div>
      )}
    </article>
  );
}
