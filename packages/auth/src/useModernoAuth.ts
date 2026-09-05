"use client";

import { useEffect, useState, useCallback } from 'react';
import { User, Session, UserIdentity, AuthError } from '@supabase/supabase-js';
import { supabase } from './client';
import { getAuthRedirectUrl, ModernoProject } from './redirects';

export interface UseModernoAuthReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isGoogleLinked: boolean;
  identities: UserIdentity[];
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    metadata?: Record<string, any>
  ) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: (nextPath?: string) => Promise<{ error: AuthError | null }>;
  linkGoogleAccount: (nextPath?: string) => Promise<{ error: AuthError | null }>;
  unlinkIdentity: (identity: UserIdentity) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refreshSession: () => Promise<void>;
}

/**
 * Hook universal de autenticación para el ecosistema Moderno.
 * Controla sesión centralizada, login con correo, Google OAuth,
 * vinculación de identidades y cierre de sesión sincronizado.
 */
export function useModernoAuth(project?: ModernoProject): UseModernoAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (!error && data?.session) {
        setSession(data.session);
        setUser(data.session.user);
      } else {
        setSession(null);
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // 1. Cargar sesión inicial
    refreshSession();

    // 2. Escuchar cambios de estado de autenticación en vivo
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession]);

  // Login tradicional con email y contraseña
  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  // Registro tradicional con email y contraseña
  const signUpWithEmail = useCallback(
    async (email: string, password: string, metadata?: Record<string, any>) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: getAuthRedirectUrl(project, '/dashboard'),
        },
      });
      return { error };
    },
    [project]
  );

  // Inicio de sesión con Google OAuth nativo y redirección dinámica
  const signInWithGoogle = useCallback(
    async (nextPath = '/dashboard') => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getAuthRedirectUrl(project, nextPath),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      return { error };
    },
    [project]
  );

  // Vinculación posterior de identidad de Google (Account Linking)
  const linkGoogleAccount = useCallback(
    async (nextPath = '/profile') => {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'google',
        options: {
          redirectTo: getAuthRedirectUrl(project, `${nextPath}?linked=google`),
        },
      });
      return { error };
    },
    [project]
  );

  // Desvincular identidad
  const unlinkIdentity = useCallback(async (identity: UserIdentity) => {
    const { error } = await supabase.auth.unlinkIdentity(identity);
    return { error };
  }, []);

  // Cierre de sesión centralizado
  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    return { error };
  }, []);

  const identities = user?.identities || [];
  const isGoogleLinked = identities.some((id) => id.provider === 'google');

  return {
    user,
    session,
    isLoading,
    isGoogleLinked,
    identities,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    linkGoogleAccount,
    unlinkIdentity,
    signOut,
    refreshSession,
  };
}
