import HubIcon, { type HubIconName } from "./HubIcon";

export interface Topic {
  label: string;
  sub?: string;
  icon: HubIconName;
  href: string;
}

// The icon-tile grid that sits beside a hub's timeline ("Building blocks",
// "Explore topics"). Each tile jumps to the tab or section that covers it.
export default function TopicPanel({
  title,
  icon,
  topics,
  link,
}: {
  title: string;
  icon: HubIconName;
  topics: Topic[];
  link?: { href: string; label: string };
}) {
  return (
    <section className="card flex h-full flex-col p-5 sm:p-6" aria-label={title}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="icon-tile-muted h-11 w-11">
            <HubIcon name={icon} className="h-5 w-5" />
          </span>
          <h2 className="font-display text-lg font-extrabold tracking-[-0.02em] text-text sm:text-xl">{title}</h2>
        </div>
        {link && (
          <a
            href={link.href}
            className="inline-flex shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-violet-light hover:underline"
          >
            {link.label} <span aria-hidden>→</span>
          </a>
        )}
      </div>
      <ul className="mt-4 grid flex-1 grid-cols-2 gap-3">
        {topics.map((topic) => (
          <li key={topic.label}>
            <a
              href={topic.href}
              className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-violet-soft/20 bg-violet/[0.07] p-4 text-center transition-colors hover:border-violet-soft/60 hover:bg-violet/15"
            >
              <HubIcon name={topic.icon} className="h-7 w-7 text-violet-light" />
              <span className="text-sm font-bold leading-snug text-text">{topic.label}</span>
              {topic.sub && <span className="text-xs leading-snug text-muted">{topic.sub}</span>}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
