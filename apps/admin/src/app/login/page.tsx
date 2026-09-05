"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

import { useModernoAuth } from "../../hooks/useModernoAuth";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Intentar inicio de sesión real en Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Credenciales incorrectas.");
        setIsSubmitting(false);
        return;
      }

      if (data?.session) {
        window.location.href = "/cuenta";
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Error de conexión al servidor de autenticación.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-md mx-auto px-6 pt-32 sm:pt-36 pb-24 select-none">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">MODERNO ID // AUTENTICACIÓN GLOBAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-[#94A3B8] font-light mt-1.5">
            Una sola cuenta para Moderno Cloud, Access, AI, Play y One.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                  Contraseña
                </label>
                <a href="#recovery" className="text-[10px] text-[#00E5FF] hover:underline">
                  ¿Olvidaste tu clave?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white placeholder-white/20 text-xs focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#157BFF] text-black text-xs font-black tracking-wider transition-transform hover:scale-[1.02] shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer"
            >
              {isSubmitting ? "Autenticando..." : "Ingresar a Mi Cuenta →"}
            </button>
          </form>

          {/* Quick SSO / Ecosistema Pill */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <span className="text-[11px] text-[#94A3B8] font-light">
              ¿No tenés una cuenta en Moderno Tech?
            </span>
            <a
              href="/registro"
              className="block mt-2 text-xs font-bold text-[#00E5FF] hover:underline"
            >
              Crear cuenta global unificada &rarr;
            </a>
          </div>
        </div>

        {/* Ecosistema Lockup */}
        <div className="mt-8 text-center text-[11px] text-white/40">
          <div className="flex items-center justify-center gap-3">
            <span>☁️ Cloud</span>
            <span>&bull;</span>
            <span>🛡️ Access</span>
            <span>&bull;</span>
            <span>✨ AI</span>
            <span>&bull;</span>
            <span>🎮 Play</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
