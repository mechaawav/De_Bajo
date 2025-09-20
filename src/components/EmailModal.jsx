import { useEffect, useState } from "react";

export default function EmailModal({ open, magazine, onClose }) {
  const [emailReq, setEmailReq] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passLogin, setPassLogin] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleRequest(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailReq, magazine }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el correo");
      setMsg({ type: "ok", text: "Listo, te mandamos la contraseña al correo ✉️" });
      setEmailReq("");
    } catch {
      setMsg({ type: "err", text: "Ups, falló el envío. Probá de nuevo." });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailLogin, password: passLogin, magazine }),
      });
      if (!res.ok) throw new Error("Credenciales inválidas");
      setMsg({ type: "ok", text: "Contraseña correcta ✅ ¡A leer!" });
      setEmailLogin("");
      setPassLogin("");
      // Ejemplo de redirección post-login:
      // window.location.href = `/revistas/${magazine}`;
    } catch {
      setMsg({ type: "err", text: "Email/contraseña incorrectos." });
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop show" onClick={onClose} />

      {/* Contenedor del modal */}
      <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className="dialog">
          <div className="panel">
            <button className="modal-close" aria-label="Cerrar" onClick={onClose}>×</button>

            <span className="kicker">Revistas</span>
            <h2 id="auth-title" className="section-title"
              style={{
                ['--st-size']: 'clamp(26px, 4.5vw, 44px)',
                ['--st-letter']: '.1em',
                ['--st-shadow']: 'none',
                ['--st-mb']: '14px',
              }}
            >
              Registrate para leer
            </h2>

            <p style={{margin: '0 0 16px', color: 'var(--text)'}}>
              Estás por abrir: <strong>{magazine}</strong>
            </p>

            <div className="auth-grid">
              {/* Paso 1: pedir contraseña */}
              <div className="col">
                <span className="kicker">Paso 1</span>
                <h3 className="auth-title">Pedí tu contraseña</h3>
                <form onSubmit={handleRequest} className="auth-row">
                  <input
                    type="email"
                    required
                    placeholder="tu correo"
                    value={emailReq}
                    onChange={(e) => setEmailReq(e.target.value)}
                  />
                  <button type="submit" className="btn-primary">Enviar contraseña</button>
                </form>
              </div>

              {/* Paso 2: ingresar y leer */}
              <div className="col">
                <span className="kicker">Paso 2</span>
                <h3 className="auth-title">Ingresar y leer</h3>
                <form onSubmit={handleLogin} className="auth-row auth-row-2">
                  <input
                    type="email"
                    required
                    placeholder="tu correo"
                    value={emailLogin}
                    onChange={(e) => setEmailLogin(e.target.value)}
                  />
                  <input
                    type="password"
                    required
                    placeholder="tu contraseña"
                    value={passLogin}
                    onChange={(e) => setPassLogin(e.target.value)}
                  />
                  <button type="submit" className="btn-secondary">Ingresar</button>
                </form>
              </div>
            </div>

            {msg.text ? (
              <p className={`auth-msg ${msg.type === "ok" ? "ok" : "err"}`}>{msg.text}</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
