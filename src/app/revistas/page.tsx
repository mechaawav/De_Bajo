import PageShell from "@/components/PageShell";
import ComingSoonCard from "@/components/magazines/ComingSoonCard";
import { revistasContent as C } from "@/content/revistas";

export default function PageRevistas() {
  return (
    <PageShell title="REVISTAS" lead="CATÁLOGO — EDICIONES MENSUALES">
      <div className={C.gridClass}>
        {C.items.map((it, i) => (
          <ComingSoonCard
            key={i}
            title={it.title}
            coverSrc={it.coverSrc}
            soon={it.soon}
            config={C.card}
          />
        ))}
      </div>
    </PageShell>
  );
}
