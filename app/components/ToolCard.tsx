import type { Tool } from "@/app/lib/types";
import { formatIsoDate } from "@/app/lib/content/format";

function Rating({ value }: { value: number }) {
  return (
    <span className="text-gold" aria-label={`${value} out of 5`}>
      {"★".repeat(value)}
      <span className="text-text/20">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="card card-hover flex h-full flex-col p-5">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-text">{tool.name}</h3>
          <p className="text-xs text-text/50">by {tool.creator}</p>
        </div>
        <span className="chip border border-gold/40 text-gold">{tool.category}</span>
      </header>

      <p className="mb-4 text-sm text-text/70">{tool.tagline}</p>

      <p className="mb-1.5 text-xs font-medium text-muted">Editorial rating (1–5)</p>
      <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {Object.entries(tool.ratings).map(([k, v]) => (
          <div key={k} className="flex items-center justify-between text-xs">
            <span className="text-text/60">{k}</span>
            <Rating value={v} />
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="eyebrow mb-1 text-success">Strengths</p>
          <ul className="space-y-1 text-xs text-text/75">
            {tool.strengths.map((s, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-success">✓</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-1 text-danger">Weaknesses</p>
          <ul className="space-y-1 text-xs text-text/75">
            {tool.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-danger">✕</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 space-y-2 border-t border-line pt-3 text-xs">
        <p className="text-text/75">
          <span className="font-semibold text-gold">When to use: </span>
          {tool.when_to_use}
        </p>
        <p className="text-text/60">
          <span className="font-semibold text-text/80">Pricing: </span>
          {tool.pricing}
        </p>
        {(tool.sources?.length || tool.lastVerified) && (
          <p className="text-text/45">
            {tool.lastVerified && (
              <>
                Verified <time dateTime={tool.lastVerified}>{formatIsoDate(tool.lastVerified)}</time>
              </>
            )}
            {tool.sources?.map((source) => (
              <span key={source.url}>
                {" · "}
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-gold">
                  {source.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}
