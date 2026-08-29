"use client";

import React from "react";
import { ModernoButton } from "./ModernoButton";

export const BuiltByModernoSection: React.FC = () => {
  return (
    <section id="nosotros" className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 scroll-mt-20 select-none">
      <div className="relative p-8 sm:p-12 md:p-16 rounded-2xl bg-[#0B0B10] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle mesh light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0052FF]/20 to-[#00E5FF]/10 blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-[11px] font-black text-[#00E5FF] tracking-widest uppercase mb-3">
              <span>BUILT BY MODERNO</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-sans mb-4">
              Diseñamos. Desarrollamos. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#157BFF]">
                Conectamos.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/90 font-medium mb-3">
              Tecnología creada por Moderno para resolver problemas reales.
            </p>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light leading-relaxed max-w-2xl mb-8">
              En lugar de ensamblar herramientas desconectadas de terceros, construimos nuestras propias aplicaciones, protocolos de seguridad, servidores de streaming y motores de IA para garantizar una experiencia sin fricciones.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <ModernoButton
                variant="primary"
                href="#productos"
              >
                Ver Todas las Plataformas
              </ModernoButton>
              <a
                href="https://github.com/Breacorp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-bold transition-all hover:scale-105"
              >
                GitHub Oficial &rarr;
              </a>
            </div>
          </div>

          {/* Right Highlights */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs font-bold text-white block mb-1">100% Desarrollo Propio</span>
              <p className="text-[11px] text-[#94A3B8] font-light">
                Arquitectura y código mantenido internamente sin dependencias opacas.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <span className="text-xs font-bold text-white block mb-1">Aislamiento & Privacidad</span>
              <p className="text-[11px] text-[#94A3B8] font-light">
                Zero Shared DB y cifrado de extremo a extremo para cada consorcio y usuario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
