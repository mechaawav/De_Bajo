// Todo lo editable vive acá: textos, colores, posiciones, variantes.
import polaroidImg from "@/public/hero/polaroid.png";

export const heroContent = {
  colors: {
    background: "#C7332E", // rojo poster
  },
  title: "DE_BAJO",

  // 👇 NUEVO: resaltar la "A" (índice 4) con fondo negro y letra blanca
  titleHighlights: [
    {
      index: 4,
      bgClass: "bg-black",
      charClass: "text-white",
      padX: ".0em",
      padY: ".0em",
    },
  ],

  subtitle: "LA REVISTA DEL UNDER DE CÓRDOBA",
  sections: ["POESÍA", "MÚSICA", "EVENTOS", "LECTURA", "ENTREVISTAS"],

  // ¿Cómo mostrar las secciones?
  // "columnRight" → columna absoluta a la derecha (estilo póster)
  // "rowUnder"    → fila debajo del subtítulo dentro del flujo
  sectionsVariant: "columnRight" as "columnRight" | "rowUnder",

  // Posición/tamaño de la polaroid
  polaroid: {
    src: "/hero/polaroid.png",  // ← tu PNG local
    alt: "Imagen editorial",
    boxClass: "w-[30vw] max-w-[250px] aspect-[5/5]",
    frameClass: "absolute right-[15%] top-[45%] rotate-2 shadow-[0_18px_50px_rgba(0,0,0,.35)]",
  },

  // Estilo del título
  titleClass:
    "uppercase text-black font-black leading-[0.] tracking-[-0.03em] text-[19vw] md:text-[15rem] text-center",
  // Opción 3: subtítulo con posición ABSOLUTA (libertad total de ubicación)
  // - Anclado al contenedor del título (que es `relative` en el componente)
  // - Centrado en mobile (left-1/2 + -translate-x-1/2)
  // - Offset fijo en desktop con md:left/md:top (ajustá números a gusto)
  subtitleClass:
    "absolute left-1/2 top-[calc(100%+12px)] -translate-x-1/2 " + // mobile: centrado debajo del título
    "md:left-[14%] md:top-[115%] md:translate-x-0 " +               // desktop: mueve a posición exacta
    "uppercase text-black font-black tracking-[0.18em] text-[0.95rem] md:text-2xl",

  // Secciones en columna (cuando sectionsVariant === "columnRight")
  sectionsColumnClass:
    "hidden md:flex flex-col gap-2 uppercase text-black font-semibold tracking-[0.15em] text-sm absolute right-[2%] top-[58%]",

  // Secciones en fila (cuando sectionsVariant === "rowUnder")
  sectionsRowClass:
    "mt-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-1 uppercase text-black/90 text-xs md:text-sm tracking-[0.2em] text-left",

  // Altura del hero (espaciador para que no corte overlays)
  spacerClass: "h-[42vw] md:h-[190px]",
};
