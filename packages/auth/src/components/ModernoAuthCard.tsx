"use client";

import React, { useState } from 'react';
import { useModernoAuth } from '../useModernoAuth';
import { ModernoProject, MODERNO_PROJECTS } from '../redirects';

export interface ModernoAuthCardProps {
  project: ModernoProject;
  appName?: string;
  redirectTo?: string;
  accentColor?: string;
  logoSubtitle?: string;
  onSuccess?: () => void;
  defaultMode?: 'login' | 'register';
}

export function ModernoAuthCard({
  project,
  appName,
  redirectTo = '/dashboard',
  accentColor,
  logoSubtitle = 'Portal de Identidad Unificada',
  onSuccess,
  defaultMode = 'login',
}: ModernoAuthCardProps) {
  const projectMeta = MODERNO_PROJECTS[project];
  const finalAppName = appName || projectMeta?.name || 'Moderno ID';
  const finalAccentColor = accentColor || projectMeta?.accentColor || '#007AFF';

  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useModernoAuth(project);

  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        onSuccess?.();
      } else {
        const { error } = await signUpWithEmail(email, password, { full_name: fullName });
        if (error) throw error;
        setInfoMessage('Cuenta creada exitosamente. Revisa tu correo de confirmación si está activo.');
        onSuccess?.();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al procesar la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const { error } = await signInWithGoogle(redirectTo);
      if (error) throw error;
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al conectar con Google.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px] bg-[#0c0c0e]/90 backdrop-blur-2xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] font-sans text-[#f8fafc] relative overflow-hidden transition-all duration-300 hover:border-white/20">
      {/* Luz ambiental sutil según el color de acento del proyecto */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 blur-3xl opacity-20 pointer-events-none rounded-full"
        style={{ backgroundColor: finalAccentColor }}
      />

      {/* Encabezado de Marca */}
      <div className="text-center mb-7 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
          {logoSubtitle}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-white">
          {finalAppName}
        </h1>
        <p className="text-xs text-neutral-400 mt-1.5">
          {mode === 'login'
            ? 'Accede con tu cuenta centralizada para todo el ecosistema'
            : 'Crea tu acceso unificado para todas las plataformas'}
        </p>
      </div>

      {/* Selector de Pestañas: Iniciar Sesión / Crear Cuenta */}
      <div className="flex bg-[#161619] p-1 rounded-2xl mb-6 border border-white/5 relative z-10">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setErrorMessage(null);
          }}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            mode === 'login'
              ? 'bg-[#222226] text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Iniciar Sesión
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('register');
            setErrorMessage(null);
          }}
          className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
            mode === 'register'
              ? 'bg-[#222226] text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Crear Cuenta
        </button>
      </div>

      {/* Feedback Mensajes */}
      {errorMessage && (
        <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/25 text-red-400 text-xs rounded-xl flex items-start gap-2 animate-in fade-in duration-200">
          <span className="font-bold">✕</span>
          <div className="flex-1 leading-snug">{errorMessage}</div>
        </div>
      )}

      {infoMessage && (
        <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs rounded-xl flex items-start gap-2 animate-in fade-in duration-200">
          <span className="font-bold">✓</span>
          <div className="flex-1 leading-snug">{infoMessage}</div>
        </div>
      )}

      {/* Botón Nativo Google OAuth */}
      <div className="relative z-10">
        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleOAuth}
          className="w-full py-3.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] active:scale-[0.98] border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-white transition-all disabled:opacity-50 cursor-pointer shadow-sm"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27a7.15 7.15 0 0 1 0-4.54V6.58H1.25a11.98 11.98 0 0 0 0 10.84l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continuar con Google
        </button>
      </div>

      {/* Separador Visual */}
      <div className="relative my-6 text-center z-10">
        <hr className="border-white/10" />
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0c0c0e] px-3 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
          o vía correo electrónico
        </span>
      </div>

      {/* Formulario Tradicional */}
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {mode === 'register' && (
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5">
              Nombre Completo
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Pérez"
              required
              className="w-full bg-[#151518] border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@moderno.com.ar"
            required
            className="w-full bg-[#151518] border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
              Contraseña
            </label>
            {mode === 'login' && (
              <a
                href="/auth/forgot-password"
                className="text-[11px] text-neutral-400 hover:text-white transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            )}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full bg-[#151518] border border-white/10 px-4 py-3 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: finalAccentColor }}
          className="w-full py-3.5 mt-2 text-sm font-semibold rounded-xl text-white hover:opacity-95 active:scale-[0.98] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>

      {/* Footer Info */}
      <div className="text-center mt-6 pt-5 border-t border-white/5 relative z-10">
        <p className="text-[11px] text-neutral-500 leading-relaxed">
          Protegido por el sistema de identidad federada de Moderno Tech. Sesión válida en Moderno Tech, Access, Play, Cloud y Cinema Studio.
        </p>
      </div>
    </div>
  );
}
