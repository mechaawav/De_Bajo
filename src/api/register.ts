import type { APIRoute } from 'astro';
import { getServiceClient } from '../lib/supabase';
import { sendPasswordEmail } from '../lib/email';
import bcrypt from 'bcryptjs';


function randomPassword(n = 8) {
const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$%';
return Array.from({ length: n }, () => chars[Math.floor(Math.random()*chars.length)]).join('');
}


export const POST: APIRoute = async ({ request }) => {
try {
const { email, magazine } = await request.json();
if (!email) return new Response(JSON.stringify({ error: 'Email requerido' }), { status: 400 });


const supa = getServiceClient();
const password = randomPassword(10);
const pass_hash = await bcrypt.hash(password, 10);


// upsert lector/a
const { error } = await supa.from('readers').upsert({ email, pass_hash }).select().single();
if (error) throw error;


await sendPasswordEmail(email, password, magazine || 'De_Bajo');
return new Response(JSON.stringify({ ok: true }), { status: 200 });
} catch (err: any) {
return new Response(JSON.stringify({ error: err.message || 'Error' }), { status: 500 });
}
};