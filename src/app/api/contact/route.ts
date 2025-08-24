// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const name = String(form.get("name") || "");
  const email = String(form.get("email") || "");
  const message = String(form.get("message") || "");
  if (!name || !email || !message) return NextResponse.json({ message: "Campos requeridos" }, { status: 400 });

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return NextResponse.json({ message: "Brevo no configurado" }, { status: 500 });

  const payload = {
    sender: { name: "De_Bajo Website", email: "no-reply@debajo.app" },
    to: [{ email: "equipo@debajo.app" }], // <-- cambialo por tu correo
    subject: `Nuevo contacto: ${name}`,
    htmlContent: `<p><b>De:</b> ${name} (${email})</p><p>${message}</p>`,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": apiKey },
    body: JSON.stringify(payload),
  });

  if (!res.ok) return NextResponse.json({ message: "No se pudo enviar" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
