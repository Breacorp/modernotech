"use client";

import React from "react";
import { ModernoButton } from "./ModernoButton";
import { useModernoAuth } from "../hooks/useModernoAuth";

export const FinalCTA: React.FC = () => {
  const { isAuthenticated } = useModernoAuth();

  return (
    <section
      id="empezar"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-24 scroll-mt-24 select-none"
    >
      <div className="relative p-10 sm:p-16 md:p-20 rounded-3xl bg-[var(--moderno-surface-card)] border border-white/[0.08] text-center flex flex-col items-center justify-center overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.12)_0%,transparent_60%)] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase block mb-3">
            PORTAL CENTRAL MODERNO
          </span>
          <h2 className="text-balance text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans mb-4">
            Descubrí Moderno.
          </h2>
          <p className="text-sm sm:text-lg text-[var(--moderno-text-muted)] font-light max-w-lg mx-auto mb-8">
            Conectá tus operaciones empresariales, seguridad, inteligencia artificial y servicios digitales en un solo ecosistema integrado.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ModernoButton
              variant="primary"
              href={isAuthenticated ? "/cuenta" : "/registro"}
              className="px-10 py-4 text-xs font-black w-full sm:w-auto"
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
            >
              {isAuthenticated ? "Ir a mi cuenta" : "Crear cuenta gratis"}
            </ModernoButton>

            <ModernoButton
              variant="secondary"
              href="#ecosistema"
              className="px-8 py-4 w-full sm:w-auto"
            >
              Ver catálogo
            </ModernoButton>
          </div>
        </div>
      </div>
    </section>
  );
};
