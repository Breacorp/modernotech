import React from "react";
import { ModernoBackground } from "../components/ModernoBackground";
import { ModernoNavbar } from "../components/ModernoNavbar";
import { Hero } from "../components/Hero";
import { EcosystemOverview } from "../components/EcosystemOverview";
import { ProductCatalog } from "../components/ProductCatalog";
import { PhilosophySection } from "../components/PhilosophySection";
import { RoadmapSection } from "../components/RoadmapSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--moderno-background-alt)] text-[var(--moderno-text)]">
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <ModernoBackground />
      <ModernoNavbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        <Hero />
        <EcosystemOverview />
        <ProductCatalog />
        <PhilosophySection />
        <RoadmapSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
