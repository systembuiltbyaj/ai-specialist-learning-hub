import type { Tool } from "@/app/lib/types";

function Rating({ value }: { value: number }) {
  return (
    <span className="text-gold" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-white/20">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card card-hover flex h-full flex-col p-5">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">{tool.name}</h3>
          <p className="text-xs text-white/50">by {tool.creator}</p>
        </div>
        <span className="chip border border-gold/40 text-gold">{tool.category}</span>
      </header>

      <p className="mb-4 text-sm text-white/70">{tool.tagline}</p>

      <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {Object.entries(tool.ratings).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-xs">
            <span className="text-white/60">{k}</span>
            <Rating value={v} />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-1 text-emerald-300">Strengths</p>
          <ul className="space-y-1 text-xs text-white/75">
            {tool.strengths.map((s, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-emerald-400">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-1 text-rose-300">Weaknesses</p>
          <ul className="space-y-1 text-xs text-white/75">
            {tool.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-rose-400">✕</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-navy-border pt-3 text-xs">
        <p className="text-white/75">
          <span className="font-semibold text-gold">When to use: </span>
          {tool.when_to_use}
        </p>
        <p className="text-white/60">
          <span className="font-semibold text-white/80">Pricing: </span>
          {tool.pricing}
        </p>
      </div>
    </article>
  );
}
