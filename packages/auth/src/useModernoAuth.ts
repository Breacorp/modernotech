"use client";

import { useEffect, useState, useCallback } from 'react';
import { User, Session, UserIdentity, AuthError } from '@supabase/supabase-js';
import { supabase, modernoSSO } from './client';
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
 * Implementa la restauración de sesión vía cookie mp_token para SSO cross-subdomain.
 */
export function useModernoAuth(project?: ModernoProject): UseModernoAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      // 1. Intentar restaurar token desde cookie mp_token antes de pedir a Supabase
      const restoredToken = modernoSSO.restoreToken();
      
      // Nota: Supabase-js gestiona su propio storage, pero si hemos inyectado 
      // el token en localStorage['jwt'] (como pide el contrato), 
      // y configuramos el cliente correctamente, Supabase lo usará.
      
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
    refreshSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      // Sincronizar mp_token cuando la sesión cambia
      if (newSession) {
        modernoSSO.saveToken(newSession.access_token);
      } else {
        modernoSSO.logout();
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshSession]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    // onAuthStateChange se encargará de llamar a saveToken via modernoSSO
    return { error };
  }, []);

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

  const unlinkIdentity = useCallback(async (identity: UserIdentity) => {
    const { error } = await supabase.auth.unlinkIdentity(identity);
    return { error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    modernoSSO.logout();
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
