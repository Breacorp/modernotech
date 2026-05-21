import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moderno Style & Tech - Styleguide",
  description: "Manual de Diseño Interactivo y Catálogo de Componentes Globales del Ecosistema Moderno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
