import Image from "next/image";

export type CardConfig = {
  aspectClass: string;
  hoverScaleClass: string;
  overlayClass: string;
  badgeClass: string;
  titleClass: string;
  subtitleClass: string;
  footerButtonClass: string;
  footerLabel: string;
};

type Props = { title?: string; coverSrc?: string; soon?: boolean; config: CardConfig; };

export default function ComingSoonCard({ title = "Próximamente", coverSrc, soon = true, config }: Props) {
  return (
    <article className="group overflow-hidden rounded-xl bg-white ring-1 ring-black/5 shadow-sm">
      <div className={`relative ${config.aspectClass}`}>
        {coverSrc ? (
          <Image src={coverSrc} alt={title} fill className={`object-cover transition-transform duration-500 ${config.hoverScaleClass}`} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200 via-neutral-300 to-neutral-400" />
        )}
        {soon && (<span className={`absolute left-3 top-3 ${config.badgeClass}`}>Próximamente</span>)}
        <div className={`pointer-events-none absolute inset-0 ${config.overlayClass} opacity-0 transition group-hover:opacity-100`} />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className={config.titleClass}>{title}</h3>
          <p className={config.subtitleClass}>Edición en preparación</p>
        </div>
      </div>
      <div className="p-4">
        <button type="button" disabled className={config.footerButtonClass} title="Disponible pronto">
          {config.footerLabel}
        </button>
      </div>
    </article>
  );
}
