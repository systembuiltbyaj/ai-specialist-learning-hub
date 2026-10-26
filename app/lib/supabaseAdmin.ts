import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only admin client (service-role key). NEVER import this into client code.
// Bypasses RLS, so every caller must confirm isAdmin() first (see /api/resources).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseAdmin = Boolean(url && serviceKey);

export const supabaseAdmin: SupabaseClient | null = hasSupabaseAdmin
  ? createClient(url as string, serviceKey as string, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null;
