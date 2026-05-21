import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moderno Style & Tech - Admin Control Panel",
  description: "Panel de control administrativo y observabilidad centralizada de Moderno.",
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
