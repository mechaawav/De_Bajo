// src/lib/supabase.ts
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

export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE; // ⚠️ sólo server
  if (!url || !service) return null;
  cachedAdmin = createClient(url, service);
  return cachedAdmin;
}

export function getAppUrl() {
  return process.env.APP_URL || "http://localhost:3000";
}
