import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/products/ProductDetail";
import { fetchProductDetail } from "@/features/products/api";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  try {
    const { product, variants } = await fetchProductDetail(slug);

    if (!product || !variants?.length) {
      notFound();
    }

    return (
      <div className="space-y-6">
        <ProductDetail product={product} variants={variants} />
      </div>
    );
  } catch {
    notFound();
  }
}
