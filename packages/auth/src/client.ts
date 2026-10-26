import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
