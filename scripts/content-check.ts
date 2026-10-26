// Read-only freshness report for the reference content. Run with
// `npm run content:check`; Node 22.18+ strips the types natively, so this
// needs no build step and no dependency.
// Exits non-zero only on integrity errors — staleness is a to-do list, not a failure.

import { DICTIONARY } from "../data/dictionary.ts";
import { MODELS } from "../data/models.ts";
import { DEFAULT_MAX_AGE_DAYS, freshnessReport, staleEntries } from "../app/lib/content/freshness.ts";

const maxAgeArg = process.argv.find((arg) => arg.startsWith("--max-age="));
const maxAgeDays = maxAgeArg ? Number(maxAgeArg.split("=")[1]) : DEFAULT_MAX_AGE_DAYS;
if (!Number.isInteger(maxAgeDays) || maxAgeDays <= 0) {
  console.error(`Invalid --max-age: expected a positive whole number of days.`);
  process.exit(2);
}

const today = new Date();
const report = freshnessReport(DICTIONARY, today, maxAgeDays);
const staleModels = staleEntries(MODELS, today, maxAgeDays);
const printStale = (items: typeof staleModels) => {
  for (const item of items) console.log(`  ${item.id} — verified ${item.lastVerified}, ${item.ageDays} days ago`);
};

console.log(`Stale threshold: ${maxAgeDays} days\n`);
console.log(`Dictionary: ${report.total} terms, ${report.stale.length} stale`);
printStale(report.stale);
console.log(`Model registry: ${MODELS.length} models, ${staleModels.length} stale`);
printStale(staleModels);

const integrityErrors = [
  ...report.brokenRelated.map((item) => `${item.id} relates to missing ${item.missing.join(", ")}`),
  ...report.supersededMissing.map((item) => `${item.id} is superseded by missing ${item.supersededBy}`),
];
if (integrityErrors.length > 0) {
  console.error(`\nIntegrity errors (${integrityErrors.length})`);
  for (const error of integrityErrors) console.error(`  ${error}`);
  process.exit(1);
}
console.log("\nIntegrity: OK");
