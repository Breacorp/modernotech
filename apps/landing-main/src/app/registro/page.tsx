"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";
import { useModernoAuth } from "../../hooks/useModernoAuth";
import { supabase } from "../../lib/supabase";

export default function RegistroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedService, setSelectedService] = useState<string>("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setDemoSession } = useModernoAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Registro directo en Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            initial_service: selectedService,
          },
        },
      });

      if (!error && data.user) {
        // Inicializar perfil y capa gratuita en todos los productos con free tier
        try {
          await supabase.from("global_profiles").upsert({
            id: data.user.id,
            name: name,
          });

          const defaultFreeProducts = [
            "play",
            "cloud",
            "ai",
            "access",
            "weather",
            "cleaner",
            "mercatto",
            "academy",
            "cinema",
          ];

          const entitlementsToInsert = defaultFreeProducts.map((pId) => ({
            user_id: data.user!.id,
            product_id: pId,
            tier: pId === selectedService && selectedService !== "general" ? "free" : "free",
            status: "active",
          }));

          await supabase.from("user_product_entitlements").upsert(entitlementsToInsert, {
            onConflict: "user_id,product_id",
          });
        } catch (_) {}

        setDemoSession({
          id: data.user.id,
          email: data.user.email || email,
          name: name,
        });
        window.location.href = "/cuenta";
        return;
      }

      // 2. Fallback de sesión en cliente
      setDemoSession({
        id: "usr-" + Date.now(),
        email: email,
        name: name,
      });
      window.location.href = "/cuenta";
    } catch (err: any) {
      setErrorMessage(err.message || "Error al crear la cuenta");
      setIsSubmitting(false);
    }
  };

  const initialApps = [
    { id: "general", name: "🌐 Ecosistema Hub", desc: "Todo incluido" },
    { id: "cloud", name: "☁️ Moderno Cloud", desc: "5 GB Vault Free" },
    { id: "play", name: "🎮 Moderno Play", desc: "Catálogo Arcade Free" },
    { id: "cinema", name: "🎬 Cinema Studio", desc: "Video 1080p AI" },
    { id: "access", name: "🛡️ Moderno Access", desc: "Control de Acceso" },
    { id: "mercatto", name: "🛍️ Mercatto", desc: "Compras 1-Click" },
  ];

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-xl mx-auto px-6 pt-32 sm:pt-36 pb-24 select-none">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">MODERNO ID // REGISTRO CENTRALIZADO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Creá tu Cuenta Global
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-light mt-2 max-w-md mx-auto leading-relaxed">
            Una sola cuenta en Supabase te habilita acceso instantáneo a todas las capas gratuitas del ecosistema. Sin tarjeta de crédito.
          </p>
        </div>

        {/* Register Card */}
        <div className="p-8 sm:p-9 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {/* Instant Benefits Callout */}
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-[#00E5FF]/20">
            <span className="text-[10px] font-mono text-[#00E5FF] font-bold uppercase tracking-wider block mb-2">
              ✨ INCLUIDO GRATIS CON TU REGISTRO INICIAL
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> 5 GB en Moderno Cloud
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Catálogo Moderno Play
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> 50 Req/Día Moderno AI
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Cinema Studio 1080p
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Checkout Mercatto
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Radar Moderno Weather
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
              ✕ {errorMessage}
            </div>
          )}

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

            {/* Initial App Interest */}
            <div>
              <label className="block text-[11px] font-bold text-white/70 uppercase tracking-wider mb-2">
                ¿Con qué producto te gustaría empezar?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {initialApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setSelectedService(app.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedService === app.id
                        ? "bg-[#00E5FF]/15 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                        : "bg-white/[0.02] border-white/[0.06] text-[#94A3B8] hover:border-white/20"
                    }`}
                  >
                    <span className="text-xs font-bold block truncate">{app.name}</span>
                    <span className="text-[10px] text-white/50 block truncate">{app.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer"
            >
              {isSubmitting ? "Creando tu cuenta..." : "Crear Cuenta & Activar Ecosistema →"}
            </button>
          </form>

          {/* Enlace a Login */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <span className="text-[11px] text-[#94A3B8] font-light">
              ¿Ya tenés una cuenta registrada?
            </span>
            <a
              href="/login"
              className="block mt-1 text-xs font-bold text-[#00E5FF] hover:underline"
            >
              Iniciar sesión con tu Moderno ID &rarr;
            </a>
          </div>
        </div>

        {/* Enlaces a los Sitios Satélite */}
        <div className="mt-10 text-center">
          <span className="text-[10px] font-mono text-white/40 uppercase block mb-3">
            ACCESO RÁPIDO A SITIOS DEL ECOSISTEMA
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href="https://cloud.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              ☁️ Cloud
            </a>
            <a
              href="https://access.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              🛡️ Access
            </a>
            <a
              href="https://play.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              🎮 Play
            </a>
            <a
              href="https://cinema.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              🎬 Cinema
            </a>
            <a
              href="https://mercatto.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              🛍️ Mercatto
            </a>
            <a
              href="https://ai.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              ✨ AI
            </a>
            <a
              href="https://weather.moderno.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#94A3B8] hover:text-white transition-all"
            >
              🌤️ Weather
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
