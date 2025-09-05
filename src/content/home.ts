// src/content/home.ts
// Todo lo editable vive acá: textos, colores, posiciones, variantes.

import type { AnimatedHighlight } from "@/components/hero/PosterTitle";
import type { FontKey } from "@/styles/fonts";

// Animación de la "A" (D=0, E=1, _=2, B=3, A=4, J=5, O=6)
// lockBox: fija una caja al tamaño máximo (evita reflow)
// normalize: "height" iguala la altura visual entre fuentes
const animatedA: AnimatedHighlight = {
  index: 4,
  intervalMs: 900,
  padX: ".14em",
  padY: ".10em",
  lockBox: true,
  normalize: "height",
  steps: [
    { bgClass: "bg-black",      charClass: "text-white",        font: "bebas" as FontKey },
    { bgClass: "bg-white",      charClass: "text-black",        font: "anton" as FontKey },
    { bgClass: "bg-[#0A0A0A]",  charClass: "text-[#C7332E]",    font: "oswald" as FontKey },
    { bgClass: "bg-[#C7332E]",  charClass: "text-white",        font: "archivoBlack" as FontKey },
  ],
};

export const heroContent = {
  colors: {
    background: "#C7332E", // rojo poster
  },

  title: "DE_BAJO",
  subtitle: "LA REVISTA DEL UNDER DE CÓRDOBA",
  sections: ["POESÍA", "MÚSICA", "EVENTOS", "LECTURA", "ENTREVISTAS"],

  // Si usás highlights estáticos, dejalos acá (evitá usar index:4 junto con la animación)
  titleHighlights: [] as Array<never>,

  // Variante de secciones
  sectionsVariant: "columnRight" as "columnRight" | "rowUnder",

  // Posición/tamaño de la polaroid
  polaroid: {
    src: "/hero/polaroid.png",  // PNG local en /public/hero/
    alt: "Imagen editorial",
    boxClass: "w-[30vw] max-w-[250px] aspect-[5/5]",
    frameClass:
      "absolute right-[15%] top-[45%] rotate-2 shadow-[0_18px_50px_rgba(0,0,0,.35)]",
  },

  // Estilo del título (corrijo leading inválido a 0.8 para métricas estables)
  titleClass:
    "uppercase text-black font-black leading-[0.8] tracking-[-0.03em] text-[19vw] md:text-[15rem] text-center",

  // Subtítulo con posición ABSOLUTA
  subtitleClass:
    "absolute left-1/2 top-[calc(100%+12px)] -translate-x-1/2 " +
    "md:left-[14%] md:top-[115%] md:translate-x-0 " +
    "uppercase text-black font-black tracking-[0.18em] text-[0.95rem] md:text-2xl",

  // Secciones en columna (cuando sectionsVariant === "columnRight")
  sectionsColumnClass:
    "hidden md:flex flex-col gap-2 uppercase text-black font-semibold tracking-[0.15em] text-sm absolute right-[2%] top-[58%]",

  // Secciones en fila (cuando sectionsVariant === "rowUnder")
  sectionsRowClass:
    "mt-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-1 uppercase text-black/90 text-xs md:text-sm tracking-[0.2em] text-left",

  // Altura del hero (espaciador para que no corte overlays)
  spacerClass: "h-[42vw] md:h-[190px]",

  // ← Animación de la “A” (leída en HeroFullframe → PosterTitle)
  animatedA,
};
