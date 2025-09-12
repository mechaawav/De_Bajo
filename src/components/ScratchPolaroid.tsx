"use client";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type PrizeKey = "retry" | "amargo" | "preview" | "cat";
type Prize = { key: PrizeKey; label: string; weight: number };

const PRIZES: Prize[] = [
  { key: "retry",   label: "Intenta de nuevo en una semana",                weight: 60 },
  { key: "cat",     label: "¡Foto del gatito de la revista!",               weight: 25 },
  { key: "preview", label: "¡Adelanto de la próxima revista!",              weight: 12 },
  { key: "amargo",  label: "¡Ganaste un Amargo Obrero en un mundo feliz!",  weight: 3  },
];

function pickPrize(): Prize {
  const total = PRIZES.reduce((a, p) => a + p.weight, 0);
  let r = Math.random() * total;
  for (const p of PRIZES) {
    if ((r -= p.weight) <= 0) return p;
  }
  return PRIZES[0];
}

// type guard para touch events
function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
  return typeof (e as any).touches !== "undefined";
}

export default function ScratchPolaroid({
  src,
  alt,
  frameClass = "",
  boxClass = "w-[68vw] max-w-[400px] aspect-[4/5]",
  revealThreshold = 0.55,
  onReveal,
  catImage = "/hero/cat.png",
}: {
  src: string | StaticImageData;
  alt: string;
  frameClass?: string;
  boxClass?: string;
  revealThreshold?: number; // 0..1
  onReveal?: (p: Prize) => void;
  catImage?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);

  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.scale(dpr, dpr);

    // Cobertura inicial
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(180,180,180,0.95)";
    ctx.fillRect(0, 0, rect.width, rect.height);

    let scratching = false;
    const radius = 18;

    const scratch = (x: number, y: number) => {
      if (!scratching) return;
      ctx.globalCompositeOperation = "destination-out";
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    // devuelve tupla [x, y] → evita Object.values()
    const pos = (e: MouseEvent | TouchEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      if (isTouchEvent(e)) {
        const t = e.touches[0];
        return [t.clientX - r.left, t.clientY - r.top];
      } else {
        return [(e as MouseEvent).clientX - r.left, (e as MouseEvent).clientY - r.top];
      }
    };

    const onDown = (e: MouseEvent | TouchEvent) => {
      scratching = true;
      const [x, y] = pos(e);
      scratch(x, y);
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!scratching) return;
      const [x, y] = pos(e);
      scratch(x, y);
    };
    const onUp = () => {
      scratching = false;
      // Medir transparencia
      try {
        const snap = ctx.getImageData(0, 0, Math.floor(rect.width), Math.floor(rect.height)).data;
        let cleared = 0;
        for (let i = 3; i < snap.length; i += 4) if (snap[i] < 128) cleared++;
        const ratio = cleared / (snap.length / 4);
        if (ratio > revealThreshold) {
          const p = pickPrize();
          setPrize(p);
          setRevealed(true);
          onReveal?.(p);
        }
      } catch {
        // noop (por seguridad cross-origin si alguna vez la imagen no es same-origin)
      }
    };

    // Listeners (tipados)
    canvas.addEventListener("mousedown", onDown as EventListener);
    canvas.addEventListener("mousemove", onMove as EventListener);
    window.addEventListener("mouseup", onUp as EventListener);
    canvas.addEventListener("touchstart", onDown as EventListener, { passive: true });
    canvas.addEventListener("touchmove", onMove as EventListener, { passive: true });
    window.addEventListener("touchend", onUp as EventListener);

    return () => {
      canvas.removeEventListener("mousedown", onDown as EventListener);
      canvas.removeEventListener("mousemove", onMove as EventListener);
      window.removeEventListener("mouseup", onUp as EventListener);
      canvas.removeEventListener("touchstart", onDown as EventListener);
      canvas.removeEventListener("touchmove", onMove as EventListener);
      window.removeEventListener("touchend", onUp as EventListener);
    };
  }, [revealed, revealThreshold, onReveal]);

  return (
    <div className={["bg-white rounded-[6px] p-2 pb-6", frameClass].join(" ")}>
      <div className={["relative overflow-hidden", boxClass].join(" ")}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width:768px) 68vw, 400px"
          priority
        />

        {!revealed && (
          <canvas ref={canvasRef} className="absolute inset-0 cursor-pointer" />
        )}

        {revealed && prize && (
          <div className="absolute inset-x-0 bottom-0 p-3 bg-black/65 text-white text-center text-sm">
            {prize.label}
          </div>
        )}

        {revealed && prize?.key === "cat" && (
          <div className="absolute right-2 top-2 w-16 h-16 rounded-md overflow-hidden ring-2 ring-white">
            <Image src={catImage} alt="gatito" fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
