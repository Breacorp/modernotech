"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseAuthClient } from "@moderno/auth-helpers";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: signUpError } = await supabaseAuthClient.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "Error al registrar la cuenta en Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8fafc] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(38,130,246,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[440px] bg-[rgba(17,17,17,0.6)] backdrop-blur-[24px] border border-[rgba(255,255,255,0.06)] p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 transition-all duration-300 hover:border-[rgba(37,99,235,0.2)]">
        
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8e8e93]">Identity Portal</span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1 text-[#ffffff]">
            Crear <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#00d2ff]">Cuenta</span>
          </h1>
          <p className="text-sm text-[#8e8e93] mt-2">Únete al ecosistema Moderno Style & Tech.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#8e8e93] mb-2">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              required
            />
          </div>

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
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#8e8e93] mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-[#0d0d0d] border border-[rgba(255,255,255,0.08)] px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-sm font-semibold rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_10px_20px_rgba(37,99,235,0.2)] disabled:opacity-50"
          >
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-xs text-[#8e8e93] mt-8">
          ¿Ya tienes cuenta? <Link href="/" className="text-[#2563eb] hover:underline font-medium">Inicia Sesión</Link>
        </p>

      </div>
    </main>
  );
}
