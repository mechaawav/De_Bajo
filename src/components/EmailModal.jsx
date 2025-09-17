import { useState } from 'react';


export default function EmailModal({ open, onClose, magazine }) {
const [mode, setMode] = useState('register'); // 'register' | 'login'
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [msg, setMsg] = useState('');
const [loading, setLoading] = useState(false);


if (!open) return null;


async function handleRegister(e){
e.preventDefault(); setLoading(true); setMsg('');
try {
const r = await fetch('/api/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, magazine })});
const data = await r.json();
if(r.ok) setMsg('Listo. Te enviamos una contraseña por email.'); else setMsg(data?.error || 'Error al registrar.');
} catch (err) { setMsg('Error de red.'); }
setLoading(false);
}


async function handleLogin(e){
e.preventDefault(); setLoading(true); setMsg('');
try {
const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password, magazine })});
const data = await r.json();
if(r.ok && data?.url){ window.open(data.url, '_blank'); setMsg('Abriendo revista…'); onClose(); }
else setMsg(data?.error || 'Credenciales inválidas.');
} catch (err) { setMsg('Error de red.'); }
setLoading(false);
}


return (
<div className="modal-backdrop" onClick={onClose}>
<div className="modal" onClick={(e)=>e.stopPropagation()}>
<h3>{mode === 'register' ? 'Registrate para leer' : 'Ingresá tu contraseña'}</h3>
{mode === 'register' ? (
<form onSubmit={handleRegister}>
<input required type="email" placeholder="tu correo" value={email} onChange={(e)=>setEmail(e.target.value)} />
<button disabled={loading} type="submit">{loading ? 'Enviando…' : 'Enviar contraseña'}</button>
</form>
) : (
<form onSubmit={handleLogin}>
<input required type="email" placeholder="tu correo" value={email} onChange={(e)=>setEmail(e.target.value)} />
<input required type="password" placeholder="contraseña" value={password} onChange={(e)=>setPassword(e.target.value)} />
<button disabled={loading} type="submit">{loading ? 'Verificando…' : 'Leer revista'}</button>
</form>
)}
<div style={{marginTop:8, opacity:.85}}>
{mode === 'register' ? (
<button className="btn" onClick={()=>setMode('login')}>Ya tengo contraseña</button>
) : (
<button className="btn" onClick={()=>setMode('register')}>Quiero registrarme</button>
)}
</div>
{msg && <p style={{marginTop:10}}>{msg}</p>}
</div>
</div>
);
}