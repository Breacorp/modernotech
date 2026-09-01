"use client";

import React, { useState, useMemo } from "react";
import { ProductCategory } from "../types/products";
import { CATEGORIES, PRODUCTS_REGISTRY } from "../data/products";
import { ModernoProductCard } from "./ModernoProductCard";
import { CategoryFilter } from "./CategoryFilter";

export const ProductEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Featured flagship products: Access & Play
  const featuredProducts = useMemo(() => {
    return PRODUCTS_REGISTRY.filter((p) => p.featured).sort((a, b) => a.order - b.order);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      ALL: PRODUCTS_REGISTRY.length,
      cloud: 0,
      security: 0,
      entertainment: 0,
      ai: 0,
      business: 0,
      weather: 0,
      productivity: 0,
      fintech: 0,
      software: 0,
      hardware: 0,
      services: 0,
    };

    PRODUCTS_REGISTRY.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });

    return counts;
  }, []);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS_REGISTRY.filter((product) => {
      const matchesCategory = selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="productos" className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 scroll-mt-20 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-black text-[#00E5FF] tracking-widest uppercase mb-1">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            <span>HUB CENTRAL DE APLICACIONES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans">
            Todo Moderno, conectado.
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-1 max-w-xl">
            Lanzador unificado para acceder directamente a todas las plataformas activas y en desarrollo del ecosistema.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="w-full md:w-80">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar plataforma o servicio..."
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/40 transition-all backdrop-blur-md"
            />
            <svg
              className="w-4 h-4 text-[#00E5FF] absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured Flagship Spotlight (Access & Play) */}
      {selectedCategory === "ALL" && searchQuery.trim() === "" && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black tracking-widest text-[#00E5FF] uppercase">
              PRODUCTOS PRINCIPALES DEL ECOSISTEMA
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((p) => (
              <ModernoProductCard key={p.id} product={p} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Category Pills Filter */}
      <div className="mb-8" id="ecosistema">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Bento Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredProducts.map((product) => (
            <ModernoProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-2xl border border-white/[0.08] bg-[#0B0B10] text-center flex flex-col items-center justify-center">
          <span className="text-3xl mb-3">🔍</span>
          <h3 className="text-base font-bold text-white mb-1">No se encontraron plataformas</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mb-5">
            No hay productos que coincidan con &quot;{searchQuery}&quot;. Probá restablecer los filtros.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-xl bg-white/[0.08] text-white text-xs font-bold hover:bg-white/[0.15] transition-colors"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </section>
  );
};
