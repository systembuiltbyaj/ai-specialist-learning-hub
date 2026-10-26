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
    <figure className="code-surface overflow-hidden rounded-xl border border-line">
      <figcaption className="border-b border-white/10 px-3 py-1.5 font-mono text-[0.7rem] text-white/55">
        {code.language}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed">
        <code className="font-mono">{code.content}</code>
      </pre>
    </figure>
  );
}
