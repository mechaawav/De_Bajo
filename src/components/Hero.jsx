import { useEffect, useState } from 'react';


const FONTS = [
'Bebas Neue',
'Playfair Display',
'Oswald',
'Space Grotesk',
'Impact',
'Georgia',
'Courier New'
];


export default function Hero() {
  // =============================
  // CONTROLES – editá solo estos valores
  // Positivo X => derecha | Negativo X => izquierda
  // Positivo Y => abajo   | Negativo Y => arriba
  // Acepta px, %, vw, rem, etc.
  // =============================
  const heroVars = {
    /* TÍTULO GIGANTE */
    '--title-tx': '0px',
    '--title-ty': '0px',
    '--title-scale': '2.1',

    /* BLOQUE BLANCO DETRÁS DE LA “A” (posición base + micro-ajustes) */
    '--a-left': '52%',
    '--a-top': '8%',
    '--a-w': '13%',
    '--a-h': '72%',
    '--a-tx': '0px',   // micro X del bloque
    '--a-ty': '0px',   // micro Y del bloque

    /* LETRA “A” (independiente del bloque) */
    '--a-letter-tx': '0px',
    '--a-letter-ty': '0px',
    '--a-letter-scale': '1',


    /* POLAROID */
    '--polaroid-right': '10%',
    '--polaroid-bottom': '-25%',
    '--polaroid-w': '280px',
    '--polaroid-h': '180px',
    '--polaroid-rot': '-6deg',
    '--polaroid-tx': '0px',
    '--polaroid-ty': '0px',

    /* ESTRUCTURA DEL HERO */
    '--hero-gap': '30px',

    
  };

  return (
    <section className="hero" style={heroVars}>
      <div>
        <h1 className="hero-title">
          DE_B
          {/* Fondo + letra A controlados por variables */}
          <span className="a-wrap">
            <span className="a-block" />
            <span className="a-letter">A</span>
          </span>
          JO
        </h1>
        <div className="hero-sub">La revista del Under cordobés</div>
      </div>

      <div className="polaroid">
        <div className="ph" />
        <div className="caption">DE_BAJO</div>
      </div>
    </section>
  );
}
