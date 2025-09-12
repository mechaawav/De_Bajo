import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#C7332E] uppercase font-black tracking-[.18em] text-xs sm:text-sm">
          © {new Date().getFullYear()} De_Bajo — Revista digital mensual.
        </p>
        <ul className="flex items-center gap-6 text-[#C7332E] uppercase font-black tracking-[.18em] text-xs sm:text-sm">
          <li><Link href="/nosotras" className="hover:underline underline-offset-4">NOSOTRAS</Link></li>
          <li><Link href="/revistas" className="hover:underline underline-offset-4">REVISTAS</Link></li>
          <li><Link href="/contacto" className="hover:underline underline-offset-4">CONTACTO</Link></li>
        </ul>
      </div>
    </footer>
  );
}
