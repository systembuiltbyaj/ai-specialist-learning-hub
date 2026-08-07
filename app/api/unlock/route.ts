import { NextResponse } from "next/server";
import {
  COOKIE_NAME,
  COOKIE_MAX_AGE,
  accessToken,
  timingSafeEqual,
} from "@/app/lib/access";
import { rateLimit, clientKey } from "@/app/lib/rateLimit";

// Admin login for the admin session, used to authorize
// writes to /api/resources.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  const limit = rateLimit(`unlock:${clientKey(req)}`, MAX_ATTEMPTS, WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const passcode = process.env.ADMIN_PASSCODE;

  let body: { passcode?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body */
  }
  const input = typeof body.passcode === "string" ? body.passcode : "";

  // Same response whether the gate is unconfigured or the passcode is wrong —
  // never reveal which, and never let an unset env var grant access.
  if (!passcode || !timingSafeEqual(input, passcode)) {
    return NextResponse.json(
      { ok: false, error: "Incorrect passcode." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, await accessToken(passcode), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}
