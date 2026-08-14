import type { InterviewEntry } from "@/app/lib/types";

// PDF export for interview answers.
//
// jsPDF is imported dynamically by the caller so ~350KB of it never enters the
// initial bundle — it loads on the first click and not before.
//
// The layout is written for paper rather than screenshotting the page: real
// text, so the result stays selectable, searchable, and a few hundred KB
// instead of a few megabytes.

const PAGE = { width: 210, height: 297 }; // A4, millimetres
const MARGIN = { top: 20, bottom: 18, left: 18, right: 18 };
const CONTENT_WIDTH = PAGE.width - MARGIN.left - MARGIN.right;

// jsPDF's built-in fonts encode as WinAnsi, which covers Latin text and the
// typographic punctuation we actually use — but not emoji, which would other-
// wise land as mojibake. Anything outside the encoding is dropped rather than
// substituted, so a stray emoji costs a character and not a garbled line.
const WIN_ANSI =
  /[^ -~ -ÿŒœŠšŸŽžƒˆ˜–—‘’‚“”„†‡•…‰‹›€™]/g;

function toWinAnsi(text: string): string {
  return text
    .replace(WIN_ANSI, "")
    // Dropping a character can leave a doubled or dangling space behind.
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+$/gm, "");
}

export interface PdfOptions {
  /** Named in the subtitle so a filtered export can't pass as the full set. */
  topic?: string;
  total?: number;
}

export async function exportInterviewToPdf(
  entries: InterviewEntry[],
  options: PdfOptions = {},
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  let y = MARGIN.top;

  // Advances to a new page when the next block wouldn't fit whole.
  const reserve = (height: number) => {
    if (y + height <= PAGE.height - MARGIN.bottom) return;
    doc.addPage();
    y = MARGIN.top;
  };

  const write = (
    text: string,
    { size, style, gap = 0, color = 20 }: {
      size: number;
      style: "normal" | "bold" | "italic";
      gap?: number;
      color?: number;
    },
  ) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lines: string[] = doc.splitTextToSize(toWinAnsi(text), CONTENT_WIDTH);
    const lineHeight = size * 0.42;
    for (const line of lines) {
      reserve(lineHeight);
      doc.text(line, MARGIN.left, y);
      y += lineHeight;
    }
    y += gap;
  };

  // ── Document header ──
  const { topic = "All", total = entries.length } = options;
  write("Interview Prep — Q&A", { size: 17, style: "bold", gap: 1.5 });
  write(
    topic === "All"
      ? `${total} question${total === 1 ? "" : "s"}`
      : `Topic: ${topic} — ${entries.length} of ${total} questions`,
    { size: 9.5, style: "normal", gap: 4, color: 110 },
  );

  // ── Entries ──
  for (const entry of entries) {
    // Keep a question with at least its first couple of answer lines.
    reserve(22);

    doc.setDrawColor(200);
    doc.line(MARGIN.left, y, PAGE.width - MARGIN.right, y);
    y += 6;

    write(entry.question, { size: 11.5, style: "bold", gap: 0.5 });
    if (entry.topic) {
      write(entry.topic, { size: 8.5, style: "normal", gap: 2, color: 130 });
    }

    const answer = entry.answer.trim();
    if (answer) {
      // Blank lines are the author's paragraph breaks; keep them as breaks
      // rather than letting the wrapper run the paragraphs together.
      const paragraphs = answer.split(/\n\s*\n/);
      paragraphs.forEach((para, i) => {
        write(para.replace(/\n/g, " "), {
          size: 10,
          style: "normal",
          gap: i === paragraphs.length - 1 ? 6 : 3,
          color: 40,
        });
      });
    } else {
      write("(no answer yet)", {
        size: 10,
        style: "italic",
        gap: 6,
        color: 140,
      });
    }
  }

  // ── Page numbers, added last so the total is known ──
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(150);
    doc.text(
      `${page} / ${pages}`,
      PAGE.width - MARGIN.right,
      PAGE.height - 10,
      { align: "right" },
    );
  }

  doc.save("interview-prep.pdf");
}
