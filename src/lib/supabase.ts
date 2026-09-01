import { createClient } from "@supabase/supabase-js";

// ==============================================================================
// CLIENTE PÚBLICO DE SUPABASE PARA BROWSER (MODERNO ID)
// ==============================================================================
// REGLA CRÍTICA DE SEGURIDAD:
// - Solo expone NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY.
// - NUNCA expone SUPABASE_SERVICE_ROLE_KEY en el cliente.
// - Todas las consultas están sujetas a políticas de Row-Level Security (RLS).

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rcskjdksimcfkdjzxara.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
