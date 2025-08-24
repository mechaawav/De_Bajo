// src/lib/email.ts
type SendArgs = {
  to: string;
  issueTitle: string;
  magicLink: string;
};

export async function sendAccessEmailBrevo({ to, issueTitle, magicLink }: SendArgs) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "no-reply@debajo.app"; // podés setear BREVO_SENDER_EMAIL en .env.local

  if (!apiKey) {
    console.warn("BREVO_API_KEY no configurada");
    return { ok: false, message: "Brevo no configurado" };
  }

  const payload = {
    sender: { name: "De_Bajo", email: senderEmail },
    to: [{ email: to }],
    subject: `Tu acceso a ${issueTitle}`,
    htmlContent: `
      <h2>¡Hola!</h2>
      <p>Usá este enlace para leer <b>${issueTitle}</b>:</p>
      <p><a href="${magicLink}">${magicLink}</a></p>
      <p>El enlace expira en 12 horas.</p>
    `,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Brevo error:", text);
    return { ok: false, message: "Error enviando email" };
  }
  return { ok: true };
}
