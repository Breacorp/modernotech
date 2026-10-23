import React from "react";

const PRINCIPLES = [
  {
    title: "Producto antes que catálogo.",
    description:
      "Cada herramienta resuelve un problema concreto y comparte la misma base técnica.",
  },
  {
    title: "Diseño antes que ruido.",
    description:
      "Interfaces claras, jerarquía y espacio para lo que realmente importa.",
  },
  {
    title: "Operación real.",
    description:
      "Productos en uso, con mantenimiento y soporte continuo.",
  },
];

export const PhilosophySection: React.FC = () => {
  return (
    <section
      id="compania"
      aria-labelledby="philosophy-heading"
      className="relative z-10 scroll-mt-24 bg-[var(--moderno-paper)] text-[var(--moderno-ink)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div>
            <p className="text-sm font-medium text-[var(--moderno-ink-subtle)]">
              Compañía
            </p>
            <h2
              id="philosophy-heading"
              className="mt-3 max-w-lg text-balance text-4xl font-medium leading-[1.04] tracking-[-0.045em] sm:text-5xl"
            >
              Software propio, criterio de producto.
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base font-light leading-relaxed text-[var(--moderno-ink-muted)] sm:text-lg">
              Moderno Tech diseña, desarrolla y opera cada plataforma del
              ecosistema. Trabajamos con una misma identidad, una sola cuenta y
              un estándar de calidad compartido.
            </p>
            <a
              href="https://github.com/Breacorp"
              target="_blank"
              rel="noopener noreferrer"
              className="moderno-focus moderno-focus-on-light mt-8 inline-flex items-center gap-1.5 rounded text-sm font-medium text-[var(--moderno-ink)] transition-colors hover:text-[var(--moderno-accent-strong)]"
            >
              Ver el código en GitHub
              <svg
                className="h-4 w-4"
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
              <span className="sr-only"> (abre en una nueva pestaña)</span>
            </a>
          </div>

          <ul className="border-t border-[var(--moderno-ink-border)]">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.title}
                className="border-b border-[var(--moderno-ink-border)] py-6 sm:py-7"
              >
                <h3 className="text-lg font-medium tracking-[-0.02em] sm:text-xl">
                  {principle.title}
                </h3>
                <p className="mt-1.5 max-w-md text-sm font-light leading-relaxed text-[var(--moderno-ink-muted)]">
                  {principle.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
