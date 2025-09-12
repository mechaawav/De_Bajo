// src/lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedPublic: SupabaseClient | null = null;
let cachedAdmin: SupabaseClient | null = null;

/**
 * Cliente público (usar en componentes del cliente o server)
 */
export function getSupabasePublic(): SupabaseClient | null {
  if (cachedPublic) return cachedPublic;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  cachedPublic = createClient(url, anon);
  return cachedPublic;
}

/**
 * Cliente admin (⚠️ usar sólo en server — rutas API)
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cachedAdmin) return cachedAdmin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE; // nunca exponer en cliente
  if (!url || !service) return null;
  cachedAdmin = createClient(url, service, {
    auth: { persistSession: false },
  });
  return cachedAdmin;
}
