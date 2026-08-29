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
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar select-none" role="tablist" aria-label="Filtro de categorías de productos">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] || 0;

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${
              isSelected
                ? "bg-[#0052FF] text-white shadow-[0_0_20px_rgba(0,82,255,0.4)] border border-white/20 scale-105"
                : "bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-white border border-white/5"
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                isSelected ? "bg-white/20 text-white" : "bg-white/10 text-[#64748B]"
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
