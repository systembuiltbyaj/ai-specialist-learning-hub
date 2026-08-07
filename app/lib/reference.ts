import { DICTIONARY, DICTIONARY_BY_ID, type DictionaryTerm } from "@/data/dictionary";
import { ACRONYMS, type Acronym } from "@/data/acronyms";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// An acronym "overlaps" when the dictionary already covers the same concept —
// either as a term id (RAG, LLM, OAuth) or as a registered alias (CoT, HITL).
// Those acronyms get no page of their own; they redirect into the richer
// dictionary entry so the two never compete for the same search query.
function buildOverlapMap(): Record<string, string> {
  const aliasToId = new Map<string, string>();
  for (const term of DICTIONARY as DictionaryTerm[]) {
    for (const alias of term.aliases) {
      aliasToId.set(alias.toLowerCase(), term.id);
    }
  }

  const map: Record<string, string> = {};
  for (const entry of ACRONYMS as Acronym[]) {
    const slug = slugify(entry.acronym);
    if (DICTIONARY_BY_ID[slug]) {
      map[slug] = slug;
      continue;
    }
    const viaAlias = aliasToId.get(entry.acronym.toLowerCase());
    if (viaAlias) map[slug] = viaAlias;
  }
  return map;
}

export const ACRONYM_TO_TERM: Record<string, string> = buildOverlapMap();

export const TERM_IDS: string[] = (DICTIONARY as DictionaryTerm[]).map((t) => t.id);

// Acronyms that warrant their own page — i.e. everything the dictionary does
// not already cover.
export const ACRONYM_SLUGS: string[] = (ACRONYMS as Acronym[])
  .map((a) => slugify(a.acronym))
  .filter((slug) => !ACRONYM_TO_TERM[slug]);

export function acronymBySlug(slug: string): Acronym | undefined {
  return (ACRONYMS as Acronym[]).find((a) => slugify(a.acronym) === slug);
}
