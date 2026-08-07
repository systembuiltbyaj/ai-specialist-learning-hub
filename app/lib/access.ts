// Shared admin-gate helpers.
//
// Every PAGE on this site is public. The admin session authorizes exactly one
// thing: writes to /api/resources, which run on the Supabase service-role key
// and therefore bypass RLS. Without this gate that endpoint would be an open
// write path into the database.
//
// The passcode lives ONLY in ADMIN_PASSCODE (server env) — never in client code.
// The cookie stores a SHA-256 token derived from it, not the passcode itself.

export const COOKIE_NAME = "aj_admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

// Web Crypto is available in both the edge runtime and Node 18+.
export async function accessToken(passcode: string): Promise<string> {
  const data = new TextEncoder().encode(`ajlh::v2::${passcode}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Length-independent comparison so a response time can't leak how many
// leading characters matched.
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Validate a cookie value against the configured passcode.
// FAILS CLOSED: with ADMIN_PASSCODE unset there is no way to be admin, so a
// missing env var can never silently expose private routes or write endpoints.
export async function isValidAdminCookie(
  cookieValue: string | undefined,
): Promise<boolean> {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode || !cookieValue) return false;
  return timingSafeEqual(cookieValue, await accessToken(passcode));
}
