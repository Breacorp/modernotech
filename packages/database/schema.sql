-- ==============================================================================
-- BASE DE DATOS CENTRAL DE IDENTIDAD, ENTITLEMENTS & SUPERADMIN
-- Instancia Supabase Central: https://rcskjdksimcfkdjzxara.supabase.co
-- ==============================================================================

-- 1. Tabla de Usuarios Globales (Identidad Central)
CREATE TABLE IF NOT EXISTS global_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user', -- 'user', 'admin', 'superadmin'
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'suspended', 'pending'
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Perfil Global de Usuario
CREATE TABLE IF NOT EXISTS global_profiles (
    id UUID PRIMARY KEY REFERENCES global_users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    avatar_url TEXT,
    company VARCHAR(255),
    phone VARCHAR(50),
    timezone VARCHAR(50) DEFAULT 'America/Argentina/Buenos_Aires',
    preferred_language VARCHAR(10) DEFAULT 'es',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Catálogo Canónico de Productos del Ecosistema
CREATE TABLE IF NOT EXISTS ecosystem_products (
    id VARCHAR(50) PRIMARY KEY, -- 'access', 'cloud', 'play', 'one', 'ai', 'cleaner', 'crm', 'weather', 'cinema', 'voice', 'mercatto', 'academy', 'pay', 'home', 'style'
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    subdomain VARCHAR(100) NOT NULL,
    has_free_tier BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Entitlements, Suscripciones y Permisos por Producto
CREATE TABLE IF NOT EXISTS user_product_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES global_users(id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL REFERENCES ecosystem_products(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL DEFAULT 'free', -- 'free', 'individual', 'family', 'vip', 'pro', 'enterprise', 'custom_grant'
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'suspended', 'past_due', 'canceled'
    quota_limit_bytes BIGINT DEFAULT 5368709120, -- 5 GB default para tier free en cloud
    granted_by UUID REFERENCES global_users(id), -- SuperAdmin que otorgó el beneficio especial
    grant_notes TEXT, -- Motivo del beneficio o plan otorgado
    stripe_subscription_id VARCHAR(255),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 5. Registro Inicial de Productos
INSERT INTO ecosystem_products (id, name, tagline, subdomain, has_free_tier)
VALUES 
    ('access', 'Moderno Access', 'Control de Acceso & Consorcios', 'https://access.moderno.com.ar', TRUE),
    ('one', 'Moderno One', 'ERP Empresarial Modular', 'https://one.moderno.com.ar', TRUE),
    ('cloud', 'Moderno Cloud', 'Almacenamiento & Bóvedas', 'https://cloud.moderno.com.ar', TRUE),
    ('play', 'Moderno Play', 'Cloud Gaming 60 FPS & Emulación', 'https://play.moderno.com.ar', TRUE),
    ('ai', 'Moderno AI', 'Inferencia Cognitiva & Agentes', 'https://ai.moderno.com.ar', TRUE),
    ('crm', 'Moderno CRM (WaTicket)', 'Centralización Omnicanal', 'https://ticket.moderno.com.ar', TRUE),
    ('cleaner', 'Moderno AI Cleaner Pro', 'Diagnóstico & Optimización macOS', 'https://cleaner.moderno.com.ar', TRUE),
    ('weather', 'Moderno Weather', 'Radar Doppler & Telemetría', 'https://weather.moderno.com.ar', TRUE),
    ('cinema', 'Cinema Studio AI', 'Generación Audiovisual AI', 'https://cinema.moderno.com.ar', FALSE),
    ('voice', 'Moderno Voice AI', 'Telefonía & Agentes de Voz', 'https://voice.moderno.com.ar', FALSE),
    ('mercatto', 'Mercatto', 'Marketplace & E-Commerce', 'https://mercatto.moderno.com.ar', TRUE),
    ('academy', 'Moderno Academy', 'Capacitación Técnica', 'https://academy.moderno.com.ar', TRUE),
    ('pay', 'Moderno Pay', 'Pasarela de Cobros', 'https://pay.moderno.com.ar', FALSE),
    ('home', 'Nova Home', 'Domótica Residencial', 'https://home.moderno.com.ar', FALSE),
    ('style', 'Moderno Style & Tech', 'Hardware & Diseño', 'https://style.moderno.com.ar', FALSE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    subdomain = EXCLUDED.subdomain;

-- 6. Trigger para Inicialización de Nuevos Usuarios
CREATE OR REPLACE FUNCTION handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO global_profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)))
    ON CONFLICT (id) DO NOTHING;

    -- Asignación automática de tiers gratuitos
    INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
    VALUES
        (NEW.id, 'play', 'free', 'active'),
        (NEW.id, 'cloud', 'free', 'active'),
        (NEW.id, 'ai', 'free', 'active'),
        (NEW.id, 'access', 'free', 'active'),
        (NEW.id, 'weather', 'free', 'active'),
        (NEW.id, 'cleaner', 'free', 'active'),
        (NEW.id, 'mercatto', 'free', 'active'),
        (NEW.id, 'academy', 'free', 'active')
    ON CONFLICT (user_id, product_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Funciones Administrativas para el SuperAdmin (Jose Luis Brea Fabeiro)
-- Permite al superadmin cambiar el tier de cualquier usuario en cualquier producto
CREATE OR REPLACE FUNCTION admin_grant_product_tier(
    p_admin_id UUID,
    p_target_user_id UUID,
    p_product_id VARCHAR,
    p_tier VARCHAR,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    -- Verifica que el admin ejecutor tenga rol superadmin o admin
    IF NOT EXISTS (SELECT 1 FROM global_users WHERE id = p_admin_id AND role IN ('admin', 'superadmin')) THEN
        RAISE EXCEPTION 'Acceso no autorizado: Solo SuperAdmin puede otorgar beneficios.';
    END IF;

    INSERT INTO user_product_entitlements (user_id, product_id, tier, status, granted_by, grant_notes, updated_at)
    VALUES (p_target_user_id, p_product_id, p_tier, 'active', p_admin_id, p_notes, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, product_id) DO UPDATE SET
        tier = EXCLUDED.tier,
        status = 'active',
        granted_by = EXCLUDED.granted_by,
        grant_notes = EXCLUDED.grant_notes,
        updated_at = CURRENT_TIMESTAMP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Permite al superadmin suspender o reactivar cuentas globales
CREATE OR REPLACE FUNCTION admin_set_user_status(
    p_admin_id UUID,
    p_target_user_id UUID,
    p_new_status VARCHAR
)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM global_users WHERE id = p_admin_id AND role IN ('admin', 'superadmin')) THEN
        RAISE EXCEPTION 'Acceso no autorizado: Solo SuperAdmin puede modificar el estado de usuarios.';
    END IF;

    UPDATE global_users SET status = p_new_status, updated_at = CURRENT_TIMESTAMP WHERE id = p_target_user_id;
    UPDATE user_product_entitlements SET status = p_new_status, updated_at = CURRENT_TIMESTAMP WHERE user_id = p_target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Políticas RLS
ALTER TABLE global_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_product_entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Superadmin full access to profiles"
    ON global_profiles FOR ALL
    USING (EXISTS (SELECT 1 FROM global_users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));

CREATE POLICY "Superadmin full access to entitlements"
    ON user_product_entitlements FOR ALL
    USING (EXISTS (SELECT 1 FROM global_users WHERE id = auth.uid() AND role IN ('admin', 'superadmin')));
