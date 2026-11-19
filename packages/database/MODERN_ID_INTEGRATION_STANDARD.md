# Estándar de Integración — Moderno ID y Base de Datos Modular

## 1. Principio Central
- **Identidad (Moderno ID)**: `auth.users.id` (UUID global) + esquema `identity` (`applications`, `user_app_links`, `auth_events`).
- **Datos funcionales**: cada producto oficial opera en su propio esquema PostgreSQL (`access`, `cloud`, `play`, `pay`, `nova`, `hosting`, `factory`, `builder`) con su propio rol de base de datos (`<modulo>_app`).

## 2. Contrato de Validación JWT (Sin Secretos Compartidos)
- Habilitar **Asymmetric JWT Signing Keys (ES256/RS256 + JWKS)** en Supabase Dashboard (`rcskjdksimcfkdjzxara`).
- Los backends que validan sesiones de Moderno ID deben verificar la firma contra el endpoint JWKS público (`https://rcskjdksimcfkdjzxara.supabase.co/auth/v1/.well-known/jwks.json`), validando `iss`, `aud`, `exp` y `email_verified`.
- **Prohibido**: leer `user_metadata.role` para otorgar privilegios administrativos. Los roles y permisos de cada aplicación deben residir en las tablas del propio producto (o en `app_metadata` gestionada exclusivamente por servidor).

## 3. Estándar para Repositorios Distribuibles (Cloud vs Self-Hosted)
1. En `schema.prisma`, **no** fijar `@@schema("<modulo>")`; parametrizar `?schema=<modulo>` en `DATABASE_URL`.
2. Implementar capa configurable `AUTH_MODE=local|modernoid|hybrid`:
   - `local` (default en Self-Hosted): PostgreSQL estándar + autenticación local autónoma.
   - `modernoid` / `hybrid` (ecosistema oficial): valida Moderno ID vía JWKS y vincula `sub` en una tabla local `UserIdentity(provider, externalSubject)`.
3. Incluir únicamente las migraciones propias del producto, `docker-compose.yml` y `.env.example` sin credenciales reales.

