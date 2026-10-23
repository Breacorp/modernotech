"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ProductArea } from "../types/products";
import {
  CATALOG_PRODUCTS,
  PRODUCT_AREAS,
  getProductArea,
} from "../data/products";
import { CategoryFilter } from "./CategoryFilter";
import { ModernoButton } from "./ModernoButton";
import { ModernoProductCard } from "./ModernoProductCard";
import { SignedInBar } from "./SignedInBar";

type AreaFilter = ProductArea | "ALL";

const INITIAL_COUNT = 6;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const isProductArea = (value: string | null): value is ProductArea =>
  !!value && PRODUCT_AREAS.some((area) => area.id === value);

export const ProductCatalog: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<AreaFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [urlReady, setUrlReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    if (isProductArea(area)) setSelectedArea(area);
    const query = params.get("q");
    if (query) setSearchQuery(query);
    setUrlReady(true);
  }, []);

  useEffect(() => {
    if (!urlReady) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (selectedArea !== "ALL") params.set("area", selectedArea);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      const query = params.toString();
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}${
        window.location.hash
      }`;
      const currentUrl = `${window.location.pathname}${window.location.search}${
        window.location.hash
      }`;

      if (nextUrl !== currentUrl) {
        window.history.replaceState(null, "", nextUrl);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [urlReady, selectedArea, searchQuery]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const area = params.get("area");
      setSelectedArea(isProductArea(area) ? area : "ALL");
      setSearchQuery(params.get("q") ?? "");
      setExpanded(false);
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = normalize(searchQuery.trim());

    return CATALOG_PRODUCTS.filter((product) => {
      const area = getProductArea(product.area);
      const matchesArea =
        selectedArea === "ALL" || product.area === selectedArea;
      const matchesSearch =
        query === "" ||
        normalize(
          [
            product.name,
            product.description,
            product.tagline,
            area?.label ?? "",
          ].join(" ")
        ).includes(query);

      return matchesArea && matchesSearch;
    });
  }, [selectedArea, searchQuery]);

  const hasActiveFilters =
    selectedArea !== "ALL" || searchQuery.trim() !== "";
  const showAll = expanded || hasActiveFilters;
  const visibleProducts = showAll
    ? filteredProducts
    : filteredProducts.slice(0, INITIAL_COUNT);
  const remainingCount = Math.max(
    filteredProducts.length - visibleProducts.length,
    0
  );
  const selectedAreaLabel =
    selectedArea === "ALL"
      ? null
      : PRODUCT_AREAS.find((area) => area.id === selectedArea)?.label;

  const selectArea = (area: AreaFilter) => {
    setSelectedArea(area);
    setExpanded(false);
  };

  const updateSearch = (value: string) => {
    setSearchQuery(value);
    setExpanded(false);
  };

  const resetFilters = () => {
    setSelectedArea("ALL");
    setSearchQuery("");
    setExpanded(false);
  };

  return (
    <section
      id="productos"
      aria-labelledby="catalog-heading"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 border-t border-white/[0.06] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2
            id="catalog-heading"
            className="text-balance text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[var(--moderno-text)] sm:text-5xl"
          >
            Explorá el ecosistema.
          </h2>
          <p className="mt-5 text-pretty text-[15px] font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
            Todos los productos disponibles y en beta, en un solo lugar.
            Buscá por nombre o filtrá por área.
          </p>
        </div>

        <div role="search" className="w-full lg:w-80">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar productos
          </label>
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--moderno-text-subtle)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" strokeWidth="1.75" />
              <path
                strokeLinecap="round"
                strokeWidth="1.75"
                d="m20 20-3.5-3.5"
              />
            </svg>
            <input
              id="catalog-search"
              type="text"
              value={searchQuery}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Buscar producto"
              aria-describedby="catalog-results-count"
              className="moderno-focus h-11 w-full rounded-full border border-white/[0.08] bg-white/[0.025] pl-10 pr-10 text-sm font-light text-[var(--moderno-text)] placeholder:text-[var(--moderno-text-subtle)] transition-colors hover:border-white/[0.16] focus:border-[var(--moderno-accent)]/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => updateSearch("")}
                aria-label="Limpiar búsqueda"
                className="moderno-focus absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-[var(--moderno-text-muted)] transition-colors hover:bg-white/[0.07] hover:text-[var(--moderno-text)]"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <SignedInBar />

      <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-8">
        <CategoryFilter
          selectedArea={selectedArea}
          onSelectArea={selectArea}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p
            id="catalog-results-count"
            role="status"
            aria-live="polite"
            className="text-[13px] font-light text-[var(--moderno-text-subtle)]"
          >
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
            {searchQuery.trim()
              ? ` para “${searchQuery.trim()}”`
              : selectedAreaLabel
                ? ` en ${selectedAreaLabel}`
                : " disponibles o en beta"}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="moderno-focus rounded-full text-[13px] font-light text-[var(--moderno-text-muted)] underline-offset-4 transition-colors hover:text-[var(--moderno-text)] hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <div
          id="product-grid"
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleProducts.map((product) => (
            <ModernoProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/[0.075] bg-white/[0.02] px-6 py-14 text-center">
          <h3 className="text-lg font-medium tracking-[-0.02em] text-[var(--moderno-text)]">
            No encontramos productos.
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
            Probá con otro nombre o explorá todas las áreas del ecosistema.
          </p>
          <div className="mt-6 flex justify-center">
            <ModernoButton
              variant="secondary"
              size="sm"
              onClick={resetFilters}
            >
              Ver todos los productos
            </ModernoButton>
          </div>
        </div>
      )}

      {remainingCount > 0 && (
        <div className="mt-10 flex justify-center">
          <ModernoButton
            variant="secondary"
            size="md"
            onClick={() => setExpanded(true)}
            ariaExpanded={expanded}
            ariaControls="product-grid"
          >
            Ver los {filteredProducts.length} productos
          </ModernoButton>
        </div>
      )}

      {expanded && !hasActiveFilters && filteredProducts.length > INITIAL_COUNT && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="moderno-focus rounded-full px-4 py-2 text-[13px] font-light text-[var(--moderno-text-muted)] transition-colors hover:text-[var(--moderno-text)]"
          >
            Mostrar menos
          </button>
        </div>
      )}
    </section>
  );
};
