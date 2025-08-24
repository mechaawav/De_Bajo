"use client";

import { useState } from "react";
import { z } from "zod";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Issue } from "./MagazineCard";

const schema = z.object({ email: z.string().email() });

export default function EmailGateDialog({ issue }: { issue: Issue }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      setMessage("Email inválido");
      return;
    }
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, issueSlug: issue.slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error");
      setStatus("ok");
      setMessage("¡Listo! Revisá tu correo para el enlace de acceso.");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "No se pudo enviar el correo.");
    }
  }

  return (
    <>
      <Button className="w-full" size="lg" onClick={() => setOpen(true)}>
        Leer gratis
      </Button>

      <Modal open={open} onClose={() => setOpen(false)} title={`Accedé a: ${issue.title}`}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button disabled={status === "loading"} type="submit">
            {status === "loading" ? "Enviando..." : "Enviar enlace"}
          </Button>
          {message && (
            <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Es gratis. Al continuar aceptás nuestra Política de Privacidad.
          </p>
        </form>
      </Modal>
    </>
  );
}
