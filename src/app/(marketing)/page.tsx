// src/app/(marketing)/page.tsx
export default function Page() {
  return (
    <section id="inicio" className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">De_Bajo — Revista digital gratuita</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Publicamos una edición nueva cada mes. Leé gratis dejando tu email para recibir el enlace de acceso.
      </p>
      <div className="mt-6">
        <a href="/revistas" className="inline-block rounded-md border px-4 py-2">
          Ver revistas
        </a>
      </div>
    </section>
  );
}
