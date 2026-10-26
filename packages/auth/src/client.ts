import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ==============================================================================
// CONFIGURACIÓN DE SUPABASE CON SESIÓN COMPARTIDA (CROSS-SUBDOMAIN SSO)
// ==============================================================================
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rcskjdksimcfkdjzxara.supabase.co';

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dryrun';

export function getSharedCookieDomain(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  const hostname = window.location.hostname;
  if (hostname.endsWith('moderno.com.ar')) return '.moderno.com.ar';
  return undefined;
}

/**
 * Adaptador de almacenamiento híbrido.
 * Supabase espera que el storage maneje el objeto de sesión completo (JSON).
 * Nosotros necesitamos que el token viaje en 'mp_token' para el SSO.
 */
export const sharedCookieStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;

    // 1. Intentar leer del localStorage normal (donde Supabase guarda el JSON de la sesión)
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;

    // 2. Si no hay sesión local, intentar reconstruirla desde la cookie 'mp_token'
    if (key.includes('auth-token')) {
      const token = modernoSSO.readTokenFromCookie();
      if (token) {
        // Decodificar el payload del JWT (sin validar firma) para obtener exp y claims básicos.
        let exp = Math.floor(Date.now() / 1000) + 3600;
        let user: any = {};
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (typeof payload.exp === 'number') exp = payload.exp;
            user = {
              id: payload.sub || '',
              email: payload.email || '',
              user_metadata: payload.user_metadata || payload.app_metadata || {},
              aud: payload.aud,
              role: payload.role,
            };
          }
        } catch (e) {
          // Ignorar errores de decodificación silenciosamente
        }

        return JSON.stringify({
          access_token: token,
          token_type: 'bearer',
          expires_at: exp,
          refresh_token: '',
          user,
        });
      }
    }

    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;

    // Guardar el JSON completo en localStorage para que Supabase funcione normal
    localStorage.setItem(key, value);

    // Extraer el access_token para la cookie compartida de SSO (mp_token)
    try {
      const sessionData = JSON.parse(value);
      const token = sessionData.access_token;
      if (token) {
        modernoSSO.saveToken(token);
      }
    } catch (e) {
      // No es JSON, ignoramos
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    if (key.includes('auth-token')) {
      modernoSSO.logout();
    }
  },
};

export const modernoSSO = {
  saveToken: (token: string) => {
    if (typeof window === 'undefined') return;
    const domain = getSharedCookieDomain();
    if (domain) {
      const isSecure = window.location.protocol === 'https:' ? '; secure' : '';
      document.cookie = `mp_token=${encodeURIComponent(token)}; domain=${domain}; path=/; max-age=5184000; SameSite=Lax${isSecure}`;
    }
  },
  readTokenFromCookie: (): string | null => {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(/(?:^|; )mp_token=([^;]*)/);
    return m ? decodeURIComponent(m[1]) : null;
  },
  restoreToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    const cached = modernoSSO.readTokenFromCookie();
    if (cached && !localStorage.getItem('jwt')) {
      localStorage.setItem('jwt', cached);
    }
    return localStorage.getItem('jwt');
  },
  logout: () => {
    if (typeof window === 'undefined') return;
    const domain = getSharedCookieDomain();
    const domainPart = domain ? `; domain=${domain}` : '';
    document.cookie = `mp_token=; path=/; max-age=0; SameSite=Lax${domainPart}`;
  }
};

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: sharedCookieStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export const supabaseAuthClient = supabase;
