import { NextResponse } from "next/server";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import { SEED_TOOLS } from "@/app/lib/seed/tools";
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";
import type { SearchRecord } from "@/app/lib/types";

// Prerendered to a static asset at build time. The home page ships none of this
// until a visitor actually types, which keeps the landing page light.
export const dynamic = "force-static";

function clip(text: string, max = 120): string {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1)}…`;
}

export function GET() {
  const records: SearchRecord[] = [];

  for (const term of DICTIONARY) {
    records.push({
      type: "term",
      title: term.term,
      keywords: term.aliases,
      snippet: clip(term.definition),
      category: term.category,
      url: `/dictionary/${term.id}`,
    });
  }

  for (const entry of ACRONYMS) {
    const slug = slugify(entry.acronym);
    const termId = ACRONYM_TO_TERM[slug];
    records.push({
      type: "acronym",
      title: entry.acronym,
      keywords: [entry.full],
      snippet: clip(entry.meaning),
      category: entry.category,
      // Overlapping acronyms point straight at the dictionary entry so search
      // never sends anyone through a redirect.
      url: termId ? `/dictionary/${termId}` : `/acronyms/${slug}`,
    });
  }

  for (const tool of SEED_TOOLS) {
    records.push({
      type: "tool",
      title: tool.name,
      keywords: [tool.creator].filter(Boolean),
      snippet: clip(tool.tagline || tool.when_to_use),
      category: tool.category,
      url: "/tools",
    });
  }

  return NextResponse.json(records);
}
