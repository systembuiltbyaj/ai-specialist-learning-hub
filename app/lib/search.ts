import type { SearchRecord } from "@/app/lib/types";

// Weights are ordered, not tuned: an exact title beats a prefix, which beats an
// alias, which beats a body mention. The corpus is a few hundred well-structured
// records, so ordering is what matters — fuzzy matching would add a dependency
// to solve a problem this data doesn't have.
const EXACT_TITLE = 100;
const PREFIX_TITLE = 60;
const EXACT_KEYWORD = 40;
const TITLE_SUBSTRING = 25;
const PARTIAL_KEYWORD = 15;
const SNIPPET = 10;

export function scoreRecord(record: SearchRecord, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;

  const title = record.title.toLowerCase();
  if (title === q) return EXACT_TITLE;
  if (title.startsWith(q)) return PREFIX_TITLE;
  if (record.keywords.some((k) => k.toLowerCase() === q)) return EXACT_KEYWORD;
  if (title.includes(q)) return TITLE_SUBSTRING;
  if (record.keywords.some((k) => k.toLowerCase().includes(q))) return PARTIAL_KEYWORD;
  if (record.snippet.toLowerCase().includes(q)) return SNIPPET;

  return 0;
}

export function searchRecords(
  records: SearchRecord[],
  query: string,
  limit = 12,
): SearchRecord[] {
  if (!query.trim()) return [];
  return records
    .map((record) => ({ record, score: scoreRecord(record, query) }))
    .filter((r) => r.score > 0)
    // Alphabetical tiebreak keeps result order stable between renders.
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title))
    .slice(0, limit)
    .map((r) => r.record);
}
