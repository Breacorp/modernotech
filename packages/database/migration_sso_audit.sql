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
