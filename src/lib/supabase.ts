import { createClient } from '@supabase/supabase-js';

const url     = import.meta.env.PUBLIC_SUPABASE_URL!;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY!;

// Navegador (seguro)
export const supabase = createClient(url, anonKey);

// Serverless / API (SERVICE ROLE)
const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE ?? anonKey;
export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false },
});
