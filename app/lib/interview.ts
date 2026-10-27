import type { InterviewEntry } from "@/app/lib/types";

// Answer-bank templates mark the parts a candidate personalises with
// [square brackets]. Bounded length and no line breaks, so a stray "[" in
// ordinary text never swallows a paragraph.
const BLANK = /\[[^\]\n]{1,80}\]/g;

export interface Segment {
  text: string;
  blank: boolean;
}

/** Splits text into plain runs and [blank] runs, for highlighting. */
export function splitBlanks(text: string): Segment[] {
  const segments: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(BLANK)) {
    const start = match.index ?? 0;
    if (start > last) segments.push({ text: text.slice(last, start), blank: false });
    segments.push({ text: match[0], blank: true });
    last = start + match[0].length;
  }
  if (last < text.length) segments.push({ text: text.slice(last), blank: false });
  return segments;
}

/** Blanks still unfilled in an entry's answer and follow-up answers. */
export function blanksIn(entry: Pick<InterviewEntry, "answer" | "followUps">): number {
  const texts = [entry.answer, ...(entry.followUps ?? []).map((f) => f.answer)];
  return texts.reduce((n, text) => n + (text.match(BLANK)?.length ?? 0), 0);
}

/** True when the visitor has changed an entry from its seed template. */
export function isEdited(entry: InterviewEntry, seed: InterviewEntry | undefined): boolean {
  if (!seed) return true;
  const followUps = (e: InterviewEntry) => JSON.stringify((e.followUps ?? []).map((f) => [f.question, f.answer]));
  return (
    entry.question !== seed.question ||
    entry.answer !== seed.answer ||
    entry.topic !== seed.topic ||
    followUps(entry) !== followUps(seed)
  );
}
