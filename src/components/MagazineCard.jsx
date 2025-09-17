export default function MagazineCard({ cover, title, slug, onRead }) {
return (
<div className="card shadow-card">
<img src={cover} alt={title} />
<div className="card-bar">
<strong>{title}</strong>
<button className="btn" onClick={() => onRead(slug, title)}>Leer</button>
</div>
</div>
);
}