import type { APIRoute } from 'astro';
import { getServiceClient } from '../../lib/supabase';
import bcrypt from 'bcryptjs';


export const POST: APIRoute = async ({ request }) => {
try {
const { email, password, magazine } = await request.json();
if (!email || !password || !magazine) {
return new Response(JSON.stringify({ error: 'Faltan campos' }), { status: 400 });
}
const supa = getServiceClient();


const { data: user, error } = await supa.from('readers').select('*').eq('email', email).single();
if (error || !user) return new Response(JSON.stringify({ error: 'No registrado/a' }), { status: 401 });


const ok = await bcrypt.compare(password, user.pass_hash);
if (!ok) return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });


// PDF en Storage privado: bucket "magazines", archivo `${magazine}.pdf`
const { data: signed, error: sErr } = await supa.storage.from('magazines').createSignedUrl(`${magazine}.pdf`, 600);
if (sErr || !signed?.signedUrl) throw new Error('No se pudo firmar URL');


return new Response(JSON.stringify({ url: signed.signedUrl }), { status: 200 });
} catch (err: any) {
return new Response(JSON.stringify({ error: err.message || 'Error' }), { status: 500 });
}
};