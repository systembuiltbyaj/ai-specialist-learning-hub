import type { DictionaryTerm } from "../../../data/dictionary";

// Staleness report for the reference content. Pure and import-free at runtime
// so scripts/content-check.ts can run it under plain Node. The site has no
// refresh schedule by design — this report is what keeps "manual" from
// quietly becoming "never".

export const DEFAULT_MAX_AGE_DAYS = 120;
const DAY_MS = 86_400_000;

export interface FreshnessReport {
  total: number;
  stale: { id: string; lastVerified: string; ageDays: number }[];
  unverified: string[];
  unsourced: string[];
  brokenRelated: { id: string; missing: string[] }[];
  supersededMissing: { id: string; supersededBy: string }[];
}

export function ageInDays(isoDate: string, today: Date): number {
  return Math.floor((today.getTime() - Date.parse(`${isoDate}T00:00:00Z`)) / DAY_MS);
}

export function freshnessReport(
  terms: DictionaryTerm[],
  today: Date,
  maxAgeDays: number = DEFAULT_MAX_AGE_DAYS,
): FreshnessReport {
  const ids = new Set(terms.map((term) => term.id));
  const report: FreshnessReport = {
    total: terms.length,
    stale: [],
    unverified: [],
    unsourced: [],
    brokenRelated: [],
    supersededMissing: [],
  };

  for (const term of terms) {
    if (!term.lastVerified) {
      report.unverified.push(term.id);
    } else {
      const ageDays = ageInDays(term.lastVerified, today);
      if (ageDays > maxAgeDays) report.stale.push({ id: term.id, lastVerified: term.lastVerified, ageDays });
    }
    if (!term.sources || term.sources.length === 0) report.unsourced.push(term.id);

    const missing = term.related.filter((id) => !ids.has(id));
    if (missing.length > 0) report.brokenRelated.push({ id: term.id, missing });

    if (term.supersededBy && !ids.has(term.supersededBy)) {
      report.supersededMissing.push({ id: term.id, supersededBy: term.supersededBy });
    }
  }

  report.stale.sort((a, b) => b.ageDays - a.ageDays);
  return report;
}
