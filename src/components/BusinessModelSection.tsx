import React from "react";
import { ModernoButton } from "./ModernoButton";

interface Modality {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const MODALITIES: Modality[] = [
  {
    number: "01",
    title: "Cliente directo",
    subtitle: "Marca Moderno Tech",
    description:
      "Contratás el servicio, pagás tu tarifa y utilizás la plataforma tal como la comercializamos.",
    highlights: [
      "Moderno Tech aporta marca, software e infraestructura",
      "Relación comercial directa y soporte incluido",
      "Listo para usar desde el primer día",
    ],
  },
  {
    number: "02",
    title: "Revendedor",
    subtitle: "Marca Moderno Tech",
    description:
      "Comercializás nuestros servicios a tus propios clientes con un margen adicional según tu plan.",
    highlights: [
      "Conserva la marca y respaldo de Moderno Tech",
      "Administrás tu cartera de clientes y tu margen",
      "Plataforma, servidores y mantenimiento a nuestro cargo",
    ],
  },
  {
    number: "03",
    title: "Reseller White Label",
    subtitle: "Tu propia marca",
    description:
      "Ofrecé nuestra tecnología como si fuera tu propio producto, sin desarrollar software ni mantener servidores.",
    highlights: [
      "Tu nombre, logo, dominio e identidad visual",
      "Tus propios precios, planes y reglas comerciales",
      "Tu relación directa con tus clientes",
    ],
  },
];

export const BusinessModelSection: React.FC = () => {
  return (
    <section
      id="modelo-de-negocio"
      aria-labelledby="business-model-heading"
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="border-t border-white/[0.07] pt-16 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--moderno-accent-light)]">
              Modelo de negocio
            </p>
            <h2
              id="business-model-heading"
              className="mt-4 text-balance text-4xl font-medium leading-[1.04] tracking-[-0.045em] text-[var(--moderno-text)] sm:text-5xl"
            >
              Vos construís el negocio.{" "}
              <span className="text-[var(--moderno-accent-light)]">
                Nosotros ponemos la tecnología.
              </span>
            </h2>
          </div>

          <p className="text-pretty text-[15px] font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
            No solo creamos y ofrecemos servicios: te damos la posibilidad de
            tener tu propia empresa tecnológica bajo tus normas y precios.
            Nosotros ponemos el software, el desarrollo, la infraestructura y el
            soporte; vos ponés tu marca y tus clientes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {MODALITIES.map((modality) => (
            <article
              key={modality.number}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-white/[0.15] hover:bg-white/[0.035]"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--moderno-accent-light)]">
                    {modality.subtitle}
                  </span>
                  <span className="text-xs font-light tabular-nums text-[var(--moderno-text-subtle)]">
                    {modality.number}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-[var(--moderno-text)]">
                  {modality.title}
                </h3>

                <p className="mt-3 text-sm font-light leading-relaxed text-[var(--moderno-text-muted)]">
                  {modality.description}
                </p>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5">
                {modality.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm font-light text-[var(--moderno-text-muted)]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--moderno-accent-light)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--moderno-accent-light)]/25 bg-[var(--moderno-accent-light)]/[0.05] p-7 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-2xl">
            <h3 className="text-xl font-medium tracking-[-0.025em] text-[var(--moderno-text)] sm:text-2xl">
              Tu propia empresa de rastreo GPS, control de acceso o nube, sin
              desarrollar nada.
            </h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-[var(--moderno-text-muted)] sm:text-base">
              Nosotros ponemos la plataforma, los servidores y el soporte. Vos
              ponés tu marca y tus clientes.
            </p>
          </div>

          <ModernoButton href="#productos" size="md" className="shrink-0">
            Ver plataformas
          </ModernoButton>
        </div>
      </div>
    </section>
  );
};

