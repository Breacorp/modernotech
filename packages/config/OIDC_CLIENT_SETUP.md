# Arquitectura de Autenticación y Conexión al Supabase Central

Todo el ecosistema de Moderno Tech (**Moderno Access, Moderno Cloud, Moderno Play, Cinema Studio, Mercatto**, etc.) utiliza **la misma base de datos e instancia central de Supabase**:
- **Project ID**: `rcskjdksimcfkdjzxara`
- **Supabase URL**: `https://rcskjdksimcfkdjzxara.supabase.co`

## 1. Conexión Directa a la Instancia Central
Cada aplicación frontend o microservicio inicializa su cliente de Supabase apuntando a la instancia compartida:

```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rcskjdksimcfkdjzxara.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## 2. Validación de Permisos y Tiers (Entitlements)
Al iniciar sesión con la cuenta global (`auth.users`), cada producto consulta la tabla central `user_product_entitlements` mediante RLS:

```typescript
// Ejemplo en Moderno Play o Moderno Cloud
const { data: entitlement } = await supabase
  .from('user_product_entitlements')
  .select('tier, status, quota_limit_bytes')
  .eq('product_id', 'play') // o 'cloud', 'cinema-studio', 'mercatto', etc.
  .single();

// entitlement.tier === 'free' -> Catálogo gratuito habilitado
// entitlement.tier === 'vip'  -> Catálogo completo desbloqueado
```

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
