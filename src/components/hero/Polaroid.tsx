import Image, { type StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  alt: string;
  frameClass?: string;
  boxClass?: string;
};

export default function Polaroid({ src, alt, frameClass = "", boxClass = "w-[68vw] max-w-[400px] aspect-[4/5]" }: Props) {
  return (
    <div className={["bg-white rounded-[6px] p-2 pb-6", frameClass].join(" ")}>
      <div className={["relative", boxClass].join(" ")}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 68vw, 400px" priority />
      </div>
    </div>
  );
}
