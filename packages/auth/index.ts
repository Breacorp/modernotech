import { createClient } from '@supabase/supabase-js';

// Cliente de Supabase centralizado para todo el ecosistema Moderno Tech (Moderno ID)
// Instancia única compartida: rcskjdksimcfkdjzxara (Moderno Access, Cloud, Play, Cinema, Mercatto)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rcskjdksimcfkdjzxara.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabaseAuthClient = createClient(supabaseUrl, supabaseKey);

/**
 * Función para obtener la sesión centralizada del usuario actual.
 * @returns {Promise<any>}
 */
export async function getGlobalSession() {
  const { data, error } = await supabaseAuthClient.auth.getSession();
  if (error) {
    console.error("Error obteniendo sesión de Supabase:", error.message);
    return null;
  }
  return data.session;
}

/**
 * Función para validar tokens (JWT) de manera segura desde aplicaciones externas
 * (Actúa como la validación OIDC)
 */
export async function verifyExternalToken(token: string) {
  const { data, error } = await supabaseAuthClient.auth.getUser(token);
  if (error) {
    throw new Error("Token no válido o expirado");
  }
  return data.user;
}
