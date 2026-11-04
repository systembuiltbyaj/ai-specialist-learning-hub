import type { WhatsNewItem } from "@/app/lib/types";
import { tint } from "@/app/lib/color";
import HubIcon from "./HubIcon";

// The "What's new" timeline card. Each row shows the date, title and a one-line
// summary; opening it reveals the full note and its source, so nothing the old
// card showed is lost. Native <details>, so it needs no client JavaScript.
//
// `verified` stays required for the same reason as in HubWhatsNew: the date can
// only be wrong if someone edits the items without touching it.
export default function HubTimeline({
  title,
  items,
  accent,
  verified,
  note,
  visible = 4,
}: {
  title: string;
  items: WhatsNewItem[];
  accent: string;
  verified: string;
  note?: string;
  // Rows shown before the "earlier updates" fold.
  visible?: number;
}) {
  const shown = items.slice(0, visible);
  const earlier = items.slice(visible);

  return (
    <section className="card flex h-full flex-col p-5 sm:p-6" aria-label={title}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-3">
          <span className="icon-tile-muted h-11 w-11">
            <HubIcon name="rss" className="h-5 w-5" />
          </span>
          <h2 className="font-display text-lg font-extrabold tracking-[-0.02em] text-text sm:text-xl">{title}</h2>
        </div>
        <p className="font-mono text-[0.65rem] text-muted">
          verified {verified}
          {note && <> · {note}</>}
        </p>
      </div>

      <TimelineList items={shown} accent={accent} startIndex={0} />

      {earlier.length > 0 && (
        <details className="group/more mt-1">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-md py-1 text-sm font-semibold text-violet-light hover:underline [&::-webkit-details-marker]:hidden">
            <span className="group-open/more:hidden">Show {earlier.length} earlier updates</span>
            <span className="hidden group-open/more:inline">Hide earlier updates</span>
            <HubIcon name="chevron" className="h-4 w-4 transition-transform group-open/more:-rotate-90" />
          </summary>
          <TimelineList items={earlier} accent={accent} startIndex={shown.length} />
        </details>
      )}
    </section>
  );
}

function TimelineList({ items, accent, startIndex }: { items: WhatsNewItem[]; accent: string; startIndex: number }) {
  return (
    <ol className="relative mt-3 before:absolute before:bottom-4 before:left-[4px] before:top-4 before:w-px before:bg-violet-soft/30">
      {items.map((item, i) => (
        <li key={item.title} className="relative pl-6">
          <span
            aria-hidden
            className="absolute left-0 top-[1.15rem] h-[9px] w-[9px] rounded-full bg-violet-soft ring-4 ring-violet/20"
          />
          <details className="group/item border-b border-violet-soft/15">
            <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-3 rounded-lg py-3 [&::-webkit-details-marker]:hidden">
              <span className="flex min-w-0 flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
                <span
                  className="w-fit shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wide"
                  style={{ color: accent, borderColor: tint(accent, 45), backgroundColor: tint(accent, 10) }}
                >
                  {item.date}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold leading-snug text-text">
                    {item.title}
                    {startIndex + i === 0 && (
                      <span className="chip chip-active ml-2 px-2 py-0.5 align-middle text-[0.6rem]">Latest</span>
                    )}
                  </span>
                  <span className="mt-0.5 line-clamp-1 text-[0.8rem] text-muted group-open/item:hidden">
                    {item.blurb}
                  </span>
                </span>
              </span>
              <HubIcon
                name="chevron"
                className="mt-1 h-4 w-4 text-muted transition-transform group-open/item:rotate-90"
              />
            </summary>
            <div className="pb-4">
              <p className="text-[0.85rem] leading-relaxed text-text/85">{item.blurb}</p>
              {item.source && (
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 rounded-md text-[0.78rem] font-semibold text-violet-light hover:underline"
                >
                  {item.sourceLabel ?? "Source"} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
