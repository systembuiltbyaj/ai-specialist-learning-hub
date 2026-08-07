import type { AccentKey, AutomationRecipe, Tip, LearnStep } from "@/app/lib/types";

const ACCENT_TEXT: Record<AccentKey, string> = {
  teal: "text-gold",
  pink: "text-neon-pink",
  yellow: "text-neon-yellow",
  blue: "text-neon-blue",
  purple: "text-violet-light",
  orange: "text-neon-orange",
};

export function RecipeCard({ recipe }: { recipe: AutomationRecipe }) {
  const accentText = ACCENT_TEXT[recipe.accent];
  return (
    <article className={`card accent-bar accent-${recipe.accent} flex h-full flex-col p-5`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-text">{recipe.title}</h3>
        {recipe.tag && (
          <span className={`chip border border-line text-[0.6rem] ${accentText}`}>
            {recipe.tag}
          </span>
        )}
      </div>

      <p className="eyebrow mt-3 mb-1">Trigger</p>
      <p className="text-sm text-text/80">{recipe.trigger}</p>

      <p className="eyebrow mt-3 mb-1.5">Steps</p>
      <ol className="space-y-1.5">
        {recipe.steps.map((s, i) => (
          <li key={i} className="flex gap-2 text-[0.82rem] text-text/80">
            <span
              className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border border-line font-mono text-[0.55rem] ${accentText}`}
            >
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-3">
        <div className="rounded-lg border border-line bg-white/[0.03] p-2.5">
          <span className={`font-mono text-[0.6rem] font-bold uppercase tracking-wider ${accentText}`}>
            ✓ Outcome
          </span>
          <p className="mt-0.5 text-xs text-text/80">{recipe.outcome}</p>
        </div>
      </div>
    </article>
  );
}

export function TipCard({ tip }: { tip: Tip }) {
  return (
    <article className="card accent-bar accent-teal p-5">
      <h3 className="font-bold text-gold">✓ {tip.title}</h3>
      <p className="mt-2 text-sm text-text/75">{tip.detail}</p>
    </article>
  );
}

export function LearnList({ steps }: { steps: LearnStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((s) => (
        <li key={s.title} className="card p-5">
          <h3 className="font-bold text-text">{s.title}</h3>
          <p className="mt-1 text-sm text-text/75">{s.detail}</p>
          {s.resource && (
            <a
              href={s.resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-medium text-violet-light underline hover:text-gold"
            >
              {s.resource.label} →
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
