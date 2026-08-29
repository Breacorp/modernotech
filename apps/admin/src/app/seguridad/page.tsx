"use client";

import React from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

export default function SeguridadPage() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="tracking-[0.2em] uppercase">INFRAESTRUCTURA & ESTÁNDARES // SEGURIDAD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
            Seguridad Zero-Trust & Aislamiento
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            La arquitectura que protege el ecosistema tecnológico de Moderno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🔐</span>
            <h3 className="text-sm font-bold text-white mb-2">Zero-Shared Database</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Aislamiento estricto por cliente y consorcio. No compartimos tablas ni agrupaciones lógicas vulnerables a cross-tenant leaks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🛡️</span>
            <h3 className="text-sm font-bold text-white mb-2">Cifrado AES-256 E2E</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Tanto las credenciales RFID/NFC como las transmisiones de control físico viajan encapsuladas con claves simétricas rotativas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">⚡</span>
            <h3 className="text-sm font-bold text-white mb-2">Edge Computing & Latencia 12ms</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Nodos de procesamiento locales en Buenos Aires con mitigación DDoS automática y conmutación por error en milisegundos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🔄</span>
            <h3 className="text-sm font-bold text-white mb-2">Snapshots Atómicos & Rollback</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              En Moderno AI Cleaner Pro, cada cambio genera un punto de restauración atómico instantáneo para garantizar integridad de datos.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
