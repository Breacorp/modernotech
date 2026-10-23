"use client";

import React from "react";
import { ProductItem } from "../types/products";
import { ModernoBadge } from "./ModernoBadge";
import { ProductIcon } from "./ProductIcon";

interface ModernoProductCardProps {
  product: ProductItem;
}

export const ModernoProductCard: React.FC<ModernoProductCardProps> = ({
  product,
}) => {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="moderno-focus group flex h-full flex-col rounded-2xl border border-white/[0.075] bg-white/[0.022] p-6 transition-colors duration-200 hover:border-white/[0.16] hover:bg-white/[0.042] sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-[var(--moderno-accent-light)]"
          aria-hidden="true"
        >
          <ProductIcon name={product.icon} className="h-[18px] w-[18px]" />
        </span>
        <ModernoBadge status={product.status} size="sm" />
      </div>

      <div className="mt-6 flex-1">
        <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--moderno-text)]">
          {product.name}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
          {product.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
        <span className="text-[13px] font-light text-[var(--moderno-text-subtle)]">
          Abrir producto
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-[var(--moderno-text-muted)] transition-colors group-hover:border-[var(--moderno-accent)]/40 group-hover:text-[var(--moderno-accent-light)]">
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.75}
              d="M7 17 17 7M9 7h8v8"
            />
          </svg>
        </span>
      </div>
      <span className="sr-only"> (abre en una nueva pestaña)</span>
    </a>
  );
};
