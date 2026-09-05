"use client";

import React, { useState } from "react";
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  GlassPanel,
  Modal,
  Sidebar,
  Navbar,
  Tabs,
  Input,
  Select,
  Badge,
  Tooltip,
  Dialog,
  Dropdown,
  Table,
  PricingCard,
  ProductCard,
  DashboardShell,
  MetricCard,
  AIUsageCard,
  BillingCard,
  ProductLauncher
} from "@moderno/ui";
import { PRODUCT_THEMES } from "@moderno/theme";

function StyleGuideContent() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("componentes");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  
  // Form states
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("op1");

  const brandOptions = [
    { value: "default", label: "Moderno Standard (Azul Eléctrico)" },
    { value: "access", label: "Moderno Access (Seguridad Enterprise)" },
    { value: "cinema", label: "Cinema Studio AI (Oro & Negro)" },
    { value: "nova", label: "Nova AI (Holographic Cyan)" },
    { value: "gamestudio", label: "Game Studio (Cyberpunk Red)" }
  ];

  const sidebarLogo = (
    <div>
      <span className="text-[9px] uppercase tracking-[0.35em] text-[var(--text-muted)] font-bold">Manual de Diseño</span>
      <h1 className="text-base font-extrabold tracking-tight mt-1 text-white">
        MODERNO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] font-black">UI</span>
      </h1>
    </div>
  );

  const sidebarItems = [
    { id: "componentes", label: "Inventario Componentes", icon: "📦" },
    { id: "branding", label: "Theme Engine & Colores", icon: "🎨" },
    { id: "ejemplos", label: "Vistas y Layouts", icon: "💻" }
  ];

  const tableHeaders = ["Nombre Módulo", "Subdominio", "Consumo Agregado", "Estado Licencia"];
  const tableRows = [
    [
      <span className="font-bold text-white">Moderno Access</span>,
      <span className="font-mono text-[10px] text-[var(--text-muted)]">access.moderno.com.ar</span>,
      <span>48 usuarios activos</span>,
      <Badge variant="success">Activo</Badge>
    ],
    [
      <span className="font-bold text-white">Cinema Studio AI</span>,
      <span className="font-mono text-[10px] text-[var(--text-muted)]">cinema.moderno.com.ar</span>,
      <span>450 créditos usados</span>,
      <Badge variant="neutral">Disponible</Badge>
    ],
    [
      <span className="font-bold text-white">Soporte ML</span>,
      <span className="font-mono text-[10px] text-[var(--text-muted)]">support.moderno.com.ar</span>,
      <span>1,450 preguntas</span>,
      <Badge variant="warning">Por Expirar</Badge>
    ]
  ];

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          logo={sidebarLogo}
          navItems={sidebarItems}
          activeId={activeTab}
          onSelect={(id) => setActiveTab(id)}
          footer={
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Tema de Marca Activo</span>
              <div className="text-xs font-bold text-[var(--primary)] truncate">{theme.name}</div>
            </div>
          }
        />
      }
    >
      <Navbar
        title="Moderno Design System & Brand Showroom"
        actions={
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)] font-medium">Branding Activo:</span>
            <select
              value={brandOptions.find(b => PRODUCT_THEMES[b.value]?.name === theme.name)?.value || "default"}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-[#111] border border-[var(--border)] text-xs text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-[var(--primary)] font-semibold"
            >
              {brandOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        }
      />

      {/* Tab: INVENTARIO DE COMPONENTES */}
      {activeTab === "componentes" && (
        <div className="space-y-10 animate-fade-in">
          
          <Dialog type="info">
            💡 <strong>Theme Engine Integrado:</strong> Selecciona un branding diferente en la esquina superior derecha (ej. <em>Cinema Studio</em> o <em>Nova AI</em>) y observa cómo todo el inventario de componentes y tarjetas se re-estiliza dinámicamente de forma armoniosa al instante.
          </Dialog>

          {/* Section: Buttons & Badges */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[var(--border)] pb-2">Botones & Estados</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="primary">Botón Primario</Button>
              <Button variant="secondary">Botón Secundario</Button>
              <Button variant="danger">Botón Peligro</Button>
              <Button variant="ghost">Botón Ghost</Button>
              <Tooltip text="Tooltip indicando una ayuda contextual de la suite">
                <span className="px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[var(--border)] rounded-lg text-xs font-semibold cursor-help">
                  Hover para Tooltip ℹ️
                </span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success">Suscrito / Activo</Badge>
              <Badge variant="neutral">Sin Contratar / Disponible</Badge>
              <Badge variant="warning">Próximamente / Beta</Badge>
              <Badge variant="danger">Expirado / Error</Badge>
            </div>
          </section>

          {/* Section: Formularios */}
          <section className="space-y-4 max-w-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[var(--border)] pb-2">Formularios & Inputs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nombre del Workspace"
                placeholder="Ej. Consorcio Las Condes"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Select
                label="Plan de Negocio"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                options={[
                  { value: "op1", label: "Starter Lite" },
                  { value: "op2", label: "Corporativo Pro" },
                  { value: "op3", label: "Enterprise Custom" }
                ]}
              />
            </div>
          </section>

          {/* Section: Modals & Dialogs */}
          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[var(--border)] pb-2">Modales e Interacciones</h3>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>Abrir Modal Estándar</Button>
              <Button variant="primary" onClick={() => setIsLauncherOpen(true)}>Probar Lanzador SSO (OIDC)</Button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Configuración de Seguridad">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                Este cuadro de diálogo hereda las curvaturas `--radius-lg` y el desenfoque de fondo glassmorphic oficial de Moderno Style & Tech.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                <Button variant="primary" onClick={() => { alert("Configuración guardada"); setIsModalOpen(false); }}>Guardar Cambios</Button>
              </div>
            </Modal>

            {isLauncherOpen && (
              <ProductLauncher
                productName="Cinema Studio AI"
                subdomain="cinema.moderno.com.ar"
                onClose={() => setIsLauncherOpen(false)}
              />
            )}
          </section>

          {/* Section: Pricing & Product Cards */}
          <section className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[var(--border)] pb-2">Tarjetas del Ecosistema</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                name="Cinema Studio AI"
                description="Suite inteligente para generación y retoque cinematográfico de imágenes y videos fotorrealistas con Inteligencia Artificial."
                subdomain="cinema.moderno.com.ar"
                status="disponible"
                onLaunch={() => alert("Simulando flujo de contratación centralizada")}
              />
              <ProductCard
                name="Moderno Access"
                description="Control de accesos inteligentes y reportes de seguridad en tiempo real para empresas y edificios residenciales."
                subdomain="access.moderno.com.ar"
                status="activo"
                onLaunch={() => alert("Lanzando app con federación de identidad SSO")}
              />
              <PricingCard
                planName="SaaS Corporate Pro"
                price="USD $59.00 / mes"
                features={["13 módulos incluidos", "Autenticación central SSO", "Límites extendidos de IA", "Soporte priority 24/7"]}
                ctaText="Contratar Licencia"
                onCtaClick={() => alert("Contratando plan corporativo")}
                isPopular={true}
              />
            </div>
          </section>

        </div>
      )}

      {/* Tab: THEME ENGINE & COLORES */}
      {activeTab === "branding" && (
        <div className="space-y-8 animate-fade-in">
          <GlassPanel className="max-w-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Inspección del Theme Engine</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
              El motor de estilos de Moderno funciona inyectando las siguientes variables CSS personalizadas directamente en el layout del viewport raíz. Todos los componentes de la biblioteca se enlazan dinámicamente a estos tokens.
            </p>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center p-3 bg-black/40 border border-[var(--border)] rounded-lg">
                <span className="text-[var(--text-muted)]">--primary (Color Principal)</span>
                <span className="font-bold" style={{ color: "var(--primary)" }}>{theme.colors.primary}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 border border-[var(--border)] rounded-lg">
                <span className="text-[var(--text-muted)]">--accent (Acento secundario)</span>
                <span className="font-bold" style={{ color: "var(--accent)" }}>{theme.colors.accent}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 border border-[var(--border)] rounded-lg">
                <span className="text-[var(--text-muted)]">--bg (Fondo de Pantalla)</span>
                <span className="font-bold text-white">{theme.colors.bg}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 border border-[var(--border)] rounded-lg">
                <span className="text-[var(--text-muted)]">--radius-lg (Curvatura de paneles)</span>
                <span className="font-bold text-white">{theme.radius.lg}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/40 border border-[var(--border)] rounded-lg">
                <span className="text-[var(--text-muted)]">--glass-blur (Desenfoque)</span>
                <span className="font-bold text-white">{theme.glass.blur}</span>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Tab: VISTAS Y LAYOUTS */}
      {activeTab === "ejemplos" && (
        <div className="space-y-8 animate-fade-in">
          
          <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[var(--border)] pb-2">Layout del Dashboard Maestro Resumido</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MetricCard title="Consumo Estimado Mensual" value="USD $78.00" description="Monto global consolidado de tus 3 apps activas." />
            <MetricCard title="Créditos IA Usados" value="450 / 1000 créditos" description="Consumido en Cinema Studio y Nova AI." />
            <MetricCard title="Usuarios Activos en Puertas" value="48 usuarios" description="Reportados localmente por Moderno Access." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Table headers={tableHeaders} rows={tableRows} />
            </div>
            <div>
              <AIUsageCard title="Generador de Video AI" used={8} limit={20} unit="videos" />
              <div className="mt-6">
                <BillingCard
                  activePlans={[
                    { productName: "Moderno Access", planName: "Plan Consorcio Pro", cost: 49.00 },
                    { productName: "Hosting Premium", planName: "Reseller SSD", cost: 29.00 }
                  ]}
                  totalCost={78.00}
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </DashboardShell>
  );
}

export default function StyleGuidePage() {
  return (
    <ThemeProvider>
      <StyleGuideContent />
    </ThemeProvider>
  );
}
