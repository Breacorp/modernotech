import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  // Delegamos el intercambio de código al cliente (supabase-js) para que
  // la sesión se persista en el almacenamiento compartido (mp_token)
  // y el SSO funcione entre subdominios.
  if (code) {
    const destination = new URL(next.startsWith('/') ? next : `/${next}`, origin);
    destination.searchParams.set('code', code);
    return NextResponse.redirect(destination.toString());
  }

  return NextResponse.redirect(`${origin}/?error=auth_callback_failed`);
}
