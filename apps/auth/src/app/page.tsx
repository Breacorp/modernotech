"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    /**
     * =========================================================================
     * PUNTO DE CONEXIÓN OIDC REAL:
     * 
     * Si usas una solución OIDC/SSO real como LOGTO, KEYCLOAK o SUPABASE AUTH:
     * - Aquí enviarías las credenciales al endpoint de login del IdP.
     * - Ejemplo con Supabase Auth (central):
     *   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
     * - Ejemplo con Logto:
     *   El usuario sería redirigido directamente a la pantalla de login hosted por Logto,
     *   o usarías el SDK para hacer un login de backend seguro.
     * =========================================================================
     */

    setTimeout(() => {
      if (email === "demo@moderno.com.ar" && password === "demo123") {
        // Guardamos sesión simulada en localStorage para la demo
        localStorage.setItem("moderno_user", JSON.stringify({
          id: "usr_1",
          email: "demo@moderno.com.ar",
          name: "Jose Luis",
          avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          createdAt: "2026-05-17"
        }));
        router.push("/dashboard");
      } else {
        setError("Credenciales incorrectas. Usa el botón de Acceso Demo.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleDemoAccess = () => {
    setEmail("demo@moderno.com.ar");
    setPassword("demo123");
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8fafc] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      {/* Background neon elements */}
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(38,130,246,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[440px] bg-[rgba(17,17,17,0.6)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.06)] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 transition-all duration-300 hover:border-[rgba(37,99,235,0.2)]">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8e8e93]">Identity Portal</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-[#ffffff]">
            MODERNO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#00d2ff]">ID</span>
          </h1>
          <p className="text-sm text-[#8e8e93] mt-2">Inicia sesión para acceder a todo tu ecosistema.</p>
        </div>

        {error && (
          <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] text-[#ef4444] text-xs p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#8e8e93] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@ejemplo.com"
              className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8e8e93]">Contraseña</label>
              <a href="#" className="text-xs text-[#2563eb] hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-sm font-semibold rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] disabled:opacity-50"
          >
            {isLoading ? "Validando credenciales..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-[rgba(255,255,255,0.06)]" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#111] px-3 text-[10px] uppercase tracking-wider text-[#8e8e93]">Demostración</span>
        </div>

        <button
          type="button"
          onClick={handleDemoAccess}
          className="w-full py-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(37,99,235,0.3)] text-xs font-medium rounded-xl text-[#f8fafc] transition-all"
        >
          🔑 Cargar Credenciales Demo
        </button>

        <p className="text-center text-xs text-[#8e8e93] mt-8">
          ¿No tienes una cuenta? <Link href="/register" className="text-[#2563eb] hover:underline font-medium">Regístrate gratis</Link>
        </p>

      </div>
    </main>
  );
}
