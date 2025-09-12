"use client";
import { useEffect, useRef, useState } from "react";

const CLICKABLE = 'a,button,[role="button"],input,textarea,select,summary,.cursor-pointer';

export default function RetroCursor() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<"arrow" | "hand">("arrow");

  useEffect(() => {
    document.body.classList.add("retro-cursor-active");
    const onMove = (e: MouseEvent) => {
      if (ref.current) ref.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const el = e.target as Element | null;
      const clickable = el && typeof (el as any).closest === "function" && el.closest(CLICKABLE);
      setMode(clickable ? "hand" : "arrow");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("retro-cursor-active");
    };
  }, []);

  return (
    <div ref={ref} className={`retro-cursor ${mode === "hand" ? "retro-cursor--hand" : ""}`} aria-hidden>
      {mode === "hand" ? <HandSVG /> : <ArrowSVG />}
    </div>
  );
}

function ArrowSVG() {
  return (
    <svg className="retro-cursor__svg" viewBox="0 0 16 16" shapeRendering="crispEdges">
      <path d="M1 1 L11 7 L7 7 L7 13 L5 13 L5 7 L1 7 Z" fill="#0A0A0A" />
      <path d="M7 7 L11 7 L8 9 L7 13 Z" fill="#000" opacity=".35" />
    </svg>
  );
}
function HandSVG() {
  return (
    <svg className="retro-cursor__svg" viewBox="0 0 18 18" shapeRendering="crispEdges">
      <path d="M6 2h2v6h1V3h2v5h1V4h2v7l-2 4H8l-2-3z" fill="#0A0A0A" />
      <path d="M8 12h4l-1 2H9z" fill="#000" opacity=".35" />
    </svg>
  );
}
