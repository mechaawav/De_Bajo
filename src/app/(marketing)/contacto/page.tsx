"use client";
import { useEffect, useState } from "react";
import PageShell from "@/components/PageShell";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget; // ← guardamos referencia ANTES del await

    setLoading(true);
    setOk(null);
    setMsg("");

    const fd = new FormData(formEl);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const message = String(fd.get("message") || "");

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, { name, email, message });

      if (res?.status === 200) {
        setOk(true);
        setMsg("Correo enviado"); // ← el texto que querías
        formEl.reset();           // ← usamos la referencia persistida
      } else {
        setOk(false);
        setMsg(res?.text || "No se pudo enviar el correo.");
      }
    } catch (err: any) {
      console.error("[EmailJS ERROR]", err);
      setOk(false);
      setMsg(err?.message || err?.text || "No se pudo enviar el correo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell title="CONTACTO" lead="ESCRIBINOS — ESTAMOS DEL OTRO LADO" background="#C7332E">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase tracking-[.18em] text-neutral-700 mb-2">
            Nombre
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-[.18em] text-neutral-700 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-[.18em] text-neutral-700 mb-2">
            Mensaje
          </label>
          <textarea
            name="message"
            rows={6}
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
            placeholder="Contanos en qué estás pensando…"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-5 py-2.5 rounded-md bg-black text-white font-semibold tracking-wide hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>

        {ok === true && (
          <p className="mt-2 text-sm uppercase font-black tracking-[.18em] text-[#C7332E]">
            {msg}
          </p>
        )}
        {ok === false && (
          <p className="mt-2 text-sm uppercase font-black tracking-[.18em] text-red-600">
            {msg}
          </p>
        )}
      </form>
    </PageShell>
  );
}
