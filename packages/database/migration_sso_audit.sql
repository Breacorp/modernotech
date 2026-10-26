-- ============================================================================
-- Migración de Auditoría (SSO / Multi-tenant)
-- Objetivo: registrar nuevos productos y unificar tablas sin romper esquemas previos
-- ============================================================================

-- 1. Alta de nuevos productos operativos
INSERT INTO ecosystem_products (id, name, tagline, subdomain, has_free_tier)
VALUES
    ('media', 'Moderno Media', 'Gestión de Medios & CDN', 'https://media.moderno.com.ar', TRUE),
    ('builder', 'Moderno Builder', 'No-Code App Builder', 'https://builder.moderno.com.ar', TRUE),
    ('factory', 'Moderno Factory', 'Taller de Desarrollo & Prototipado', 'https://factory.moderno.com.ar', FALSE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    subdomain = EXCLUDED.subdomain,
    has_free_tier = EXCLUDED.has_free_tier;

-- 2. Entitlements Free Tier para nuevos productos (solo a usuarios nuevos via trigger)
-- Para usuarios existentes, asignar entitlements free si no los tienen:
INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
SELECT au.id, ep.id, 'free', 'active'
FROM auth.users au
CROSS JOIN ecosystem_products ep
WHERE ep.id IN ('media', 'builder')
  AND ep.has_free_tier = TRUE
  AND NOT EXISTS (
      SELECT 1
      FROM user_product_entitlements upe
      WHERE upe.user_id = au.id
        AND upe.product_id = ep.id
  )
ON CONFLICT (user_id, product_id) DO NOTHING;

-- 3. Preferencias por producto (estado específico de cada app)
CREATE TABLE IF NOT EXISTS product_user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES global_users(id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL REFERENCES ecosystem_products(id) ON DELETE CASCADE,
    preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

ALTER TABLE product_user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own product preferences"
    ON product_user_preferences FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Superadmin full access to preferences"
    ON product_user_preferences FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- 4. Índices de rendimiento para consultas del ecosistema
CREATE INDEX IF NOT EXISTS idx_user_product_entitlements_user_id
    ON user_product_entitlements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_product_entitlements_product_id
    ON user_product_entitlements(product_id);
CREATE INDEX IF NOT EXISTS idx_billing_invoices_user_id
    ON billing_invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_invoices_product_id
    ON billing_invoices(product_id);
CREATE INDEX IF NOT EXISTS idx_product_user_preferences_user_id
    ON product_user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_product_user_preferences_product_id
    ON product_user_preferences(product_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor
    ON audit_logs(actor_user_id);

-- 5. Backfill de usuarios ya creados en Supabase Auth (nunca provoco duplicados)
INSERT INTO global_users (id, email, role, status, email_verified, created_at)
SELECT
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'role', 'user'),
    'active',
    COALESCE(au.email_confirmed_at IS NOT NULL, FALSE),
    COALESCE(au.created_at, NOW())
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM global_users gu WHERE gu.id = au.id
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO global_profiles (id, name)
SELECT
    au.id,
    COALESCE(au.raw_user_meta_data->>'name', split_part(au.email, '@', 1))
FROM auth.users au
WHERE NOT EXISTS (
    SELECT 1 FROM global_profiles gp WHERE gp.id = au.id
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
SELECT
    au.id,
    ep.id,
    'free',
    'active'
FROM auth.users au
CROSS JOIN ecosystem_products ep
WHERE ep.has_free_tier = TRUE
  AND NOT EXISTS (
      SELECT 1
      FROM user_product_entitlements upe
      WHERE upe.user_id = au.id
        AND upe.product_id = ep.id
  )
ON CONFLICT (user_id, product_id) DO NOTHING;

-- 6. Verificación final
SELECT 'auth_users' AS tabla, COUNT(*) AS cantidad FROM auth.users
UNION ALL
SELECT 'global_users', COUNT(*) FROM global_users
UNION ALL
SELECT 'global_profiles', COUNT(*) FROM global_profiles
UNION ALL
SELECT 'entitlements', COUNT(*) FROM user_product_entitlements;

-- ============================================================================
-- Helpers para alta/baja de servicios desde apps y Mi Moderno
-- ============================================================================

CREATE OR REPLACE FUNCTION public.activate_free_entitlement(p_product_id VARCHAR)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_has_free_tier BOOLEAN;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Debes iniciar sesión.');
    END IF;

    SELECT has_free_tier INTO v_has_free_tier
    FROM ecosystem_products
    WHERE id = p_product_id;

    IF NOT FOUND OR COALESCE(v_has_free_tier, FALSE) IS DISTINCT FROM TRUE THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Este producto no ofrece capa gratuita.');
    END IF;

    INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
    VALUES (v_user_id, p_product_id, 'free', 'active')
    ON CONFLICT (user_id, product_id) DO UPDATE SET
        tier = 'free',
        status = 'active',
        updated_at = CURRENT_TIMESTAMP;

    PERFORM log_audit_event(
        'entitlement.activated_free',
        'entitlement',
        p_product_id,
        'success',
        jsonb_build_object('user_id', v_user_id, 'product_id', p_product_id)
    );

    RETURN jsonb_build_object('success', TRUE, 'message', 'Servicio activado correctamente.');
END;
$$;

CREATE OR REPLACE FUNCTION public.deactivate_entitlement(p_product_id VARCHAR)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();
    IF v_user_id IS NULL THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'Debes iniciar sesión.');
    END IF;

    UPDATE user_product_entitlements
    SET status = 'suspended',
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = v_user_id
      AND product_id = p_product_id
      AND tier = 'free';

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', FALSE, 'error', 'No puedes desactivar este servicio desde esta vía.');
    END IF;

    PERFORM log_audit_event(
        'entitlement.deactivated_free',
        'entitlement',
        p_product_id,
        'success',
        jsonb_build_object('user_id', v_user_id, 'product_id', p_product_id)
    );

    RETURN jsonb_build_object('success', TRUE, 'message', 'Servicio suspendido correctamente.');
END;
$$;

GRANT EXECUTE ON FUNCTION public.activate_free_entitlement(VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION public.deactivate_entitlement(VARCHAR) TO authenticated;
