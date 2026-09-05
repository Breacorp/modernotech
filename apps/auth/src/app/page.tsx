"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ModernoAuthCard, ModernoProject, MODERNO_PROJECTS } from "@moderno/auth-helpers";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appParam = (searchParams.get("app") as ModernoProject) || "tech";
  const nextParam = searchParams.get("next") || "/dashboard";

  // Validar si el proyecto está dentro del catálogo soportado
  const project: ModernoProject = MODERNO_PROJECTS[appParam] ? appParam : "tech";
  const projectMeta = MODERNO_PROJECTS[project];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f8fafc] flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
      {/* Luces de fondo ambientales */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-700"
        style={{
          background: `radial-gradient(circle, ${projectMeta.accentColor} 0%, transparent 70%)`,
        }}
      />
      <div className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(38,130,246,0.1)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[440px] z-10 flex flex-col items-center">
        {/* Componente universal exportable */}
        <ModernoAuthCard
          project={project}
          appName={projectMeta.name}
          accentColor={projectMeta.accentColor}
          redirectTo={nextParam}
          onSuccess={() => {
            router.push("/dashboard");
          }}
        />
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center text-sm">
          Cargando portal de identidad...
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
