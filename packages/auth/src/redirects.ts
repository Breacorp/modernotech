// ==============================================================================
// GESTIÓN DE REDIRECCIONES DINÁMICAS (SSO REDIRECTS)
// ==============================================================================

export type ModernoProject = 'tech' | 'access' | 'play' | 'cloud' | 'cinema';

export interface ProjectConfig {
  id: ModernoProject;
  name: string;
  subdomain: string;
  productionUrl: string;
  accentColor: string;
}

export const MODERNO_PROJECTS: Record<ModernoProject, ProjectConfig> = {
  tech: {
    id: 'tech',
    name: 'Moderno Tech',
    subdomain: 'moderno.com.ar',
    productionUrl: 'https://moderno.com.ar',
    accentColor: '#007AFF', // Azul Eléctrico
  },
  access: {
    id: 'access',
    name: 'Moderno Access',
    subdomain: 'access.moderno.com.ar',
    productionUrl: 'https://access.moderno.com.ar',
    accentColor: '#0052FF', // Azul Corporativo de Seguridad
  },
  play: {
    id: 'play',
    name: 'Moderno Play',
    subdomain: 'play.moderno.com.ar',
    productionUrl: 'https://play.moderno.com.ar',
    accentColor: '#8B5CF6', // Púrpura Gaming
  },
  cloud: {
    id: 'cloud',
    name: 'Moderno Cloud',
    subdomain: 'cloud.moderno.com.ar',
    productionUrl: 'https://cloud.moderno.com.ar',
    accentColor: '#00D2FF', // Cyan Cloud
  },
  cinema: {
    id: 'cinema',
    name: 'Cinema Studio',
    subdomain: 'cinema.moderno.com.ar',
    productionUrl: 'https://cinema.moderno.com.ar',
    accentColor: '#FFB800', // Oro Cinematográfico
  },
};

/**
 * Resuelve la URL de redirección absoluta para flujos OAuth (Google) y Account Linking.
 *
 * Prioridad:
 * 1. window.location.origin (si se ejecuta en el navegador, preserva localhost o el subdominio actual)
 * 2. URL de producción del targetProject especificado
 * 3. NEXT_PUBLIC_APP_URL o fallback a https://moderno.com.ar
 */
export function getAuthRedirectUrl(targetProject?: ModernoProject, nextPath: string = '/dashboard'): string {
  let baseUrl = '';

  if (typeof window !== 'undefined') {
    baseUrl = window.location.origin;
  } else if (targetProject && MODERNO_PROJECTS[targetProject]) {
    baseUrl = MODERNO_PROJECTS[targetProject].productionUrl;
  } else if (process.env.NEXT_PUBLIC_APP_URL) {
    baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  } else {
    baseUrl = 'https://moderno.com.ar';
  }

  const cleanNext = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
  return `${baseUrl}/auth/callback?next=${encodeURIComponent(cleanNext)}`;
}
