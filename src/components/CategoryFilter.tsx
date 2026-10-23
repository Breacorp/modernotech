"use client";

import React from "react";
import { ProductArea } from "../types/products";
import { PRODUCT_AREAS } from "../data/products";

type AreaFilter = ProductArea | "ALL";

interface CategoryFilterProps {
  selectedArea: AreaFilter;
  onSelectArea: (area: AreaFilter) => void;
}

const filters: { id: AreaFilter; label: string }[] = [
  { id: "ALL", label: "Todos" },
  ...PRODUCT_AREAS.map((area) => ({ id: area.id, label: area.label })),
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedArea,
  onSelectArea,
}) => {
  return (
    <div
      role="group"
      aria-label="Filtrar productos por área"
      className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
    >
      {filters.map((filter) => {
        const isSelected = selectedArea === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectArea(filter.id)}
            className={`moderno-focus h-9 shrink-0 rounded-full border px-4 text-[13px] font-medium transition-colors ${
              isSelected
                ? "border-[var(--moderno-text)] bg-[var(--moderno-text)] text-[var(--moderno-background-alt)]"
                : "border-white/[0.08] text-[var(--moderno-text-muted)] hover:border-white/[0.18] hover:text-[var(--moderno-text)]"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
