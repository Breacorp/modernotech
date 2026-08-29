import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moderno Tech — Tecnología que conecta todo",
  description:
    "Descubrí el ecosistema Moderno Tech: inteligencia artificial, software empresarial, tecnología y soluciones diseñadas para el mundo real.",
  keywords: [
    "Moderno Tech",
    "Moderno AI",
    "Moderno One",
    "Moderno Play",
    "Moderno Weather",
    "Moderno AI Cleaner Pro",
    "Moderno Pay",
    "Moderno CRM",
    "WaTicket",
    "Moderno Access",
    "Cinema Studio AI",
    "Nova Home",
    "Ecosistema Tecnológico",
    "Inteligencia Artificial",
    "Software Empresarial",
  ],
  authors: [{ name: "Moderno Tech", url: "https://moderno.com.ar" }],
  creator: "Moderno Tech",
  publisher: "Moderno Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://moderno.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Moderno Tech — Tecnología que conecta todo",
    description:
      "Descubrí el ecosistema Moderno Tech: inteligencia artificial, software empresarial, tecnología y soluciones diseñadas para el mundo real.",
    url: "https://moderno.com.ar",
    siteName: "Moderno Tech",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderno Tech — Tecnología que conecta todo",
    description:
      "Descubrí el ecosistema Moderno Tech: inteligencia artificial, software, tecnología y soluciones diseñadas para el mundo real.",
    creator: "@modernotech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://moderno.com.ar/#organization",
        "name": "Moderno Tech",
        "url": "https://moderno.com.ar",
        "logo": "https://moderno.com.ar/icon.png",
        "description":
          "Ecosistema tecnológico de software empresarial, inteligencia artificial, entretenimiento y servicios cloud.",
        "sameAs": [
          "https://github.com/Breacorp",
          "https://instagram.com/modernotech",
          "https://linkedin.com/company/modernotech"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://moderno.com.ar/#website",
        "url": "https://moderno.com.ar",
        "name": "Moderno Tech",
        "publisher": {
          "@id": "https://moderno.com.ar/#organization"
        }
      }
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
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
