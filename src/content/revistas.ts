// Todo lo editable de la página /revistas vive acá.
export const revistasContent = {
  header: {
    title: "Revistas",
    subtitle:
      "Publicamos una edición nueva cada mes. Por ahora, te dejamos un adelanto de lo que se viene.",
  },

  // Layout del grid
  gridClass: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",

  // Config visual de cada tarjeta (podés tunear clases sin tocar TSX)
  card: {
    aspectClass: "aspect-[3/4]",
    hoverScaleClass: "group-hover:scale-[1.03]",
    overlayClass: "bg-black/30",
    badgeClass:
      "rounded-full bg-amber-500/95 px-2 py-0.5 text-[11px] font-semibold text-black shadow",
    titleClass:
      "text-white text-lg font-semibold tracking-wide group-hover:underline decoration-2 underline-offset-4",
    subtitleClass: "mt-0.5 text-white/85 text-xs",
    footerButtonClass:
      "inline-flex cursor-not-allowed items-center rounded-md bg-neutral-900/5 px-3 py-1.5 text-sm font-medium text-neutral-500",
    footerLabel: "Disponible pronto",
  },

  // Tarjetas (agregá/quità o cambiá orden)
  items: [
    { title: "Edición 01", coverSrc: "/revistas/debajo1.png", soon: true },
    { title: "Edición 02", coverSrc: "/revistas/debajo2.png", soon: true },
    { title: "Edición 03", coverSrc: "/revistas/debajo1.png", soon: true },
  ],
};
