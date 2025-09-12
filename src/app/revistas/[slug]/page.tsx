type Props = { params: { slug: string }, searchParams: { token?: string } };

export default async function Page({ params, searchParams }: Props) {
  const { slug } = params;
  const token = searchParams.token;

  let signedUrl: string | null = null;
  if (token) {
    const base = process.env.APP_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/acceso?slug=${slug}&token=${token}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      signedUrl = data?.signedUrl ?? null;
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Lectura — {slug}</h1>

      {!token && (
        <p className="text-muted-foreground">
          Para leer esta revista, volvé a <a className="underline" href="/revistas">Revistas</a> y pedí el enlace con tu email.
        </p>
      )}

      {token && !signedUrl && (
        <p className="text-red-600">
          Token inválido o expirado. Volvé a solicitar el enlace desde la tarjeta de la revista.
        </p>
      )}

      {signedUrl && (
        <div className="aspect-[3/4] w-full">
          <iframe className="h-[80vh] w-full rounded-md border" src={signedUrl} />
        </div>
      )}
    </section>
  );
}
