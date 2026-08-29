"use client";

import React from "react";
import { TECHNOLOGY_PILLARS } from "../data/products";
import { ProductIcon } from "./ProductIcon";

export const TechnologySection: React.FC = () => {
  return (
    <section id="tecnologia" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 scroll-mt-20">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-[radial-gradient(ellipse_at_center,rgba(0,82,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20">
          <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
            PROPRIETARY STACK
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
          Tecnología detrás de Moderno
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#94A3B8] font-light leading-relaxed">
          Construimos tecnología e infraestructura propia diseñada desde cero para garantizar rendimiento en tiempo real, máxima privacidad y resiliencia absoluta.
        </p>
      </div>

      {/* Grid of Technology Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECHNOLOGY_PILLARS.map((pillar) => (
          <div
            key={pillar.id}
            className="group relative rounded-3xl border border-white/10 bg-[#070D1E]/60 backdrop-blur-xl p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#0052FF]/50 hover:bg-[#0A1329]/80 hover:shadow-[0_15px_40px_rgba(0,82,255,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0052FF]/15 border border-[#0052FF]/30 flex items-center justify-center text-[#00E5FF] group-hover:scale-110 transition-transform">
                  <ProductIcon name={pillar.icon} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 text-[#94A3B8] border border-white/10">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-light mb-6">
                {pillar.description}
              </p>
            </div>

            {/* Pillar Details List */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              {pillar.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-[#E2E8F0] font-mono">
                  <span className="text-[#00E5FF]">&bull;</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
