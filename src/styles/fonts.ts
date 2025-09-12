import { Bebas_Neue, Anton, Oswald, Archivo_Black } from "next/font/google";

export const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
export const anton = Anton({ subsets: ["latin"], weight: "400" });
export const oswald = Oswald({ subsets: ["latin"], weight: "700" });
export const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400" });

export const fontMap = {
  bebas: bebas.className,
  anton: anton.className,
  oswald: oswald.className,
  archivoBlack: archivoBlack.className,
} as const;

export type FontKey = keyof typeof fontMap;
