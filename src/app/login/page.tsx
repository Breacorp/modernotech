"use client";

import React, { useState } from "react";
import { ModernoBackground } from "../../components/ModernoBackground";
import { ModernoNavbar } from "../../components/ModernoNavbar";
import { Footer } from "../../components/Footer";

import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

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
        provider: "google",
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
    <div className="relative min-h-screen bg-[#0b0f14] text-white selection:bg-[#4285f4]/30 overflow-x-hidden">
      <ModernoBackground />
      <ModernoNavbar />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-24">
        <div className="relative my-auto w-full max-w-md rounded-3xl border border-white/15 bg-[#18191c] p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col text-left transition-all animate-fade-in">
          <button
            className="absolute right-5 top-5 p-2 text-[#9aa0a6] hover:text-white hover:bg-white/10 rounded-full transition-colors"
            title="Cerrar ventana"
            onClick={() => (window.location.href = "/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#1e1f20] p-2 shadow-inner">
              <img
                alt="Moderno Tech Logo"
                loading="lazy"
                width="48"
                height="48"
                decoding="async"
                className="object-contain"
                src="/logo.png"
                style={{ color: "transparent" }}
              />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-[#f0f4f9]">
              Bienvenido de nuevo
            </h2>
            <p className="mt-1 text-xs text-[#9aa0a6]">
              Tu fábrica de software autónoma con Google Gemini y Supabase
            </p>
          </div>

          <div className="grid grid-cols-2 p-1 bg-[#131314] rounded-2xl border border-white/5 mb-5 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`py-2 rounded-xl transition-all ${
                activeTab === "login"
                  ? "bg-[#282a2c] text-[#f0f4f9] shadow-sm font-semibold"
                  : "text-[#9aa0a6] hover:text-white"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`py-2 rounded-xl transition-all ${
                activeTab === "register"
                  ? "bg-[#282a2c] text-[#f0f4f9] shadow-sm font-semibold"
                  : "text-[#9aa0a6] hover:text-white"
              }`}
            >
              Crear Cuenta
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {errorMessage}
            </div>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#9aa0a6] block">
                  Correo electrónico
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail absolute left-3.5 h-4 w-4 text-[#9aa0a6]"
                    aria-hidden="true"
                  >
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                  </svg>
                  <input
                    placeholder="nombre@empresa.com"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#131314] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#9aa0a6]/60 focus:outline-none focus:border-[#4285f4] focus:ring-1 focus:ring-[#4285f4] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[#9aa0a6] block">
                  Contraseña
                </label>
                <div className="relative flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-lock absolute left-3.5 h-4 w-4 text-[#9aa0a6]"
                    aria-hidden="true"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    placeholder="••••••••"
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#131314] border border-white/10 rounded-xl text-sm text-white placeholder:text-[#9aa0a6]/60 focus:outline-none focus:border-[#4285f4] focus:ring-1 focus:ring-[#4285f4] transition-colors"
                  />
                </div>
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285f4] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] hover:bg-[#1b66c9] px-4 py-2 w-full mt-2 h-10 rounded-xl bg-gradient-to-r from-[#4285f4] to-[#1a73e8] hover:from-[#1a73e8] hover:to-[#1557b0] text-white text-xs font-semibold shadow-md shadow-[#4285f4]/20"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Autenticando..." : "Acceder a mi Cuenta"}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-3.5">
              <p className="text-xs text-[#9aa0a6] text-center">
                Regístrate en{" "}
                <button
                  type="button"
                  onClick={() => (window.location.href = "/registro")}
                  className="text-[#7cacf8] hover:text-[#4285f4] font-medium transition-colors"
                >
                  Crear cuenta
                </button>
              </p>
            </form>
          )}

          <div className="my-5 flex items-center gap-2">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-[10px] uppercase font-mono text-[#9aa0a6]">
              O continúa con
            </span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button
            className="whitespace-nowrap text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285f4] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] border border-white/[0.08] backdrop-blur-md px-4 py-2 w-full h-10 rounded-xl bg-white text-slate-900 hover:bg-slate-100 flex items-center justify-center gap-2.5 shadow-sm font-medium"
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
          >
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-xs font-semibold">Continuar con Google</span>
          </button>

          <div className="mt-5 text-center text-xs text-[#9aa0a6]">
            <span>
              ¿Aún no tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => (window.location.href = "/registro")}
                className="text-[#7cacf8] hover:text-[#4285f4] font-medium transition-colors"
              >
                Regístrate gratis
              </button>
            </span>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
