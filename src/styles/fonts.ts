import {
  Bebas_Neue,
  Anton,
  Oswald,
  Archivo_Black,
  Playfair_Display,
  IBM_Plex_Sans,
} from "next/font/google";

// Ya existentes
export const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
export const anton = Anton({ subsets: ["latin"], weight: "400" });
export const oswald = Oswald({ subsets: ["latin"], weight: "700" });
export const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400" });

// Nuevas con itálica
export const playfairItalic = Playfair_Display({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
});
export const ibmItalic = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
});

export const fontMap = {
  bebas: bebas.className,
  anton: anton.className,
  oswald: oswald.className,
  archivoBlack: archivoBlack.className,
  playfairItalic: playfairItalic.className,
  ibmItalic: ibmItalic.className,
} as const;

export type FontKey = keyof typeof fontMap;
