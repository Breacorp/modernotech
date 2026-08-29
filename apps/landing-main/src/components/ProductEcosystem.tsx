"use client";

import React, { useState, useMemo } from "react";
import { ProductCategory, ProductItem } from "../types/products";
import { CATEGORIES, PRODUCTS_REGISTRY } from "../data/products";
import { CategoryFilter } from "./CategoryFilter";
import { ProductCard } from "./ProductCard";

export const ProductEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      ALL: PRODUCTS_REGISTRY.length,
      AI: 0,
      SOFTWARE: 0,
      BUSINESS: 0,
      ENTERTAINMENT: 0,
      WEATHER: 0,
      PRODUCTIVITY: 0,
      HARDWARE: 0,
      SERVICES: 0,
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
    <section id="productos" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0052FF]" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#38BDF8] uppercase font-bold">
              ECOSISTEMA UNIFICADO
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white">
            Todo Moderno. <br className="hidden sm:inline" />
            <span className="text-[#94A3B8]">En un solo lugar.</span>
          </h2>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar producto o función..."
              className="w-full px-4 py-2.5 pl-10 rounded-full bg-white/5 border border-white/10 text-white placeholder-[#64748B] text-xs font-medium focus:outline-none focus:border-[#0052FF] focus:ring-1 focus:ring-[#0052FF] transition-all backdrop-blur-md"
            />
            <svg
              className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-white"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="mb-10">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Bento Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-3xl border border-white/10 bg-white/5 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">🔍</span>
          <h3 className="text-lg font-bold text-white mb-2">No se encontraron productos</h3>
          <p className="text-xs text-[#94A3B8] max-w-sm mb-6">
            No hay productos que coincidan con los filtros seleccionados. Probá buscando por otra categoría o palabra clave.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-[#0052FF] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </section>
  );
};
