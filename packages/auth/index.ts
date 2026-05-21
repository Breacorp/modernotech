/**
 * @moderno/auth-helpers
 * Helpers de autenticación simulados para el SSO del ecosistema Moderno.
 * 
 * NOTA DE ARQUITECTURA REAL:
 * En una implementación real de SSO con OIDC:
 * - Esta librería exportaría utilidades para interactuar con el Identity Provider elegido.
 * - Si usamos LOGTO o KEYCLOAK: Aquí inicializaríamos el cliente OIDC o las utilidades de validación de JWTs del emisor central.
 * - Si usamos SUPABASE AUTH CENTRAL: Aquí exportaríamos las funciones que invocan `supabase.auth.getSession()` del proyecto Supabase ID central.
 */

import { GlobalUser, UserSubscription } from '@moderno/types';

// Mock de base de datos de usuarios
export const MOCK_USERS: GlobalUser[] = [
  {
    id: 'usr_1',
    email: 'demo@moderno.com.ar',
    name: 'Jose Luis',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    createdAt: '2026-05-17'
  }
];

// Mock de suscripciones activas del usuario demo
export const MOCK_SUBSCRIPTIONS: Record<string, UserSubscription[]> = {
  'usr_1': [
    { productId: 'access', isActive: true, role: 'admin' },
    { productId: 'hosting', isActive: true, role: 'user' },
    { productId: 'academy', isActive: true, role: 'user' },
    { productId: 'cinema', isActive: false, role: 'user' },
    { productId: 'support', isActive: false, role: 'user' },
    { productId: 'ticket', isActive: false, role: 'user' },
    { productId: 'voice', isActive: false, role: 'user' }
  ]
};

/**
 * Simula la generación de un token OAuth2/OIDC temporal de demo para el launchpad.
 * 
 * ⚠️ ATENCIÓN DE SEGURIDAD:
 * ESTE TOKEN ES ESTRICTAMENTE UN "UX PREVIEW" Y NO CUENTA CON FIRMA CRIPTOGRÁFICA REAL.
 * NO USAR EN PRODUCCIÓN BAJO NINGUNA CIRCUNSTANCIA.
 * 
 * EN UN OIDC REAL:
 * Este método retornaría un JWT centralizado real (ID Token)
 * firmado con una clave asimétrica RSA privada del IdP (id.moderno.com.ar). Los subdominios
 * verificarían la firma usando la clave pública expuesta en `/.well-known/jwks.json`.
 */
export function generateSimulatedDemoToken(userId: string, targetAppId: string): string {
  const payload = {
    iss: 'https://id.moderno.com.ar',
    sub: userId,
    aud: targetAppId,
    type: 'NON_PRODUCTION_TOKEN_UX_PREVIEW_ONLY',
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hora
    iat: Math.floor(Date.now() / 1000)
  };
  
  return 'SIMULATED_DEMO_TOKEN_' + btoa(JSON.stringify(payload)); // Simulación Base64 con prefijo explícito
}
