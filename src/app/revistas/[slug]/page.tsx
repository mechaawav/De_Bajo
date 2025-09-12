"use client";
import { useState } from "react";

type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
  const { slug } = params;
  // Config por edición (V1 hardcodea ruta del PDF aquí; V2 leer de Supabase issues)
  const PDF_PATHS: Record<string, string> = {
    "edicion-1": "2025/ed1.pdf",
  };
  const pdfPath = PDF_PATHS[slug];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, slug, pdfPath }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Error de acceso.");
      setSignedUrl(data.signedUrl);
    } catch (err: any) {
      setMsg(err?.message || "No se pudo validar el acceso.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold uppercase tracking-[.18em]">Lectura — {slug}</h1>

      {!pdfPath && (
        <p className="text-red-600">No hay PDF configurado para esta edición.</p>
      )}

      {!signedUrl && pdfPath && (
        <form onSubmit={onSubmit} className="max-w-md space-y-4 bg-white p-4 rounded-xl ring-1 ring-black/10 shadow-2xl">
          <div>
            <label className="block text-xs font-black uppercase tracking-[.18em] text-neutral-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-[.18em] text-neutral-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-5 py-2.5 rounded-md bg-black text-white font-semibold tracking-wide hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Validando..." : "Acceder"}
          </button>
          {msg && <p className="text-red-600 text-sm">{msg}</p>}
          <p className="text-xs text-neutral-500">
            La contraseña se entrega al comprar la revista.
          </p>
        </form>
      )}

      {signedUrl && (
        <div className="aspect-[3/4] w-full">
          <iframe className="h-[80vh] w-full rounded-md border" src={signedUrl} />
        </div>
      )}
    </section>
  );
}
