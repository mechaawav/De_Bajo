type Props = { text: string; className?: string };
export default function PosterSubtitle({ text, className = "" }: Props) {
  return <h2 className={className}>{text}</h2>;
}
