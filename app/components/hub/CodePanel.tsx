import CopyButton from "./CopyButton";

// A dark code panel with a filename bar, line numbers and a copy button.
// `scope-dark` pins the dark token set inside the panel: code is always set on
// dark, so muted and text colours must not flip to their light-theme values.
// Line numbers are CSS counters, so selecting the code never copies them.
export default function CodePanel({
  filename,
  code,
  copyLabel,
  className = "",
}: {
  filename: string;
  code: string;
  copyLabel?: string;
  className?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <div className={`scope-dark code-surface overflow-hidden rounded-xl border border-violet-soft/25 ${className}`}>
      <div className="flex items-center gap-2 border-b border-violet-soft/20 px-4 py-2.5">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-neon-pink" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-gold-fill" />
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-violet-soft" />
        <span className="ml-2 min-w-0 flex-1 truncate font-mono text-[0.68rem] text-muted">{filename}</span>
        <CopyButton text={code} label={copyLabel} />
      </div>
      <pre className="overflow-x-auto py-4 pr-4 font-mono text-[0.75rem] leading-relaxed">
        <code className="[counter-reset:line]">
          {lines.map((line, i) => (
            <span
              key={i}
              className="block [counter-increment:line] before:mr-4 before:inline-block before:w-8 before:select-none before:text-right before:text-muted/60 before:content-[counter(line)]"
            >
              {line}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
