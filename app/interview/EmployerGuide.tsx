import type { AccentKey, DiscoveryData } from "@/app/lib/types";

const ACCENT_TEXT: Record<AccentKey, string> = {
  teal: "text-gold",
  pink: "text-neon-pink",
  yellow: "text-neon-yellow",
  blue: "text-neon-blue",
  purple: "text-violet-light",
  orange: "text-neon-orange",
};

// Data arrives as props from the gated server component — never imported here,
// which would bake it into a publicly-fetchable client chunk.
export default function EmployerGuide({ discovery }: { discovery: DiscoveryData }) {
  const {
    flow: DISCOVERY_FLOW,
    questions: DISCOVERY_QUESTIONS,
    explainPoints: EXPLAIN_POINTS,
    dos: DISCOVERY_DOS,
    donts: DISCOVERY_DONTS,
  } = discovery;

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-violet-soft/30 bg-violet/[0.06] p-4 text-sm text-text/80">
        <span className="font-semibold text-violet-light">You drive this call.</span>{" "}
        The client may not know what GHL is — your job is to ask the right
        questions, understand their business, then translate it into outcomes.
        Diagnose first, prescribe second.
      </div>

      {/* Conversation flow */}
      <section>
        <p className="eyebrow mb-1">The flow</p>
        <h2 className="section-title mb-4 normal-case">How to drive the conversation</h2>
        <ol className="space-y-2">
          {DISCOVERY_FLOW.map((s) => (
            <li key={s.n} className="card flex items-start gap-4 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold font-mono text-xs font-bold text-bg">
                {s.n}
              </span>
              <div>
                <h3 className="font-bold text-text">{s.title}</h3>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-text/75">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Do / Don't */}
      <section className="grid gap-3 md:grid-cols-2">
        <div className="card accent-bar accent-teal p-5">
          <h3 className="font-bold text-gold">✓ Do</h3>
          <ul className="mt-2 space-y-1.5">
            {DISCOVERY_DOS.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-text/80">
                <span className="text-gold">✓</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card accent-bar accent-pink p-5">
          <h3 className="font-bold text-neon-pink">✕ Don&apos;t</h3>
          <ul className="mt-2 space-y-1.5">
            {DISCOVERY_DONTS.map((d, i) => (
              <li key={i} className="flex gap-2 text-sm text-text/80">
                <span className="text-neon-pink">✕</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions to ask */}
      <section>
        <p className="eyebrow mb-1">Diagnose</p>
        <h2 className="section-title mb-4 normal-case">Questions to ask the client</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {DISCOVERY_QUESTIONS.map((g) => (
            <article key={g.group} className={`card accent-bar accent-${g.accent} p-5`}>
              <h3 className={`font-bold ${ACCENT_TEXT[g.accent]}`}>{g.group}</h3>
              <p className="mt-1 text-xs italic text-muted">{g.why}</p>
              <ul className="mt-3 space-y-2">
                {g.questions.map((q, i) => (
                  <li key={i} className="flex gap-2 text-[0.82rem] leading-relaxed text-text/85">
                    <span className={ACCENT_TEXT[g.accent]}>?</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* What to explain */}
      <section>
        <p className="eyebrow mb-1">Prescribe</p>
        <h2 className="section-title mb-1 normal-case">What to explain (GHL → outcomes)</h2>
        <p className="mb-4 text-sm text-muted">
          For a client who's never heard of GHL — skip the jargon, lead with the result.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {EXPLAIN_POINTS.map((p) => (
            <article key={p.feature} className="card p-4">
              <h3 className="font-bold text-text">{p.feature}</h3>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-text/75">
                <span className="font-semibold text-gold">→ </span>
                {p.outcome}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
