"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { EcosystemSection } from "../components/EcosystemSection";
import { SolutionsSection } from "../components/SolutionsSection";
import { AIHighlightSection } from "../components/AIHighlightSection";
import { ServicesSection } from "../components/ServicesSection";
import { Footer } from "../components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse coordinates for the viewport glow spotlight
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

  // Subtle Hero Parallax scroll transformations
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, 60]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("ecosistema");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSolutionsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById("soluciones");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen selection:bg-[#0052FF] selection:text-white overflow-hidden bg-[#070d1e]"
    >
      {/* 3D Active Layered Ambient Backgrounds */}
      <div className="ambient-container">
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="cyber-grid" />
      </div>

      {/* Global Mouse Tracking Spotlight */}
      <div className="mouse-spotlight-global" />

      {/* Translucent Navigation Header */}
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-28 text-center flex flex-col items-center justify-center min-h-[85vh] overflow-visible">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="flex flex-col items-center max-w-4xl">
          {/* Decorative floating system badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 glossy-panel px-5 py-2 border-[#0052FF]/30 inline-flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,82,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-[#00a8ff] animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-white uppercase font-semibold">
              MODERNO TECH &bull; ECOSISTEMA TECNOLÓGICO CENTRAL
            </span>
          </motion.div>

          {/* Title Halo & Main Heading */}
          <div className="relative mb-6">
            <div className="title-halo" />
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.15em] text-white leading-none drop-shadow-[0_0_40px_rgba(0,82,255,0.25)]"
            >
              MODERNO <span className="text-[#00a8ff]">TECH</span>
            </motion.h1>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-lg sm:text-2xl font-semibold text-white tracking-[0.05em] mt-4 mb-6 max-w-3xl"
          >
            Tecnología para crear, gestionar, automatizar y transformar.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="text-sm sm:text-base text-[#9ab0d3] font-light max-w-2xl leading-relaxed mb-12"
          >
            Una sola marca, un ecosistema de tecnología. Accede a nuestras plataformas de gestión empresarial, inteligencia artificial, control de acceso, videojuegos, e-commerce e infraestructura cloud.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
          >
            <a
              href="#ecosistema"
              onClick={handleExploreClick}
              className="w-full sm:w-auto px-10 py-4 bg-[#0052FF] hover:bg-[#003ECC] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-[1.03] active:scale-[0.97] shadow-[0_0_30px_rgba(0,82,255,0.4)] border border-white/10"
            >
              Explorar el Ecosistema
            </a>
            <a
              href="#soluciones"
              onClick={handleSolutionsClick}
              className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              Conocer Moderno Tech
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 1: Ecosistema & Productos Grid */}
      <EcosystemSection />

      {/* Section 2: Soluciones Orientadas al Cliente */}
      <SolutionsSection />

      {/* Section 3: Inteligencia Artificial Estratégica */}
      <AIHighlightSection />

      {/* Section 4: Servicios Tecnológicos */}
      <ServicesSection />

      {/* Footer Completo del Ecosistema */}
      <Footer />
    </div>
  );
}
