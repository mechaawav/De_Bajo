"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fontMap, type FontKey } from "@/styles/fonts";

export type Highlight = {
  index: number;
  bgClass?: string;
  charClass?: string;
  padX?: string;
  padY?: string;
  containerClass?: string;
};

export type AnimatedHighlight = {
  index: number; // carácter a animar (0-based)
  steps: Array<{ bgClass: string; charClass: string; font: FontKey }>;
  intervalMs?: number;
  padX?: string; // marco horizontal del rect
  padY?: string; // marco vertical del rect
  containerClass?: string;
  lockBox?: boolean; // true = fija ancho/alto al máximo (evita reflow)
  normalize?: "height" | "both" | false; // ← normaliza tamaño visual
};

type Props = {
  text: string;
  className?: string;
  highlights?: Highlight[];
  animatedHighlight?: AnimatedHighlight;
};

export default function PosterTitle({
  text,
  className = "",
  highlights = [],
  animatedHighlight,
}: Props) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const byIndex = useMemo(
    () => new Map(highlights.map((h) => [h.index, h])),
    [highlights]
  );

  const [step, setStep] = useState(0);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [scales, setScales] = useState<Array<{ sx: number; sy: number }> | null>(
    null
  );

  // --- Medición segura (tras carga de fuentes) ---
  const measure = async () => {
    const a = animatedHighlight;
    if (!a?.steps?.length) {
      setBox(null);
      setScales(null);
      return;
    }
    const root = rootRef.current;
    if (!root) return;

    const cs = getComputedStyle(root);
    const fontSize = cs.fontSize;
    const fontWeight = cs.fontWeight;
    const letterSpacing = cs.letterSpacing;

    const ch = Array.from(text)[a.index] ?? "A";

    // Esperamos carga de fuentes (si el browser lo soporta)
    try {
      //ts-expect-error Font Loading API
      await (document.fonts?.ready ?? Promise.resolve());
      //ts-expect-error Font Loading API
      const promises = a.steps.map(() =>
        // hint de carga con tamaño/peso (la API no permite setear familia por class, igual ayuda)
        document.fonts?.load?.(`${fontWeight} ${fontSize} "${ch}"`)
      );
      await Promise.all(promises.filter(Boolean));
    } catch {
      /* noop */
    }

    // Contenedor temporal para medir cada fuente (usando las className reales)
    const tmp = document.createElement("div");
    tmp.style.position = "absolute";
    tmp.style.visibility = "hidden";
    tmp.style.pointerEvents = "none";
    tmp.style.whiteSpace = "pre";
    document.body.appendChild(tmp);

    let maxW = 0;
    let maxH = 0;
    const dims: Array<{ w: number; h: number }> = [];

    for (const s of a.steps) {
      const span = document.createElement("span");
      span.textContent = ch;
      span.className = `${fontMap[s.font]}`;
      span.style.fontSize = fontSize;
      span.style.fontWeight = fontWeight;
      span.style.letterSpacing = letterSpacing;
      tmp.appendChild(span);
      const rect = span.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;
      dims.push({ w, h });
      maxW = Math.max(maxW, w);
      maxH = Math.max(maxH, h);
      tmp.removeChild(span);
    }

    document.body.removeChild(tmp);

    // lockBox: fijamos la caja al máximo (evita reflow)
    if (a.lockBox !== false) {
      setBox({ w: Math.ceil(maxW), h: Math.ceil(maxH) });
    } else {
      setBox(null);
    }

    // normalize: calculamos escalas por step
    const mode = a.normalize ?? "height";
    if (mode === false) {
      setScales(dims.map(() => ({ sx: 1, sy: 1 })));
    } else if (mode === "height") {
      setScales(dims.map(({ h }) => ({ sx: 1, sy: maxH / h })));
    } else {
      // both: iguala alto y ancho visual
      setScales(dims.map(({ w, h }) => ({ sx: maxW / w, sy: maxH / h })));
    }
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, JSON.stringify(animatedHighlight?.steps)]);

  // Re-medimos en resize (si cambia font-size por viewport)
  useEffect(() => {
    const a = animatedHighlight;
    if (!a?.steps?.length) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedHighlight]);

  // Animación por intervalo (sin remount del nodo)
  useEffect(() => {
    if (!animatedHighlight?.steps?.length) return;
    const ms = animatedHighlight.intervalMs ?? 900;
    const id = setInterval(
      () => setStep((s) => (s + 1) % animatedHighlight.steps.length),
      ms
    );
    return () => clearInterval(id);
  }, [animatedHighlight]);

  return (
    <h1 ref={rootRef} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => {
        // Carácter animado, con caja fija + normalización
        if (animatedHighlight && i === animatedHighlight.index) {
          const s = animatedHighlight.steps[step];
          const padX = animatedHighlight.padX ?? ".14em";
          const padY = animatedHighlight.padY ?? ".10em";
          const fontCls = fontMap[s.font];
          const lock = animatedHighlight.lockBox !== false && box;
          const scale = scales?.[step] ?? { sx: 1, sy: 1 };

          return (
            <span
              key={i}
              className={`relative inline-flex items-center justify-center align-baseline ${
                animatedHighlight.containerClass ?? ""
              }`}
              style={
                lock
                  ? {
                      width: `${box!.w}px`,
                      height: `${box!.h}px`,
                      lineHeight: `${box!.h}px`,
                      verticalAlign: "baseline",
                    }
                  : { verticalAlign: "baseline" }
              }
            >
              {/* Rectángulo de fondo (no se escala) */}
              <span
                aria-hidden
                className={`absolute -z-10 block ${s.bgClass}`}
                style={{
                  left: `calc(-1 * ${padX})`,
                  right: `calc(-1 * ${padX})`,
                  top: `calc(-1 * ${padY})`,
                  bottom: `calc(-1 * ${padY})`,
                }}
              />
              {/* Letra animada (se normaliza) */}
              <span
                className={`${s.charClass} ${fontCls}`}
                style={{
                  transform: `scale(${scale.sx}, ${scale.sy})`,
                  transformOrigin: "center bottom", // alinea con baseline
                  display: "inline-block",
                }}
              >
                {ch}
              </span>
            </span>
          );
        }

        // Carácter con highlight estático
        const h = byIndex.get(i);
        if (h) {
          const padX = h.padX ?? ".12em";
          const padY = h.padY ?? ".06em";
          return (
            <span
              key={i}
              className={`relative inline-block ${h.containerClass ?? ""}`}
              style={{ verticalAlign: "baseline" }}
            >
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
              <span className={h.charClass ?? "text-white"}>{ch}</span>
            </span>
          );
        }

        // Carácter normal
        return (
          <span key={i} style={{ verticalAlign: "baseline" }}>
            {ch}
          </span>
        );
      })}
    </h1>
  );
}

