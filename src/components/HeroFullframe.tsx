"use client";
import Image from "next/image";

export default function HeroFullframe() {
  return (
    <section className="relative overflow-hidden bg-[#C7332E]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-12 md:grid-cols-[1.1fr_0.9fr]">
        {/* IZQUIERDA: banner + subtítulo + secciones */}
        <div className="relative">
          {/* Banner gigante */}
          <h1 className="text-black font-black leading-none text-[17vw] md:text-[12rem] tracking-tight uppercase">
            DE_BAJO
          </h1>

          {/* Subtítulo */}
          <h2 className="mt-[-0.75rem] text-black text-xl md:text-2xl font-black tracking-wider uppercase">
            LA REVISTA DEL UNDER DE CÓRDOBA
          </h2>

          {/* Secciones (desktop) */}
          <ul className="mt-6 hidden md:flex flex-col gap-1 text-black/90 text-sm tracking-widest uppercase">
            <li>POESÍA</li>
            <li>MÚSICA</li>
            <li>EVENTOS</li>
            <li>LECTURA</li>
            <li>ENTREVISTAS</li>
          </ul>
        </div>

        {/* DERECHA: foto estilo polaroid */}
        <div className="mx-auto md:mx-0 md:justify-self-end">
          <div className="bg-white rounded-[4px] shadow-[0_8px_30px_rgba(0,0,0,.25)] p-2 pb-6 rotate-2">
            <div className="relative w-[80vw] max-w-[380px] aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
                alt="Retrato editorial — imagen de muestra"
                fill
                className="object-cover"
                sizes="(max-width:768px) 80vw, 380px"
                priority
              />
            </div>
          </div>

          {/* Secciones (mobile) */}
          <ul className="mt-4 grid grid-cols-2 gap-y-1 text-black/90 text-xs tracking-widest uppercase md:hidden">
            <li>POESÍA</li>
            <li>MÚSICA</li>
            <li>EVENTOS</li>
            <li>LECTURA</li>
            <li>ENTREVISTAS</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
