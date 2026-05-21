"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveProducts, getRecommendedProducts, getBillingSummary, getUsageSummary } from "@moderno/dashboard-helpers";
import { GlobalUser } from "@moderno/types";

type TabType = "inicio" | "productos" | "consumo" | "facturacion" | "recomendaciones";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<GlobalUser | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("inicio");

  // Filter state for products tab
  const [prodCategoryFilter, setProdCategoryFilter] = useState<string>("all");

  useEffect(() => {
    // Si no hay sesión, simulamos un inicio de sesión por defecto para el demo del dashboard maestro
    const localUser = localStorage.getItem("moderno_user");
    if (!localUser) {
      const defaultUser = {
        id: "usr_1",
        email: "demo@moderno.com.ar",
        name: "Jose Luis",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        createdAt: "2026-05-17"
      };
      localStorage.setItem("moderno_user", JSON.stringify(defaultUser));
      setUser(defaultUser);
    } else {
      setUser(JSON.parse(localUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f8fafc] flex justify-center items-center font-sans">
        Cargando Dashboard Maestro...
      </div>
    );
  }

  // Get data using the shared dashboard helpers
  const products = getActiveProducts(user.id);
  const activeProducts = products.filter(p => p.isSubscribed);
  const billingSummary = getBillingSummary(user.id);
  const usageSummary = getUsageSummary(user.id);
  const recommendations = getRecommendedProducts(user.id);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "saas", name: "Software SaaS" },
    { id: "ai", name: "Inteligencia Artificial" },
    { id: "dev", name: "Developer Tools" },
    { id: "edu", name: "Educación" },
    { id: "ecom", name: "E-Commerce" }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans flex overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(0,210,255,0.05)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[rgba(13,13,13,0.7)] backdrop-blur-[20px] border-r border-[rgba(255,255,255,0.06)] p-6 flex flex-col justify-between hidden md:flex z-10">
        <div>
          {/* Logo */}
          <div className="mb-10 px-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8e8e93] font-bold">Suite de Negocios</span>
            <h1 className="text-xl font-extrabold tracking-tight mt-1 text-[#ffffff]">
              MODERNO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#00d2ff]">STYLE</span>
            </h1>
            <p className="text-[9px] text-[#2563eb] font-semibold tracking-wider uppercase mt-1">Master Dashboard</p>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("inicio")}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "inicio"
                  ? "bg-gradient-to-r from-[#2563eb]/20 to-[#2563eb]/5 border border-[#2563eb]/30 text-white shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              📊 Inicio
            </button>
            <button
              onClick={() => setActiveTab("productos")}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "productos"
                  ? "bg-gradient-to-r from-[#2563eb]/20 to-[#2563eb]/5 border border-[#2563eb]/30 text-white shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              🚀 Mis Productos
            </button>
            <button
              onClick={() => setActiveTab("consumo")}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "consumo"
                  ? "bg-gradient-to-r from-[#2563eb]/20 to-[#2563eb]/5 border border-[#2563eb]/30 text-white shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              📉 Consumos
            </button>
            <button
              onClick={() => setActiveTab("facturacion")}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "facturacion"
                  ? "bg-gradient-to-r from-[#2563eb]/20 to-[#2563eb]/5 border border-[#2563eb]/30 text-white shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              💳 Facturación
            </button>
            <button
              onClick={() => setActiveTab("recomendaciones")}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeTab === "recomendaciones"
                  ? "bg-gradient-to-r from-[#2563eb]/20 to-[#2563eb]/5 border border-[#2563eb]/30 text-white shadow-[0_4px_20px_rgba(37,99,235,0.1)]"
                  : "text-[#8e8e93] hover:text-white hover:bg-[rgba(255,255,255,0.03)] border border-transparent"
              }`}
            >
              💡 Recomendaciones
            </button>
          </nav>
        </div>

        {/* User Footer */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-6 flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#2563eb] flex items-center justify-center font-bold text-xs">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate text-white">{user.name}</p>
            <p className="text-[10px] text-[#8e8e93] truncate">{user.email}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 z-10">
        
        {/* Header bar */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[rgba(255,255,255,0.06)] pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs text-[#8e8e93] font-medium">Workspace Corporativo</span>
            <h2 className="text-2xl font-bold tracking-tight text-white mt-0.5">Control General</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 bg-[#22c55e]/15 border border-[#22c55e]/25 text-[#22c55e] rounded-full font-semibold">
              ✅ Suscripción Activa
            </span>
            <button
              onClick={() => router.push("http://localhost:3001")}
              className="text-xs px-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] rounded-xl font-bold transition-all"
            >
              Ver Perfil ID
            </button>
          </div>
        </header>

        {/* Tab: INICIO */}
        {activeTab === "inicio" && (
          <div className="space-y-8 animate-fade-in">
            {/* Greeting and Summary banner */}
            <div className="bg-gradient-to-r from-[rgba(37,99,235,0.1)] to-[rgba(0,210,255,0.02)] border border-[#2563eb]/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white">¡Bienvenido de vuelta, {user.name}!</h3>
              <p className="text-sm text-[#8e8e93] mt-2 max-w-xl">
                Tienes <strong>{activeProducts.length} módulos activos</strong> en tu licencia global. Tu consumo de IA y cuotas de hosting están estables y operativas.
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e8e93]">Facturación Estimada</span>
                <div className="text-2xl font-extrabold text-white mt-1">USD ${billingSummary.totalCost.toFixed(2)} / mes</div>
                <p className="text-[10px] text-[#8e8e93] mt-2">Agregada de tus {activeProducts.length} productos activos.</p>
              </div>
              <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e8e93]">Créditos de Render AI</span>
                <div className="text-2xl font-extrabold text-white mt-1">450 / 1000</div>
                <p className="text-[10px] text-[#8e8e93] mt-2">Usado en Cinema Studio y asistentes.</p>
              </div>
              <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8e8e93]">Soporte Respondido</span>
                <div className="text-2xl font-extrabold text-white mt-1">1,450 / 5,000</div>
                <p className="text-[10px] text-[#8e8e93] mt-2">Consultas respondidas con IA en Soporte ML.</p>
              </div>
            </div>

            {/* Short cuts Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Accesos Rápidos Directos</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {activeProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-[rgba(17,17,17,0.3)] border border-[rgba(255,255,255,0.04)] p-4 rounded-xl flex items-center justify-between hover:border-[#2563eb]/30 transition-all"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-white">{product.name}</h5>
                      <span className="text-[9px] text-[#8e8e93]">{product.subdomain}</span>
                    </div>
                    <button
                      onClick={() => alert(`🔗 Redireccionando de forma segura a https://${product.subdomain} con inicio de sesión único SSO centralizado...`)}
                      className="px-2.5 py-1.5 bg-[#2563eb]/10 hover:bg-[#2563eb] border border-[#2563eb]/20 text-[#00d2ff] hover:text-white text-[10px] font-bold rounded-lg transition-all"
                    >
                      Abrir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: PRODUCTOS */}
        {activeTab === "productos" && (
          <div className="space-y-6 animate-fade-in">
            {/* Category filter buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setProdCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                    prodCategoryFilter === cat.id
                      ? "bg-[#2563eb] border-[#2563eb] text-white"
                      : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-[#8e8e93] hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Products cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products
                .filter(p => prodCategoryFilter === "all" || p.category === prodCategoryFilter)
                .map(product => {
                  return (
                    <div
                      key={product.id}
                      className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-5 rounded-2xl flex flex-col justify-between hover:border-[#2563eb]/20 transition-all"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[8px] uppercase tracking-widest bg-[rgba(255,255,255,0.03)] px-2 py-0.5 rounded text-[#8e8e93] font-bold">
                            {product.category}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                            product.isSubscribed
                              ? 'bg-green-500/10 border border-green-500/25 text-green-400'
                              : 'bg-neutral-800 text-neutral-500 border border-transparent'
                          }`}>
                            {product.isSubscribed ? 'Activo' : 'Disponible'}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{product.name}</h4>
                        <p className="text-[11px] text-[#8e8e93] mt-2 leading-relaxed line-clamp-3">{product.description}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)] flex justify-between items-center">
                        <span className="text-[9px] font-semibold text-[#8e8e93]">
                          {product.isSubscribed ? "✓ Plan Activo" : "Sin activar"}
                        </span>
                        
                        {product.isSubscribed ? (
                          <button
                            onClick={() => alert(`Redireccionando a https://${product.subdomain} con autenticación federada...`)}
                            className="px-3 py-1.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-[10px] font-bold rounded-lg text-white hover:opacity-95 active:scale-[0.98] transition-all"
                          >
                            Entrar →
                          </button>
                        ) : (
                          <button
                            onClick={() => alert(`Flujo comercial simulado: Redirigiendo a contratación centralizada de billing para activar ${product.name}...`)}
                            className="px-3 py-1.5 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] text-[10px] font-bold rounded-lg text-white hover:bg-[rgba(255,255,255,0.05)] transition-all"
                          >
                            Activar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Tab: CONSUMO */}
        {activeTab === "consumo" && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl max-w-2xl">
              <h3 className="text-base font-bold text-white mb-6">Métricas Agregadas de Consumo</h3>
              <div className="space-y-6">
                {usageSummary.map((metric, idx) => {
                  const percentage = Math.min(100, Math.floor((metric.used / metric.limit) * 100));
                  return (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-white">{metric.metricName}</span>
                        <span className="text-[#8e8e93]">
                          {metric.used} / {metric.limit} {metric.unit} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-[#0d0d0d] rounded-full overflow-hidden border border-[rgba(255,255,255,0.04)]">
                        <div
                          className="h-full bg-gradient-to-r from-[#2563eb] to-[#00d2ff] rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab: FACTURACION */}
        {activeTab === "facturacion" && (
          <div className="space-y-8 animate-fade-in">
            {/* Hardening billing warning banner */}
            <div className="bg-amber-950/20 border border-amber-900/30 text-amber-500 p-4 rounded-xl text-xs max-w-2xl">
              ⚠️ <strong>ATENCIÓN:</strong> Todo el módulo de facturación y cuotas comerciales que se muestra a continuación es una <strong>simulación estática de desarrollo (DEMO comercial)</strong>. No existen cobros, cargos reales ni pasarelas conectadas en esta fase.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
              {/* Billing list */}
              <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl md:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white mb-4">Planes Contratados</h3>
                <div className="divide-y divide-[rgba(255,255,255,0.04)]">
                  {billingSummary.activePlans.map((plan, idx) => (
                    <div key={idx} className="py-4 flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-bold text-white">{plan.productName}</h4>
                        <span className="text-[#8e8e93] text-[10px]">{plan.planName}</span>
                      </div>
                      <span className="font-semibold text-white">USD ${plan.monthlyCost.toFixed(2)} / mes</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex justify-between items-center">
                  <span className="text-sm font-bold text-white">Total Estimado</span>
                  <span className="text-lg font-extrabold text-[#2563eb]">USD ${billingSummary.totalCost.toFixed(2)} / mes</span>
                </div>
              </div>

              {/* Fake invoices */}
              <div className="bg-[rgba(17,17,17,0.4)] border border-[rgba(255,255,255,0.05)] p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white mb-4">Historial de Recibos</h3>
                <div className="space-y-4 text-[11px]">
                  <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl flex justify-between">
                    <div>
                      <p className="font-bold text-white">INV-2026-001</p>
                      <p className="text-[#8e8e93] text-[9px]">01 May 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">USD $78.00</p>
                      <span className="text-[9px] text-green-400">Pagado</span>
                    </div>
                  </div>
                  <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl flex justify-between">
                    <div>
                      <p className="font-bold text-white">INV-2026-002</p>
                      <p className="text-[#8e8e93] text-[9px]">01 Abr 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">USD $78.00</p>
                      <span className="text-[9px] text-green-400">Pagado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: RECOMENDACIONES */}
        {activeTab === "recomendaciones" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h3 className="text-base font-bold text-white mb-4">Sugerencias del Copiloto Comercial</h3>
            <div className="space-y-4">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-[rgba(37,99,235,0.08)] to-transparent border border-[#2563eb]/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold bg-[#2563eb]/15 text-[#00d2ff] border border-[#2563eb]/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Módulo Recomendado: {rec.product.name}
                    </span>
                    <p className="text-xs text-[#8e8e93] mt-2 leading-relaxed">{rec.reason}</p>
                  </div>
                  <button
                    onClick={() => alert(`Inicializando activación del módulo ${rec.product.name} con licenciamiento simulado...`)}
                    className="px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-[11px] font-bold rounded-xl text-white transition-all whitespace-nowrap"
                  >
                    Activar Módulo
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
