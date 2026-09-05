import { NextResponse } from 'next/server';
import { supabaseAuthClient } from '@moderno/auth-helpers';

export async function GET(request: Request) {
  // 1. Validar el JWT del usuario de la petición
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const { data, error } = await supabaseAuthClient.auth.getUser(token);
    
    if (error || !data?.user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const user = data.user;

    // 2. Extraer el ID del producto consultado
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Missing productId parameter' }, { status: 400 });
    }

    // 3. Consultar entitlements reales en Supabase
    const { data: entitlement, error: entError } = await supabaseAuthClient
      .from('user_product_entitlements')
      .select('*')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .maybeSingle();

    if (entError) {
      console.error('Error fetching entitlement:', entError.message);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    if (!entitlement) {
      return NextResponse.json({
        subscription: {
          productId,
          isActive: false,
          role: 'user',
          status: 'inactive'
        }
      });
    }

    return NextResponse.json({
      subscription: {
        productId: entitlement.product_id,
        isActive: entitlement.status === 'active',
        role: entitlement.tier === 'enterprise' ? 'admin' : 'user',
        tier: entitlement.tier,
        status: entitlement.status,
        grantedAt: entitlement.created_at
      }
    });

  } catch (error) {
    console.error('Error in subscription route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
