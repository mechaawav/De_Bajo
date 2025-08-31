import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bebas_Neue, Inter } from "next/font/google";

const display = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const body = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "De_Bajo",
  description: "Revista digital mensual — De_Bajo",
  openGraph: {
    title: "De_Bajo",
    description: "Revista digital mensual — De_Bajo",
    url: process.env.APP_URL ?? "http://localhost:3000",
    siteName: "De_Bajo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={display.className}>
      <body className={`${body.className} text-[var(--brand-black)] bg-[var(--brand-cream)] min-h-dvh flex flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
