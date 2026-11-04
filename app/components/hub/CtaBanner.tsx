import Link from "next/link";
import HubIcon, { type HubIconName } from "./HubIcon";

// The closing banner: violet wash with the lit swoosh, and the page's one yellow
// call to action.
export default function CtaBanner({
  icon,
  title,
  body,
  href,
  label,
}: {
  icon: HubIconName;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <section className="card card-glow flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
      <span className="icon-tile h-14 w-14">
        <HubIcon name={icon} className="h-7 w-7" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-xl font-extrabold tracking-[-0.025em] text-text sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
      <Link href={href} className="btn-gold self-start sm:self-center">
        {label} <span aria-hidden>→</span>
      </Link>
    </section>
  );
}
