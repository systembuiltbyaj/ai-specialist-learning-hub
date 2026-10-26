// Formats a YYYY-MM-DD content date as "26 Oct 2026". Pinned to UTC: these are
// calendar dates, and a local-time parse can shift them a day depending on the
// timezone of whichever machine runs the static build.
const FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatIsoDate(isoDate: string): string {
  return FORMATTER.format(new Date(`${isoDate}T00:00:00Z`));
}
