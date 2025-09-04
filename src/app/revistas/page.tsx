import ComingSoonCard from "@/components/magazines/ComingSoonCard";
import { revistasContent as c } from "@/content/revistas";

export const metadata = { title: "Revistas — De_Bajo" };

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {c.header.title}
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-600">{c.header.subtitle}</p>
      </header>

      <section className={c.gridClass}>
        {c.items.map((it, i) => (
          <ComingSoonCard
            key={i}
            title={it.title}
            coverSrc={it.coverSrc}
            soon={it.soon}
            config={c.card}
          />
        ))}
      </section>
    </main>
  );
}
