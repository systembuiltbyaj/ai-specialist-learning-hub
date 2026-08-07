import { supabase } from "@/app/lib/supabase";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import type { Term, Tool, Resource } from "@/app/lib/types";
import { SEED_TERMS } from "@/app/lib/seed/terms";
import { SEED_TOOLS } from "@/app/lib/seed/tools";

// Server-side data-access layer. Each function tries Supabase first, then falls
// back to seed data on any error or when Supabase isn't configured. Pages never
// crash because a table is missing or empty.

export async function getTerms(): Promise<Term[]> {
  if (!supabase) return SEED_TERMS;
  try {
    const { data, error } = await supabase.from("terms").select("*").order("name");
    if (error || !data || data.length === 0) return SEED_TERMS;
    return data as Term[];
  } catch {
    return SEED_TERMS;
  }
}

export async function getTools(): Promise<Tool[]> {
  if (!supabase) return SEED_TOOLS;
  try {
    const { data, error } = await supabase.from("tools").select("*");
    if (error || !data || data.length === 0) return SEED_TOOLS;
    return data as Tool[];
  } catch {
    return SEED_TOOLS;
  }
}

// Resources are private: the table has RLS enabled with no policies, so the
// anon key cannot read it. Only this service-role path can, and callers must
// confirm the admin session first (see app/lib/adminSession.ts).
export async function getAdminResources(): Promise<Resource[]> {
  if (!supabaseAdmin) return [];
  try {
    const { data, error } = await supabaseAdmin
      .from("resources")
      .select("*")
      .order("saved_at", { ascending: false });
    if (error || !data) return [];
    return data as Resource[];
  } catch {
    return [];
  }
}
