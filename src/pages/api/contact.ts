// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData(); // si envías desde <form> tradicional
    // O si desde fetch/json: const { name, email, message } = await request.json();

    const endpoint = `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_CONTACT_ID}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      body: form, // si usaste formData arriba
      // Si fueras JSON:
      // headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      // body: JSON.stringify({ name, email, message, type: 'contact' }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      return new Response(JSON.stringify({ ok: false, error: txt || 'Formspree error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Unexpected error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
// Recuerda configurar PUBLIC_FORMSPREE_CONTACT_ID en tus variables de entorno 