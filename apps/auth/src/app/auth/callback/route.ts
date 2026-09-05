import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rcskjdksimcfkdjzxara.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const isRelative = next.startsWith('/');
      const destination = isRelative ? `${origin}${next}` : next;
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(`${origin}/?error=auth_callback_failed`);
}
