import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// The app is designed to run with OR without Supabase configured.
// When env vars are absent, every data helper falls back to bundled seed data,
// so the hub works instantly for local dev and portfolio demos.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

// A single shared client (or null when not configured).
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;
