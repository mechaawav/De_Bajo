import { ReactNode } from "react";

type Props = { title: string; lead?: string; children?: ReactNode; background?: string; };

export default function PageShell({ title, lead, children, background = "#C7332E" }: Props) {
  return (
    <section className="relative grain-max-bg min-h-dvh overflow-hidden" style={{ background }}>
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8">
        <h1 className="grain-max-text uppercase font-black tracking-[-0.03em] leading-[0.9] text-[16vw] md:text-7xl text-black">
          {title}
        </h1>
        {lead ? <p className="mt-4 text-[#C7332E] uppercase font-black tracking-[.18em] text-sm md:text-base">{lead}</p> : null}
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12">
        <div className="bg-white text-black rounded-2xl shadow-2xl ring-1 ring-black/10 p-6 md:p-10">
          {children}
        </div>
      </div>
    </section>
  );
}
