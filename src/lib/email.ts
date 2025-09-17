const EMAILJS_API = 'https://api.emailjs.com/api/v1.0/email/send';


export async function sendPasswordEmail(to_email: string, password: string, magazine_title: string) {
const service_id = import.meta.env.EMAILJS_SERVICE_ID;
const template_id = import.meta.env.EMAILJS_TEMPLATE_ID;
const user_id = import.meta.env.EMAILJS_PUBLIC_KEY; // Public key
if (!service_id || !template_id || !user_id) throw new Error('Faltan env de EmailJS');


const body = {
service_id,
template_id,
user_id,
template_params: {
to_email,
password,
magazine_title
}
};


const r = await fetch(EMAILJS_API, {
method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
if (!r.ok) {
const t = await r.text();
throw new Error(`EmailJS error: ${t}`);
}
}


export async function sendContactEmail(name: string, from_email: string, message: string) {
const service_id = import.meta.env.EMAILJS_SERVICE_ID;
const template_id = import.meta.env.EMAILJS_CONTACT_TEMPLATE_ID; // otro template
const user_id = import.meta.env.EMAILJS_PUBLIC_KEY;
if (!service_id || !template_id || !user_id) throw new Error('Faltan env de EmailJS');


const body = {
service_id,
template_id,
user_id,
template_params: { name, from_email, message, to_email: 'mecarabajal13@gmail.com' }
};


const r = await fetch(EMAILJS_API, {
method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
});
if (!r.ok) throw new Error('No se pudo enviar el contacto');
}