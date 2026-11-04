import HubIcon, { type HubIconName } from "./HubIcon";

// A hub section heading: line icon, title and one-line description on the left,
// an optional "view all" style link on the right. Carries the anchor id so the
// in-page chip nav can jump to it below the sticky mobile bar.
export default function SectionHead({
  id,
  icon,
  title,
  description,
  link,
  as: Heading = "h2",
}: {
  id?: string;
  icon: HubIconName;
  title: string;
  description?: React.ReactNode;
  link?: { href: string; label: string };
  as?: "h2" | "h3";
}) {
  return (
    <div id={id} className="flex scroll-mt-20 flex-wrap items-end justify-between gap-x-6 gap-y-2">
      <div className="flex min-w-0 items-start gap-3">
        <HubIcon name={icon} className="mt-0.5 h-7 w-7 shrink-0 text-violet-light" />
        <div className="min-w-0">
          <Heading className="font-display text-xl font-extrabold tracking-[-0.025em] text-text sm:text-2xl">
            {title}
          </Heading>
          {description && <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>}
        </div>
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
  );
}
