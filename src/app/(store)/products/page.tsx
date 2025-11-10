import type { Metadata } from "next";

import { ProductsCatalog } from "@/components/products/ProductsCatalog";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description: "Jelajahi katalog perangkat dan layanan AI di BelajarAI Store.",
};

type ProductsPageProps = {
  searchParams?: Promise<{
    search?: string;
    category?: string;
    page?: string;
    sort?: "price_asc" | "price_desc" | "newest";
  }>;
};

const parseNumber = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};

  const initial = {
    search: params.search ?? "",
    category: params.category ?? "",
    page: parseNumber(params.page),
    sort: params.sort ?? "newest",
  } as const;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Katalog
        </p>
        <h1 className="text-4xl font-bold">Semua Produk</h1>
        <p className="text-base text-muted-foreground">
          Filter berdasarkan kategori, urutan harga, atau cari perangkat tertentu.
        </p>
      </div>
      <ProductsCatalog initialParams={initial} />
    </div>
  );
}
