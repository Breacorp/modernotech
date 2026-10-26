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
    const localValue = localStorage.getItem(key);
    if (localValue) return localValue;
    if (key.includes('auth-token')) {
      const token = modernoSSO.readTokenFromCookie();
      if (token) {
        localStorage.setItem('jwt', token);
        try {
          const parts = token.split('.');
          let exp = Math.floor(Date.now() / 1000) + 3600;
          let user = {};
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload.exp) exp = payload.exp;
            user = { id: payload.sub, email: payload.email, user_metadata: payload.user_metadata || {} };
          }
          return JSON.stringify({
            access_token: token,
            token_type: 'bearer',
            expires_at: exp,
            refresh_token: '', 
            user: user
          });
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
    try {
      const sessionData = JSON.parse(value);
      const token = sessionData.access_token;
      if (token) {
        localStorage.setItem('jwt', token);
        modernoSSO.saveToken(token);
      }
    } catch (e) {}
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    localStorage.removeItem('jwt');
    modernoSSO.logout();
  },
};
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
    try {
      const sessionData = JSON.parse(value);
      const token = sessionData.access_token;
      if (token) {
        localStorage.setItem('jwt', token);
        modernoSSO.saveToken(token);
      }
    } catch (e) {}
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    localStorage.removeItem('jwt');
    modernoSSO.logout();
  },
};
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    
    // Store the full session for Supabase's internal use
    localStorage.setItem(key, value);

    // Sync with the SSO contract requirements
    try {
      const sessionData = JSON.parse(value);
      const token = sessionData.access_token;
      if (token) {
        // Requirement 1: Save access_token in localStorage key 'jwt'
        localStorage.setItem('jwt', token);
        // Requirement 1: Save access_token in shared cookie 'mp_token'
        modernoSSO.saveToken(token);
      }
    } catch (e) {
      // If not JSON, it's not a session update, just let it be
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    
    // Remove Supabase session
    localStorage.removeItem(key);
    
    // Requirement 3: Clear token from localStorage AND shared cookie (Max-Age=0)
    localStorage.removeItem('jwt');
    modernoSSO.logout();
  },
};

  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    
    // 1. Save the full session for Supabase
    localStorage.setItem(key, value);

    // 2. Sync with the SSO contract (mp_token and jwt)
    try {
      const sessionData = JSON.parse(value);
      const token = sessionData.access_token;
      if (token) {
        // Requirement 1: save to localStorage 'jwt'
        localStorage.setItem('jwt', token);
        // Requirement 1: save to shared cookie mp_token
        modernoSSO.saveToken(token);
      }
    } catch (e) {}
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
    localStorage.removeItem('jwt'); // Requirement 3
    modernoSSO.logout(); // Requirement 3: Max-Age=0
  },
};

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
