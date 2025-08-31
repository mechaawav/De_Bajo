export default function Head() {
  return (
    <>
      {/* Favicon forzado (rompemos caché con ?v=10) */}
      <link
        rel="icon"
        href="/hero/polaroid.png?v=10"
        type="image/png"
        sizes="any"
      />
      {/* Icono para iOS */}
      <link
        rel="apple-touch-icon"
        href="/hero/polaroid.png?v=10"
      />
      {/* Opcional: color del tema del navegador móvil */}
      <meta name="theme-color" content="#C7332E" />
    </>
  );
}
