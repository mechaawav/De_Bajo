export const prerender = false;

import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ ok: false, error: 'missing' }), { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('readers')
      .select('pass_hash')
      .eq('email', email)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ ok: false, error: 'not found' }), { status: 401 });
    }

    const ok = await bcrypt.compare(password, data.pass_hash);
    if (!ok) {
      return new Response(JSON.stringify({ ok: false, error: 'invalid' }), { status: 401 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message ?? String(e) }), { status: 500 });
  }
};
