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
    tier VARCHAR(50) NOT NULL DEFAULT 'free', -- 'free', 'individual', 'family', 'vip', 'pro', 'enterprise', 'reseller', 'custom_grant'
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
    ('cinema', 'Cinema Studio AI', 'Generación Audiovisual AI', 'https://cinema.moderno.com.ar', TRUE),
    ('voice', 'Moderno Voice AI', 'Telefonía & Agentes de Voz', 'https://voice.moderno.com.ar', FALSE),
    ('mercatto', 'Mercatto', 'Marketplace & E-Commerce', 'https://mercatto.moderno.com.ar', TRUE),
    ('academy', 'Moderno Academy', 'Capacitación Técnica', 'https://academy.moderno.com.ar', TRUE),
    ('pay', 'Moderno Pay', 'Pasarela de Cobros', 'https://pay.moderno.com.ar', FALSE),
    ('home', 'Nova Home', 'Domótica Residencial', 'https://home.moderno.com.ar', FALSE),
    ('style', 'Moderno Style & Tech', 'Hardware & Diseño', 'https://style.moderno.com.ar', FALSE)
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    tagline = EXCLUDED.tagline,
    subdomain = EXCLUDED.subdomain,
    has_free_tier = EXCLUDED.has_free_tier;

-- 6. Trigger Universal para Inicialización de Nuevos Usuarios (Capa Gratuita por Defecto en TODO el Ecosistema)
CREATE OR REPLACE FUNCTION handle_new_user_registration()
RETURNS TRIGGER AS $$
BEGIN
    -- 1. Crear usuario en global_users
    INSERT INTO global_users (id, email, role, status, email_verified)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
        'active',
        COALESCE(NEW.email_confirmed_at IS NOT NULL, FALSE)
    )
    ON CONFLICT (id) DO NOTHING;

    -- 2. Crear perfil por defecto
    INSERT INTO global_profiles (id, name)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)))
    ON CONFLICT (id) DO NOTHING;

    -- 3. Asignación automática de cuenta gratuita (Free Tier) en TODOS los sitios y servicios del ecosistema
    INSERT INTO user_product_entitlements (user_id, product_id, tier, status)
    SELECT NEW.id, ep.id, 'free', 'active'
    FROM ecosystem_products ep
    WHERE ep.has_free_tier = TRUE
    ON CONFLICT (user_id, product_id) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparador en Supabase Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user_registration();

-- 7. Funciones Administrativas Endurecidas (Usan auth.uid() del token criptográfico, NUNCA p_admin_id del cliente)
CREATE OR REPLACE FUNCTION admin_grant_product_tier(
    p_target_user_id UUID,
    p_product_id VARCHAR,
    p_tier VARCHAR,
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    v_caller_id UUID;
    v_caller_role VARCHAR;
BEGIN
    v_caller_id := auth.uid();
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Acceso denegado: Usuario no autenticado.';
    END IF;

    SELECT role INTO v_caller_role FROM global_users WHERE id = v_caller_id;
    IF v_caller_role NOT IN ('admin', 'superadmin') THEN
        RAISE EXCEPTION 'Acceso no autorizado: Solo SuperAdmin puede otorgar beneficios.';
    END IF;

    INSERT INTO user_product_entitlements (user_id, product_id, tier, status, granted_by, grant_notes, updated_at)
    VALUES (p_target_user_id, p_product_id, p_tier, 'active', v_caller_id, p_notes, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, product_id) DO UPDATE SET
        tier = EXCLUDED.tier,
        status = 'active',
        granted_by = EXCLUDED.granted_by,
        grant_notes = EXCLUDED.grant_notes,
        updated_at = CURRENT_TIMESTAMP;
END;
$$;

-- Permite al superadmin suspender o reactivar cuentas globales
CREATE OR REPLACE FUNCTION admin_set_user_status(
    p_target_user_id UUID,
    p_new_status VARCHAR
)
RETURNS VOID 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    v_caller_id UUID;
    v_caller_role VARCHAR;
BEGIN
    v_caller_id := auth.uid();
    IF v_caller_id IS NULL THEN
        RAISE EXCEPTION 'Acceso denegado: Usuario no autenticado.';
    END IF;

    SELECT role INTO v_caller_role FROM global_users WHERE id = v_caller_id;
    IF v_caller_role NOT IN ('admin', 'superadmin') THEN
        RAISE EXCEPTION 'Acceso no autorizado: Solo SuperAdmin puede modificar el estado de usuarios.';
    END IF;

    UPDATE global_users SET status = p_new_status, updated_at = CURRENT_TIMESTAMP WHERE id = p_target_user_id;
    UPDATE user_product_entitlements SET status = p_new_status, updated_at = CURRENT_TIMESTAMP WHERE user_id = p_target_user_id;
END;
$$;

-- Revocar ejecución pública de funciones administrativas
REVOKE EXECUTE ON FUNCTION admin_grant_product_tier FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION admin_set_user_status FROM PUBLIC;
GRANT EXECUTE ON FUNCTION admin_grant_product_tier TO authenticated;
GRANT EXECUTE ON FUNCTION admin_set_user_status TO authenticated;

-- 8. Políticas RLS Estrictas (DENY BY DEFAULT)
ALTER TABLE global_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE global_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_product_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ecosystem_products ENABLE ROW LEVEL SECURITY;

-- ecosystem_products: Lectura pública para el catálogo
CREATE POLICY "Public read for ecosystem products"
    ON ecosystem_products FOR SELECT
    USING (TRUE);

-- global_users: Cada usuario solo puede ver su propio registro; superadmin puede ver/gestionar
CREATE POLICY "Users can read own record"
    ON global_users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Superadmin full access to global_users"
    ON global_users FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- global_profiles: Cada usuario ve y edita su propio perfil; superadmin tiene acceso total
CREATE POLICY "Users can read and update own profile"
    ON global_profiles FOR ALL
    USING (auth.uid() = id);

CREATE POLICY "Superadmin full access to profiles"
    ON global_profiles FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- user_product_entitlements: Cada usuario ve sus propios entitlements; superadmin gestiona todos
CREATE POLICY "Users can read own entitlements"
    ON user_product_entitlements FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Superadmin full access to entitlements"
    ON user_product_entitlements FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- 9. Tabla de Auditoría Inmutable para SuperAdmin
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    actor_user_id UUID REFERENCES global_users(id) ON DELETE SET NULL,
    actor_email VARCHAR(255),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failure')),
    metadata JSONB DEFAULT '{}'::jsonb NOT NULL,
    before_data JSONB,
    after_data JSONB,
    ip_address VARCHAR(100),
    user_agent TEXT,
    error_message TEXT
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Solo administradores pueden leer el registro de auditoría.
DROP POLICY IF EXISTS "Superadmin read-only access to audit_logs" ON audit_logs;
CREATE POLICY "Superadmin read-only access to audit_logs"
    ON audit_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Inserción controlada para usuarios autenticados: solo para su propio actor_user_id
DROP POLICY IF EXISTS "Authenticated users insert own audit logs" ON audit_logs;
CREATE POLICY "Authenticated users insert own audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (
        actor_user_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- No se permite UPDATE ni DELETE a ningún rol
-- (Ninguna política creada para UPDATE o DELETE = DENY ALL)

-- Función interna segura para registrar eventos de auditoría (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION log_audit_event(
    p_action VARCHAR,
    p_resource_type VARCHAR,
    p_resource_id VARCHAR,
    p_status VARCHAR DEFAULT 'success',
    p_metadata JSONB DEFAULT '{}'::jsonb,
    p_before_data JSONB DEFAULT NULL,
    p_after_data JSONB DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL,
    p_ip_address VARCHAR DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actor_id UUID;
    v_actor_email VARCHAR;
    v_log_id UUID;
BEGIN
    v_actor_id := auth.uid();

    IF v_actor_id IS NOT NULL THEN
        SELECT email INTO v_actor_email FROM global_users WHERE id = v_actor_id;
    ELSE
        v_actor_email := 'system@moderno.internal';
    END IF;

    INSERT INTO audit_logs (
        actor_user_id,
        actor_email,
        action,
        resource_type,
        resource_id,
        status,
        metadata,
        before_data,
        after_data,
        ip_address,
        user_agent,
        error_message
    ) VALUES (
        v_actor_id,
        v_actor_email,
        p_action,
        p_resource_type,
        p_resource_id,
        p_status,
        COALESCE(p_metadata, '{}'::jsonb),
        p_before_data,
        p_after_data,
        p_ip_address,
        p_user_agent,
        p_error_message
    ) RETURNING id INTO v_log_id;

    RETURN v_log_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION log_audit_event FROM PUBLIC;
GRANT EXECUTE ON FUNCTION log_audit_event TO authenticated, service_role;

-- Trigger automático para registrar cambios en global_users
CREATE OR REPLACE FUNCTION trigger_audit_global_users()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        IF (OLD.role <> NEW.role OR OLD.status <> NEW.status) THEN
            PERFORM log_audit_event(
                CASE 
                    WHEN OLD.role <> NEW.role THEN 'user.role_changed'
                    WHEN OLD.status <> NEW.status THEN 'user.status_changed'
                    ELSE 'user.updated'
                END,
                'user',
                NEW.id::text,
                'success',
                jsonb_build_object(
                    'email', NEW.email,
                    'old_role', OLD.role,
                    'new_role', NEW.role,
                    'old_status', OLD.status,
                    'new_status', NEW.status
                ),
                to_jsonb(OLD),
                to_jsonb(NEW)
            );
        END IF;
    ELSIF (TG_OP = 'DELETE') THEN
        PERFORM log_audit_event(
            'user.deleted',
            'user',
            OLD.id::text,
            'success',
            jsonb_build_object('email', OLD.email),
            to_jsonb(OLD),
            NULL
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_audit_global_users ON global_users;
CREATE TRIGGER trg_audit_global_users
    AFTER UPDATE OR DELETE ON global_users
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_global_users();

-- Trigger automático para registrar cambios en user_product_entitlements
CREATE OR REPLACE FUNCTION trigger_audit_user_entitlements()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        PERFORM log_audit_event(
            'entitlement.assigned',
            'entitlement',
            NEW.product_id,
            'success',
            jsonb_build_object(
                'target_user_id', NEW.user_id,
                'product_id', NEW.product_id,
                'tier', NEW.tier,
                'status', NEW.status,
                'grant_notes', NEW.grant_notes
            ),
            NULL,
            to_jsonb(NEW)
        );
    ELSIF (TG_OP = 'UPDATE') THEN
        IF (OLD.tier <> NEW.tier OR OLD.status <> NEW.status) THEN
            PERFORM log_audit_event(
                CASE 
                    WHEN OLD.tier <> NEW.tier THEN 'entitlement.tier_changed'
                    WHEN OLD.status <> NEW.status THEN 'entitlement.status_changed'
                    ELSE 'entitlement.updated'
                END,
                'entitlement',
                NEW.product_id,
                'success',
                jsonb_build_object(
                    'target_user_id', NEW.user_id,
                    'product_id', NEW.product_id,
                    'old_tier', OLD.tier,
                    'new_tier', NEW.tier,
                    'old_status', OLD.status,
                    'new_status', NEW.status
                ),
                to_jsonb(OLD),
                to_jsonb(NEW)
            );
        END IF;
    ELSIF (TG_OP = 'DELETE') THEN
        PERFORM log_audit_event(
            'entitlement.revoked',
            'entitlement',
            OLD.product_id,
            'success',
            jsonb_build_object(
                'target_user_id', OLD.user_id,
                'product_id', OLD.product_id,
                'tier', OLD.tier
            ),
            to_jsonb(OLD),
            NULL
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS trg_audit_user_entitlements ON user_product_entitlements;
CREATE TRIGGER trg_audit_user_entitlements
    AFTER INSERT OR UPDATE OR DELETE ON user_product_entitlements
    FOR EACH ROW EXECUTE FUNCTION trigger_audit_user_entitlements();

-- 10. Gestión de Licencias de Software (AI Cleaner Pro, etc.)
CREATE TABLE IF NOT EXISTS software_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key VARCHAR(100) UNIQUE NOT NULL,
    product_id VARCHAR(50) NOT NULL REFERENCES ecosystem_products(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL DEFAULT 'pro',
    max_activations INT DEFAULT 3,
    current_activations INT DEFAULT 0,
    assigned_user_id UUID REFERENCES global_users(id) ON DELETE SET NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'revoked', 'expired'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE software_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read assigned licenses"
    ON software_licenses FOR SELECT
    USING (auth.uid() = assigned_user_id);

CREATE POLICY "Superadmin full access to licenses"
    ON software_licenses FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM global_users 
            WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
        )
    );

-- Función segura para activar y reclamar una clave de licencia con auditoría atómica
CREATE OR REPLACE FUNCTION activate_license_key(p_license_key VARCHAR)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID;
    v_user_email VARCHAR;
    v_license RECORD;
    v_cleaned_key VARCHAR;
BEGIN
    v_user_id := auth.uid();
    v_cleaned_key := UPPER(TRIM(p_license_key));

    IF v_user_id IS NULL THEN
        -- Registrar intento de activación no autenticado
        INSERT INTO audit_logs (
            action, resource_type, resource_id, status, error_message, metadata
        ) VALUES (
            'license.activation_rejected', 'license', v_cleaned_key, 'failure',
            'Debes iniciar sesión para vincular tu licencia.',
            jsonb_build_object('reason', 'unauthenticated')
        );
        RETURN jsonb_build_object('success', FALSE, 'error', 'Debes iniciar sesión para vincular tu licencia.');
    END IF;

    SELECT email INTO v_user_email FROM global_users WHERE id = v_user_id;

    SELECT * INTO v_license FROM software_licenses 
    WHERE license_key = v_cleaned_key;

    -- Caso: Licencia no existe o no está activa
    IF v_license.id IS NULL OR v_license.status <> 'active' THEN
        INSERT INTO audit_logs (
            actor_user_id, actor_email, action, resource_type, resource_id, status, error_message, metadata
        ) VALUES (
            v_user_id, v_user_email, 'license.activation_rejected', 'license', v_cleaned_key, 'failure',
            'La clave ingresada no existe o ha sido revocada.',
            jsonb_build_object('reason', 'invalid_or_revoked_key')
        );
        RETURN jsonb_build_object('success', FALSE, 'error', 'La clave ingresada no existe o ha sido revocada.');
    END IF;

    -- Caso: Licencia ya asignada a otra cuenta
    IF v_license.assigned_user_id IS NOT NULL AND v_license.assigned_user_id <> v_user_id THEN
        INSERT INTO audit_logs (
            actor_user_id, actor_email, action, resource_type, resource_id, status, error_message, metadata
        ) VALUES (
            v_user_id, v_user_email, 'license.activation_rejected', 'license', v_cleaned_key, 'failure',
            'Esta clave ya ha sido reclamada por otra cuenta.',
            jsonb_build_object(
                'reason', 'already_claimed_by_other',
                'assigned_user_id', v_license.assigned_user_id
            )
        );
        RETURN jsonb_build_object('success', FALSE, 'error', 'Esta clave ya ha sido reclamada por otra cuenta.');
    END IF;

    -- Asignar licencia al usuario
    UPDATE software_licenses 
    SET assigned_user_id = v_user_id, 
        current_activations = current_activations + 1,
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = v_license.id;

    -- Asignar o actualizar entitlement del usuario
    INSERT INTO user_product_entitlements (user_id, product_id, tier, status, grant_notes, updated_at)
    VALUES (v_user_id, v_license.product_id, v_license.tier, 'active', 'Licencia activada: ' || v_license.license_key, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, product_id) DO UPDATE SET
        tier = EXCLUDED.tier,
        status = 'active',
        grant_notes = EXCLUDED.grant_notes,
        updated_at = CURRENT_TIMESTAMP;

    -- Registrar éxito en audit_logs
    INSERT INTO audit_logs (
        actor_user_id, actor_email, action, resource_type, resource_id, status, metadata, after_data
    ) VALUES (
        v_user_id, v_user_email, 'license.activated', 'license', v_cleaned_key, 'success',
        jsonb_build_object(
            'product_id', v_license.product_id,
            'tier', v_license.tier,
            'current_activations', v_license.current_activations + 1
        ),
        jsonb_build_object(
            'product_id', v_license.product_id,
            'tier', v_license.tier,
            'assigned_user_id', v_user_id
        )
    );

    RETURN jsonb_build_object(
        'success', TRUE, 
        'product_id', v_license.product_id, 
        'tier', v_license.tier,
        'message', 'Licencia validada y vinculada exitosamente a tu cuenta.'
    );
END;
$$;

GRANT EXECUTE ON FUNCTION activate_license_key(VARCHAR) TO authenticated;



