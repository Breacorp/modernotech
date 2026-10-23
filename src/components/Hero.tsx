"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ModernoButton } from "./ModernoButton";
import { HeroEcosystemVisual } from "./HeroEcosystemVisual";
import { TrustMetrics } from "./TrustMetrics";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number, y = 20) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay, ease: EASE_OUT_EXPO },
  });

  const handleScrollTo = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-16 text-center flex flex-col items-center justify-center select-none"
    >
      {/* Top badge */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-white/85 shadow-sm"
      >
        <span className="w-2 h-2 rounded-full bg-[var(--moderno-primary)] animate-pulse" aria-hidden="true" />
        <span className="tracking-[0.2em] uppercase">MODERNO TECH &bull; ECOSISTEMA INTEGRADO</span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        {...reveal(0.1)}
        className="text-balance text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.06] max-w-5xl font-sans"
      >
        Tecnología para un mundo{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--moderno-primary)] to-[var(--moderno-primary-light)]">
          más moderno.
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...reveal(0.2, 15)}
        className="mt-6 text-sm sm:text-base md:text-lg text-[var(--moderno-text-muted)] font-light max-w-3xl leading-relaxed text-pretty"
      >
        Software empresarial, automatización con IA y sistemas de control para
        operaciones reales, complementado por un ecosistema conectado de
        almacenamiento, entretenimiento y productividad.
      </motion.p>

      {/* CTAs */}
      <motion.div
        {...reveal(0.3, 15)}
        className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
      >
        <ModernoButton
          variant="primary"
          href="/registro"
          className="w-full sm:w-auto px-8 py-3.5"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          }
        >
          Crear cuenta gratis
        </ModernoButton>

        <ModernoButton
          variant="secondary"
          href="#productos"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScrollTo(e, "#productos")}
          className="w-full sm:w-auto px-8 py-3.5"
        >
          Ver productos
        </ModernoButton>

        <a
          href="#nosotros"
          onClick={(e) => handleScrollTo(e, "#nosotros")}
          className="moderno-focus text-xs font-bold text-[var(--moderno-text-muted)] hover:text-white transition-colors underline-offset-4 hover:underline rounded"
        >
          Conocer Moderno
        </a>
      </motion.div>

      {/* Metrics */}
      <TrustMetrics />

      {/* Central visual */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.9, delay: 0.35, ease: EASE_OUT_EXPO }
        }
        className="w-full"
      >
        <HeroEcosystemVisual />
      </motion.div>
    </section>
  );
};
