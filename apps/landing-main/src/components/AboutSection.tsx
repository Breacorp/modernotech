"use client";

import React from "react";

export const AboutSection: React.FC = () => {
  const values = [
    {
      label: "100% Desarrollo Propio",
      desc: "Arquitecturas y motores creados internamente sin dependencias frágiles.",
    },
    {
      label: "Privacidad Innegociable",
      desc: "Aislamiento de bases de datos por tenant y cifrado biométrico estándar.",
    },
    {
      label: "Interconexión Nativa",
      desc: "Cada producto se comunica de forma sinérgica a través del bus reactivo Moderno.",
    },
    {
      label: "Diseño de Grado Industrial",
      desc: "Interfaces meticulosamente construidas para velocidad, claridad y elegancia.",
    },
  ];

  return (
    <section id="nosotros" className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 scroll-mt-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#091124] to-[#040711] p-8 sm:p-14 md:p-18 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle grid and ambient light */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[radial-gradient(circle,rgba(0,82,255,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20">
              <span className="text-[11px] font-mono tracking-widest text-[#00E5FF] uppercase font-bold">
                MANIFIESTO MODERNO
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-6">
              Construimos tecnología <br />
              <span className="text-[#38BDF8]">para el mundo real.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#E2E8F0] font-light leading-relaxed mb-6">
              Moderno Tech nace de una idea simple:{" "}
              <strong className="text-white font-semibold">la tecnología debería trabajar para vos, no al revés.</strong>
            </p>
            <p className="text-sm text-[#94A3B8] font-light leading-relaxed mb-8">
              En un panorama saturado de herramientas desconectadas y modelos genéricos, diseñamos un ecosistema integrado donde la inteligencia artificial, el software operativo, el entretenimiento y el hardware colaboran bajo un mismo estándar de calidad y privacidad.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#productos"
                className="px-6 py-3 rounded-full bg-[#0052FF] hover:bg-[#0041CC] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,82,255,0.4)]"
              >
                Explorar Soluciones
              </a>
            </div>
          </div>

          {/* Right Column: Value Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-colors"
              >
                <span className="text-xs font-bold text-white mb-2">{v.label}</span>
                <span className="text-[11px] text-[#94A3B8] font-light leading-relaxed">{v.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
