import { useState } from 'react';
import MagazineCard from './MagazineCard.jsx';
import EmailModal from './EmailModal.jsx';

const magazines = [
  { title: 'De_Bajo #1', cover: '/images/portada1.jpg', slug: 'revista-1' },
  { title: 'De_Bajo #2', cover: '/images/portada2.jpg', slug: 'revista-2' },
  { title: 'De_Bajo #3', cover: '/images/portada3.jpg', slug: 'revista-3' },
];

export default function Revistas() {
  const [modal, setModal] = useState({ open: false, magazine: null });

  const onRead = (slug) => setModal({ open: true, magazine: slug });

  return (
    <section id="revistas" className="section">
      <div className="container">
        <h2 style={{ margin: 0, marginBottom: 16, fontSize: 32, letterSpacing: '.1em' }}>
          Revistas
        </h2>

        <div className="cards">
          {magazines.map((m) => (
            <MagazineCard
              key={m.slug}
              cover={m.cover}
              title={m.title}
              slug={m.slug}
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
