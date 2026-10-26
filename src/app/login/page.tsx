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
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        setErrorMessage(error?.message || "Credenciales incorrectas. Verificá tu correo y contraseña.");
        setIsSubmitting(false);
        return;
      }

      window.location.href = "/cuenta";
    } catch (err: any) {
      setErrorMessage(err.message || "Error al conectar con el servidor de autenticación");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/cuenta`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || "Error al iniciar sesión con Google");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-[#00E5FF] selection:text-black overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 max-w-md mx-auto px-6 pt-32 sm:pt-36 pb-24">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-bold text-[#00E5FF] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="tracking-[0.2em] uppercase">MODERNO ID // AUTENTICACIÓN GLOBAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-[#94A3B8] font-light mt-1.5">
            Una sola cuenta para Moderno Cloud, Access, AI, Play, One, Builder y Media.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-[#0B0B10]/95 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}
          
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full mb-6 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold flex items-center justify-center gap-3 transition-all hover:bg-gray-100 active:scale-[0.98] disabled:opacity-50 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path 
                fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path 
                fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.17-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path 
                fill="#FBBC05" d="M5.83 12.25c-.25-.75-.39-1.58-.39-2.4s.14-1.65.39-2.4V6.23H2.18C1.46 7.18 1 8.34 1 9.6c0 .78.07 1.53.2 2.25l3.63.65z"
              />
              <path 
                fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 and 3.99 3.47 2.18 6.23l3.63.65c.88-2.6 3.31-4.53 6.17-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.08]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0B0B10] px-2 text-white/40 font-medium">o usa tu correo</span>
            </div>
          </div>

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
            <span>&bull;</span>
            <span>🛠️ Builder</span>
            <span>&bull;</span>
            <span>🎬 Media</span>
            <span>&bull;</span>
            <span>💳 Pay</span>
            <span>&bull;</span>
            <span>🛍️ Mercatto</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
