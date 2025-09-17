import type { APIRoute } from 'astro';
import { sendContactEmail } from '../../lib/email';


export const POST: APIRoute = async ({ request }) => {
try {
const form = await request.formData();
const name = String(form.get('name') || '');
const email = String(form.get('email') || '');
const message = String(form.get('message') || '');
if (!name || !email || !message) return new Response('Faltan campos', { status: 400 });
await sendContactEmail(name, email, message);
return new Response('OK', { status: 200 });
} catch (e: any) {
return new Response('Error al enviar', { status: 500 });
}
};