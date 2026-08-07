import type { RefCard as RefCardType, AccentKey } from "@/app/lib/types";

// Maps accent keys to text + dot colors (top bar comes from .accent-* in globals).
const ACCENT_TEXT: Record<AccentKey, string> = {
  teal: "text-neon-teal",
  pink: "text-neon-pink",
  yellow: "text-neon-yellow",
  blue: "text-neon-blue",
  purple: "text-neon-purple",
  orange: "text-neon-orange",
};
const ACCENT_BG: Record<AccentKey, string> = {
  teal: "bg-neon-teal",
  pink: "bg-neon-pink",
  yellow: "bg-neon-yellow",
  blue: "bg-neon-blue",
  purple: "bg-neon-purple",
  orange: "bg-neon-orange",
};
const ACCENT_PILL: Record<AccentKey, string> = {
  teal: "bg-neon-teal/10 text-neon-teal",
  pink: "bg-neon-pink/10 text-neon-pink",
  yellow: "bg-neon-yellow/10 text-neon-yellow",
  blue: "bg-neon-blue/10 text-neon-blue",
  purple: "bg-neon-purple/10 text-neon-purple",
  orange: "bg-neon-orange/10 text-neon-orange",
};
const BADGE_CLASS = {
  os: "badge-os",
  paid: "badge-paid",
  free: "badge-free",
  cloud: "badge-cloud",
} as const;

export default function RefCard({ card }: { card: RefCardType }) {
  return (
    <article
      className={`card card-hover accent-bar accent-${card.accent} animate-fade-up flex h-full flex-col p-5`}
    >
      {card.pill && (
        <span className={`pill mb-2 self-start ${ACCENT_PILL[card.accent]}`}>
          {card.pill}
        </span>
      )}

      <h3 className="font-display text-base font-bold text-text">
        {card.name}
        {card.badge && (
          <span className={`badge ${BADGE_CLASS[card.badge.kind]}`}>
            {card.badge.label}
          </span>
        )}
      </h3>

      <p className="mt-1 text-xs text-muted">{card.tagline}</p>
      <p className="mt-3 text-[0.78rem] leading-relaxed text-text/75">{card.desc}</p>

      {card.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}

      {card.bestFor && (
        <div className="mt-auto flex items-center gap-2 border-t border-line pt-3 text-[0.7rem] text-muted">
          <span
            className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${ACCENT_BG[card.accent]}`}
          />
          <span>
            <span className={ACCENT_TEXT[card.accent]}>Best for:</span>{" "}
            {card.bestFor}
          </span>
        </div>
      )}
    </article>
  );
}
