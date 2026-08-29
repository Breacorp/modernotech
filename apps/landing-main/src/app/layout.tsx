import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Moderno Tech — Ecosistema Tecnológico Central",
  description: "Portal central de Moderno Tech. Descubre nuestro ecosistema de plataformas empresariales (Moderno One, Access), Inteligencia Artificial (Nova AI, Cinema Studio, Voice AI, Nova Home), Gaming (Moderno Play), E-commerce y servicios cloud.",
  keywords: [
    "Moderno Tech",
    "Moderno One",
    "Moderno Access",
    "Moderno Play",
    "Nova AI",
    "Cinema Studio",
    "Voice AI",
    "WaTicket",
    "Mercato",
    "Ecosistema Tecnológico",
    "Software Empresarial",
    "Inteligencia Artificial",
    "Control de Acceso"
  ],
  authors: [{ name: "Moderno Tech" }],
  openGraph: {
    title: "Moderno Tech — Ecosistema Tecnológico Central",
    description: "Una sola marca. Un ecosistema de tecnología. Múltiples soluciones empresariales, IA, e-commerce y gaming.",
    url: "https://moderno.com.ar",
    siteName: "Moderno Tech",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderno Tech — Ecosistema Tecnológico",
    description: "Tecnología para crear, gestionar, automatizar y transformar.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Moderno Tech",
    "url": "https://moderno.com.ar",
    "logo": "https://moderno.com.ar/logo.png",
    "description": "Ecosistema tecnológico de software empresarial, inteligencia artificial, control de acceso, e-commerce y servicios cloud.",
    "subOrganization": [
      { "@type": "SoftwareApplication", "name": "Moderno One", "url": "https://one.moderno.com.ar" },
      { "@type": "SoftwareApplication", "name": "Moderno Access", "url": "https://access.moderno.com.ar" },
      { "@type": "SoftwareApplication", "name": "Moderno Play", "url": "https://play.moderno.com.ar" },
      { "@type": "SoftwareApplication", "name": "Nova AI", "url": "https://nova.moderno.com.ar" },
      { "@type": "SoftwareApplication", "name": "Cinema Studio", "url": "https://cinema.moderno.com.ar" },
      { "@type": "SoftwareApplication", "name": "Voice AI", "url": "https://voice.moderno.com.ar" }
    ]
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={outfit.className}>
        {children}
      </body>
    </html>
  );
}
