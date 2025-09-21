export default function MagazineCard({
  cover,
  title,
  slug,
  onRead,
  available = true,
}) {
  return (
    <article className="card">
      <img
        className="cover"
        src={cover}
        alt={`${title} — portada`}
        loading="lazy"
        decoding="async"
      />

      {/* Botón arriba-izquierda dentro de la tarjeta */}
      <button
        type="button"
        className={`card-action${available ? '' : ' is-disabled'}`}
        disabled={!available}
        aria-disabled={!available}
        onClick={available ? () => onRead?.(slug) : undefined}
      >
        {available ? 'Leer' : 'Próximamente'}
      </button>

      {/* Meta de la card */}
      <div className="meta">
        <span className="edition">{title}</span>
      </div>
    </article>
  );
}

