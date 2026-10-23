import React from "react";

const FAQS = [
  {
    question: "¿Qué es Moderno ID?",
    answer:
      "Es la identidad única del ecosistema Moderno. Con una sola cuenta accedés a Cloud, Access, Play, One, AI y al resto de las plataformas, con permisos y datos aislados por producto.",
  },
  {
    question: "¿Puedo empezar gratis?",
    answer:
      "Sí. Al crear tu cuenta se activa la capa gratuita de los productos que la ofrecen. Podés ampliar capacidad o funciones cuando lo necesites desde tu panel de cuenta.",
  },
  {
    question: "¿Cómo se conectan los productos entre sí?",
    answer:
      "Comparten Moderno ID, autenticación y políticas de acceso. Cada servicio mantiene su propio aislamiento lógico multi-tenant, de modo que los datos de una cuenta nunca se mezclan con los de otra.",
  },
  {
    question: "¿Dónde se almacenan y protegen mis datos?",
    answer:
      "La información se aloja en infraestructura cloud con cifrado en tránsito (TLS 1.3) y en reposo (AES-256), con políticas de aislamiento por fila (RLS) en la base de datos.",
  },
  {
    question: "¿Cómo solicito una demo para mi empresa?",
    answer:
      "Podés crear una cuenta y explorar las plataformas, o escribirnos desde el centro de ayuda para coordinar una demo de Moderno One, Access o AI adaptada a tu operación.",
  },
  {
    question: "¿Dónde encuentro soporte?",
    answer:
      "El Centro de Ayuda reúne guías, preguntas frecuentes y canales de contacto. Si ya tenés cuenta, también podés gestionar tus servicios desde el panel de Moderno ID.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-24 scroll-mt-24 select-none"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-black text-[var(--moderno-primary)] tracking-widest uppercase mb-1">
            <span>PREGUNTAS FRECUENTES</span>
          </div>
          <h2
            id="faq-heading"
            className="text-balance text-3xl sm:text-5xl font-black text-white tracking-tight font-sans"
          >
            Lo que suelen preguntarnos.
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl bg-[var(--moderno-surface-card)] border border-white/[0.07] hover:border-white/[0.14] open:border-[var(--moderno-primary)]/30 transition-colors"
            >
              <summary className="moderno-focus flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden px-5 py-4 rounded-2xl text-sm font-bold text-white">
                <span>{item.question}</span>
                <svg
                  className="w-4 h-4 text-[var(--moderno-primary)] shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-5 -mt-1 text-sm text-[var(--moderno-text-muted)] font-light leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[var(--moderno-text-muted)]">
          ¿Necesitás algo más?{" "}
          <a
            href="/ayuda"
            className="moderno-focus font-bold text-[var(--moderno-primary)] hover:text-white underline underline-offset-4 transition-colors rounded"
          >
            Visitá el Centro de Ayuda
          </a>
          .
        </p>
      </div>
    </section>
  );
};
