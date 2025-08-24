// src/app/revistas/page.tsx
import MagazineCard, { type Issue } from "@/components/magazines/MagazineCard";
import { getSupabasePublic } from "@/lib/supabase";

async function getIssues(): Promise<Issue[]> {
  const client = getSupabasePublic();

  if (client) {
    try {
      const { data, error } = await client
        .from("issues")
        .select("id, slug, title, month, year, cover_url")
        .eq("published", true)
        .order("year", { ascending: false })
        .order("month", { ascending: false });

      if (!error && data && data.length) {
        return data as Issue[];
      }
    } catch (e) {
      console.error("getIssues error:", e);
    }
  }

  // Fallback (si no hay envs o la tabla está vacía)
  return [
    {
      id: "mock-1",
      slug: "agosto-2025",
      title: "Edición Agosto 2025",
      month: 8,
      year: 2025,
      cover_url: "https://picsum.photos/600/800?random=1",
    },
  ];
}

export default async function Page() {
  const issues = await getIssues();

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Revistas</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {issues.map((issue) => (
          <MagazineCard key={issue.id} issue={issue} />
        ))}
      </div>
    </section>
  );
}
