-- ============================================================================
-- ETAPA 3: Moderno ID — Esquema Central de Identidad (No Destructivo)
-- Instancia Supabase: rcskjdksimcfkdjzxara
-- Objetivo:
--   1. Crear el esquema lógico `identity` para Moderno ID sin alterar las
--      tablas existentes en `public` (compatibilidad total durante transición).
--   2. Registrar aplicaciones oficiales autorizadas y vínculos usuario <-> app
--      sin mezclar roles ni permisos funcionales de cada producto.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS identity;

-- 1. Catálogo de aplicaciones autorizadas en Moderno ID
CREATE TABLE IF NOT EXISTS identity.applications (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    base_url TEXT NOT NULL,
    is_first_party BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO identity.applications (id, name, base_url, is_first_party, is_active)
VALUES
    ('access', 'Moderno Access', 'https://access.moderno.com.ar', TRUE, TRUE),
    ('cloud', 'Moderno Cloud', 'https://cloud.moderno.com.ar', TRUE, TRUE),
    ('play', 'Moderno Play', 'https://play.moderno.com.ar', TRUE, TRUE),
    ('pay', 'Moderno Pay', 'https://pay.moderno.com.ar', TRUE, TRUE),
    ('ai', 'Moderno AI (Nova Web)', 'https://ai.moderno.com.ar', TRUE, TRUE),
    ('hosting', 'Moderno Hosting', 'https://host.moderno.com.ar', TRUE, TRUE),
    ('factory', 'Moderno Factory', 'https://factory.moderno.com.ar', TRUE, TRUE),
    ('builder', 'Moderno Builder', 'https://builder.moderno.com.ar', TRUE, TRUE)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    base_url = EXCLUDED.base_url,
    updated_at = NOW();

-- 2. Vínculos Usuario Global (auth.users.id) <-> Aplicación
-- Registra qué aplicaciones ha utilizado el usuario sin almacenar roles internos de la app.
CREATE TABLE IF NOT EXISTS identity.user_app_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    app_id VARCHAR(50) NOT NULL REFERENCES identity.applications(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL DEFAULT 'active', -- 'active', 'revoked'
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, app_id)
);

CREATE INDEX IF NOT EXISTS idx_identity_user_app_links_user_id ON identity.user_app_links(user_id);
CREATE INDEX IF NOT EXISTS idx_identity_user_app_links_app_id ON identity.user_app_links(app_id);

-- 3. Bitácora de eventos de autenticación de Moderno ID
CREATE TABLE IF NOT EXISTS identity.auth_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    app_id VARCHAR(50) REFERENCES identity.applications(id) ON DELETE SET NULL,
    event_type VARCHAR(60) NOT NULL, -- 'login', 'sso_exchange', 'logout', 'password_reset'
    ip_address TEXT,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_identity_auth_events_user_created ON identity.auth_events(user_id, created_at DESC);

-- 4. Row Level Security (RLS)
ALTER TABLE identity.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.user_app_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.auth_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active applications" ON identity.applications;
CREATE POLICY "Public read active applications"
    ON identity.applications FOR SELECT
    USING (is_active = TRUE);

DROP POLICY IF EXISTS "Users read own app links" ON identity.user_app_links;
CREATE POLICY "Users read own app links"
    ON identity.user_app_links FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own auth events" ON identity.auth_events;
CREATE POLICY "Users read own auth events"
    ON identity.auth_events FOR SELECT
    USING (auth.uid() = user_id);

-- 5. RPC seguro para registrar acceso de un usuario autenticado a una app oficial
CREATE OR REPLACE FUNCTION identity.register_app_visit(p_app_id VARCHAR(50))
RETURNS VOID AS $$
DECLARE
    v_uid UUID := auth.uid();
BEGIN
    IF v_uid IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;

    INSERT INTO identity.user_app_links (user_id, app_id, status, first_seen_at, last_seen_at)
    VALUES (v_uid, p_app_id, 'active', NOW(), NOW())
    ON CONFLICT (user_id, app_id) DO UPDATE SET
        last_seen_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = identity, public;

