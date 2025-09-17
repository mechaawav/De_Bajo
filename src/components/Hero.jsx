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
const [idx, setIdx] = useState(0);
useEffect(() => {
const t = setInterval(() => setIdx((i) => (i + 1) % FONTS.length), 2000);
return () => clearInterval(t);
}, []);


const aStyle = {
fontFamily: `'${FONTS[idx]}', system-ui, sans-serif`,
display: 'inline-block',
transform: idx % 2 ? 'rotate(-3deg) scale(1.05)' : 'rotate(2deg) skewX(-4deg)',
textDecoration: idx % 3 === 0 ? 'underline' : 'none'
};


return (
<section id="inicio" className="container hero">
<div>
<h1 className="hero-title">
DE_B
<span style={aStyle}>A</span>
JO
</h1>
<div className="hero-sub">La revista del Under cordobés.</div>
</div>
<div className="hero-side">
<div>Poesía</div>
<div>Ensayos</div>
<div>Entrevistas</div>
<div>Cine</div>
<div>Música</div>
</div>
</section>
);
}