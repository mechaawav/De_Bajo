import React from "react";

type Props = {
  background?: string; // color hex
  children: React.ReactNode;
};

export default function PosterLayout({ background = "#C7332E", children }: Props) {
  return (
    <section
      className="relative"
      style={{ background }}
    >
      <div className="relative mx-auto max-w-[1280px] px-4 py-16 md:py-20">
        {children}
      </div>
    </section>
  );
}
