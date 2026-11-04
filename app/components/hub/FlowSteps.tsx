import HubIcon, { type HubIconName } from "./HubIcon";

export interface FlowStep {
  title: string;
  body?: string;
  // A line icon, or the emoji a seed file already carries.
  icon?: HubIconName;
  emoji?: string;
  href?: string;
}

const PER_ROW = 5;

// A numbered left-to-right flow: five steps per row with arrows between them on
// wide screens, a plain numbered list on phones.
export default function FlowSteps({ steps, label }: { steps: FlowStep[]; label: string }) {
  return (
    <ol aria-label={label} className="card grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6 xl:grid-cols-5">
      {steps.map((step, i) => {
        const showArrow = i < steps.length - 1 && (i + 1) % PER_ROW !== 0;
        const inner = (
          <>
            <span className="icon-tile h-12 w-12 rounded-full text-lg">
              {step.emoji ? (
                <span aria-hidden>{step.emoji}</span>
              ) : (
                <HubIcon name={step.icon ?? "check"} className="h-5 w-5" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block font-bold leading-snug text-text group-hover/step:text-violet-light">
                {i + 1}. {step.title}
              </span>
              {step.body && <span className="mt-1 block text-xs leading-relaxed text-muted">{step.body}</span>}
            </span>
          </>
        );
        const layout = "flex items-start gap-3 xl:flex-col xl:items-center xl:text-center";
        return (
          <li key={step.title} className="relative">
            {step.href ? (
              <a href={step.href} className={`${layout} group/step rounded-xl`}>
                {inner}
              </a>
            ) : (
              <div className={layout}>{inner}</div>
            )}
            {showArrow && (
              <span aria-hidden className="absolute -right-5 top-3.5 hidden text-lg text-violet-light xl:block">
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
