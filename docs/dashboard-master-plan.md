# Plan de Arquitectura y Negocios: Dashboard Maestro (Launchpad Comercial)
## Ecosistema Desacoplado Moderno Style & Tech

## 1. El Rol del Dashboard Maestro

El **Dashboard Maestro** (`dashboard.moderno.com.ar`) actúa como el **Centro Operativo y Comercial unificado** de todo el ecosistema Moderno Style & Tech. Su propósito principal es brindar al usuario final:
*   Un launchpad centralizado para acceder de forma segura mediante Single Sign-On (SSO) a todos los productos activos.
*   Un portal de autoservicio para la gestión y contratación de planes (Billing Central).
*   Una vista agregada de su nivel de consumo e histórico de facturación.
*   Recomendaciones automáticas basadas en inteligencia artificial cruzada para fomentar el cross-selling entre aplicaciones.

---

## 2. Diferencia entre Dashboard Central y Dashboards de Producto

Es de vital importancia arquitectónica mantener una estricta separación de responsabilidades:

| Característica | Dashboard Maestro (`dashboard.moderno.com.ar`) | Dashboard del Producto (ej. `cinema.moderno.com.ar`) |
| :--- | :--- | :--- |
| **Propósito** | Centro comercial y de suscripciones global de la suite. | Operación y uso especializado del software específico. |
| **Acceso a Base de Datos** | Lee únicamente la base de datos de identidad y facturación global. | Lee su base de datos física local aislada. |
| **Métricas** | Muestra datos agregados y cuotas de consumo general. | Muestra analíticas complejas de la operación técnica local. |
| **Roles y Permisos** | Gestiona quién tiene licencia activa en la suite corporativa. | Gestiona accesos granulares de usuarios al tenant/workspace local. |

---

## 3. Integración Futura con Facturación y Billing Real

En una fase posterior de producción, el **Dashboard Maestro** se conectará con un procesador de pagos centralizado (como **Stripe Billing**):
1. **Contratación Centralizada:** El usuario activa un módulo o compra créditos adicionales en `dashboard.moderno.com.ar`.
2. **Checkout Seguro:** Se redirige a una sesión segura de Stripe Checkout.
3. **Webhook de Transacción:** Una vez confirmado el pago, Stripe emite un webhook al backend del Dashboard Maestro.
4. **Sincronización Asíncrona:** El Dashboard actualiza los permisos en la base de identidad global y envía un mensaje mediante una cola transaccional (ej. BullMQ/RabbitMQ) a la base de datos local de la aplicación afectada para incrementar sus créditos técnicos al instante de forma desacoplada.

---

## 4. Separación Absoluta de Datos y Aislamiento de Moderno Access

Para garantizar la estabilidad del ecosistema y respetar las restricciones de tu aplicación legacy:
*   **Cero Conexiones Físicas:** La base de datos de *Moderno Access* (y la de cualquier otro producto futuro) no expone puertos ni credenciales de conexión al Dashboard Maestro.
*   **Arquitectura Orientada a Eventos:** Toda comunicación entre el Dashboard Maestro y los subdominios se realiza de forma asíncrona mediante APIs autenticadas (Tokens OIDC de corta duración) y Webhooks de facturación.
*   **Seguridad Multi-Tenant Local:** Si un usuario es eliminado o su suscripción se cancela en el Dashboard central, la aplicación local recibe la notificación vía API y bloquea el acceso de forma interna, pero nunca modifica físicamente los registros del usuario final de la base local. Esto asegura que la base de datos de *Moderno Access* permanezca completamente intacta y bajo tu control directo en todo momento.
