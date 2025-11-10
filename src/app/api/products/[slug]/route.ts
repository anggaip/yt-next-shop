import { NextResponse } from "next/server";

import { products } from "@/mocks/products";

export async function GET(
  _: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return NextResponse.json(
      { message: "Produk tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json({ product, variants: product.variants });
}
