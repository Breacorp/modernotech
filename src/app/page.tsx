import React from "react";
import { ModernoBackground } from "../components/ModernoBackground";
import { ModernoNavbar } from "../components/ModernoNavbar";
import { Hero } from "../components/Hero";
import { AuthenticatedEcosystemBanner } from "../components/AuthenticatedEcosystemBanner";
import { ProductShowcaseInteractive } from "../components/ProductShowcaseInteractive";
import { ProductEcosystem } from "../components/ProductEcosystem";
import { WhyModernoSection } from "../components/WhyModernoSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { BuiltByModernoSection } from "../components/BuiltByModernoSection";
import { VisionSection } from "../components/VisionSection";
import { FaqSection } from "../components/FaqSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--moderno-background-alt)] text-white selection:bg-[var(--moderno-primary)] selection:text-black overflow-x-hidden">
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <ModernoBackground />
      <ModernoNavbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 outline-none">
        {/* 1. Hero */}
        <Hero />

        {/* Dynamic authenticated user banner (Moderno ID portal) */}
        <AuthenticatedEcosystemBanner />

        {/* 2. Interactive product demos */}
        <ProductShowcaseInteractive />

        {/* 3. Full ecosystem catalog */}
        <ProductEcosystem />

        {/* 4. Architecture & philosophy */}
        <WhyModernoSection />

        {/* 5. How the ecosystem works */}
        <HowItWorksSection />

        {/* 6. Engineering & proprietary tech */}
        <BuiltByModernoSection />

        {/* 7. Roadmap & continuous expansion */}
        <VisionSection />

        {/* 8. Frequently asked questions */}
        <FaqSection />

        {/* 9. Final call to action */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}
