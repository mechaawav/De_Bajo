import { useEffect, useMemo, useState } from "react";

/** Ajustá acá la clave PDF por revista (o “PROXIMO”). */
const ACCESS = {
  "revista-1": { code: "DE_BAJO_2025", url: "/pdfs/revista-1.pdf" },
  "revista-2": { code: "PROXIMO",      url: "/pdfs/revista-2.pdf" },
  "revista-3": { code: "PROXIMO",      url: "/pdfs/revista-3.pdf" },
};

export default function EmailModal({ open, onClose, magazine }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const endpoint = import.meta.env.PUBLIC_FORMSPREE_LEADS || "";
  const current = useMemo(() => ACCESS[magazine] ?? null, [magazine]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayMouseDown = (e) => {
    // Cerrar sólo si clickeás el overlay (no los hijos)
    if (e.target === e.currentTarget) onClose();
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    if (!endpoint) {
      setError("Falta configurar PUBLIC_FORMSPREE_LEADS en tu .env");
      return;
    }
    try {
      setSending(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ type: "register", email, magazine }),
      });
      if (!res.ok) throw new Error("Formspree respondió con error");
      setSent(true);
    } catch {
      setError("Ups, falló el envío. Probá de nuevo.");
    } finally {
      setSending(false);
    }
  };

  const handleRead = (e) => {
    e.preventDefault();
    setError("");
    if (!current) return setError("Revista desconocida.");
    if (current.code === "PROXIMO") return setError("Todavía no disponible.");
    if (code.trim() !== current.code) return setError("Contraseña incorrecta.");
    window.open(current.url, "_blank", "noopener");
  };

  return (
    <div className="db-overlay" onMouseDown={handleOverlayMouseDown}>
      <div className="db-card panel" role="dialog" aria-modal="true" aria-label="Registro para leer">
        {/* CABEZA */}
        <div className="db-head">
          <span className="kicker">Revistas</span>
          <h3
            className="db-title"
            style={{
              fontFamily: '"Oswald", system-ui',
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: ".06em",
              fontSize: "clamp(28px, 6vw, 64px)",
              lineHeight: 0.95,
              margin: "0 0 4px",
              color: "var(--ink)",
              textShadow: "0 6px 0 var(--bg-red-deep), 0 10px 30px rgba(0,0,0,.35)",
            }}
          >
            Registrate para leer
          </h3>

          <button className="db-close" onClick={onClose} aria-label="Cerrar">
            Cerrar
          </button>

          {magazine && (
            <p className="db-sub">
              Estás por abrir: <b>{magazine}</b>
            </p>
          )}
        </div>

        {/* CONTENIDO (un solo panel con dos pasos) */}
        <div className="db-steps">
          {/* Paso 1 */}
          <section className="db-step">
            <div className="db-step-kicker">Paso 1</div>
            <h4 className="db-step-title">Pedí tu contraseña</h4>
            <form onSubmit={handleSend} className="db-row">
              <input
                type="email"
                required
                placeholder="tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" disabled={sending}>
                {sending ? "Enviando…" : "Enviar contraseña"}
              </button>
            </form>
            {sent && <p className="db-hint ok">Listo. Te anotamos y te mandamos la clave por mail.</p>}
          </section>

          {/* Paso 2 */}
          <section className="db-step">
            <div className="db-step-kicker">Paso 2</div>
            <h4 className="db-step-title">Ingresar y leer</h4>
            <form onSubmit={handleRead} className="db-row">
              <input
                type="text"
                placeholder="tu contraseña"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="submit">Leer</button>
            </form>
            <p className="db-hint">
              Cuando te llegue la contraseña, ingresala y abrimos la revista.
            </p>
            {error && <p className="db-error">{error}</p>}
          </section>
        </div>
      </div>

      {/* ===== estilos del modal ===== */}
      <style>{`
        .db-overlay{
          position: fixed; inset: 0;
          z-index: 9999; /* arriba de todo */
          background: rgba(0,0,0,.55);
          display: flex; justify-content: center; align-items: flex-start;
          padding: 14vh 16px 8vh; /* margen superior grande */
          overflow-y: auto; /* por si se hace largo */
        }

        .db-card{
          width: min(92vw, 920px);
          box-sizing: border-box;
        }

        .db-head{ position: relative; margin-bottom: 8px; }
        .db-sub{ margin: 6px 0 0; color: var(--muted); }
        .db-close{
          position: absolute; right: 0; top: 0;
          padding: 10px 14px; border-radius: 12px;
          border: 1px solid rgba(255,255,255,.12);
          background: #0c0c0e; color: #e9b3ad;
          font-weight: 900; letter-spacing: .16em;
          text-transform: uppercase; cursor: pointer;
        }
        .db-close:hover{ filter: brightness(1.1) }

        .db-steps{ display: grid; gap: 22px; }
        .db-step-kicker{
          font-weight: 900; letter-spacing: .22em;
          text-transform: uppercase; color: #a7433a; margin-bottom: 4px;
        }
        .db-step-title{
          margin: 0 0 12px; font-size: 18px; font-weight: 800; letter-spacing: .08em;
        }

        .db-row{ display: grid; grid-template-columns: 1fr auto; gap: 14px }
        .db-row input{
          width: 100%; height: 56px; padding: 12px 14px; border-radius: 12px;
          border: 1px solid rgba(0,0,0,.12); background: #fff; color: #111;
        }
        .db-row button{
          min-width: 230px; height: 56px; border-radius: 12px;
          background: #0c0c0e; color: #e9b3ad;
          border: 1px solid rgba(255,255,255,.12);
          font-weight: 900; letter-spacing: .2em; text-transform: uppercase;
          cursor: pointer; padding: 0 18px;
        }
        .db-row button[disabled]{ opacity: .6; cursor: default }

        .db-hint{ margin-top: 10px; color: var(--muted) }
        .db-hint.ok{ color: #2f8642 }
        .db-error{ margin-top: 10px; color: #b63e33; font-weight: 700 }

        @media (max-width: 720px){
          .db-row{ grid-template-columns: 1fr; }
          .db-row button{ width: 100% }
          .db-close{ position: static; margin-top: 10px }
          .db-overlay{ padding-top: 12vh; }
        }
      `}</style>
    </div>
  );
}
