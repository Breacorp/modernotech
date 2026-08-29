"use client";

import React from "react";

export const FinalCTA: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="contacto" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 scroll-mt-20">
      <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0B1530] via-[#070D1E] to-[#02050E] p-10 sm:p-16 md:p-20 text-center flex flex-col items-center justify-center overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
        {/* Glow halo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,82,255,0.25)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#00E5FF] uppercase font-bold block mb-4">
            ECOSISTEMA EN CONSTANTE EVOLUCIÓN
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            Explorá el ecosistema Moderno.
          </h2>
          <p className="text-base sm:text-xl text-[#94A3B8] font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Descubrí lo que estamos construyendo y conectá tus operaciones, proyectos y vida diaria con tecnología de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#productos"
              onClick={(e) => handleScrollTo(e, "#productos")}
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(0,82,255,0.5)] border border-white/20"
            >
              Explorar Moderno Tech
            </a>
            <a
              href="mailto:contacto@moderno.com.ar"
              className="w-full sm:w-auto px-10 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
            >
              Contactar al Equipo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
