import { cookies } from "next/headers";
import { COOKIE_NAME, isValidAdminCookie } from "@/app/lib/access";

// Server-side admin check for route handlers and server components.
// Separate from access.ts so that module stays free of `next/headers`.
// cookies() is async as of Next 15.
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return isValidAdminCookie(store.get(COOKIE_NAME)?.value);
}
