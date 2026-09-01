-- ==============================================================================
-- BASE DE DATOS CENTRAL DE IDENTIDAD Y ENTITLEMENTS (Supabase / Postgres)
-- ==============================================================================
-- Todos los usuarios del ecosistema Moderno Tech se registran en esta misma base
-- de datos. El acceso y las funcionalidades de cada producto se determinan
-- mediante los entitlements (tier gratuito vs membresías de pago).

-- 1. Tabla de Usuarios Globales (Auth Supabase)
CREATE TABLE IF NOT EXISTS global_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Perfil Global de Usuario
CREATE TABLE IF NOT EXISTS global_profiles (
    id UUID PRIMARY KEY REFERENCES global_users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    avatar_url TEXT,
    timezone VARCHAR(50) DEFAULT 'America/Argentina/Buenos_Aires',
    preferred_language VARCHAR(10) DEFAULT 'es',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Catálogo de Productos del Ecosistema
CREATE TABLE IF NOT EXISTS ecosystem_products (
    id VARCHAR(50) PRIMARY KEY, -- 'cloud', 'play', 'access', 'ai', 'cleaner', 'one', 'weather'
    name VARCHAR(100) NOT NULL,
    subdomain VARCHAR(100) NOT NULL,
    has_free_tier BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Entitlements y Suscripciones por Producto
-- Al registrarse, el usuario recibe automáticamente tier = 'free' en todos los productos con capa gratuita.
CREATE TABLE IF NOT EXISTS user_product_entitlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES global_users(id) ON DELETE CASCADE,
    product_id VARCHAR(50) NOT NULL REFERENCES ecosystem_products(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL DEFAULT 'free', -- 'free', 'individual', 'family', 'vip', 'pro', 'enterprise'
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'past_due', 'canceled'
    quota_limit_bytes BIGINT DEFAULT 5368709120, -- 5 GB default para tier free en cloud
    stripe_subscription_id VARCHAR(255),
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- 5. Función de Trigger para alta automática de Tiers Gratuitos en el Registro
CREATE OR REPLACE FUNCTION handle_new_user_entitlements()
RETURNS TRIGGER AS $$
BEGIN
    -- Crea perfil por defecto
    INSERT INTO global_profiles (id, name)
    VALUES (NEW.id, split_part(NEW.email, '@', 1));

    -- Habilita automáticamente el tier FREE en todos los productos del ecosistema
    INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
    VALUES
        (NEW.id, 'play', 'free', 'active'),       -- Acceso a catálogo de juegos gratuitos
        (NEW.id, 'cloud', 'free', 'active'),      -- Bóveda gratuita de 5 GB
        (NEW.id, 'ai', 'free', 'active'),         -- Cuota gratuita de inferencia diaria
        (NEW.id, 'access', 'free', 'active'),     -- Credencial residente / modo invitado
        (NEW.id, 'weather', 'free', 'active'),    -- Pronóstico y alertas en tiempo real
        (NEW.id, 'cleaner', 'free', 'active');    -- Diagnóstico básico macOS

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparador al crear usuario en Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON global_users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON global_users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user_entitlements();

-- 6. Políticas de Seguridad RLS (Row-Level Security)
ALTER TABLE global_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_product_entitlements ENABLE ROW LEVEL SECURITY;

-- Cada usuario solo puede ver y editar sus propios entitlements
CREATE POLICY "Users can read own entitlements"
    ON user_product_entitlements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can read own profile"
    ON global_profiles FOR SELECT
    USING (auth.uid() = id);
