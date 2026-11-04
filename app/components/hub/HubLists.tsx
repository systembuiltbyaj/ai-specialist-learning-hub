import type { LearnStep, Tip } from "@/app/lib/types";
import HubIcon from "./HubIcon";

// Seed titles carry their own "1. " prefix; the badge shows the number instead.
export function stripStepNumber(title: string): string {
  return title.replace(/^\d+\.\s*/, "");
}

// Best practices and AI patterns: a check tile, the rule, and why.
export function TipGrid({ tips }: { tips: Tip[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {tips.map((tip) => (
        <li key={tip.title} className="card flex items-start gap-3.5 p-5">
          <span className="icon-tile h-9 w-9 rounded-full">
            <HubIcon name="check" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <h3 className="font-bold leading-snug text-text">{tip.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{tip.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// A learning path as numbered step cards, each with its optional resource link.
export function LearnSteps({ steps }: { steps: LearnStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step.title} className="card flex items-start gap-4 p-5">
          <span className="icon-tile h-10 w-10 rounded-full font-display text-sm font-extrabold">{i + 1}</span>
          <div className="min-w-0">
            <h3 className="font-bold leading-snug text-text">{stripStepNumber(step.title)}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
            {step.resource && (
              <a
                href={step.resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 rounded-md text-xs font-semibold text-violet-light hover:underline"
              >
                {step.resource.label} <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
