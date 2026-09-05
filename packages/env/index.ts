import { z } from "zod";

export const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test", "staging"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("https://moderno.com.ar"),
  SUPABASE_URL: z.string().url().default("https://rcskjdksimcfkdjzxara.supabase.co"),
  SUPABASE_ANON_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GOOGLE_AI_API_KEY: z.string().optional(),
  VAPI_API_KEY: z.string().optional()
});

export type Env = z.infer<typeof EnvSchema>;

export function validateEnv(envObj: Record<string, unknown> = process.env): Env {
  // En Next.js o entornos estáticos, process.env puede cargarse asíncronamente
  const result = EnvSchema.safeParse(envObj);
  if (!result.success) {
    console.error("⚠️ [Env Validation Error] Variables de entorno inválidas detectadas:");
    console.error(JSON.stringify(result.error.format(), null, 2));
    // Retornamos fallback por defecto en modo simulación para evitar que rompa el build estático
    return EnvSchema.parse({});
  }
  return result.data;
}

export const ENV = validateEnv();
