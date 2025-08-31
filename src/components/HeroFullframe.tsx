"use client";
import {
  Polaroid,
  PosterLayout,
  PosterSections,
  PosterSubtitle,
  PosterTitle,
} from "@/components/hero";
import { heroContent } from "@/content/home";

export default function HeroFullframe() {
  const c = heroContent;

  return (
    <PosterLayout background={c.colors.background}>
      {/* Polaroid superpuesta (absolute) */}
      <div className={`absolute z-30 ${c.polaroid.frameClass}`}>
        <Polaroid
          src={c.polaroid.src}
          alt={c.polaroid.alt}
          boxClass={c.polaroid.boxClass}
        />
      </div>

      {/* Título + Subtítulo (pueden tener centrado propio) */}
      <div className="relative z-20">
        <PosterTitle
  text={c.title}
  className={c.titleClass}
  highlights={c.titleHighlights}   // ← LEE lo que pusiste en home.ts
/>

        <PosterSubtitle text={c.subtitle} className={c.subtitleClass} />
      </div>

      {/* Secciones: dos variantes controladas desde el content */}
      {c.sectionsVariant === "columnRight" ? (
        <PosterSections
          items={c.sections}
          variant="columnRight"
          className={`${c.sectionsColumnClass} z-20`}
        />
      ) : (
        <PosterSections
          items={c.sections}
          variant="rowUnder"
          className={c.sectionsRowClass}
        />
      )}

      {/* Altura del hero para no cortar overlays */}
      <div className={c.spacerClass} />
    </PosterLayout>
  );
}

