"use client";

import React from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

export default function TerminosPage() {
  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 sm:pt-36 pb-24 select-none">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="tracking-[0.2em] uppercase">DOCUMENTACIÓN LEGAL // TÉRMINOS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white font-sans tracking-tight">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2">
            Última actualización: 29 de Agosto de 2026.
          </p>
        </div>

        <div className="space-y-8 text-xs text-[#94A3B8] font-light leading-relaxed p-8 sm:p-10 rounded-2xl bg-[#0B0B10] border border-white/[0.08]">
          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">1. Introducción y Aceptación</h2>
            <p>
              El presente acuerdo regula el acceso y utilización de todos los servicios, plataformas web, aplicaciones de escritorio y APIs proporcionadas por <strong>Moderno Tech</strong>, incluyendo pero no limitándose a Moderno Access, Moderno Play, Moderno AI Cleaner Pro, Moderno AI, Moderno One y demás productos del ecosistema.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">2. Licencias de Software y Activación</h2>
            <p>
              Las licencias otorgadas para productos como Moderno AI Cleaner Pro son de uso personal o corporativo no exclusivo según el plan adquirido. La clave de licencia generada (formato MODERNO-XXXX-XXXX-XXXX) es intransferible y habilita el número de dispositivos estipulado en la compra.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">3. Seguridad, Consorcios y Aislamiento Estructural</h2>
            <p>
              Moderno Access opera bajo el principio de Zero-Shared Database. Cada consorcio o empresa mantiene sus credenciales, registros de apertura y bases de datos con aislamiento físico y lógico, garantizando que ninguna entidad externa acceda a los registros de seguridad sin autorización explícita.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">4. Pagos, Renovaciones y Política de Reembolso</h2>
            <p>
              Todas las compras de licencias de software cuentan con una garantía de reembolso total por 30 días a partir de la fecha de adquisición. Las suscripciones anuales se renovarán automáticamente salvo que el usuario cancele antes del término del ciclo de facturación.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2">5. Propiedad Intelectual</h2>
            <p>
              Todo el código, diseño visual, logotipos, arquitectura de software y marcas registradas exhibidas en los sitios del ecosistema Moderno son propiedad exclusiva de Breacorp / Moderno Tech.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
