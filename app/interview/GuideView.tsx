"use client";

import { useState } from "react";
import type { GuideBlock, InterviewGuide } from "@/app/lib/types";

// Renders one guide from the Interview Materials kit. Each block kind mirrors a
// marker in the source documents, so the on-screen guide reads like the PDF.

// **text** is the source's inline emphasis; everything else renders as plain text.
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-text">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function PromptBox({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="code-surface overflow-hidden rounded-xl border border-line">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-[0.7rem] text-white/60">
        <span>Prompt — paste into your AI assistant</span>
        <button onClick={copy} className="rounded-md border border-white/20 px-2 py-0.5 hover:bg-white/10" aria-live="polite">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <div className="space-y-1.5 p-4 text-[0.82rem] leading-relaxed">
        {lines.map((line, i) =>
          line.startsWith("## ") ? (
            <p key={i} className="pt-2 font-bold first:pt-0">
              {line.slice(3)}
            </p>
          ) : line.startsWith("• ") ? (
            <p key={i} className="pl-4 -indent-3">
              • {line.slice(2)}
            </p>
          ) : (
            <p key={i}>{line}</p>
          ),
        )}
      </div>
    </div>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.kind) {
    case "text":
      return (
        <p className="max-w-[70ch] text-sm leading-relaxed text-text/80">
          <Rich text={block.text} />
        </p>
      );
    case "bullet":
      return (
        <p className="flex gap-2 text-sm leading-relaxed text-text/80">
          <span className="text-violet-light" aria-hidden>
            •
          </span>
          <span>
            <Rich text={block.text} />
          </span>
        </p>
      );
    case "sub":
      return <p className="pt-1 text-sm font-bold text-text">{block.text}</p>;
    case "desc":
      return <p className="text-sm italic text-muted">{block.text}</p>;
    case "note":
      return <p className="text-xs text-muted">{block.text}</p>;
    case "cue":
      return <p className="text-xs font-medium text-violet-light">[{block.text}]</p>;
    case "client":
    case "you":
      return (
        <div className={`flex ${block.kind === "you" ? "justify-end" : "justify-start"}`}>
          <p
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
              block.kind === "you" ? "rounded-br-md bg-violet/10 text-text" : "rounded-bl-md bg-text/[0.06] text-text/85"
            }`}
          >
            <span className="mb-0.5 block text-[0.68rem] font-semibold text-muted">{block.kind === "you" ? "You" : "Client"}</span>
            <Rich text={block.text} />
          </p>
        </div>
      );
    case "kv":
      return (
        <p className="text-sm leading-relaxed text-text/80">
          <span className="font-semibold text-text">{block.label}: </span>
          <Rich text={block.text} />
        </p>
      );
    case "tip":
    case "deeper":
      return (
        <div className="rounded-xl border-l-2 border-gold bg-gold-fill/[0.08] px-4 py-3">
          <p className="text-xs font-bold text-gold">{block.label || (block.kind === "tip" ? "Tip" : "Going deeper")}</p>
          <p className="mt-1 text-sm leading-relaxed text-text/80">
            <Rich text={block.text} />
          </p>
        </div>
      );
    case "followup":
      return (
        <div className="rounded-xl border border-line/80 bg-text/[0.03] px-4 py-3">
          <p className="text-xs font-bold text-violet-light">Follow-up: {block.question}</p>
          {block.answer.map((a, i) => (
            <p key={i} className="mt-1 text-sm leading-relaxed text-text/80">
              <Rich text={a} />
            </p>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-text/[0.04]">
                {block.rows[0].map((cell, i) => (
                  <th key={i} className="px-3 py-2 font-semibold text-text">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.slice(1).map((row, r) => (
                <tr key={r} className="border-b border-line/60 last:border-0">
                  {row.map((cell, c) => (
                    <td key={c} className="px-3 py-2 align-top text-text/80">
                      <Rich text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "prompt":
      return <PromptBox lines={block.lines} />;
  }
}

function Blocks({ blocks }: { blocks: GuideBlock[] }) {
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}

export default function GuideView({ guide }: { guide: InterviewGuide }) {
  const anchor = (i: number) => `${guide.id}-${i}`;

  return (
    <div className="space-y-6">
      <header className="card p-5">
        <h2 className="text-xl font-extrabold text-text">{guide.title}</h2>
        <p className="mt-1 text-sm text-muted">{guide.subtitle}</p>
        {guide.cover.length > 0 && (
          <div className="mt-3 space-y-1.5 border-t border-line/70 pt-3">
            <p className="text-sm font-semibold text-text">{guide.cover[0]}</p>
            {guide.cover.slice(1).map((line, i) => (
              <p key={i} className="text-sm text-text/75">
                {line}
              </p>
            ))}
          </div>
        )}
      </header>

      {guide.sections.length > 2 && (
        <nav aria-label={`${guide.title} sections`} className="sticky top-0 z-10 -mx-1 flex gap-2 overflow-x-auto bg-bg/70 px-1 py-2 backdrop-blur-md">
          {guide.sections.map((section, i) => (
            <a key={i} href={`#${anchor(i)}`} className="chip shrink-0 hover:border-violet-soft/50">
              {section.title}
            </a>
          ))}
        </nav>
      )}

      {guide.sections.map((section, i) => (
        <section key={i} id={anchor(i)} className="scroll-mt-16 space-y-3">
          <h3 className="text-lg font-bold text-text">{section.title}</h3>
          {section.intro.map((line, j) => (
            <p key={j} className={j === 0 ? "text-sm font-medium text-text/85" : "text-sm text-muted"}>
              {line}
            </p>
          ))}
          {section.blocks.length > 0 && <Blocks blocks={section.blocks} />}
          {section.items.map((item, j) => (
            <article key={j} className="card space-y-3 p-4 sm:p-5">
              <h4 className="font-bold text-text">
                {/* Only number items when the section really is a sequence. */}
                {section.items.length > 1 && <span className="mr-2 text-violet-light">{j + 1}.</span>}
                {item.heading}
              </h4>
              <Blocks blocks={item.blocks} />
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
