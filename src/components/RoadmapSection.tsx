import React from "react";
import { ROADMAP_PRODUCTS } from "../data/products";
import { ModernoBadge } from "./ModernoBadge";

export const RoadmapSection: React.FC = () => {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2
            id="roadmap-heading"
            className="text-balance text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[var(--moderno-text)] sm:text-5xl"
          >
            Lo que viene.
          </h2>
          <p className="mt-5 text-pretty text-[15px] font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
            Proyectos en beta privada y desarrollo. Sin fechas prometidas.
          </p>
        </div>
        <p className="max-w-xs text-sm font-light leading-relaxed text-[var(--moderno-text-subtle)]">
          Los accesos se habilitan cuando cada producto está disponible.
        </p>
      </div>

      <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
        {ROADMAP_PRODUCTS.map((product) => (
          <li
            key={product.id}
            className="flex items-start justify-between gap-4 border-t border-white/[0.07] py-5 sm:py-6"
          >
            <div className="min-w-0">
              <h3 className="text-base font-medium tracking-[-0.015em] text-[var(--moderno-text)] sm:text-lg">
                {product.name}
              </h3>
              <p className="mt-1 max-w-sm text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
                {product.description}
              </p>
            </div>
            <ModernoBadge status={product.status} size="sm" />
          </li>
        ))}
      </ul>
    </section>
  );
};
