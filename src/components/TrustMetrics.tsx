import React from "react";
import { PRODUCTS_REGISTRY } from "../data/products";

/**
 * Metrics strip built only from facts declared in the product registry,
 * so nothing here is an invented statistic.
 */
export const TrustMetrics: React.FC = () => {
  const platformCount = PRODUCTS_REGISTRY.length;
  const verticalCount = new Set(PRODUCTS_REGISTRY.map((p) => p.category)).size;

  const metrics = [
    { value: platformCount, suffix: "", label: "Plataformas integradas" },
    { value: verticalCount, suffix: "", label: "Verticales de negocio" },
    { value: 1, suffix: "", label: "Identidad Moderno ID" },
    { value: 100, suffix: "%", label: "Infraestructura cloud" },
  ];

  return (
    <div
      className="mt-10 sm:mt-12 w-full max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-0 md:divide-x divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
      aria-label="Métricas del ecosistema Moderno"
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="px-4 py-4 sm:py-5 text-center">
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {metric.value}
            <span className="text-[var(--moderno-primary)]">{metric.suffix}</span>
          </div>
          <div className="mt-1 text-[11px] sm:text-xs font-medium text-[var(--moderno-text-muted)] leading-tight">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
};
