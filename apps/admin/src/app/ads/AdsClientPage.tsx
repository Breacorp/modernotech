"use client";

import React, { useState } from "react";

const SERVICE_CATEGORIES = [
  {
    title: "A. Publicidad digital",
    items: [
      "Google Ads",
      "Meta Ads (Facebook e Instagram)",
      "ChatGPT Ads (sujeto a disponibilidad y elegibilidad de OpenAI)",
      "Campañas de búsqueda",
      "Campañas de display",
      "Publicidad en redes sociales",
      "Remarketing, cuando corresponda",
    ],
  },
  {
    title: "B. SEO y posicionamiento orgánico",
    items: [
      "Auditoría SEO y SEO técnico",
      "Investigación de palabras clave",
      "Optimización de contenidos (on-page y off-page)",
      "SEO local y Google Business Profile",
      "Indexación, rendimiento y seguimiento",
    ],
  },
  {
    title: "C. Diseño y creatividad publicitaria",
    items: [
      "Diseño de anuncios y banners comerciales",
      "Creatividades para redes sociales y piezas promocionales",
      "Videos publicitarios y adaptación multiformato",
      "Redacción de textos comerciales",
    ],
  },
  {
    title: "D. Estrategia y captación de clientes",
    items: [
      "Investigación de mercado y públicos objetivos",
      "Segmentación y embudos de conversión",
      "Optimización de landing pages",
      "Estrategias de generación de consultas comerciales",
    ],
  },
  {
    title: "E. Gestión y optimización",
    items: [
      "Configuración y administración de cuentas publicitarias",
      "Seguimiento de conversiones y análisis de métricas",
      "Optimización de presupuesto e informes de rendimiento",
      "Recomendaciones estratégicas continuas",
    ],
  },
];

const PLATFORMS = [
  { name: "Google Ads", note: "Búsqueda, Display y YouTube" },
  { name: "Meta Ads", note: "Facebook e Instagram" },
  { name: "ChatGPT Ads", note: "Sujeto a disponibilidad comercial y requisitos de OpenAI" },
  { name: "Google Analytics", note: "Medición y conversiones" },
  { name: "Google Search Console", note: "Indexación y rendimiento orgánico" },
  { name: "Google Business Profile", note: "Posicionamiento local" },
];

const PLANS = [
  {
    id: "start",
    name: "MODERNO ADS START",
    subtitle: "Para emprendimientos y pequeños comercios.",
    features: [
      "Evaluación inicial",
      "Configuración publicitaria",
      "Lanzamiento de campañas",
      "Configuración básica de medición",
      "Recomendaciones de mejora",
    ],
  },
  {
    id: "business",
    name: "MODERNO ADS BUSINESS",
    subtitle: "Para empresas y negocios que buscan crecimiento sostenido.",
    features: [
      "Gestión mensual de campañas",
      "Google Ads y/o Meta Ads",
      "Diseño de creatividades",
      "Optimización periódica",
      "Seguimiento de conversiones",
      "Informes de resultados y asesoramiento estratégico",
    ],
  },
  {
    id: "enterprise",
    name: "MODERNO ADS ENTERPRISE",
    subtitle: "Para empresas con necesidades publicitarias avanzadas.",
    features: [
      "Estrategia integral y gestión multicanal",
      "SEO avanzado y campañas publicitarias",
      "Creatividades comerciales",
      "Analítica, seguimiento y optimización continua",
      "Consultoría estratégica",
    ],
  },
];

const METHODOLOGY = [
  { step: "1. Diagnóstico", desc: "Analizamos el negocio y sus objetivos." },
  { step: "2. Estrategia", desc: "Definimos canales, públicos y acciones." },
  { step: "3. Implementación", desc: "Configuramos campañas y materiales." },
  { step: "4. Optimización", desc: "Medimos y mejoramos el rendimiento." },
  { step: "5. Evolución", desc: "Analizamos resultados y planificamos nuevas oportunidades." },
];

const SECTORS = [
  "Comercios",
  "Profesionales independientes",
  "Empresas",
  "Emprendimientos",
  "Servicios técnicos",
  "Tiendas online",
  "Marcas personales",
  "Negocios locales",
];

export function AdsClientPage() {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    service: "Google Ads",
    budget: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.company.trim() || !form.email.trim() || !form.phone.trim() || !form.description.trim()) {
      setStatus("error");
      setErrorMsg("Completá los campos obligatorios: nombre, empresa, correo, teléfono y descripción.");
      return;
    }
    const subject = encodeURIComponent(`[Moderno Ads] Solicitud de asesoramiento — ${form.company}`);
    const body = encodeURIComponent(
      `Nombre: ${form.fullName}\nEmpresa: ${form.company}\nEmail: ${form.email}\nTeléfono/WhatsApp: ${form.phone}\nSitio web: ${form.website || "N/A"}\nServicio: ${form.service}\nPresupuesto estimado: ${form.budget || "A definir"}\n\nDescripción:\n${form.description}`
    );
    window.location.href = `mailto:contacto@moderno.com.ar?subject=${subject}&body=${body}`;
    setStatus("sent");
    setErrorMsg("");
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 space-y-24">
      {/* Hero */}
      <section className="text-center space-y-6 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          Moderno Ads · Publicidad digital, posicionamiento y crecimiento comercial
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Tu negocio merece ser encontrado.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-300">
          Impulsamos tu presencia digital mediante publicidad estratégica, posicionamiento en buscadores y campañas diseñadas para atraer nuevos clientes.
        </p>
        <p className="text-sm text-slate-400">
          Transformamos la publicidad digital en oportunidades reales de negocio.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a href="#contacto-ads" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-500 transition">
            Solicitar asesoramiento
          </a>
          <a href="#servicios-ads" className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-medium text-slate-200 hover:border-slate-500 transition">
            Conocer nuestros servicios
          </a>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios-ads" className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Servicios</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-4">
              <h3 className="text-lg font-medium text-blue-400">{cat.title}</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {cat.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Plataformas */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Plataformas</h2>
          <p className="text-sm text-slate-400">
            Implementación y gestión técnica sobre plataformas publicitarias y de analítica. ChatGPT Ads se ofrece sujeto a disponibilidad comercial, requisitos de acceso y condiciones de OpenAI.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="font-medium text-white">{p.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planes comerciales */}
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Planes comerciales</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.id} className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.subtitle}</p>
                <ul className="space-y-2 pt-2 text-sm text-slate-300">
                  {plan.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-sm font-medium text-blue-400">Solicitar presupuesto</p>
                <a href="#contacto-ads" className="block w-full rounded-xl bg-blue-600/90 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500 transition">
                  Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metodología y Sectores */}
      <section className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Metodología de trabajo</h2>
          <div className="space-y-3">
            {METHODOLOGY.map((m) => (
              <div key={m.step} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
                <h3 className="text-sm font-semibold text-blue-400">{m.step}</h3>
                <p className="text-sm text-slate-300">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Sectores comerciales</h2>
          <div className="grid grid-cols-2 gap-3">
            {SECTORS.map((s) => (
              <div key={s} className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 text-sm text-slate-200">
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <section id="contacto-ads" className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-white">Solicitar asesoramiento</h2>
          <p className="text-sm text-slate-400">Contanos sobre tu proyecto y te respondemos a la brevedad.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <input placeholder="Nombre y apellido *" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <input placeholder="Empresa o emprendimiento *" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <input type="email" placeholder="Correo electrónico *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <input placeholder="Teléfono / WhatsApp *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <input placeholder="Sitio web (opcional)" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white">
            <option value="Google Ads">Google Ads</option>
            <option value="Meta Ads">Meta Ads</option>
            <option value="ChatGPT Ads">ChatGPT Ads</option>
            <option value="SEO">SEO</option>
            <option value="Diseño publicitario">Diseño publicitario</option>
            <option value="Gestión integral">Gestión integral</option>
            <option value="Asesoramiento">Asesoramiento</option>
          </select>
          <input placeholder="Presupuesto publicitario estimado (opcional)" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="md:col-span-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          <textarea rows={4} placeholder="Descripción del proyecto *" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="md:col-span-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white" />
          {status === "error" && <p className="md:col-span-2 text-sm text-red-400">{errorMsg}</p>}
          {status === "sent" && <p className="md:col-span-2 text-sm text-emerald-400">Se abrió tu cliente de correo para enviar la consulta a contacto@moderno.com.ar.</p>}
          <button type="submit" className="md:col-span-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-500 transition">
            Enviar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}

