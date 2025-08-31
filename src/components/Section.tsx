export default function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return <section id={id} className="py-16">{children}</section>;
}
