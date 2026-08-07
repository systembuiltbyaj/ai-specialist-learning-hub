import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/app/lib/access";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Expire the access cookie.
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
