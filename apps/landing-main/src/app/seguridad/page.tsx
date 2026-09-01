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
            Aislamiento Lógico & Seguridad Multi-Tenant
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            La arquitectura que protege el ecosistema de Moderno Cloud, Access, AI, Play y One.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🔐</span>
            <h3 className="text-sm font-bold text-white mb-2">Aislamiento Lógico por RLS</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Cada producto y cuenta protege sus datos mediante políticas estrictas de Row-Level Security (RLS) en Postgres. Moderno Cloud no tiene acceso a las tablas de Access ni viceversa; cada servicio solo procesa lo autorizado.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🛡️</span>
            <h3 className="text-sm font-bold text-white mb-2">Identidad Central & MFA</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Autenticación global con Supabase Auth que combina tokens JWT criptográficos, autenticación de dos factores (TOTP) y gestión de sesiones activas en tiempo real.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">🔒</span>
            <h3 className="text-sm font-bold text-white mb-2">Cifrado TLS 1.3 & AES-256</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Transmisiones encapsuladas bajo TLS 1.3 de extremo a extremo y almacenamiento de archivos con cifrado simétrico AES-256 en reposo para bóvedas personales y consorcios.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
            <span className="text-2xl mb-3 block">⚡</span>
            <h3 className="text-sm font-bold text-white mb-2">Edge Computing & Latencia 12ms</h3>
            <p className="text-xs text-[#94A3B8] font-light leading-relaxed">
              Nodos de procesamiento locales en Buenos Aires con mitigación DDoS automática, backups continuos y conmutación por error en milisegundos.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
