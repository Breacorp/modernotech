"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ECOSISTEMA_PRODUCTOS } from "@moderno/config/products";
import { AccountLinkingCard, supabaseAuthClient } from "@moderno/auth-helpers";
import { User } from "@supabase/supabase-js";
import { UserSubscription } from "@moderno/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRealSession() {
      try {
        const { data: sessionData, error: sessionError } = await supabaseAuthClient.auth.getSession();
        if (sessionError || !sessionData?.session) {
          router.push("/");
          return;
        }

        const currentUser = sessionData.session.user;
        setUser(currentUser);

        // Consultar entitlements reales de la base de datos Supabase
        const { data: entitlements, error: entError } = await supabaseAuthClient
          .from("user_product_entitlements")
          .select("product_id, tier, status")
          .eq("user_id", currentUser.id)
          .eq("status", "active");

        if (!entError && entitlements) {
          const activeSubs: UserSubscription[] = entitlements.map((e: any) => ({
            productId: e.product_id,
            isActive: e.status === "active",
            role: "user" as const,
          }));
          setSubscriptions(activeSubs);
        } else {
          setSubscriptions([]);
        }
      } catch (err) {
        console.error("Error cargando sesión o entitlements de Supabase:", err);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    }

    loadRealSession();
  }, [router]);

  const handleLogout = async () => {
    await supabaseAuthClient.auth.signOut();
    router.push("/");
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f8fafc] flex justify-center items-center font-mono text-sm">
        <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse mr-3" />
        Verificando sesión central en Supabase...
      </div>
    );
  }

  const userDisplayName = user.user_metadata?.name || user.email?.split("@")[0] || "Usuario";
  const userEmail = user.email || "";

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8fafc] p-8 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-[rgba(17,17,17,0.6)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.06)] p-6 rounded-2xl mb-10">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2563eb] border border-[#2563eb]/30 flex items-center justify-center font-bold text-white text-lg">
              {userDisplayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{userDisplayName}</h2>
              <p className="text-xs text-[#8e8e93]">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs px-3 py-1 bg-[rgba(37,99,235,0.15)] text-[#2563eb] border border-[#2563eb]/20 rounded-full font-medium">
              SSO Activo (Global)
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:bg-red-950/20 hover:border-red-900/30 hover:text-red-400 text-xs font-semibold rounded-xl transition-all"
            >
              Cerrar Sesión
            </button>
          </div>
        </header>



        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Central Products Grid */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-lg font-bold tracking-tight text-white">Ecosistema de Aplicaciones</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ECOSISTEMA_PRODUCTOS.map((product) => {
                const isSubscribed = subscriptions.find(s => s.productId === product.id)?.isActive;
                return (
                  <div
                    key={product.id}
                    className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-5 rounded-2xl flex flex-col justify-between transition-all hover:border-[rgba(37,99,235,0.2)]"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e8e93] bg-[rgba(255,255,255,0.03)] px-2 py-0.5 rounded">
                          {product.subdomain}
                        </span>
                        <span className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-neutral-600'}`} />
                      </div>
                      <h4 className="font-bold text-base text-white">{product.name}</h4>
                      <p className="text-xs text-[#8e8e93] mt-2 line-clamp-2">{product.description}</p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.04)] flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-[#8e8e93]">
                        {isSubscribed ? "🟢 Suscripción Activa" : "🔴 Inactivo"}
                      </span>
                      {isSubscribed ? (
                        <a
                          href={`https://${product.subdomain}.moderno.com.ar`}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white hover:opacity-95 active:scale-[0.97]"
                        >
                          Entrar →
                        </a>
                      ) : (
                        <button
                          disabled
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-neutral-500 cursor-not-allowed"
                        >
                          Bloqueado
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6 h-fit">
            <AccountLinkingCard project="tech" className="w-full" />
          </div>

        </div>

      </div>
    </main>
  );
}
