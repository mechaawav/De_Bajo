"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/nosotras", label: "NOSOTRAS" },
  { href: "/revistas", label: "REVISTAS" },
  { href: "/contacto", label: "CONTACTO" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto max-w-7xl h-14 px-4 flex items-center justify-between">
        <Link href="/" className="uppercase font-black tracking-[.18em] text-[#C7332E] hover:opacity-90 transition">
          De_Bajo
        </Link>

        <nav className="flex items-center gap-6">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "uppercase font-black tracking-[.18em] text-sm transition underline-offset-8",
                  active ? "text-[#C7332E]" : "text-[#C7332E]/90 hover:text-[#C7332E] hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7332E]/50 rounded-sm",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
