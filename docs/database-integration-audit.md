# Auditoría de Base de Datos (Supabase) – Moderno Tech

## 1. Fuente de verdad de autenticación

El frontend **no** valida passwords contra `global_users.password_hash`.

La verdad de autenticación vive en **`auth.users`** (Supabase Auth). La aplicación usa:

```ts
supabase.auth.signInWithPassword({ email, password })
```

Por eso:
- Crear rows manualmente en `global_users` **NO** crea un usuario logueable.
- Los usuarios deben existir en `auth.users` o en Supabase Dashboard (Auth → Users).

La tabla `global_users` es el **perfil de aplicación** / identidad de ecosistema, no la credencial de login.

## 2. Flujo esperado de un nuevo usuario

1. El usuario hace `signUp` o `signInWithPassword`.
2. Supabase crea `auth.users.id`.
3. El trigger `handle_new_user_registration` crea:
   - `global_users` (rol `user`, status `active`)
   - `global_profiles`
   - `user_product_entitlements` para todos los productos con `has_free_tier = TRUE`
4. `useModernoAuth` y `ModernoAuthProvider` leen `global_users` y `user_product_entitlements`.

## 3. Diagnóstico (queries)

```sql
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 20;

SELECT gu.id, gu.email, gu.role, gu.status
FROM global_users gu
LEFT JOIN auth.users au ON au.id = gu.id
WHERE au.id IS NULL;

SELECT au.id, au.email
FROM auth.users au
LEFT JOIN global_users gu ON gu.id = au.id
WHERE gu.id IS NULL;

SELECT id, email, status FROM global_users WHERE status <> 'active';

SELECT id, email, email_confirmed_at
FROM auth.users
WHERE email_confirmed_at IS NULL;
```

## 4. Regla operativa

- No insertar usuarios en `global_users` a mano sin `auth.users`.
- Si se necesita un usuario de prueba, crearlo desde Supabase Dashboard o con la función Admin de Supabase.
- Los roles `admin` / `superadmin` se controlan con el valor `global_users.role`, pero el login siempre pasa por `auth.users`.

## 5. Entitlements por producto

La identidad es única. La diferencia entre productos vive en:

- `user_product_entitlements(user_id, product_id, tier, status)`
- `software_licenses` para licencias premium
- `billing_invoices` para facturación
- tablas por producto para estado específico (favoritos, progreso de juegos, preferencias)

## 6. Próximos pasos técnicos

- Usar la misma cuenta Supabase en todos los subdominios (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- Restaurar sesión por cookie `mp_token`.
- Hacer logout sincronizado (`Max-Age=0`).
- Si un producto requiere datos específicos, guardarlos en tablas que referencien `auth.users.id` y tengan RLS correcto.

## 7. Convenciones SSO

- Cookie: `mp_token`.
- Dominio: `.moderno.com.ar`.
- Ruta: `/`.
- Flags: `Secure; SameSite=Lax; Max-Age=5184000`.
- Valor: `access_token` JWT de Supabase.
