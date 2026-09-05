"use client";

import React, { useState } from 'react';
import { useModernoAuth } from '../useModernoAuth';
import { ModernoProject } from '../redirects';

export interface AccountLinkingCardProps {
  project: ModernoProject;
  className?: string;
}

export function AccountLinkingCard({ project, className = '' }: AccountLinkingCardProps) {
  const { user, isGoogleLinked, identities, linkGoogleAccount, unlinkIdentity } =
    useModernoAuth(project);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  if (!user) return null;

  const handleLinkGoogle = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const { error } = await linkGoogleAccount('/profile');
      if (error) throw error;
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error al conectar con Google.' });
      setLoading(false);
    }
  };

  const handleUnlinkGoogle = async () => {
    const googleIdentity = identities.find((id) => id.provider === 'google');
    if (!googleIdentity) return;

    if (identities.length <= 1) {
      setStatusMessage({
        type: 'error',
        text: 'No puedes desvincular Google si es tu único método de inicio de sesión.',
      });
      return;
    }

    setLoading(true);
    setStatusMessage(null);
    try {
      const { error } = await unlinkIdentity(googleIdentity);
      if (error) throw error;
      setStatusMessage({ type: 'success', text: 'Cuenta de Google desvinculada exitosamente.' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error al desvincular cuenta.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-[#0f0f12] border border-white/10 p-6 rounded-2xl max-w-lg font-sans text-[#f8fafc] shadow-lg ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-bold text-white">Métodos de Acceso e Identidad</h3>
        <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
          SSO Activo
        </span>
      </div>

      <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
        Vincula tu cuenta de Google para acceder a todas las aplicaciones del ecosistema (Moderno Tech, Access, Play, Cloud y Cinema Studio) con un solo clic.
      </p>

      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/25 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/25 text-red-400'
          }`}
        >
          <span>{statusMessage.type === 'success' ? '✓' : '✕'}</span>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Proveedor: Correo y Contraseña */}
      <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-sm">
            ✉️
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Correo Electrónico</div>
            <div className="text-[11px] text-neutral-400">{user.email}</div>
          </div>
        </div>
        <span className="text-[10px] font-semibold text-neutral-400 bg-white/5 px-2.5 py-1 rounded-md">
          Principal
        </span>
      </div>

      {/* Proveedor: Google */}
      <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Google OAuth</div>
            <div className="text-[11px] text-neutral-400">
              {isGoogleLinked ? 'Conectado a este usuario' : 'No vinculado'}
            </div>
          </div>
        </div>

        {isGoogleLinked ? (
          <button
            type="button"
            onClick={handleUnlinkGoogle}
            disabled={loading}
            className="px-3.5 py-1.5 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Procesando...' : 'Desvincular'}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleLinkGoogle}
            disabled={loading}
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Conectando...' : 'Vincular con Google'}
          </button>
        )}
      </div>
    </div>
  );
}
