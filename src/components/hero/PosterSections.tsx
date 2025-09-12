type Props = { items: string[]; variant?: "columnRight" | "rowUnder"; className?: string; };

export default function PosterSections({ items, variant = "columnRight", className = "" }: Props) {
  const base = variant === "columnRight" ? className : className;
  return (
    <ul className={base}>
      {items.map((it) => (<li key={it}>{it}</li>))}
    </ul>
  );
}

