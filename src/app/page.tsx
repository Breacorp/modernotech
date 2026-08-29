"use client";

import React from "react";
import { ModernoBackground } from "../components/ModernoBackground";
import { ModernoNavbar } from "../components/ModernoNavbar";
import { Hero } from "../components/Hero";
import { ProductShowcaseInteractive } from "../components/ProductShowcaseInteractive";
import { ProductEcosystem } from "../components/ProductEcosystem";
import { WhyModernoSection } from "../components/WhyModernoSection";
import { BuiltByModernoSection } from "../components/BuiltByModernoSection";
import { VisionSection } from "../components/VisionSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      {/* Interactive Deep Tech Background from Access & Play */}
      <ModernoBackground />

      {/* Moderno Tech Navigation Bar */}
      <ModernoNavbar />

      <main className="relative z-10">
        {/* 1. Hero Section ("Tecnología para un mundo más moderno") */}
        <Hero />

        {/* 2. Visual Interactive Product Showcase (Play, Access & Cleaner Pro) */}
        <ProductShowcaseInteractive />

        {/* 3. Product Ecosystem ("Todo Moderno, conectado" with Access & Play Spotlight) */}
        <ProductEcosystem />

        {/* 3. Architecture & Philosophy ("¿Por qué Moderno?") */}
        <WhyModernoSection />

        {/* 4. Engineering & Proprietary Tech ("Built by Moderno") */}
        <BuiltByModernoSection />

        {/* 5. Continuous Expansion & Roadmap ("Esto recién empieza") */}
        <VisionSection />

        {/* 6. Final Call to Action ("Descubrí Moderno") */}
        <FinalCTA />
      </main>

      {/* 7. Footer with Live System Status */}
      <Footer />
    </div>
  );
}
