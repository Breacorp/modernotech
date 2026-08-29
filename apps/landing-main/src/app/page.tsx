"use client";

import React, { useEffect, useRef } from "react";
import { PRODUCTS_REGISTRY } from "../data/products";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { FeaturedProduct } from "../components/FeaturedProduct";
import { ProductEcosystem } from "../components/ProductEcosystem";
import { TechnologySection } from "../components/TechnologySection";
import { AboutSection } from "../components/AboutSection";
import { VisionSection } from "../components/VisionSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse coordinates for viewport glow spotlight
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  // Configurable featured flagship product (defaults to first featured product or Moderno AI)
  const featuredProduct =
    PRODUCTS_REGISTRY.find((p) => p.featured) || PRODUCTS_REGISTRY[0];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-[#0052FF] selection:text-white overflow-hidden bg-[#060B18]"
    >
      {/* Dynamic Ambient Mesh Background */}
      <div className="ambient-container">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="cyber-grid" />
      </div>

      {/* Interactive Global Mouse Spotlight */}
      <div className="mouse-spotlight-global" />

      {/* Navigation */}
      <Navbar />

      <main>
        {/* 1. Hero Section (Heading, Copy, CTAs & Interconnected Node Mesh) */}
        <Hero />

        {/* 2. Featured Flagship Spotlight (The Future of Moderno / Moderno AI) */}
        <FeaturedProduct product={featuredProduct} />

        {/* 3. Product Ecosystem Bento Grid & Category Filters ("Todo Moderno. En un solo lugar.") */}
        <ProductEcosystem />

        {/* 4. Technology Behind Moderno (Proprietary Stack & Architectural Pillars) */}
        <TechnologySection />

        {/* 5. Institutional Manifesto & Mission ("Construimos tecnología para el mundo real") */}
        <AboutSection />

        {/* 6. Continuous Expansion & Roadmap ("Esto recién empieza") */}
        <VisionSection />

        {/* 7. Final Call to Action */}
        <FinalCTA />
      </main>

      {/* 8. Comprehensive Footer with System Status */}
      <Footer />
    </div>
  );
}
