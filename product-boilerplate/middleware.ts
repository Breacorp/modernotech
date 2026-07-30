import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { createServerClient } from '@supabase/ssr' // En un entorno real se utiliza SSR de supabase

export async function middleware(request: NextRequest) {
  // 1. Extraer el token SSO de las cookies o el header (Moderno ID)
  const ssoToken = request.cookies.get('moderno_sso_token')?.value
  
  if (!ssoToken) {
    // Redirigir al Hub (id.moderno.com.ar) para hacer login si no hay token
    return NextResponse.redirect(new URL('https://id.moderno.com.ar/login?redirect=' + request.url, request.url))
  }

  // 2. Validar Token en el Edge (Sin base de datos)
  // Aquí se verificaría la firma del JWT usando la llave pública de id.moderno.com.ar
  // simulado aquí para el boilerplate
  const isValid = true; 

  if (!isValid) {
    return NextResponse.redirect(new URL('https://id.moderno.com.ar/login?error=invalid_token', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
