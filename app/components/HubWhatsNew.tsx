// Server component — a dated "What's New" feed for the hub pages.
//
// `verified` is required on purpose. The previous version hardcoded
// "mid-2026" in the heading, which stayed put while the content aged and gave
// no signal that anything had gone stale. Making the date a required prop means
// it can only be wrong if someone edits the items without updating it.

export interface WhatsNewItem {
  date: string; // e.g. "Jun 2026"
  title: string;
  blurb: string;
  source?: string; // URL
  sourceLabel?: string;
}

export default function HubWhatsNew({
  items,
  accent = "#f6cb1f",
  verified,
  note,
}: {
  items: WhatsNewItem[];
  accent?: string;
  verified: string;
  note?: string;
}) {
  return (
    <section className="card p-5" style={{ borderTopColor: accent, borderTopWidth: 2 }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2
          className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          What&apos;s new
        </h2>
        <span className="font-mono text-[0.62rem] text-muted">
          verified {verified}
          {note && <> · {note}</>}
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.title} className="border-t border-line pt-3 first:border-0 first:pt-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span
                className="rounded-full border px-2 py-0.5 font-mono text-[0.55rem] font-bold uppercase tracking-wide"
                style={{ color: accent, borderColor: `${accent}66`, backgroundColor: `${accent}14` }}
              >
                {it.date}
              </span>
              <h3 className="font-bold text-text">{it.title}</h3>
            </div>
            <p className="mt-1 text-[0.8rem] leading-relaxed text-text/80">{it.blurb}</p>
            {it.source && (
              <a
                href={it.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex text-[0.72rem] font-medium text-violet-light hover:underline"
              >
                {it.sourceLabel ?? "Source"} →
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
