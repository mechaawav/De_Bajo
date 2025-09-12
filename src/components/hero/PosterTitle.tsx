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
  index: number;
  steps: Array<{ bgClass: string; charClass: string; font: FontKey }>;
  intervalMs?: number;
  padX?: string;
  padY?: string;
  containerClass?: string;
  lockBox?: boolean;
  normalize?: "height" | "both" | false;
};

type PinConfig = {
  show?: boolean;
  mode?: "behind" | "through";
  className?: string;
  rotateDeg?: number;
  offsetX?: string; // relativo al char box
  offsetY?: string;
};

type Props = {
  text: string;
  className?: string;
  highlights?: Highlight[];
  animatedHighlight?: AnimatedHighlight;
  pin?: PinConfig; // ← nuevo
};

export default function PosterTitle({
  text,
  className = "",
  highlights = [],
  animatedHighlight,
  pin,
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

    try {
      // ts-expect-error Font Loading API
      await (document.fonts?.ready ?? Promise.resolve());
      // ts-expect-error Font Loading API
      const promises = a.steps.map(() =>
        document.fonts?.load?.(`${fontWeight} ${fontSize} "${ch}"`)
      );
      await Promise.all(promises.filter(Boolean));
    } catch {
      /* noop */
    }

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

    if (a.lockBox !== false) setBox({ w: Math.ceil(maxW), h: Math.ceil(maxH) });
    else setBox(null);

    const mode = a.normalize ?? "height";
    if (mode === false) setScales(dims.map(() => ({ sx: 1, sy: 1 })));
    else if (mode === "height")
      setScales(dims.map(({ h }) => ({ sx: 1, sy: maxH / h })));
    else setScales(dims.map(({ w, h }) => ({ sx: maxW / w, sy: maxH / h })));
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, JSON.stringify(animatedHighlight?.steps)]);

  useEffect(() => {
    const a = animatedHighlight;
    if (!a?.steps?.length) return;
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatedHighlight]);

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
        if (animatedHighlight && i === animatedHighlight.index) {
          const s = animatedHighlight.steps[step];
          const padX = animatedHighlight.padX ?? ".14em";
          const padY = animatedHighlight.padY ?? ".10em";
          const fontCls = fontMap[s.font];
          const lock = animatedHighlight.lockBox !== false && box;
          const scale = scales?.[step] ?? { sx: 1, sy: 1 };

          // Config del pin
          const pinCfg: PinConfig = {
            show: pin?.show,
            mode: pin?.mode ?? "through",
            className: pin?.className ?? "text-black/80",
            rotateDeg: pin?.rotateDeg ?? -20,
            offsetX: pin?.offsetX ?? "-0.1em",
            offsetY: pin?.offsetY ?? "-0.3em",
          };

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
              {/* PIN */}
              {pinCfg.show && (
                <span
                  aria-hidden
                  className={`absolute ${
                    pinCfg.mode === "behind" ? "-z-20" : "z-20"
                  } ${pinCfg.className}`}
                  style={{
                    transform: `rotate(${pinCfg.rotateDeg}deg)`,
                    left: pinCfg.offsetX,
                    top: pinCfg.offsetY,
                  }}
                >
                  <PinSVG />
                </span>
              )}

              {/* Rect de fondo */}
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

              {/* Letra animada */}
              <span
                className={`${s.charClass} ${fontCls}`}
                style={{
                  transform: `scale(${scale.sx}, ${scale.sy})`,
                  transformOrigin: "center bottom",
                  display: "inline-block",
                }}
              >
                {ch}
              </span>
            </span>
          );
        }

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

        return (
          <span key={i} style={{ verticalAlign: "baseline" }}>
            {ch}
          </span>
        );
      })}
    </h1>
  );
}

/** Pin estilo chinche */
function PinSVG() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="6" r="3.5" fill="currentColor" />
      <rect x="10.8" y="8" width="2.4" height="10" rx="1.2" fill="currentColor" />
      <path d="M12 18 L12 24" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
