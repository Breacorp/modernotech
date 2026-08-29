"use client";

import React from "react";
import { motion } from "framer-motion";
import { VISION_ROADMAP } from "../data/products";

export const VisionSection: React.FC = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24">
      {/* Center Top Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
          <span className="text-[11px] font-mono tracking-widest text-[#C084FC] uppercase font-bold">
            EXPANSIÓN CONTINUA
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
          Esto recién empieza.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#94A3B8] font-light leading-relaxed">
          Lo que ves hoy es solo la primera fase. Moderno Tech está diseñado como una plataforma modular en perpetua evolución.
        </p>
      </div>

      {/* Roadmap Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {VISION_ROADMAP.map((milestone, idx) => {
          const isCurrent = milestone.status === "ACTIVE" || milestone.status === "DEPLOYING";
          return (
            <div
              key={idx}
              className={`rounded-3xl border p-8 flex flex-col justify-between transition-all backdrop-blur-xl ${
                isCurrent
                  ? "bg-[#070D1E]/80 border-[#0052FF]/40 shadow-[0_15px_40px_rgba(0,82,255,0.15)]"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider uppercase">
                    {milestone.phase}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      milestone.status === "ACTIVE"
                        ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
                        : milestone.status === "DEPLOYING"
                        ? "bg-[#0052FF]/20 text-[#38BDF8] border border-[#0052FF]/30 animate-pulse"
                        : "bg-white/10 text-[#94A3B8]"
                    }`}
                  >
                    {milestone.status === "ACTIVE" ? "DESPLEGADO" : milestone.status === "DEPLOYING" ? "EN DESPLIEGUE" : "PRÓXIMAMENTE"}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{milestone.title}</h3>
                <p className="text-xs text-[#94A3B8] leading-relaxed font-light mb-6">
                  {milestone.description}
                </p>
              </div>

              {/* Items in phase */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                {milestone.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-[#E2E8F0]">
                    <span className="text-[#0052FF]">&bull;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Animated Expansion Banner */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-[#0052FF]/15 via-[#00E5FF]/10 to-[#8B5CF6]/15 p-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#00E5FF] animate-ping" />
          <span className="text-xs font-mono text-white tracking-wider">
            NUEVOS MÓDULOS Y SERVICIOS EN DESARROLLO CONSTANTE
          </span>
        </div>
        <span className="text-xs font-mono text-[#38BDF8]">
          &plus; 12 PRODUCTOS Y HERRAMIENTAS ADICIONALES EN ROADMAP
        </span>
      </div>
    </section>
  );
};
