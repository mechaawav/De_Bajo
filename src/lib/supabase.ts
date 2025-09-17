import { createClient } from '@supabase/supabase-js';


// Cliente con rol de servicio (solo desde el servidor / API)
export function getServiceClient() {
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.SUPABASE_SERVICE_ROLE;
if (!url || !key) throw new Error('Faltan env de Supabase (URL/Service Role).');
return createClient(url, key);
}


// (si en el futuro quisieras cliente público en el browser)
export function getPublicClient() {
const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error('Faltan env públicos de Supabase.');
return createClient(url, key);
}