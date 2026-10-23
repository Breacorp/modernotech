"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ProductCategory } from "../types/products";
import { CATEGORIES, PRODUCTS_REGISTRY } from "../data/products";
import { ModernoProductCard } from "./ModernoProductCard";
import { CategoryFilter } from "./CategoryFilter";

const PAGE_SIZE = 9;

const isProductCategory = (value: string | null): value is ProductCategory =>
  !!value && CATEGORIES.some((category) => category.id === value);

export const ProductEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [urlReady, setUrlReady] = useState(false);

  // Read shareable filters once, after hydration (keeps SSR markup stable).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("cat");
    if (isProductCategory(category)) setSelectedCategory(category);
    const query = params.get("q");
    if (query) setSearchQuery(query);
    setUrlReady(true);
  }, []);

  // Keep the URL shareable without triggering a navigation per keystroke.
  useEffect(() => {
    if (!urlReady) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (selectedCategory !== "ALL") params.set("cat", selectedCategory);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (nextUrl !== currentUrl) {
        window.history.replaceState(null, "", nextUrl);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [urlReady, selectedCategory, searchQuery]);

  // Support browser back/forward between filter states.
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("cat");
      setSelectedCategory(isProductCategory(category) ? category : "ALL");
      setSearchQuery(params.get("q") ?? "");
      setVisibleCount(PAGE_SIZE);
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  // Flagship products shown above the grid
  const featuredProducts = useMemo(
    () => PRODUCTS_REGISTRY.filter((p) => p.featured).sort((a, b) => a.order - b.order),
    []
  );

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(
      CATEGORIES.map((category) => [category.id, 0])
    ) as Record<ProductCategory, number>;

    counts.ALL = PRODUCTS_REGISTRY.length;
    PRODUCTS_REGISTRY.forEach((product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
    });

    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PRODUCTS_REGISTRY.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesSearch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // When browsing "all" without a query, featured cards live in their own block.
  const displayProducts = useMemo(() => {
    if (selectedCategory === "ALL" && searchQuery.trim() === "") {
      return filteredProducts.filter((p) => !p.featured);
    }
    return filteredProducts;
  }, [selectedCategory, searchQuery, filteredProducts]);

  const visibleProducts = useMemo(
    () => displayProducts.slice(0, visibleCount),
    [displayProducts, visibleCount]
  );

  const remainingCount = Math.max(displayProducts.length - visibleCount, 0);
  const hasActiveFilters =
    selectedCategory !== "ALL" || searchQuery.trim() !== "";

  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setVisibleCount(PAGE_SIZE);
  };

  const selectCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section
      id="ecosistema"
      aria-labelledby="ecosystem-heading"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-24 scroll-mt-24 select-none"
    >
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase mb-1">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            <span>CATÁLOGO DEL ECOSISTEMA</span>
          </div>
          <h2
            id="ecosystem-heading"
            className="text-balance text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-sans"
          >
            Todo Moderno, conectado.
          </h2>
          <p className="text-sm text-[var(--moderno-text-muted)] font-light mt-1 max-w-xl">
            Lanzador unificado para acceder directamente a las plataformas activas, en beta y en desarrollo del ecosistema.
          </p>
        </div>

        {/* Search */}
        <div className="w-full md:w-80">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar plataforma o servicio
          </label>
          <div className="relative">
            <input
              id="catalog-search"
              type="text"
              value={searchQuery}
              onChange={(e) => updateSearch(e.target.value)}
              placeholder="Buscar plataforma o servicio..."
              aria-describedby="catalog-results-count"
              className="moderno-focus w-full px-4 py-2.5 pl-10 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] text-white placeholder-[var(--moderno-text-muted)]/80 text-[13px] font-medium focus:border-[var(--moderno-primary)]/60 focus:ring-1 focus:ring-[var(--moderno-primary)]/40 transition-all backdrop-blur-md"
            />
            <svg
              className="w-4 h-4 text-[var(--moderno-primary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => updateSearch("")}
                aria-label="Limpiar búsqueda"
                className="moderno-focus absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results summary + active filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4 min-h-7">
        <p
          id="catalog-results-count"
          role="status"
          aria-live="polite"
          className="text-xs text-[var(--moderno-text-muted)]"
        >
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "plataforma" : "plataformas"}
          {hasActiveFilters ? " con los filtros aplicados" : " en el ecosistema"}
        </p>

        {selectedCategory !== "ALL" && (
          <button
            type="button"
            onClick={() => selectCategory("ALL")}
            className="moderno-focus inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--moderno-primary)]/10 text-[var(--moderno-primary)] border border-[var(--moderno-primary)]/30 hover:bg-[var(--moderno-primary)]/20 transition-colors"
          >
            {CATEGORIES.find((c) => c.id === selectedCategory)?.label}
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Quitar filtro de categoría</span>
          </button>
        )}

        {searchQuery.trim() !== "" && (
          <button
            type="button"
            onClick={() => updateSearch("")}
            className="moderno-focus inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/[0.06] text-white/85 border border-white/10 hover:bg-white/10 transition-colors"
          >
            &ldquo;{searchQuery.trim()}&rdquo;
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Quitar búsqueda</span>
          </button>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="moderno-focus text-[11px] font-bold text-[var(--moderno-text-muted)] hover:text-white underline underline-offset-4 transition-colors rounded"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Featured flagship spotlight */}
      {selectedCategory === "ALL" && searchQuery.trim() === "" && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-black tracking-widest text-[var(--moderno-primary)] uppercase">
              LÍNEAS PRINCIPALES DEL ECOSISTEMA
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProducts.map((product) => (
              <ModernoProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        </div>
      )}

      {/* Category filters */}
      <div className="mb-8">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={selectCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Product grid */}
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {visibleProducts.map((product) => (
            <ModernoProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-2xl border border-white/[0.08] bg-[var(--moderno-surface-card)] text-center flex flex-col items-center justify-center">
          <span className="text-3xl mb-3" aria-hidden="true">🔍</span>
          <h3 className="text-base font-bold text-white mb-1">No se encontraron plataformas</h3>
          <p className="text-sm text-[var(--moderno-text-muted)] max-w-sm mb-5">
            No hay productos que coincidan con &ldquo;{searchQuery}&rdquo;. Probá restablecer los filtros.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="moderno-focus px-5 py-2 rounded-xl bg-white/[0.08] text-white text-xs font-bold hover:bg-white/[0.15] transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Progressive disclosure */}
      {remainingCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="moderno-focus px-6 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white text-xs font-bold transition-all inline-flex items-center gap-2"
          >
            Ver más plataformas
            <span className="text-[var(--moderno-text-muted)] font-mono">
              (+{remainingCount})
            </span>
          </button>
        </div>
      )}
    </section>
  );
};
