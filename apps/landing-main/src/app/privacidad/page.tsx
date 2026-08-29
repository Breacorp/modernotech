"use client";

import React from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

export default function PrivacidadPage() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="tracking-[0.2em] uppercase">DOCUMENTACIÓN LEGAL // PRIVACIDAD</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
            Política de Privacidad y Protección de Datos
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            Compromiso de Privacidad por Diseño (Privacy by Design) y Cero Venta de Datos.
          </p>
        </div>

        <div className="space-y-8 text-xs text-[#94A3B8] font-light leading-relaxed p-8 sm:p-10 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">1. Compromiso Fundamental</h2>
            <p>
              En <strong>Moderno Tech</strong> no comercializamos, vendemos ni compartimos datos personales o de telemetría con terceros ni intermediarios publicitarios. Diseñamos nuestras aplicaciones bajo el principio de minimización de datos.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">2. Telemetría de Moderno AI Cleaner Pro</h2>
            <p>
              La información recopilada por Moderno AI Cleaner Pro (uso de CPU, espacio en disco, gigabytes liberados) se procesa localmente en el dispositivo macOS. Ningún archivo personal, documento o dato sensible es enviado a servidores remotos durante las limpiezas o diagnósticos.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">3. Registros de Acceso en Moderno Access</h2>
            <p>
              Los registros biométricos, códigos QR dinámicos y eventos de paso en Moderno Access son cifrados mediante algoritmos AES-256 de extremo a extremo. Cada consorcio posee llaves de cifrado independientes.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">4. Cifrado en Reposo y en Tránsito</h2>
            <p>
              Todas las comunicaciones entre clientes y servicios del ecosistema Moderno utilizan TLS 1.3 con Perfect Forward Secrecy. Los datos almacenados cuentan con cifrado en reposo en infraestructura cloud con certificación ISO 27001 y SOC 2.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
