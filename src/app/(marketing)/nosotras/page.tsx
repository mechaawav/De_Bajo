import PageShell from "@/components/PageShell";
import Image from "next/image";

const TEAM = [
  {
    name: "Mercedes Carabajal",
    role: "Dirección Editorial",
    bio: "Encargada de la visión y la narrativa de De_Bajo, conectando el under cordobés con el mundo digital.",
    img: "/nosotras/mercedes.jpg",
  },
  {
    name: "Charo Pérez",
    role: "Diseño & Estética",
    bio: "Responsable del look & feel de la revista, asegurando una identidad visual con estilo y coherencia.",
    img: "/nosotras/charo.jpg",
  },
  {
    name: "Ana López",
    role: "Producción & Redes",
    bio: "Gestiona el día a día de la producción y la comunidad online, amplificando la voz del proyecto.",
    img: "/nosotras/ana.jpg",
  },
];

export default function NosotrasPage() {
  return (
    <PageShell
      title="NOSOTRAS"
      lead="EL EQUIPO DETRÁS DE DE_BAJO"
      background="#C7332E"
    >
      {/* Historia de la revista */}
      <div className="mb-16 max-w-3xl mx-auto bg-[#C7332E] text-white rounded-2xl shadow-2xl p-8 space-y-4">
        <h2 className="uppercase font-black tracking-[.18em] text-2xl">
          Nuestra Historia
        </h2>
        <p className="leading-relaxed text-base">
          De_Bajo nació como un espacio independiente para visibilizar la cultura
          under de Córdoba. Empezamos con pequeñas publicaciones digitales y hoy,
          mes a mes, construimos una revista que refleja poesía, música,
          entrevistas y eventos de nuestra escena local. Nuestro propósito es
          mantener viva la voz de artistas emergentes, conectar comunidades y
          darle lugar a historias que merecen ser contadas.
        </p>
      </div>

      {/* Tarjetas de equipo */}
      <div className="flex flex-col items-center gap-10">
        {TEAM.map((p, i) => (
          <article
            key={i}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl ring-1 ring-black/10 overflow-hidden group"
          >
            <div className="relative w-full h-72">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="p-6 space-y-2">
              <h3 className="uppercase font-black tracking-[.18em] text-xl text-[#C7332E]">
                {p.name}
              </h3>
              <p className="text-sm font-semibold text-neutral-600 uppercase tracking-[.14em]">
                {p.role}
              </p>
              <p className="text-neutral-800 leading-relaxed text-sm">
                {p.bio}
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
