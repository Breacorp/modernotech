import type { Metadata } from "next";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { AdsClientPage } from "./AdsClientPage";

export const metadata: Metadata = {
  title: "Moderno Ads | Publicidad Digital, SEO y Marketing — Moderno Tech",
  description:
    "Publicidad digital, Google Ads, Meta Ads, SEO y estrategias de captación de clientes. Impulsamos el crecimiento comercial de empresas y emprendimientos.",
  alternates: {
    canonical: "https://moderno.com.ar/ads",
  },
  openGraph: {
    title: "Moderno Ads | Publicidad Digital, SEO y Marketing — Moderno Tech",
    description:
      "Publicidad digital, Google Ads, Meta Ads, SEO y estrategias de captación de clientes. Impulsamos el crecimiento comercial de empresas y emprendimientos.",
    url: "https://moderno.com.ar/ads",
    siteName: "Moderno Tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moderno Ads | Publicidad Digital, SEO y Marketing — Moderno Tech",
    description:
      "Publicidad digital, Google Ads, Meta Ads, SEO y estrategias de captación de clientes.",
  },
};

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100">
      <ModernoNavbar />
      <AdsClientPage />
    </div>
  );
}

