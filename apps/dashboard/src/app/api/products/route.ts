import { NextResponse } from 'next/server';
import { REGISTRO_PRODUCTOS, getProductsByCategory } from '@moderno/product-registry';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (category) {
    const products = getProductsByCategory(category);
    return NextResponse.json({ products });
  }

  return NextResponse.json({ products: REGISTRO_PRODUCTOS });
}
