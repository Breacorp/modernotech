import React from "react";
import { PRODUCT_AREAS } from "../data/products";
import { ProductIcon } from "./ProductIcon";

export const EcosystemOverview: React.FC = () => {
  return (
    <section
      id="ecosistema"
      aria-labelledby="ecosystem-overview-heading"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2
            id="ecosystem-overview-heading"
            className="text-balance text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[var(--moderno-text)] sm:text-5xl"
          >
            Un ecosistema,
            <br />
            cinco áreas.
          </h2>
          <p className="mt-5 max-w-md text-pretty text-[15px] font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
            Productos independientes que comparten una misma identidad, acceso
            y estándar de calidad.
          </p>
        </div>

        <ul className="border-t border-white/[0.07]">
          {PRODUCT_AREAS.map((area, index) => (
            <li
              key={area.id}
              className="grid grid-cols-[auto_1fr] items-start gap-4 border-b border-white/[0.07] py-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6 sm:py-7"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[var(--moderno-accent-light)]">
                <ProductIcon name={area.icon} className="h-[18px] w-[18px]" />
              </span>

              <div>
                <h3 className="text-lg font-medium tracking-[-0.02em] text-[var(--moderno-text)]">
                  {area.label}
                </h3>
                <p className="mt-1 text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
                  {area.description}
                </p>
              </div>

              <span
                className="hidden text-xs font-light tabular-nums text-[var(--moderno-text-subtle)] sm:block"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
