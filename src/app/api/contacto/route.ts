import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta ${name} en .env.local`);
  return v;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get("ping") === "db") {
    try {
      const { error } = await supabaseAdmin
        .from("contacts")
        .select("id", { head: true, count: "exact" });
      if (error) throw error;
      return NextResponse.json({ db: "ok" });
    } catch (e: any) {
      return NextResponse.json({ db: "error", detail: e?.message || String(e) }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  try {
    env("NEXT_PUBLIC_SUPABASE_URL");
    env("SUPABASE_SERVICE_ROLE");

    const body = await req.json().catch(() => ({}));
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const message = String(body?.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ message: "Faltan campos." }, { status: 400 });
    }

    const oneMinAgo = new Date(Date.now() - 60_000).toISOString();
    await supabaseAdmin.from("contacts").select("id").eq("email", email).gt("created_at", oneMinAgo);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || (req as any).ip || "";
    const row: any = { name, email, message, source: "web" };
    if (ip) row.ip = ip;

    const { error } = await supabaseAdmin.from("contacts").insert(row);
    if (error) {
      console.error("[CONTACTO][INSERT]", error.message);
      return NextResponse.json({ message: "Error guardando en DB.", detail: error.message }, { status: 500 });
    }

    // Email opcional con Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: { "Content-Type": "application/json", "api-key": process.env.BREVO_API_KEY! },
          body: JSON.stringify({
            sender: { name: "De_Bajo", email: process.env.BREVO_SENDER_EMAIL || "no-reply@debajo.app" },
            to: [{ email: "mecarabajal13@gmail.com", name: "De_Bajo" }],
            replyTo: { email, name },
            subject: `Nuevo mensaje: ${name}`,
            htmlContent: `<p><b>Nombre:</b> ${escapeHtml(name)}</p>
                          <p><b>Email:</b> ${escapeHtml(email)}</p>
                          <p><b>Mensaje:</b><br>${escapeHtml(message).replace(/\n/g,"<br/>")}</p>`,
          }),
        });
      } catch (e) {
        console.warn("[CONTACTO][BREVO]", (e as any)?.message || e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[CONTACTO][FATAL]", e?.message || e);
    return NextResponse.json({ message: "Error interno.", detail: e?.message || String(e) }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]!));
}
