# Guía de Conexión OIDC para Nuevos Subdominios

Cada nueva plataforma SaaS en el ecosistema (ej. `cinema.moderno.com.ar`) utiliza su propio Supabase independiente. Para integrar la sesión unificada mediante `id.moderno.com.ar`, se debe configurar el inicio de sesión federado.

## 1. Registro de Cliente en Moderno ID
El nuevo subdominio debe estar registrado en el IdP central. Registra estos valores en `id.moderno.com.ar`:
*   `client_id`: `cinema-studio` (nombre único del producto)
*   `client_secret`: Un hash seguro de 32 caracteres
*   `redirect_uris`: `["https://cinema.moderno.com.ar/api/auth/callback"]`

## 2. Configuración en Supabase del Subdominio
Si la aplicación utiliza Supabase, configura el Custom OAuth Provider en la consola de Supabase:

1.  Ve a **Authentication** -> **Providers** -> **Custom OAuth**.
2.  Introduce los siguientes parámetros:
    *   **Client ID:** El `client_id` registrado (ej. `cinema-studio`).
    *   **Client Secret:** El `client_secret` provisto.
    *   **OpenID Connect Discovery URL:** `https://id.moderno.com.ar/.well-known/openid-configuration`
3.  Habilita el proveedor.

## 3. Flujo en el Frontend
En tu frontend (React/Next.js):
```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function loginWithModernoID() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'custom', // El Custom OIDC configurado
    options: {
      redirectTo: 'https://cinema.moderno.com.ar/dashboard'
    }
  })
}
```

Al hacer clic, el usuario irá a `id.moderno.com.ar`, iniciará sesión de forma segura y regresará con su sesión local creada automáticamente en la tabla `auth.users` del Supabase local.
