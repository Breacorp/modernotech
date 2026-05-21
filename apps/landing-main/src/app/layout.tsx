import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "800"] });

export const metadata: Metadata = {
  title: "Moderno Style & Tech - El Ecosistema del Futuro",
  description: "Descubre el ecosistema de Moderno Style & Tech. Tienda online, CRM, Inteligencia Artificial, Hosting, Academia y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
