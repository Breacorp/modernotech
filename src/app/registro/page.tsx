"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedService, setSelectedService] = useState<"cloud" | "access" | "suite" | "general">("cloud");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.href = "/cuenta";
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-lg mx-auto px-6 pt-32 sm:pt-36 pb-24 select-none">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">REGISTRO CENTRALIZADO // MODERNO TECH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Creá tu Cuenta Global
          </h1>
          <p className="text-xs text-[#94A3B8] font-light mt-1.5 max-w-md mx-auto leading-relaxed">
            Una sola cuenta en nuestra base central te da acceso instantáneo a todos los productos gratuitos del ecosistema (Play Free, Cloud 5 GB, Moderno AI y Weather). Sin tarjeta de crédito.
          </p>
        </div>

        {/* Register Card */}
        <div className="p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">
                Nombre Completo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-1.5">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
              />
            </div>

            {/* Service of Interest Selector */}
            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-2">
                ¿Qué servicio querés empezar usando?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedService("cloud")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedService === "cloud"
                      ? "bg-[#00E5FF]/10 border-[#00E5FF] text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm block">☁️ Moderno Cloud</span>
                  <span className="text-[10px] text-white/50">Almacenamiento & Familia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("access")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedService === "access"
                      ? "bg-[#3B82F6]/10 border-[#3B82F6] text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm block">🛡️ Moderno Access</span>
                  <span className="text-[10px] text-white/50">Control de Accesos</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("suite")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedService === "suite"
                      ? "bg-purple-500/10 border-purple-400 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm block">📦 Moderno Suite</span>
                  <span className="text-[10px] text-white/50">Bundle Completo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedService("general")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedService === "general"
                      ? "bg-emerald-500/10 border-emerald-400 text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/20"
                  }`}
                >
                  <span className="text-sm block">🌐 Cuenta Global</span>
                  <span className="text-[10px] text-white/50">Ecosistema Completo</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer"
            >
              {isSubmitting ? "Creando cuenta..." : "Crear Cuenta & Continuar →"}
            </button>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <span className="text-[11px] text-[#94A3B8] font-light">
              ¿Ya tenés una cuenta registrada?
            </span>
            <a
              href="/login"
              className="block mt-2 text-xs font-bold text-[#00E5FF] hover:underline"
            >
              Iniciar sesión con tu Moderno ID &rarr;
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
