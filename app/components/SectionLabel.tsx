// "01 — AI Code Editors" style divider used across reference pages.
export default function SectionLabel({
  num,
  title,
  id,
}: {
  num: string;
  title: string;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-20">
      <div className="mt-12 flex items-center gap-3">
        <span className="font-mono text-[0.62rem] tracking-[0.2em] text-muted">
          {num}
        </span>
        <h2 className="font-display text-lg font-extrabold tracking-tight text-text">
          {title}
        </h2>
        <div className="h-px flex-1 bg-line" />
      </div>
    </div>
  );
}
