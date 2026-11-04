import type { Tool } from "@/app/lib/types";
import { formatIsoDate } from "@/app/lib/content/format";
import Glyph, { TOOL_GLYPH } from "@/app/components/ui/Glyph";
import { Tag } from "@/app/components/ui/Tag";

// Ratings are editorial 1–5 judgements, so they read as a short segmented bar
// rather than a precise number.
function RatingBar({ value }: { value: number }) {
  return (
    <span role="img" aria-label={`${value} out of 5`} className="flex shrink-0 gap-0.5">
      {[1, 2, 3, 4, 5].map((step) => (
        <span key={step} className={`h-1.5 w-3.5 rounded-full ${step <= value ? "bg-violet-soft" : "bg-violet-soft/15"}`} />
      ))}
    </span>
  );
}

export default function ToolTile({ tool }: { tool: Tool }) {
  return (
    <article className="card card-hover flex h-full flex-col p-5">
      <header className="flex items-start gap-4">
        <span className="icon-tile h-12 w-12">
          <Glyph name={TOOL_GLYPH[tool.category]} className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] text-text">{tool.name}</h3>
          <p className="text-xs text-muted">by {tool.creator}</p>
          <div className="mt-2">
            <Tag>{tool.category}</Tag>
          </div>
        </div>
      </header>

      <p className="mt-3 text-sm leading-relaxed text-text/80">{tool.tagline}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted">Editorial rating (1–5)</p>
        <dl className="mt-2 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
          {Object.entries(tool.ratings).map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 text-xs">
              <dt className="text-text/70">{label}</dt>
              <dd>
                <RatingBar value={value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <ProsCons title="Strengths" items={tool.strengths} positive />
        <ProsCons title="Weaknesses" items={tool.weaknesses} />
      </div>

      <div className="mt-4 rounded-xl border border-violet-soft/20 bg-violet/[0.06] p-3.5 text-sm leading-relaxed text-text/85">
        <span className="font-semibold text-gold">When to use: </span>
        {tool.when_to_use}
      </div>

      <div className="mt-auto space-y-1.5 pt-4 text-xs">
        <p className="text-text/75">
          <span className="font-semibold text-text">Pricing: </span>
          {tool.pricing}
        </p>
        {(tool.sources?.length || tool.lastVerified) && (
          <p className="text-muted">
            {tool.lastVerified && (
              <>
                Verified <time dateTime={tool.lastVerified}>{formatIsoDate(tool.lastVerified)}</time>
              </>
            )}
            {tool.sources?.map((source) => (
              <span key={source.url}>
                {" · "}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm underline decoration-line underline-offset-2 transition-colors hover:text-gold hover:decoration-gold"
                >
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

function ProsCons({ title, items, positive = false }: { title: string; items: string[]; positive?: boolean }) {
  return (
    <div>
      <p className={`text-xs font-semibold ${positive ? "text-success" : "text-danger"}`}>{title}</p>
      <ul className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-text/80">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2">
            <Glyph
              name={positive ? "check" : "cross"}
              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${positive ? "text-success" : "text-danger"}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
