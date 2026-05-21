"use client";

import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  Navbar,
  Tabs,
  Badge,
  Table,
  MetricCard,
  DashboardShell,
  Sidebar
} from "@moderno/ui";
import { REGISTRO_PRODUCTOS, ExtendedProductMetadata } from "@moderno/product-registry";
import { flags, FeatureFlags } from "@moderno/feature-flags";
import { Logger } from "@moderno/logger";
import { monitor } from "@moderno/monitoring";

const adminLogger = new Logger("Backoffice Admin");

function AdminContent() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [localFlags, setLocalFlags] = useState<FeatureFlags>(flags.getAllFlags());
  
  // Simulated Log stream state
  const [logStream, setLogStream] = useState<{ id: string; time: string; level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'; msg: string }[]>([
    { id: '1', time: '04:53:00', level: 'INFO', msg: 'System Core inicializado exitosamente en entorno [development]' },
    { id: '2', time: '04:53:05', level: 'DEBUG', msg: 'Zod Env Validation Schema cargado limpiamente sin colisiones.' },
    { id: '3', time: '04:53:12', level: 'INFO', msg: 'SSO Federated Identity Provider listo en id.moderno.com.ar' },
    { id: '4', time: '04:53:20', level: 'WARN', msg: 'PostHog analytics token expira en 365 días.' }
  ]);

  const sidebarLogo = (
    <div>
      <span className="text-[9px] uppercase tracking-[0.3em] text-[#ef4444] font-bold">Admin Console</span>
      <h1 className="text-base font-extrabold tracking-tight mt-1 text-white">
        MODERNO <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef4444] to-[#f59e0b] font-black">ADMIN</span>
      </h1>
      <span className="text-[8px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded font-mono mt-2 inline-block">
        ENTORNO: DEV-STAGING
      </span>
    </div>
  );

  const sidebarItems = [
    { id: "overview", label: "Vista General", icon: "📊" },
    { id: "registry", label: "Registro de Apps", icon: "📦" },
    { id: "flags", label: "Feature Flags", icon: "🚩" },
    { id: "logs", label: "Logs & Observabilidad", icon: "🧾" }
  ];

  // Toggle dynamic feature flags
  const handleToggleFlag = (flagName: keyof FeatureFlags) => {
    const newValue = !localFlags[flagName];
    flags.setFlag(flagName, newValue);
    setLocalFlags(flags.getAllFlags());
    
    // Add real-time log entry
    const time = new Date().toTimeString().split(" ")[0];
    const newLog = {
      id: Date.now().toString(),
      time,
      level: 'DEBUG' as const,
      msg: `Feature flag '${flagName}' cambiada manualmente a ${newValue}`
    };
    setLogStream(prev => [newLog, ...prev]);

    // Trace in monitoring service
    monitor.captureEvent('Feature Flag Toggled', { flagName, newValue });
  };

  const handleGenerateErrorLog = () => {
    const time = new Date().toTimeString().split(" ")[0];
    const errorMsg = "Simulated API Gateway error: Token signature verification failed on endpoint /v1/auth/sso";
    
    const newLog = {
      id: Date.now().toString(),
      time,
      level: 'ERROR' as const,
      msg: errorMsg
    };
    setLogStream(prev => [newLog, ...prev]);
    
    adminLogger.error(errorMsg, { requestId: "req_err_8892", userId: "usr_demo_1" });
    monitor.captureError(new Error(errorMsg), { requestId: "req_err_8892" });
  };

  const handleGenerateTraceLog = () => {
    const time = new Date().toTimeString().split(" ")[0];
    const traceMsg = "OpenTelemetry Tracer start: /v1/billing/estimates duration calculation";
    
    const newLog = {
      id: Date.now().toString(),
      time,
      level: 'INFO' as const,
      msg: traceMsg
    };
    setLogStream(prev => [newLog, ...prev]);
    
    const trace = monitor.startTrace("/v1/billing/estimates");
    setTimeout(() => trace.end(), 120);
  };

  // Registry Table Data
  const registryHeaders = ["ID Módulo", "Nombre comercial", "Fase Entorno", "Pricing Tier", "Dependencias"];
  const registryRows = REGISTRO_PRODUCTOS.map(prod => [
    <span className="font-mono text-white text-[11px] font-bold">{prod.id}</span>,
    <div>
      <span className="font-bold text-white text-xs">{prod.name}</span>
      <p className="text-[9px] text-[var(--text-muted)] font-mono">{prod.subdomain}</p>
    </div>,
    <Badge variant={prod.environmentStatus === 'production' ? 'success' : prod.environmentStatus === 'beta' ? 'neutral' : 'warning'}>
      {prod.environmentStatus}
    </Badge>,
    <span className="font-semibold text-white capitalize text-[11px]">{prod.pricingTier}</span>,
    <span className="text-[10px] text-[var(--text-muted)] font-mono">
      {prod.dependencies && prod.dependencies.length > 0 ? prod.dependencies.join(", ") : "Ninguna"}
    </span>
  ]);

  return (
    <DashboardShell
      sidebar={
        <Sidebar
          logo={sidebarLogo}
          navItems={sidebarItems}
          activeId={activeTab}
          onSelect={(id) => setActiveTab(id)}
          footer={
            <div className="flex flex-col gap-2 text-[10px] text-[var(--text-muted)]">
              <p>🔐 CSP Policy: <strong>Strict-Deny</strong></p>
              <p>🍪 Secure Cookie: <strong>Strict (HTTPOnly)</strong></p>
            </div>
          }
        />
      }
    >
      <Navbar title="Ecosistema Moderno - Central Operations Console" />

      {/* Tab: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fade-in">
          {/* Health check flashing monitors */}
          <Card className="p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Estado General de Infraestructura</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-black/40 border border-green-500/20 rounded-xl flex items-center justify-between">
                <span className="text-[11px] text-white">Database Core</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow shadow-[0_0_10px_#22c55e]" />
              </div>
              <div className="p-4 bg-black/40 border border-green-500/20 rounded-xl flex items-center justify-between">
                <span className="text-[11px] text-white">Redis Cache</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow shadow-[0_0_10px_#22c55e]" />
              </div>
              <div className="p-4 bg-black/40 border border-green-500/20 rounded-xl flex items-center justify-between">
                <span className="text-[11px] text-white">Identity IdP</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow shadow-[0_0_10px_#22c55e]" />
              </div>
              <div className="p-4 bg-black/40 border border-green-500/20 rounded-xl flex items-center justify-between">
                <span className="text-[11px] text-white">Stripe Hooks</span>
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse-slow shadow-[0_0_10px_#22c55e]" />
              </div>
            </div>
          </Card>

          {/* System metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <MetricCard title="Total Usuarios Globales" value="12,450" description="+12% incremento esta semana" />
            <MetricCard title="Ingreso Mensual Estimado" value="USD $14,250" description="Suscripciones de suites comerciales" />
            <MetricCard title="Latencia API Promedio" value="42ms" description="Servidores Edge distribuidos Vercel" />
            <MetricCard title="Carga del Sistema" value="12%" description="CPU y memoria RAM balanceados" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Overview Table */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Resumen de Aplicaciones</h3>
              <Table headers={registryHeaders.slice(0, 3)} rows={registryRows.slice(0, 3).map(r => r.slice(0, 3))} />
            </div>
            {/* Feature Flags Snapshot */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Feature Flags Activas</h3>
              <div className="space-y-3 text-xs">
                {Object.entries(localFlags).map(([name, value]) => (
                  <div key={name} className="flex justify-between items-center py-2 border-b border-[var(--border)]">
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">{name}</span>
                    <Badge variant={value ? 'success' : 'neutral'}>{value ? 'ON' : 'OFF'}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: APP REGISTRY */}
      {activeTab === "registry" && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Registro de Aplicaciones y Módulos</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">Metadatos de infraestructura leídos directamente del Product Registry centralizado.</p>
            </div>
          </div>
          <Table headers={registryHeaders} rows={registryRows} />
        </div>
      )}

      {/* Tab: FEATURE FLAGS */}
      {activeTab === "flags" && (
        <div className="space-y-6 animate-fade-in max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-white">Consola de Feature Flags</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">Controla en caliente el encendido/apagado de microfeatures y módulos en los entornos de desarrollo y staging.</p>
          </div>

          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-[var(--radius-md)] divide-y divide-[var(--border)] overflow-hidden">
            {Object.entries(localFlags).map(([name, value]) => (
              <div key={name} className="p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-mono font-bold text-sm text-white">{name}</h4>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1">
                    {name === 'enableVoiceAI' && 'Habilita agentes de conversación telefónica con inteligencia de voz Vapi.'}
                    {name === 'enableCinemaStudioBeta' && 'Habilita acceso a generación y procesamiento cinematográfico fotorrealista.'}
                    {name === 'enableOIDC' && 'Activa la federación de identidades OIDC/OAuth 2.0 real con SSO.'}
                    {name === 'enableBilling' && 'Activa pasarelas de pago de Stripe Billing.'}
                    {name === 'enableExperimentalModels' && 'Habilita modelos beta experimentales de lenguaje y video Imagen/Veo.'}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge variant={value ? 'success' : 'neutral'}>
                    {value ? 'Activo (ON)' : 'Inactivo (OFF)'}
                  </Badge>
                  <Button
                    variant={value ? 'ghost' : 'secondary'}
                    onClick={() => handleToggleFlag(name as keyof FeatureFlags)}
                    className="px-3.5 py-1.5 text-[10px]"
                  >
                    Alternar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: LOGS & OBSERVABILIDAD */}
      {activeTab === "logs" && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white">Consola de Logs en Tiempo Real</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">Depurador y trazador de peticiones del ecosistema agregando eventos de Sentry y OpenTelemetry.</p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleGenerateTraceLog} className="px-3 py-2 text-[10px]">
                ⏱️ Generar Traza
              </Button>
              <Button variant="danger" onClick={handleGenerateErrorLog} className="px-3 py-2 text-[10px]">
                🚨 Forzar Excepción
              </Button>
            </div>
          </div>

          <div className="bg-[#050505] border border-[var(--border)] rounded-2xl p-6 font-mono text-[10px] leading-relaxed shadow-2xl h-[400px] overflow-y-auto flex flex-col-reverse gap-2 text-slate-300">
            {logStream.map(log => {
              const levelColors = {
                INFO: 'text-green-400',
                WARN: 'text-yellow-400',
                ERROR: 'text-red-400 font-bold',
                DEBUG: 'text-cyan-400'
              };
              return (
                <div key={log.id} className="border-b border-white/5 pb-1 flex gap-2">
                  <span className="text-[var(--text-muted)]">[{log.time}]</span>
                  <span className={levelColors[log.level]}>[{log.level}]</span>
                  <span className="text-white font-bold">[Ecosistema]</span>
                  <span>{log.msg}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default function AdminPage() {
  return (
    <ThemeProvider>
      <AdminContent />
    </ThemeProvider>
  );
}
