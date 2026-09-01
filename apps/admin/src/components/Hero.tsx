"use client";

import React from "react";
import { motion } from "framer-motion";
import { ModernoButton } from "./ModernoButton";
import { HeroEcosystemVisual } from "./HeroEcosystemVisual";

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-16 text-center flex flex-col items-center justify-center select-none"
    >
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-white/80 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
        <span className="tracking-[0.2em] uppercase">MODERNO TECH &bull; ECOSISTEMA INTEGRADO</span>
      </motion.div>

      {/* Main Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.06] max-w-5xl font-sans"
      >
        Tecnología para un mundo{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#00E5FF] to-[#157BFF]">
          más moderno.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-sm sm:text-base md:text-lg text-[#94A3B8] font-light max-w-3xl leading-relaxed"
      >
        Software empresarial, automatización con IA y sistemas de control para operaciones reales, complementado por un ecosistema conectado de almacenamiento, entretenimiento y productividad.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <ModernoButton
          variant="primary"
          href="#productos"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "#productos")}
          className="w-full sm:w-auto px-8 py-3.5"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          }
        >
          Ver productos
        </ModernoButton>

        <ModernoButton
          variant="secondary"
          href="#nosotros"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "#nosotros")}
          className="w-full sm:w-auto px-8 py-3.5"
        >
          Conocer Moderno
        </ModernoButton>
      </motion.div>

      {/* Central Visual: Everything is Connected */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <HeroEcosystemVisual />
      </motion.div>
    </section>
  );
};
