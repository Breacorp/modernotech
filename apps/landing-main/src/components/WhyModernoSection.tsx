"use client";

import React from "react";
import { WHY_MODERNO_ITEMS } from "../data/products";
import { ProductIcon } from "./ProductIcon";

export const WhyModernoSection: React.FC = () => {
  return (
    <section id="tecnologia" className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 scroll-mt-20 select-none">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[11px] font-black text-[#00E5FF] tracking-widest uppercase mb-1">
          <span>ARQUITECTURA & FILOSOFÍA</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
          ¿Por qué Moderno?
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
          Construimos capas de software empresarial, automatización con IA, control de accesos y servicios digitales diseñadas bajo un ecosistema coherente y conectado.
        </p>
      </div>

      {/* Grid of Why Moderno items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_MODERNO_ITEMS.map((item) => (
          <div
            key={item.id}
            className="group relative p-7 rounded-2xl bg-[#0B0B10] border border-white/[0.07] hover:border-[#00E5FF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] text-[#00E5FF] shadow-md group-hover:scale-105 transition-transform">
                  <ProductIcon name={item.icon} className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>

              <span className="text-[10px] font-black text-[#94A3B8] tracking-widest uppercase block mb-1">
                {item.tag}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#00E5FF] transition-colors mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
