-- ============================================================================
-- ETAPA 4: Esquemas Modulares y Roles de Mínimo Privilegio (PostgreSQL / Supabase)
-- Objetivo:
--   Aislar lógicamente los productos oficiales dentro de la ÚNICA instancia
--   Supabase compartida, evitando colisiones de tablas (User, Plan, Payment,
--   Invoice, AuditLog) y evitando privilegios cruzados entre aplicaciones.
--
-- IMPORTANTE:
--   1. Reemplazar 'CAMBIAR_PASSWORD_SEGURO' en cada rol antes de ejecutar.
--   2. Este script NO mueve ni borra tablas existentes de `public`; solo
--      prepara los esquemas y roles destino para una migración gradual.
-- ============================================================================

CREATE SCHEMA IF NOT EXISTS identity;
CREATE SCHEMA IF NOT EXISTS access;
CREATE SCHEMA IF NOT EXISTS cloud;
CREATE SCHEMA IF NOT EXISTS play;
CREATE SCHEMA IF NOT EXISTS pay;
CREATE SCHEMA IF NOT EXISTS nova;
CREATE SCHEMA IF NOT EXISTS hosting;
CREATE SCHEMA IF NOT EXISTS factory;
CREATE SCHEMA IF NOT EXISTS builder;

DO $$
DECLARE
    mod text;
    role_name text;
    modules text[] := ARRAY[
        'identity', 'access', 'cloud', 'play', 'pay',
        'nova', 'hosting', 'factory', 'builder'
    ];
BEGIN
    FOREACH mod IN ARRAY modules LOOP
        role_name := mod || '_app';

        IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = role_name) THEN
            EXECUTE format(
                'CREATE ROLE %I WITH LOGIN PASSWORD %L NOSUPERUSER NOCREATEDB NOCREATEROLE NOINHERIT',
                role_name,
                'CAMBIAR_PASSWORD_SEGURO_' || mod
            );
        END IF;

        -- Aislamiento estricto: revocar acceso por defecto a public y otorgar solo su esquema
        EXECUTE format('REVOKE ALL ON SCHEMA public FROM %I', role_name);
        EXECUTE format('GRANT USAGE, CREATE ON SCHEMA %I TO %I', mod, role_name);
        EXECUTE format('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA %I TO %I', mod, role_name);
        EXECUTE format('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA %I TO %I', mod, role_name);
        EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT ALL ON TABLES TO %I', mod, role_name);
        EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT ALL ON SEQUENCES TO %I', mod, role_name);
        EXECUTE format('ALTER ROLE %I SET search_path TO %I', role_name, mod);
    END LOOP;
END $$;

