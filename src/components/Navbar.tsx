export default function Navbar() {
  const link =
    "relative text-sm after:content-[''] after:absolute after:left-0 after:-bottom-0.5 " +
    "after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-black " +
    "after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="/" className="font-semibold">De_Bajo</a>
        <nav className="flex gap-4">
          <a href="/nosotras" className={link}>Nosotras</a>
          <a href="/revistas" className={link}>Revistas</a>
          <a href="/contacto" className={link}>Contacto</a>
        </nav>
      </div>
    </header>
  );
}
