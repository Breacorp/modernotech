import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/cuenta';

  if (code) {
    const destination = new URL(next.startsWith('/') ? next : `/${next}`, origin);
    destination.searchParams.set('code', code);
    return NextResponse.redirect(destination.toString());
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}

