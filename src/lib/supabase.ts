import { createClient } from "@supabase/supabase-js";

// ==============================================================================
// CLIENTE PÚBLICO DE SUPABASE PARA BROWSER (MODERNO ID)
// ==============================================================================
// Instancia Central: https://rcskjdksimcfkdjzxara.supabase.co
// Unifica: Moderno Tech (Hub), Moderno Access, Moderno Cloud, Moderno Play, Moderno One, etc.
// ==============================================================================

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rcskjdksimcfkdjzxara.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dryrun";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
