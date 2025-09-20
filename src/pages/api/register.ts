export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import bcrypt from 'bcryptjs';

function genPass(len = 8) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

async function sendEmailJS(params: Record<string, any>, templateKey = 'EMAILJS_TEMPLATE_ID_REGISTER') {
  const service_id = import.meta.env.EMAILJS_SERVICE_ID!;
  const template_id = import.meta.env[templateKey]!;
  const user_id = import.meta.env.EMAILJS_PUBLIC_KEY!;
  const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service_id, template_id, user_id, template_params: params }),
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`EmailJS failed: ${t}`);
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, magazine } = await request.json();
    if (!email) return new Response(JSON.stringify({ ok: false, error: 'email required' }), { status: 400 });

    const plain = genPass();
    const hash  = await bcrypt.hash(plain, 10);

    await supabaseAdmin.from('readers')
      .upsert({ email, pass_hash: hash }, { onConflict: 'email' });

    if (magazine) {
      await supabaseAdmin.from('magazine_access')
        .upsert({ email, magazine_slug: magazine });
    }

    const origin = import.meta.env.APP_ORIGIN ?? 'https://de_bajo.vercel.app';
    await sendEmailJS({
      to_email: email,
      password: plain,
      magazine: magazine ?? 'De_Bajo',
      site_url: origin,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? String(e) }), { status: 500 });
  }
};
