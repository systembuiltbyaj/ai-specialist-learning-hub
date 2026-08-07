import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/adminSession";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { RESOURCE_CATEGORIES } from "@/app/lib/constants";

// Write API for Learning Resources. Runs with the service-role key, so EVERY
// path here requires a valid admin session. isAdmin() fails closed when
// ADMIN_PASSCODE is unset — a missing env var locks writes, never opens them.

const TYPES = ["Video", "Docs", "Article", "Course", "Tool", "Post"];
const CATEGORIES = RESOURCE_CATEGORIES.filter((c) => c !== "All");

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

async function listAll() {
  const { data } = await supabaseAdmin!
    .from("resources")
    .select("*")
    .order("saved_at", { ascending: false });
  return data ?? [];
}

// Normalize a URL and reject anything that isn't plain http(s) — blocks
// javascript: and data: payloads from ever reaching an href.
function safeUrl(raw: unknown): string | null {
  let value = String(raw ?? "").trim();
  if (!value) return null;
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString().slice(0, 600);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!supabaseAdmin) {
    return NextResponse.json(
      { ok: false, error: "Storage is not configured." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    /* empty */
  }
  const op = String(body.op ?? "");

  try {
    if (op === "list") {
      return NextResponse.json({ ok: true, resources: await listAll() });
    }

    if (op === "create") {
      const title = String(body.title ?? "").trim().slice(0, 200);
      if (!title) return badRequest("Title is required.");

      const url = safeUrl(body.url);
      if (!url) return badRequest("Enter a valid http(s) URL.");

      const category = String(body.category ?? "");
      if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
        return badRequest("Unknown category.");
      }

      const type = String(body.type ?? "Article");
      if (!TYPES.includes(type)) return badRequest("Unknown type.");

      const { error } = await supabaseAdmin.from("resources").insert({
        id: `r-${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
        title,
        url,
        category,
        type,
        notes: String(body.notes ?? "").slice(0, 1000),
        completed: Boolean(body.completed ?? false),
      });
      if (error) throw error;
      return NextResponse.json({ ok: true, resources: await listAll() });
    }

    if (op === "update") {
      const id = String(body.id ?? "");
      if (!id) return badRequest("Missing id.");

      // Explicit allow-list — never spread the request body into the update.
      const patch: Record<string, unknown> = {};
      if ("title" in body) {
        const title = String(body.title ?? "").trim().slice(0, 200);
        if (!title) return badRequest("Title cannot be empty.");
        patch.title = title;
      }
      if ("url" in body) {
        const url = safeUrl(body.url);
        if (!url) return badRequest("Enter a valid http(s) URL.");
        patch.url = url;
      }
      if ("category" in body) {
        const category = String(body.category ?? "");
        if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
          return badRequest("Unknown category.");
        }
        patch.category = category;
      }
      if ("type" in body) {
        const type = String(body.type ?? "");
        if (!TYPES.includes(type)) return badRequest("Unknown type.");
        patch.type = type;
      }
      if ("notes" in body) patch.notes = String(body.notes ?? "").slice(0, 1000);
      if ("completed" in body) patch.completed = Boolean(body.completed);

      if (Object.keys(patch).length === 0) return badRequest("Nothing to update.");

      const { error } = await supabaseAdmin.from("resources").update(patch).eq("id", id);
      if (error) throw error;
      return NextResponse.json({ ok: true, resources: await listAll() });
    }

    if (op === "delete") {
      const id = String(body.id ?? "");
      if (!id) return badRequest("Missing id.");
      const { error } = await supabaseAdmin.from("resources").delete().eq("id", id);
      if (error) throw error;
      return NextResponse.json({ ok: true, resources: await listAll() });
    }

    return badRequest("Unknown op.");
  } catch (e) {
    // Detail stays server-side; the client gets a generic message so schema
    // and constraint names are never disclosed.
    console.error("[api/resources]", e);
    return NextResponse.json(
      { ok: false, error: "Could not save. Try again." },
      { status: 500 },
    );
  }
}
