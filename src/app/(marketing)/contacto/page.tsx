// src/app/(marketing)/contacto/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [status, setStatus] = useState<"idle"|"ok"|"error"|"loading">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error");
      setStatus("ok"); setMsg("¡Mensaje enviado!");
      e.currentTarget.reset();
    } catch (err: any) {
      setStatus("error"); setMsg(err?.message || "No se pudo enviar.");
    }
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-4">Contacto</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <Input name="name" placeholder="Nombre" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Textarea name="message" placeholder="Tu mensaje" required />
        <Button disabled={status==="loading"} type="submit">
          {status==="loading" ? "Enviando..." : "Enviar"}
        </Button>
        {msg && <p className={`text-sm ${status==="error"?"text-red-600":"text-green-600"}`}>{msg}</p>}
      </form>
    </section>
  );
}
