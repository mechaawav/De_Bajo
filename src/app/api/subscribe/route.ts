import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { randomBytes } from "node:crypto";
import { sendAccessEmailBrevo } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ message: "Supabase no configurado" }, { status: 500 });
    }

    const { email, issueSlug } = (await req.json()) as { email?: string; issueSlug?: string };
    if (!email || !issueSlug) {
      return NextResponse.json({ message: "Datos incompletos" }, { status: 400 });
    }

    // 1) Buscar la revista publicada
    const { data: issue, error: issueErr } = await supabaseAdmin
      .from("issues")
      .select("id, title, slug")
      .eq("slug", issueSlug)
      .eq("published", true)
      .single();

    if (issueErr || !issue) {
      return NextResponse.json({ message: "Revista no encontrada" }, { status: 404 });
    }

    // 2) Rate limit suave (90s por email/issue)
    const nowMinus90 = new Date(Date.now() - 90 * 1000).toISOString();
    const { data: recent, error: recentErr } = await supabaseAdmin
      .from("access_tokens")
      .select("id, created_at")
      .eq("email", email)
      .eq("issue_id", issue.id)
      .gte("created_at", nowMinus90)
      .limit(1);

    if (!recentErr && recent && recent.length > 0) {
      return NextResponse.json({ message: "Esperá unos segundos antes de pedir otro enlace." }, { status: 429 });
    }

    // 3) Guardar/actualizar suscriptor
    await supabaseAdmin.from("subscribers").upsert({ email, opt_in: true, source: "email-gate" });

    // 4) Crear token
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(); // 12h

    const { error: insErr } = await supabaseAdmin.from("access_tokens").insert({
      email,
      issue_id: issue.id,
      token,
      expires_at: expiresAt,
    });
    if (insErr) {
      console.error(insErr);
      return NextResponse.json({ message: "No se pudo generar el token" }, { status: 500 });
    }

    // 5) Enviar mail con link mágico
    const base = process.env.APP_URL ?? "http://localhost:3000";
    const link = `${base}/revistas/${issue.slug}?token=${token}`;

    const emailRes = await sendAccessEmailBrevo({
      to: email,
      issueTitle: issue.title,
      magicLink: link,
    });
    if (!emailRes.ok) {
      return NextResponse.json({ message: emailRes.message || "No se pudo enviar el correo" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe error", err);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
