import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const token = searchParams.get("token");
    if (!slug || !token) return NextResponse.json({ message: "Faltan parámetros" }, { status: 400 });

    const { data: issue, error: issueErr } = await supabaseAdmin
      .from("issues")
      .select("id, pdf_path, title")
      .eq("slug", slug).eq("published", true).single();
    if (issueErr || !issue) return NextResponse.json({ message: "Revista no encontrada" }, { status: 404 });

    const { data: row, error: tErr } = await supabaseAdmin
      .from("access_tokens")
      .select("id, used, expires_at")
      .eq("issue_id", issue.id)
      .eq("token", token)
      .single();
    if (tErr || !row) return NextResponse.json({ message: "Token inválido" }, { status: 401 });

    if (row.used) return NextResponse.json({ message: "Token ya usado" }, { status: 401 });
    if (new Date(row.expires_at) < new Date()) return NextResponse.json({ message: "Token expirado" }, { status: 401 });

    const { data: signed, error: sErr } = await supabaseAdmin.storage
      .from("magazines")
      .createSignedUrl(issue.pdf_path, 60 * 60);
    if (sErr || !signed) return NextResponse.json({ message: "No se pudo firmar URL" }, { status: 500 });

    return NextResponse.json({ signedUrl: signed.signedUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Error interno" }, { status: 500 });
  }
}
