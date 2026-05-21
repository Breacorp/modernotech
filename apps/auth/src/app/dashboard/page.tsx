"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ECOSISTEMA_PRODUCTOS } from "@moderno/config/products";
import { MOCK_SUBSCRIPTIONS, generateSimulatedDemoToken } from "@moderno/auth-helpers";
import { GlobalUser, UserSubscription } from "@moderno/types";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<GlobalUser | null>(null);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [simulatedDemoToken, setSimulatedDemoToken] = useState<string>("");

  useEffect(() => {
    const localUser = localStorage.getItem("moderno_user");
    if (!localUser) {
      router.push("/");
      return;
    }
    const parsedUser = JSON.parse(localUser);
    setUser(parsedUser);

    // Obtener las suscripciones asociadas al usuario (usr_1 por defecto en mock, o una base por defecto si es nuevo)
    const subs = MOCK_SUBSCRIPTIONS[parsedUser.id] || ECOSISTEMA_PRODUCTOS.map(p => ({
      productId: p.id,
      isActive: p.isActiveByDefault,
      role: "user" as const
    }));
    setSubscriptions(subs);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("moderno_user");
    router.push("/");
  };

  const handleSimulateSSO = (product: any) => {
    if (!user) return;
    const isProductActive = subscriptions.find(s => s.productId === product.id)?.isActive;
    
    if (!isProductActive) {
      alert(`⚠️ Debes activar una suscripción para ${product.name} en el billing central antes de poder ingresar.`);
      return;
    }

    const token = generateSimulatedDemoToken(user.id, product.id);
    setSelectedProduct(product);
    setSimulatedDemoToken(token);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f8fafc] flex justify-center items-center">
        Cargando portal de identidad...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8fafc] p-8 relative overflow-hidden font-sans">
      <div className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-[rgba(17,17,17,0.6)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.06)] p-6 rounded-2xl mb-10">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#2563eb] border border-[#2563eb]/30 flex items-center justify-center font-bold text-white text-lg">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-xs text-[#8e8e93]">{user.email}</p>
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

        {/* Informative Alert for Architect Verification */}
        <div className="bg-[rgba(37,99,235,0.05)] border border-[rgba(37,99,235,0.15)] rounded-2xl p-6 mb-8 text-sm leading-relaxed">
          <h3 className="font-bold text-[#2563eb] mb-1">💡 Demo de Federación e Identidad Central (OIDC)</h3>
          <p className="text-[#8e8e93] text-xs">
            Esta pantalla representa el <strong>Moderno ID Launchpad</strong>. Todas las aplicaciones listadas abajo son 100% independientes y cuentan con su propia base de datos (incluso tu app existente <em>Moderno Access</em>). Al hacer clic en &quot;Entrar&quot;, simularemos el flujo OAuth/OIDC donde el IdP central genera un token firmado de autenticación que es verificado localmente por cada aplicación.
          </p>
        </div>

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
                      <button
                        onClick={() => handleSimulateSSO(product)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          isSubscribed
                            ? "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white hover:opacity-95 active:scale-[0.97]"
                            : "bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-neutral-500 cursor-not-allowed"
                        }`}
                      >
                        {isSubscribed ? "Entrar →" : "Bloqueado"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar Panel for simulated SSO token & Developer Insights */}
          <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-3xl h-fit">
            <h3 className="text-base font-bold text-white mb-4">SSO Debugger</h3>

            {selectedProduct ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8e8e93]">Aplicación Destino</span>
                  <div className="text-sm font-bold text-[#2563eb] mt-0.5">{selectedProduct.name}</div>
                </div>

                <div className="bg-amber-950/20 border border-amber-900/40 text-amber-500 rounded-xl p-3 text-[10px] font-medium leading-relaxed">
                  ⚠️ <strong>ATENCIÓN:</strong> Este token es una simulación estática (PREVIEW UX). No utilizar en producción.
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8e8e93]">Simulated Token (Non-Production UX Preview)</span>
                  <div className="bg-[#050505] p-3 rounded-lg border border-[rgba(255,255,255,0.06)] text-[9px] font-mono break-all text-amber-400/90 mt-1 select-all cursor-pointer">
                    {simulatedDemoToken}
                  </div>
                </div>

                <div className="text-xs text-[#8e8e93] leading-relaxed border-t border-[rgba(255,255,255,0.05)] pt-4 space-y-2">
                  <h4 className="font-bold text-white text-[11px]">🔐 Flujo OIDC Técnico Interno:</h4>
                  <p>
                    1. <strong>Firma RSA:</strong> El JWT de arriba es emitido por <code>id.moderno.com.ar</code> y firmado con la llave privada del IdP.
                  </p>
                  <p>
                    2. <strong>Redirección:</strong> Se redirige al usuario a <code>{selectedProduct.subdomain}?token=...</code>.
                  </p>
                  <p>
                    3. <strong>Validación Local:</strong> El backend local de <strong>{selectedProduct.name}</strong> descarga la llave pública, valida la firma, y si es correcta, inicia la sesión en su propia base de datos (con su propio Supabase y sus propios privilegios de forma 100% aislada).
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#8e8e93] py-12 text-center">
                Haz clic en el botón de &quot;Entrar&quot; de alguna aplicación activa (ej. Moderno Access) para inspeccionar la federación SSO.
              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
