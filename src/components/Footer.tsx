// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} De_Bajo — Revista digital mensual.
      </div>
    </footer>
  );
}
