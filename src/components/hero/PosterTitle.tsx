"use client";
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  index: number;
  steps: Array<{ bgClass: string; charClass: string; font: FontKey }>;
  intervalMs?: number;
  padX?: string;
  padY?: string;
  containerClass?: string;
  lockBox?: boolean;
  normalize?: "height" | "both" | false;
};

type Props = {
  text: string;
  className?: string;
  highlights?: Highlight[];
  animatedHighlight?: AnimatedHighlight;
};

export default function PosterTitle({ text, className = "", highlights = [], animatedHighlight }: Props) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const byIndex = useMemo(() => new Map(highlights.map((h) => [h.index, h])), [highlights]);
  const [step, setStep] = useState(0);
  const [box, setBox] = useState<{ w: number; h: number } | null>(null);
  const [scales, setScales] = useState<Array<{ sx: number; sy: number }> | null>(null);

  const measure = async () => {
    const a = animatedHighlight;
    if (!a?.steps?.length) { setBox(null); setScales(null); return; }
    const root = rootRef.current; if (!root) return;

    const cs = getComputedStyle(root);
    const fontSize = cs.fontSize; const fontWeight = cs.fontWeight; const letterSpacing = cs.letterSpacing;
    const ch = Array.from(text)[a.index] ?? "A";

    try {
      //ts-expect-error
      await (document.fonts?.ready ?? Promise.resolve());
      //ts-expect-error
      const promises = a.steps.map(() => document.fonts?.load?.(`${fontWeight} ${fontSize} "${ch}"`));
      await Promise.all(promises.filter(Boolean));
    } catch {}

    const tmp = document.createElement("div");
    tmp.style.position = "absolute"; tmp.style.visibility = "hidden"; tmp.style.pointerEvents = "none"; tmp.style.whiteSpace = "pre";
    document.body.appendChild(tmp);

    let maxW = 0, maxH = 0; const dims: Array<{ w: number; h: number }> = [];
    for (const s of a.steps) {
      const span = document.createElement("span");
      span.textContent = ch;
      span.className = `${fontMap[s.font]}`;
      span.style.fontSize = fontSize; span.style.fontWeight = fontWeight; span.style.letterSpacing = letterSpacing;
      tmp.appendChild(span);
      const rect = span.getBoundingClientRect();
      const w = rect.width || 1; const h = rect.height || 1;
      dims.push({ w, h }); maxW = Math.max(maxW, w); maxH = Math.max(maxH, h);
      tmp.removeChild(span);
    }
    document.body.removeChild(tmp);

    if (a.lockBox !== false) setBox({ w: Math.ceil(maxW), h: Math.ceil(maxH) }); else setBox(null);

    const mode = a.normalize ?? "height";
    if (mode === false) setScales(dims.map(() => ({ sx: 1, sy: 1 })));
    else if (mode === "height") setScales(dims.map(({ h }) => ({ sx: 1, sy: maxH / h })));
    else setScales(dims.map(({ w, h }) => ({ sx: maxW / w, sy: maxH / h })));
  };

  useLayoutEffect(() => { measure(); /* eslint-disable-next-line */ }, [text, JSON.stringify(animatedHighlight?.steps)]);
  useEffect(() => {
    if (!animatedHighlight?.steps?.length) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line
  }, [animatedHighlight]);

  useEffect(() => {
    if (!animatedHighlight?.steps?.length) return;
    const ms = animatedHighlight.intervalMs ?? 900;
    const id = setInterval(() => setStep((s) => (s + 1) % animatedHighlight.steps.length), ms);
    return () => clearInterval(id);
  }, [animatedHighlight]);

  return (
    <h1 ref={rootRef} className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => {
        if (animatedHighlight && i === animatedHighlight.index) {
          const s = animatedHighlight.steps[step];
          const padX = animatedHighlight.padX ?? ".14em";
          const padY = animatedHighlight.padY ?? ".10em";
          const fontCls = fontMap[s.font];
          const lock = animatedHighlight.lockBox !== false && box;
          const scale = scales?.[step] ?? { sx: 1, sy: 1 };

          return (
            <span key={i} className={`relative inline-flex items-center justify-center align-baseline ${animatedHighlight.containerClass ?? ""}`}
              style={lock ? { width: `${box!.w}px`, height: `${box!.h}px`, lineHeight: `${box!.h}px`, verticalAlign: "baseline" } : { verticalAlign: "baseline" }}>
              <span aria-hidden className={`absolute -z-10 block ${s.bgClass}`}
                style={{ left: `calc(-1 * ${padX})`, right: `calc(-1 * ${padX})`, top: `calc(-1 * ${padY})`, bottom: `calc(-1 * ${padY})` }} />
              <span className={`${s.charClass} ${fontCls}`} style={{ transform: `scale(${scale.sx}, ${scale.sy})`, transformOrigin: "center bottom", display: "inline-block" }}>
                {ch}
              </span>
            </span>
          );
        }

        const h = byIndex.get(i);
        if (h) {
          const padX = h.padX ?? ".12em"; const padY = h.padY ?? ".06em";
          return (
            <span key={i} className={`relative inline-block ${h.containerClass ?? ""}`} style={{ verticalAlign: "baseline" }}>
              <span aria-hidden className={`absolute -z-10 block ${h.bgClass ?? "bg-black"}`}
                style={{ left: `calc(-1 * ${padX})`, right: `calc(-1 * ${padX})`, top: `calc(-1 * ${padY})`, bottom: `calc(-1 * ${padY})` }} />
              <span className={h.charClass ?? "text-white"}>{ch}</span>
            </span>
          );
        }
        return <span key={i} style={{ verticalAlign: "baseline" }}>{ch}</span>;
      })}
    </h1>
  );
}
