import type { CodeSample } from "@/app/lib/content/types";

// Lesson and project bodies are plain text with blank-line paragraphs — no
// markdown parser, no dependency, and nothing that can inject HTML.
export function Paragraphs({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {text
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
        .map((paragraph, i) => (
          <p key={i} className="max-w-[68ch] text-[0.95rem] leading-[1.75] text-text/80">
            {paragraph}
          </p>
        ))}
    </div>
  );
}

export function CodeBlock({ code }: { code: CodeSample }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-black/40">
      <figcaption className="border-b border-line px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
        {code.language}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed">
        <code className="font-mono text-text/90">{code.content}</code>
      </pre>
    </figure>
  );
}
