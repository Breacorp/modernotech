"use client";

import React from "react";
import { ModernoBadge } from "./ModernoBadge";

export const VisionSection: React.FC = () => {
  const futureNodes = [
    { title: "Moderno Pay", tag: "FINANZAS & PAGOS", status: "COMING SOON" as const },
    { title: "Nova Home", tag: "DOMÓTICA RESIDENCIAL", status: "COMING SOON" as const },
    { title: "Moderno Style & Tech", tag: "HARDWARE & DISEÑO", status: "PRIVATE BETA" as const },
    { title: "Moderno Voice AI", tag: "TELEFONÍA & VOZ IA", status: "BETA" as const },
  ];

  return (
    <section className="relative z-10 max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-12 py-20 select-none">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[11px] font-black text-[#00E5FF] tracking-widest uppercase mb-1">
          <span>EXPANSIÓN DEL ECOSISTEMA</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
          Esto recién empieza.
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
          Nuevas plataformas, herramientas y desarrollos se integran de forma continua a la red de Moderno Tech.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {futureNodes.map((node, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.06] hover:border-white/[0.15] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black text-white/40 tracking-widest uppercase">
                  {node.tag}
                </span>
                <ModernoBadge status={node.status} size="sm" />
              </div>
              <h3 className="text-base font-black text-white tracking-tight mb-2">
                {node.title}
              </h3>
            </div>
            <div className="pt-4 border-t border-white/[0.04] text-[11px] font-mono text-white/30">
              MODERNO ROADMAP
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
