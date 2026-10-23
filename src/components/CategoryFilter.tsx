"use client";

import React from "react";
import { ProductCategory, CategoryInfo } from "../types/products";

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  counts: Record<ProductCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div
      role="group"
      aria-label="Filtrar plataformas por categoría"
      className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar select-none"
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`moderno-focus px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              isSelected
                ? "bg-[var(--moderno-primary-deep)] text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] border border-white/20"
                : "bg-white/5 hover:bg-white/10 text-[var(--moderno-text-muted)] hover:text-white border border-white/5"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                isSelected ? "bg-white/20 text-white" : "bg-white/10 text-white/60"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
