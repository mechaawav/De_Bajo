import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedPublic: SupabaseClient | null = null;
let cachedAdmin: SupabaseClient | null = null;

export function getSupabasePublic(): SupabaseClient | null {
  if (cachedPublic) return cachedPublic;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  cachedPublic = createClient(url, anon);
  return cachedPublic;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedAdmin) return cachedAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const service = process.env.SUPABASE_SERVICE_ROLE!; // server only
  if (!url || !service) throw new Error("Faltan env: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE");
  cachedAdmin = createClient(url, service, { auth: { persistSession: false } });
  return cachedAdmin;
}

export const supabaseAdmin = getSupabaseAdmin();

export function getAppUrl() {
  return process.env.APP_URL || "http://localhost:3000";
}
