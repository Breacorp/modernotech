"use client";

import React from 'react';
import { SERVICIOS_ECOSISTEMA } from '../data/ecosistema';
import { ProductIcon } from './ProductIcon';

export function ServicesSection() {
  return (
    <section id="servicios" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-white/5 bg-[#070d1e]/40">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[#00a8ff] font-bold bg-[#0052FF]/10 border border-[#0052FF]/20 px-4 py-1.5 rounded-full inline-block mb-4">
          Servicios Tecnológicos
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Servicios e Infraestructura
        </h2>
        <p className="text-base text-[#9ab0d3] mt-4 leading-relaxed font-light">
          Además de nuestros productos de catálogo, ofrecemos servicios técnicos especializados para empresas que requieren soluciones avanzadas e integración a medida.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICIOS_ECOSISTEMA.map((servicio) => (
          <div
            key={servicio.id}
            className="glossy-panel p-8 flex flex-col justify-between hover:border-[#00a8ff]/40 transition-all duration-300 group"
          >
            <div>
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#0052FF]/15 group-hover:border-[#00a8ff]/30 transition-all">
                <ProductIcon name={servicio.iconName} className="w-6 h-6 text-[#00a8ff]" />
              </div>

              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                {servicio.title}
              </h3>

              <p className="text-xs text-[#9ab0d3] leading-relaxed font-light mb-6">
                {servicio.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-[#00a8ff] font-mono uppercase tracking-wider">
                Servicio Profesional
              </span>
              <span className="text-[9px] text-white/30 font-mono">MODERNO TECH</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
