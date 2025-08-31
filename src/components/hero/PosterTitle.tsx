import React from "react";

type Highlight = {
  index: number;           // índice del carácter (0-based)
  bgClass?: string;        // clases del rectángulo (bg-*, etc.)
  charClass?: string;      // clases del carácter (p.ej. text-white)
  padX?: string;           // padding horizontal (ej. ".14em")
  padY?: string;           // padding vertical (ej. ".10em")
  containerClass?: string; // opcional extra
};

type Props = {
  text: string;
  className?: string;
  highlights?: Highlight[]; // ← NUEVO
};

export default function PosterTitle({
  text,
  className = "",
  highlights = [],
}: Props) {
  const byIndex = new Map(highlights.map(h => [h.index, h]));

  return (
    <h1 className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => {
        const h = byIndex.get(i);
        if (!h) return <span key={i}>{ch}</span>;

        const padX = h.padX ?? ".12em";
        const padY = h.padY ?? ".06em";

        return (
          <span key={i} className={`relative inline-block ${h.containerClass ?? ""}`}>
            {/* rectángulo detrás */}
            <span
              aria-hidden
              className={`absolute -z-10 block ${h.bgClass ?? "bg-black"}`}
              style={{
                left: `calc(-1 * ${padX})`,
                right: `calc(-1 * ${padX})`,
                top: `calc(-1 * ${padY})`,
                bottom: `calc(-1 * ${padY})`,
              }}
            />
            {/* carácter */}
            <span className={h.charClass ?? "text-white"}>{ch}</span>
          </span>
        );
      })}
    </h1>
  );
}
