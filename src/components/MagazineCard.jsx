export default function MagazineCard({ cover, title, slug, onRead, available = true }) {
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
        aria-disabled={!available}
        onClick={available ? onRead : undefined}
      >
        {available ? 'Leer' : 'Próximamente'}
      </button>

      {/* Meta de la card (si tenías un link acá, quedará oculto por CSS) */}
      <div className="meta">
        <span className="edition">{title}</span>
        {/* <a className="link" href={`/revistas/${slug}`}>Leer</a> */}
      </div>
    </article>
  );
}
