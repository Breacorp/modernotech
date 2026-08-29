"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroEcosystemVisual } from "./HeroEcosystemVisual";

export const Hero: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-20 text-center flex flex-col items-center justify-center overflow-visible"
    >
      {/* Halo glow behind title */}
      <div className="title-halo" />

      {/* Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-6 px-4 py-1.5 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30 backdrop-blur-md inline-flex items-center gap-2.5 shadow-[0_0_25px_rgba(0,82,255,0.25)]"
      >
        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
        <span className="text-[11px] font-mono tracking-widest text-[#38BDF8] uppercase font-semibold">
          MODERNO TECH &bull; ECOSISTEMA TECNOLÓGICO
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] max-w-5xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
      >
        Tecnología que conecta{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFFFFF] via-[#38BDF8] to-[#0052FF]">
          todo lo que hacés.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 text-base sm:text-lg md:text-xl text-[#94A3B8] font-light max-w-2xl leading-relaxed"
      >
        Un ecosistema integrado de software empresarial, inteligencia artificial, entretenimiento, hardware y servicios cloud diseñado para simplificar tu mundo.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <a
          href="#productos"
          onClick={(e) => handleScrollTo(e, "#productos")}
          className="w-full sm:w-auto px-8 py-4 bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(0,82,255,0.5)] border border-white/20 flex items-center justify-center gap-2"
        >
          <span>Explorar Ecosistema</span>
          <span className="text-[#00E5FF]">&rarr;</span>
        </a>
        <a
          href="#nosotros"
          onClick={(e) => handleScrollTo(e, "#nosotros")}
          className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs uppercase tracking-widest font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
        >
          Conocer Moderno
        </a>
      </motion.div>

      {/* Central Visual: Everything is Connected */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <HeroEcosystemVisual />
      </motion.div>
    </section>
  );
};
