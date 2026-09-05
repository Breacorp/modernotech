import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ==============================================================================
// CONFIGURACIÓN DE SUPABASE CON SESIÓN COMPARTIDA (CROSS-SUBDOMAIN SSO)
// ==============================================================================
// Instancia central compartida para Moderno Tech, Access, Play, Cloud y Cinema Studio.
// URL por defecto o sobreescrita por variable de entorno.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rcskjdksimcfkdjzxara.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dryrun';

/**
 * Determina dinámicamente el dominio de la cookie.
 * - Si estamos en el dominio oficial o cualquier subdominio (*.moderno.com.ar),
 *   retorna '.moderno.com.ar' para que la cookie sea compartida entre todas las apps.
 * - Si estamos en localhost o entorno de desarrollo local, retorna undefined
 *   para que el navegador no rechace la cookie.
 */
export function getSharedCookieDomain(): string | undefined {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined;
  }
  const hostname = window.location.hostname;
  if (hostname.endsWith('moderno.com.ar')) {
    return '.moderno.com.ar';
  }
  return undefined;
}

/**
 * Adaptador de almacenamiento que escribe y lee cookies con Domain=.moderno.com.ar,
 * asegurando Single Sign-On (SSO) en todo el ecosistema.
 */
export const sharedCookieStorage = {
  getItem: (key: string): string | null => {
    if (typeof document === 'undefined') return null;
    const name = encodeURIComponent(key) + '=';
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
      c = c.trim();
      if (c.indexOf(name) === 0) {
        return decodeURIComponent(c.substring(name.length));
      }
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof document === 'undefined') return;
    const domain = getSharedCookieDomain();
    const domainPart = domain ? `; domain=${domain}` : '';
    const isSecure = window.location.protocol === 'https:' ? '; secure' : '';
    // Cookie de 30 días de vigencia con SameSite=Lax para SSO cross-subdomain
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
      value
    )}; path=/; max-age=2592000; SameSite=Lax${domainPart}${isSecure}`;
  },
  removeItem: (key: string): void => {
    if (typeof document === 'undefined') return;
    const domain = getSharedCookieDomain();
    const domainPart = domain ? `; domain=${domain}` : '';
    document.cookie = `${encodeURIComponent(key)}=; path=/; max-age=0; SameSite=Lax${domainPart}`;
  },
};

/**
 * Instancia del cliente de Supabase optimizada para SSO centralizado
 */
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: sharedCookieStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Alias para compatibilidad con código existente
export const supabaseAuthClient = supabase;
