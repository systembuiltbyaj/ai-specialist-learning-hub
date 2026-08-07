// Canonical origin for metadata, sitemap, and OpenGraph URLs.
// Resolution order: explicit config → Vercel's per-deploy URL → local dev.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the real domain is attached.
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
