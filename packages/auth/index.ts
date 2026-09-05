// Exportaciones principales del módulo de autenticación centralizada
export * from './src/client';
export * from './src/redirects';
export * from './src/useModernoAuth';
export * from './src/components';

import { supabaseAuthClient } from './src/client';

/**
 * Función para obtener la sesión centralizada del usuario actual.
 */
export async function getGlobalSession() {
  const { data, error } = await supabaseAuthClient.auth.getSession();
  if (error) {
    console.error('Error obteniendo sesión de Supabase:', error.message);
    return null;
  }
  return data.session;
}

/**
 * Función para validar tokens (JWT) de manera segura desde aplicaciones externas
 */
export async function verifyExternalToken(token: string) {
  const { data, error } = await supabaseAuthClient.auth.getUser(token);
  if (error) {
    throw new Error('Token no válido o expirado');
  }
  return data.user;
}

