import { NextResponse } from "next/server";
import { DICTIONARY } from "@/data/dictionary";
import { ACRONYMS } from "@/data/acronyms";
import { SEED_TOOLS } from "@/app/lib/seed/tools";
import { ACRONYM_TO_TERM, slugify } from "@/app/lib/reference";
import type { SearchRecord } from "@/app/lib/types";
import { LESSON_ORDER, PATHS_BY_ID, lessonHref } from "@/data/paths";
import { PROJECTS } from "@/data/projects";

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
      // Deprecated terms stay findable (people still search old names) but say so up front.
      snippet: clip(term.status === "deprecated" ? `Deprecated — ${term.definition}` : term.definition),
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

  for (const { pathId, lesson } of LESSON_ORDER) {
    records.push({
      type: "lesson",
      title: lesson.title,
      keywords: [PATHS_BY_ID[pathId].level],
      snippet: clip(lesson.summary),
      category: PATHS_BY_ID[pathId].title,
      url: lessonHref(pathId, lesson.id),
    });
  }

  for (const project of PROJECTS) {
    records.push({
      type: "project",
      title: project.title,
      keywords: project.stack,
      snippet: clip(project.summary),
      category: project.level,
      url: `/projects/${project.id}`,
    });
  }

  return NextResponse.json(records);
}
