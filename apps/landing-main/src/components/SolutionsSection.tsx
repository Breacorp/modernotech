"use client";

import React from 'react';
import { SOLUCIONES_ECOSISTEMA } from '../data/ecosistema';
import { SpotlightCard } from './SpotlightCard';
import { ProductIcon } from './ProductIcon';

export function SolutionsSection() {
  const handleSolutionClick = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("ecosistema");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="soluciones" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-white/5 bg-[#050a15]/60">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-[0.25em] text-[#00a8ff] font-bold bg-[#0052FF]/10 border border-[#0052FF]/20 px-4 py-1.5 rounded-full inline-block mb-4">
          Soluciones de Negocio
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          ¿Qué Necesitas Resolver Hoy?
        </h2>
        <p className="text-base text-[#9ab0d3] mt-4 leading-relaxed font-light">
          No pienses solo en software. Descubre cómo combinamos nuestros productos para ofrecerte soluciones integrales listas para escalar tu operación.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SOLUCIONES_ECOSISTEMA.map((solucion) => (
          <SpotlightCard key={solucion.id} className="h-full">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="h-12 w-12 rounded-xl bg-[#0052FF]/15 border border-[#0052FF]/30 flex items-center justify-center">
                  <ProductIcon name={solucion.iconName} className="w-6 h-6 text-[#00a8ff]" />
                </div>
                <span className="text-[10px] font-mono text-[#00a8ff] border border-[#00a8ff]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {solucion.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f0ff] transition-colors">
                {solucion.title}
              </h3>

              <p className="text-xs text-[#9ab0d3] leading-relaxed mb-6 font-light">
                {solucion.description}
              </p>

              {/* Ecosystem integration tag pills */}
              <div className="mb-8">
                <span className="text-[10px] uppercase tracking-wider text-[#9ab0d3]/60 block mb-2 font-mono">
                  Módulos integrados:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {solucion.includedProducts.map((prodName, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 border border-white/10 text-white/80 px-2.5 py-1 rounded font-medium"
                    >
                      {prodName}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <a
                href="#ecosistema"
                onClick={handleSolutionClick(solucion.targetId)}
                className="w-full text-xs font-bold bg-[#0052FF]/15 hover:bg-[#0052FF]/30 text-white border border-[#0052FF]/30 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>{solucion.ctaText}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
