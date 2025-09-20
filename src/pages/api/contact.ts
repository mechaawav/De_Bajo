export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';

async function sendEmailJS(params: Record<string, any>, templateKey = 'EMAILJS_TEMPLATE_ID_CONTACT') {
  const service_id = import.meta.env.EMAILJS_SERVICE_ID!;
  const template_id = import.meta.env[templateKey]!;
  const user_id    = import.meta.env.EMAILJS_PUBLIC_KEY!;
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
    const { name, email, message } = await request.json();
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'missing' }), { status: 400 });
    }

    await supabaseAdmin.from('contact_messages').insert({ name, email, message });

    await sendEmailJS({
      from_name: name,
      from_email: email,
      message,
      to_email: 'mecarabajal13@gmail.com',
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? String(e) }), { status: 500 });
  }
};
