import { Fragment } from "react";
import { splitBlanks } from "@/app/lib/interview";

/** Answer text with [blanks] highlighted, paragraphs preserved. */
export default function TemplateText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <p className={`whitespace-pre-wrap ${className}`}>
      {splitBlanks(text).map((segment, i) =>
        segment.blank ? (
          <mark key={i} className="rounded bg-violet-soft/15 px-0.5 text-violet-light">
            {segment.text}
          </mark>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </p>
  );
}
