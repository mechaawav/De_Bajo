import { useState } from 'react';
import MagazineCard from './MagazineCard.jsx';
import EmailModal from './EmailModal.jsx';

const magazines = [
  { title: 'De_Bajo #1', cover: '/images/ari.jpg',  slug: 'revista-1', available: true  },
  { title: 'De_Bajo #2', cover: '/images/mile.jpg', slug: 'revista-2', available: false },
  { title: 'De_Bajo #3', cover: '/images/mecha.jpg',slug: 'revista-3', available: false },
];

export default function Revistas() {
  const [modal, setModal] = useState({ open: false, magazine: null });

  const onRead = (slug) => setModal({ open: true, magazine: slug });

  return (
    <section id="revistas" className="section">
      <div className="container">
        {/* Título con el mismo estilo que “Nuestra historia” */}
        <h2
          className="section-title"
          style={{
            ['--st-size']: 'clamp(36px, 7vw, 88px)',
            ['--st-letter']: '.08em',
            ['--st-tx']: '0px',
            ['--st-ty']: '0px',
          }}
        >
          Revistas
        </h2>

        {/* Grilla de tarjetas (con clase 'magazines' para el botón arriba-izq) */}
        <div className="cards magazines">
          {magazines.map((m) => (
            <MagazineCard
              key={m.slug}
              cover={m.cover}
              title={m.title}
              slug={m.slug}
              available={m.available !== false}
              onRead={() => onRead(m.slug)}
            />
          ))}
        </div>

        <EmailModal
          open={modal.open}
          magazine={modal.magazine}
          onClose={() => setModal((s) => ({ ...s, open: false }))}
        />
      </div>
    </section>
  );
}
