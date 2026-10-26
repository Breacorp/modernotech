<div align="center">

<img src="https://raw.githubusercontent.com/Breacorp/modernotech/main/public/logo.png" alt="Moderno Tech Logo" width="220" />

# Moderno Tech

### Ecosistema Digital Unificado

</div>

---

# Moderno Tech — Ecosistema Digital Unificado

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-Build-EF4444?logo=turborepo&logoColor=white)](https://turbo.build)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20RLS-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-0052FF)](LICENSE)

> Plataforma omnicanal para software empresarial, inteligencia artificial, cloud y entretenimiento. Un único punto de verdad para identidad, facturación y configuración de todos los subdominios de `moderno.com.ar`.

## Tabla de contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Ecosistema de productos](#ecosistema-de-productos)
- [SSO entre subdominios](#sso-entre-subdominios)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Configuración de entorno](#configuración-de-entorno)
- [Desarrollo local](#desarrollo-local)
- [Despliegue](#despliegue)
- [Paquetes compartidos](#paquetes-compartidos)
- [Equipo y licencia](#equipo-y-licencia)

## Descripción

Moderno Tech centraliza los servicios de la empresa sobre una arquitectura multi-tenant con:

- Identidad unificada (Single Sign-On) en todos los subdominios.
- Row-Level Security (RLS) por cuenta/usuario.
- Facturación consolidada y gestión central de licencias.
- Branding por producto mediante un motor de temas (Theme Engine).
- Componentes UI reutilizables accionables mediante paquetes internos.

## Arquitectura

```text
┌─────────────────────┐        ┌──────────────────────┐
│  Landing / Hub      │        │  Auth Portal (id)    │
│  moderno.com.ar     │◄──────►│  id.moderno.com.ar   │
└────────┬────────────┘        └──────────┬───────────┘
         │                                 │
         ├──────────────┬──────────────┬────┴────┐
         ▼              ▼              ▼         ▼
   pay.moderno.com.ar  cloud...      play...   admin...
         ▲              ▲              ▲         ▲
         └──────────────┴──────────────┴─────────┘
              SSO mediante cookie mp_token
              (dominio: .moderno.com.ar)
```

- **Framework**: Next.js (App Router) + React 19.
- **Orquestación**: Turborepo + npm workspaces.
- **Estilos**: Tailwind CSS v4 + tokens de diseño centralizados.
- **Identidad**: Supabase Auth con almacenamiento compartido entre subdominios.
- **Tipado**: TypeScript estricto en apps y paquetes.

## Ecosistema de productos

| Producto | Dominio | Estado |
|----------|---------|--------|
| Moderno One | one.moderno.com.ar | Acceso |
| Moderno Access | access.moderno.com.ar | Operativo |
| Moderno Cloud | cloud.moderno.com.ar | Operativo |
| Moderno Play | play.moderno.com.ar | Operativo |
| Moderno AI | ai.moderno.com.ar | Operativo |
| Moderno Pay | pay.moderno.com.ar | Operativo |
| Moderno Builder | builder.moderno.com.ar | Operativo |
| Moderno Media | media.moderno.com.ar | Operativo |
| Moderno Factory | factory.moderno.com.ar | Operativo |
| Moderno Air Gesture | air-gesture.moderno.com.ar | Operativo |
| Mercatto | mercatto.moderno.com.ar | Operativo |
| Cinema Studio AI | cinema.moderno.com.ar | BETA |
| Moderno Voice AI | voice.moderno.com.ar | BETA |

## SSO entre subdominios

Toda la gestión de sesión se resuelve mediante una cookie compartida (`mp_token`) con dominio `.moderno.com.ar`:

- **Nombre**: `mp_token`
- **Dominio**: `.moderno.com.ar`
- **Ruta**: `/`
- **Flags**: `Secure; SameSite=Lax; Max-Age=5184000`
- **Valor**: `access_token` del JWT de Supabase

Los helpers compartidos (`saveToken`, `readTokenFromCookie`, `restoreToken`, `logout`) viven en `@moderno/auth-helpers`.

## Estructura del repositorio

```text
modernotech/
├── apps/
│   ├── auth/            # Portal de identidad (id.moderno.com.ar)
│   ├── landing-main/    # Hub central (moderno.com.ar)
│   ├── admin/           # Backoffice (admin.moderno.com.ar)
│   ├── dashboard/       # Panel comercial (dashboard.moderno.com.ar)
│   └── styleguide/      # Showroom de design system
├── packages/
│   ├── auth/            # Lógica Supabase + SSO + helpers
│   ├── billing/         # Facturación consolidada
│   ├── config/          # Metadatos y catálogo de productos
│   ├── ui/              # Componentes compartidos
│   ├── theme/           # Tokens y branding por producto
│   ├── types/           # Tipos globales
│   └── database/        # Esquemas y modelos
├── docs/                # Documentación técnica
└── package.json         # Orquestación npm workspaces + Turborepo
```

## Configuración de entorno

Crear `.env.local` (o usar las variables del proveedor):

```env
NEXT_PUBLIC_SUPABASE_URL=https://rcskjdksimcfkdjzxara.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
NEXT_PUBLIC_APP_URL=http://localhost:3005
PORT=3005
```

## Desarrollo local

```bash
npm install
npm run dev
```

Variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` son obligatorias en todos los entornos (desarrollo y producción).

## Despliegue

En Vercel/Netlify:
- **Root Directory**: `/`
- **Build Command**: `npm run build` o `npx turbo run build --filter=landing-main`
- **Output Directory**: `.next` o `apps/landing-main/.next`
- **Install Command**: `npm install`

### Convenciones del commit

Usar el siguiente formato para mantener un historial limpio:

```
feat: agregar nueva funcionalidad
fix: corregir un bug
refactor: refactorizar sin cambiar comportamiento
docs: actualizar documentación
chore: tareas de infraestructura o build
```

## Paquetes compartidos

| Paquete | Propósito |
|---------|-----------|
| `@moderno/auth-helpers` | Cliente de Supabase + SSO cookie `mp_token` |
| `@moderno/ui` | Componentes reutilizables con Theme Engine |
| `@moderno/theme` | Tokens de diseño y branding por producto |
| `@moderno/config` | Metadatos de productos y categorías |
| `@moderno/types` | Interfaces TypeScript globales |
| `@moderno/billing` | Precios, planes y consumos |

## Equipo y licencia

- Maintainer: **Breacorp / moderno.com.ar** (SEO, SSO, arquitectura de identidad centralizada)
- Licencia: MIT

---

*Hecho con ❤️ y TypeScript en Argentina. No se exponen tokens en consola. Me encanta estar aquí.*
