"use client";

import React, { useState } from 'react';
import { CATEGORIAS_ECOSISTEMA, PRODUCTOS_ECOSISTEMA, EcosystemProduct } from '../data/ecosistema';
import { SpotlightCard } from './SpotlightCard';
import { ProductIcon } from './ProductIcon';

export function EcosystemSection() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredProducts = activeCategory === 'todos'
    ? PRODUCTOS_ECOSISTEMA
    : PRODUCTOS_ECOSISTEMA.filter(p => p.category === activeCategory);

  const getStatusBadge = (status: EcosystemProduct['status'], statusLabel: string) => {
    switch (status) {
      case 'disponible':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {statusLabel}
          </span>
        );
      case 'desarrollo':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {statusLabel}
          </span>
        );
      case 'proximamente':
        return (
          <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {statusLabel}
          </span>
        );
    }
  };

  return (
    <section id="ecosistema" className="relative z-10 max-w-7xl mx-auto px-6 py-28 border-t border-white/5 bg-[#070d1e]/50">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#00a8ff] font-bold bg-[#0052FF]/10 border border-[#0052FF]/20 px-4 py-1.5 rounded-full inline-block mb-4">
          Ecosistema Moderno Tech
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Nuestros Productos & Plataformas
        </h2>
        <p className="text-base text-[#9ab0d3] mt-4 leading-relaxed font-light">
          Una marca central, soluciones tecnológicas independientes especializadas. Explora el catálogo activo y accede directamente a cada plataforma.
        </p>
      </div>

      {/* Category selector filter tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-14">
        {CATEGORIAS_ECOSISTEMA.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#0052FF] text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] border border-white/20 scale-[1.02]'
                  : 'bg-white/5 text-[#9ab0d3] hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <SpotlightCard key={product.id}>
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="h-13 w-13 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:border-[#00a8ff]/40 group-hover:bg-[#0052FF]/10 shadow-inner">
                  <ProductIcon name={product.iconName} className="w-7 h-7 text-[#00a8ff] transition-transform duration-300 group-hover:scale-105" />
                </div>
                {getStatusBadge(product.status, product.statusLabel)}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#00a8ff] tracking-wider uppercase bg-[#00a8ff]/10 px-2 py-0.5 rounded">
                  {product.categoryLabel}
                </span>
                {product.badge && (
                  <span className="text-[9px] font-mono text-white/40 border border-white/10 px-1.5 py-0.5 rounded">
                    {product.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white mt-2 mb-2 transition-colors duration-300 group-hover:text-[#00f0ff]">
                {product.name}
              </h3>
              
              <span className="text-[11px] font-mono text-[#9ab0d3]/70 block mb-4">
                {product.subdomain}
              </span>

              <p className="text-xs text-[#9ab0d3] leading-relaxed mb-8 font-light">
                {product.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <a
                href={product.url}
                target={product.url.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="text-xs font-bold text-white group-hover:text-[#00f0ff] flex items-center gap-2 transition-colors"
              >
                <span>{product.ctaText}</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <span className="text-[9px] text-white/30 font-mono uppercase tracking-widest">
                {product.subdomain.split('.')[0]}
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
