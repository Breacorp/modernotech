"use client";

import React from "react";
import { ProductItem } from "../types/products";
import { ModernoBadge } from "./ModernoBadge";
import { ProductIcon } from "./ProductIcon";

interface ModernoProductCardProps {
  product: ProductItem;
  featured?: boolean;
}

export const ModernoProductCard: React.FC<ModernoProductCardProps> = ({
  product,
  featured = false,
}) => {
  const getSpanClasses = (span?: string, isFeatured?: boolean) => {
    if (isFeatured) return "col-span-1 md:col-span-2 lg:col-span-2";
    switch (span) {
      case "wide":
        return "col-span-1 md:col-span-2";
      case "tall":
        return "col-span-1 md:row-span-2";
      case "heroic":
        return "col-span-1 md:col-span-2 lg:col-span-3";
      default:
        return "col-span-1";
    }
  };

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${product.name}: ${product.tagline}. Abrir en una nueva pestaña`}
      className={`moderno-focus group relative p-6 sm:p-8 rounded-2xl bg-[var(--moderno-surface-card)] border border-white/[0.07] hover:border-[var(--moderno-primary)]/40 shadow-[0_10px_30px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(0,229,255,0.2)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.99] overflow-hidden flex flex-col justify-between cursor-pointer ${getSpanClasses(
        product.bentoSpan,
        featured
      )}`}
    >
      {/* Ambient product glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-20 group-hover:opacity-40 blur-2xl transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${product.accentColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 text-white font-black text-sm shadow-md transition-transform duration-300 group-hover:scale-105 shrink-0"
              style={{
                backgroundColor: `${product.accentColor}25`,
                color: product.accentColor,
              }}
            >
              <ProductIcon name={product.icon} className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase block">
                {product.categoryLabel}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[var(--moderno-primary)] transition-colors tracking-tight">
                {product.name}
              </h3>
            </div>
          </div>

          <ModernoBadge status={product.status} size="sm" />
        </div>

        <p className="text-sm font-bold text-white/90 mb-2">{product.tagline}</p>

        <p className="text-sm text-[var(--moderno-text-muted)] font-light leading-relaxed mb-6 line-clamp-3">
          {product.description}
        </p>

        {product.metrics && (
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono">
            <span className="text-white/55">{product.metrics.label}:</span>
            <span className="font-bold text-[var(--moderno-primary)]">
              {product.metrics.value}
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-white/70 border border-white/[0.04]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-white/75 group-hover:text-white transition-colors shrink-0">
          <span>{product.ctaText}</span>
          <svg
            className="w-4 h-4 text-[var(--moderno-primary)] group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
};
