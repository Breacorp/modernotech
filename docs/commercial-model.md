# Moderno Tech — Modelo de Planes y Suscripciones (Estilo Google)

## 1. Objetivo

Ofrecer servicios **individuales** y **paquetes** (suites) de la misma forma que Google Workspace, adaptado al ecosistema `moderno.com.ar`.

La landing pública y el registro no deben cambiar su identidad, pero el flujo de contratación debe ser claro, auditable y preparado para multi-productos.

## 2. Filosofía comercial

- **Base gratuita institucional**: cada usuario creada recibe capa gratuita en los productos con `has_free_tier = true` sin tarjeta y sin cambios al SSO.
- **Individual**: cada app tiene planes de crecimiento por sí misma.
- **Bundle / Suite**: combinaciones con descuento y beneficios compartidos (como Google Workspace Individual vs Team vs Business).
- **Un único checkout**: todos los planes pagos salen a `https://pay.moderno.com.ar` (Moderno Pay), sin duplicar Mercado Pago ni integraciones financieras.

## 3. Combos sugeridos (estructura)

### 3.1. Moderno Individual (entrada / un usuario)

Base gratuita (`0 ARS`):

- Moderno ID (SSO)
- Cloud 5 GB
- Moderno AI 50 req/día
- Cinema Studio 1080p
- Moderno Play arcade
- Mercatto acceso
- Moderno Access (control básico)

Revisiones por cuenta:

- `Workspace Lite` (`$4.99/mes`): docenas de GB, AI priorizado, soporte individual.
- `Workspace Pro` (`$9.99/mes`): AI avanzado, cloud 200GB, soporte prioritario, feature flags estándar.

### 3.2. Moderno Family (hogar)

Para 3 a 6 usuarios contabilizando storage y parental controls.

Base gratuita compartida:

- 10 GB colectivos
- Acceso a Play/Mercatto

Plan recomendado:

- `Family Core` (`$14.99/mes`): 2 TB total + buckets privados por miembro + AI familiar (400 req) + Cloud sharing.
- `Family Plus` (`$24.99/mes`): 4 TB + soporte dedicado + centro de control parental + VPN premium.

### 3.3. Moderno Business (pymes y empresas)

Funciona como `Google Workspace Business`:

- `Business Core` (`$30/mes/seats`): Cloud enterprise, AI compartido, CRM multiagente, facturación consolidada.
- `Business Advanced` (`$60/mes/seats`): storage ciberseguro, auditoría, licencias multi-equipo.
- `Business VIP`: licencias offline (Cleaner Pro, licencias corporativas App Builder).

### 3.4. Productos individuales (a la carte)

- **Moderno Cloud**: Individual / Family / Pro
- **Moderno Play**: VIP streaming 60 FPS / Catálogo familiar
- **Moderno Access**: Personal / Familiar / Empresa
- **Moderno AI**: Light / Pro inference / Agentes + packs extra
- **Moderno Builder**: Free tier / Studio / Enterprise
- **Moderno Factory**: Free / Maker Pro / Enterprise
- **Moderno Pay / Pay API**: según transacciones
- **Cinema Studio**: beta / premium 4K
- **Moderno Cleaner Pro**: licencia perpetual / anual

## 4. Reglas de facturación

- **Primer principio**: todas las transacciones van a `https://pay.moderno.com.ar`.
- **Verificación obligatoria**: el pago no se considera aprobado por el frontend.
- **Idempotencia**: callbacks/webhooks no duplican activaciones.
- **Cancelación real**: se usa la API de billing en backend y el estado del dashboard se actualizará.
- **RLS**: el usuario solo consulta sus propias suscripciones/facturas.

## 5. Flujo deseado

1. Usuario está en Mi Moderno / Pricing.
2. Selecciona lo que quiere.
3. Si ya está logueado, se crea o continúa la orden en backend.
4. Se redirige a `https://pay.moderno.com.ar` con identificador de orden/sesión.
5. Moderno Pay procesa con Mercado Pago / Stripe.
6. Backend recibe webhook o confirma.
7. Se actualiza `user_product_entitlements` y se regresa a Mi Moderno.
8. Moderno ID y SSO mantienen token compartido.

## 6. Integración con account dashboard

En `/cuenta`, la UX debe:

- Separar ** planes gratuitos** de **suscripciones activas pagas**.
- Mostrar cuota, renovación y estado.
- Permitir comprar mejor nivel (ej. upgrade a Family/Pro).
- Registrar licencias de software y activaciones.

## 7. SSO y identidad central

Todos los planes se asocian a la **misma** cuenta Supabase (`mp_token`).  
No se crean usuarios por producto.

## 8. Próximos pasos técnicos recomendados

- Crear una tabla central `product_plans` o `tariff_catalog` si no existe.
- Conectar Mi Moderno y Pricing con Moderno Pay.
- Guardar identificador de `mercado_pago` / `stripe` subscription en `user_product_entitlements` (actualmente no existe).
- Implementar webhooks e idempotencia.
- Usar RLS para checkout y billing.

## 9. Audital recomendada (para no inventar datos)

Antes de implementar combos, verificar existencia de:
- `billing_invoices`
- `user_product_entitlements`
- `user_plans` / `subscriptions`
- `webhooks` o `payment_events`
- Tablas específicas de cada producto que guarden preferencias y cuotas.

---

Este documento sirve como base corporativa para la próxima implementación.
