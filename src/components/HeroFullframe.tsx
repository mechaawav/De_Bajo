import Image from "next/image";
import {
  Polaroid,
  PosterLayout,
  PosterSections,
  PosterSubtitle,
  PosterTitle,
} from "@/components/hero";
import { heroContent } from "@/content/home";
import RetroCursor from "@/components/RetroCursor";

export default function HeroFullframe() {
  const c = heroContent;

  return (
    <PosterLayout background={c.colors.background}>
      <RetroCursor />

      <div className="relative grain-max-b">
        {/* Polaroid */}
        <div className={`absolute z-30 ${c.polaroid.frameClass}`}>
          <Polaroid
            src={c.polaroid.src}
            alt={c.polaroid.alt}
            boxClass={c.polaroid.boxClass}
          />
        </div>

        {/* Título + Subtítulo */}
        <div className="relative z-20">
          <PosterTitle
            text={c.title}
            className={c.titleClass}
            highlights={c.titleHighlights}
            animatedHighlight={c.animatedA}
          />

          {/* 📌 Pin sobre la O */}
          <div className="absolute left-[7%] top-[109%] rotate-12 z-30 pointer-events-none">
            <Image
              src="/hero/safetypin.svg"
              alt="Pin"
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </div>

          <PosterSubtitle text={c.subtitle} className={c.subtitleClass} />
        </div>

        {/* Secciones */}
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

        <div className={c.spacerClass} />
      </div>
    </PosterLayout>
  );
}

