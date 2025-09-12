import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase no configurado" }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { email, password, slug, pdfPath } = body as {
      email?: string;
      password?: string;
      slug?: string;
      pdfPath?: string;
    };

    if (!email || !password || !slug || !pdfPath) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("access")
      .insert({ email, password, slug, pdf_path: pdfPath })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || String(e) }, { status: 500 });
  }
}
