"use client";

import React from "react";
import { ModernoButton } from "./ModernoButton";

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 select-none">
      <div className="relative p-10 sm:p-16 md:p-20 rounded-2xl bg-[#0B0B10] border border-white/[0.08] text-center flex flex-col items-center justify-center overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
        {/* Glow behind CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.12)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-black text-[#00E5FF] tracking-widest uppercase block mb-3">
            PORTAL CENTRAL MODERNO
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-sans mb-4">
            Descubrí Moderno.
          </h2>
          <p className="text-sm sm:text-lg text-[#94A3B8] font-light max-w-lg mx-auto mb-8">
            Explorá todo nuestro ecosistema y conectá tus operaciones, seguridad y entretenimiento en un solo lugar.
          </p>

          <ModernoButton
            variant="primary"
            href="#productos"
            className="px-10 py-4 text-xs font-black"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
          >
            Explorar Productos
          </ModernoButton>
        </div>
      </div>
    </section>
  );
};
