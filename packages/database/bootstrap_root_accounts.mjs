/**
 * Moderno Tech — Bootstrap Idempotente de Cuentas ROOT
 *
 * Política Definitiva de ROOT:
 *   Únicas identidades autorizadas:
 *     1. jlbrea89@gmail.com (Principal)
 *     2. admin@modernotech.com.ar (Respaldo)
 *
 * Uso:
 *   node bootstrap_root_accounts.mjs --dry-run   (solo lectura, por defecto)
 *   node bootstrap_root_accounts.mjs --apply     (aplica cambios idempotentes tras autorización)
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const AUTHORIZED_ROOT_EMAILS = Object.freeze([
  'jlbrea89@gmail.com',
  'admin@modernotech.com.ar',
]);

export function assertAllowedRootEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!AUTHORIZED_ROOT_EMAILS.includes(normalized)) {
    throw new Error(
      `ROOT_POLICY_VIOLATION: "${normalized}" no está en la lista autorizada de cuentas ROOT.`
    );
  }
  return normalized;
}

export function buildRootPlan(authUsersRows) {
  const plan = [];
  for (const allowedEmail of AUTHORIZED_ROOT_EMAILS) {
    assertAllowedRootEmail(allowedEmail);
    const match = authUsersRows.find(
      (u) => String(u.email || '').trim().toLowerCase() === allowedEmail
    );
    if (!match) {
      plan.push({
        email: allowedEmail,
        status: 'PENDING_REGISTRATION',
        userId: null,
        actions: ['Esperar registro o login legítimo en Supabase Auth antes de otorgar ROOT'],
      });
      continue;
    }

    if (!match.verified) {
      plan.push({
        email: allowedEmail,
        status: 'PENDING_EMAIL_VERIFICATION',
        userId: match.id,
        actions: ['Esperar verificación de correo antes de otorgar ROOT'],
      });
      continue;
    }

    plan.push({
      email: allowedEmail,
      status: 'READY',
      userId: match.id,
      actions: [
        `auth.users: asignar raw_app_meta_data.role = "SUPER_ADMIN" para ${match.id}`,
        `identity / global_users (si existe): role = "superadmin"`,
        `play.profiles (si existe): role = "SUPERADMIN"`,
        `cloud.cloud_users (si existe): role = "SUPER_ADMIN"`,
        `access."User" + UserIdentity (si existe): role = "SUPER_ADMIN"`,
      ],
    });
  }
  return plan;
}

async function runCli() {
  const isApply = process.argv.includes('--apply');
  const isDryRun = !isApply;

  // Load PrismaClient from ModernoAccess or local node_modules when executed directly
  let PrismaClient;
  try {
    ({ PrismaClient } = require('@prisma/client'));
  } catch {
    ({ PrismaClient } = require('/Volumes/Bault/Proyectos/ModernoAccess/backend/node_modules/@prisma/client'));
  }

  const prisma = new PrismaClient();
  try {
    const rows = await prisma.$queryRaw`
      SELECT id, email, (email_confirmed_at IS NOT NULL) AS verified, raw_app_meta_data
      FROM auth.users
      WHERE lower(email) IN ('jlbrea89@gmail.com', 'admin@modernotech.com.ar')
      ORDER BY email
    `;

    const plan = buildRootPlan(rows);
    console.log(JSON.stringify({ mode: isDryRun ? 'DRY_RUN' : 'APPLY', plan }, null, 2));

    if (isDryRun) {
      console.log('\n[DRY-RUN] No se realizaron modificaciones en la base de datos.');
      return;
    }

    for (const item of plan) {
      if (item.status !== 'READY' || !item.userId) continue;
      assertAllowedRootEmail(item.email);

      await prisma.$executeRaw`
        UPDATE auth.users
        SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"SUPER_ADMIN"}'::jsonb,
            updated_at = NOW()
        WHERE id = ${item.userId}::uuid
          AND lower(email) = ${item.email}
      `;
      console.log(`[APPLY] raw_app_meta_data.role=SUPER_ADMIN asignado a ${item.email} (${item.userId})`);
    }
  } finally {
    await prisma.$disconnect();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runCli().catch((err) => {
    console.error('[ROOT BOOTSTRAP ERROR]', err.message);
    process.exit(1);
  });
}

