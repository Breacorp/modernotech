import React from "react";
import { ModernoButton } from "./ModernoButton";
import { ProductIcon } from "./ProductIcon";

const STEPS = [
  {
    number: "01",
    icon: "sparkles",
    title: "Creá tu Moderno ID",
    description:
      "Una sola cuenta gratuita te identifica en todo el ecosistema. Sin formularios repetidos ni credenciales separadas.",
  },
  {
    number: "02",
    icon: "layers",
    title: "Accedé a tus plataformas",
    description:
      "Entrá a Cloud, Access, Play, One o AI desde el lanzador central y tus permisos se aplican automáticamente.",
  },
  {
    number: "03",
    icon: "shield",
    title: "Gestioná todo en un panel",
    description:
      "Administrá servicios, licencias, cuotas y seguridad desde un único lugar, con aislamiento de datos por cuenta.",
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section
      id="como-funciona"
      aria-labelledby="how-it-works-heading"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-24 scroll-mt-24 select-none"
    >
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase mb-1">
          <span>CÓMO FUNCIONA</span>
        </div>
        <h2
          id="how-it-works-heading"
          className="text-balance text-3xl sm:text-5xl font-black text-white tracking-tight font-sans"
        >
          Un solo acceso. Todo el ecosistema.
        </h2>
        <p className="text-sm text-[var(--moderno-text-muted)] font-light mt-2">
          Moderno ID conecta tus productos, permisos y datos sin fricción.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {STEPS.map((step, index) => (
          <div
            key={step.number}
            className="relative p-7 rounded-2xl bg-[var(--moderno-surface-card)] border border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
          >
            {index < STEPS.length - 1 && (
              <div
                className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-[var(--moderno-primary)]/50 to-transparent"
                aria-hidden="true"
              />
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/[0.04] text-[var(--moderno-primary)]">
                <ProductIcon name={step.icon} className="w-6 h-6" />
              </div>
              <span className="text-3xl font-black text-white/10 font-mono tabular-nums">
                {step.number}
              </span>
            </div>

            <h3 className="text-lg font-black text-white tracking-tight mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-[var(--moderno-text-muted)] font-light leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <ModernoButton variant="primary" href="/registro" className="px-8 py-3.5">
          Crear mi Moderno ID
        </ModernoButton>
      </div>
    </section>
  );
};
