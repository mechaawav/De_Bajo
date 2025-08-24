// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-wide">
          De_Bajo
        </Link>
        <div className="flex gap-4 text-sm">
          <Link href="/#inicio">Inicio</Link>
          <Link href="/nosotras">Nosotras</Link>
          <Link href="/revistas">Revistas</Link>
          <Link href="/contacto">Contacto</Link>
        </div>
      </nav>
    </header>
  );
}
