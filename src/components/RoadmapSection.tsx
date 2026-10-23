import React from "react";
import { ROADMAP_PRODUCTS } from "../data/products";
import { ModernoBadge } from "./ModernoBadge";

const upcomingProducts = ROADMAP_PRODUCTS.filter(
  (product) =>
    product.status === "COMING SOON" ||
    product.status === "PRIVATE BETA" ||
    product.status === "BETA"
);

const unavailableProducts = ROADMAP_PRODUCTS.filter(
  (product) => product.status === "UNAVAILABLE"
);

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

      {upcomingProducts.length > 0 && (
        <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
          {upcomingProducts.map((product) => (
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
      )}

      {unavailableProducts.length > 0 && (
        <details className="group mt-8 border-t border-white/[0.07]">
          <summary className="moderno-focus flex cursor-pointer list-none items-center justify-between gap-4 rounded py-5 text-sm font-light text-[var(--moderno-text-muted)] [&::-webkit-details-marker]:hidden">
            <span>
              <span className="font-medium text-[var(--moderno-text)]">
                {unavailableProducts.length} productos
              </span>{" "}
              con acceso no disponible
            </span>
            <svg
              className="roadmap-chevron h-4 w-4 shrink-0 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="m6 9 6 6 6-6"
              />
            </svg>
          </summary>

          <p className="max-w-2xl pb-2 text-sm font-light leading-relaxed text-[var(--moderno-text-subtle)]">
            Estos productos forman parte del ecosistema, pero su acceso público
            no está disponible en este momento.
          </p>

          <ul className="grid gap-x-12 pb-3 sm:grid-cols-2">
            {unavailableProducts.map((product) => (
              <li
                key={product.id}
                className="border-t border-white/[0.05] py-4"
              >
                <h3 className="text-sm font-medium tracking-[-0.01em] text-[var(--moderno-text)]">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-[var(--moderno-text-subtle)]">
                  {product.tagline}
                </p>
              </li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
};
