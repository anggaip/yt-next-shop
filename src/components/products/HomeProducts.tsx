"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

import { fetchProducts } from "@/features/products/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = Array.from({ length: 6 });

export function HomeProducts() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["home-products"],
    queryFn: () => fetchProducts({ sort: "newest", page: 1 }),
    staleTime: 60_000,
  });

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Produk Terbaru
          </p>
          <h2 className="text-2xl font-bold">Koleksi Pilihan untuk Anda</h2>
        </div>
        <Button asChild variant="ghost" className="gap-2">
          <Link href="/products">
            Lihat semua
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </header>

      {isError && (
        <p className="text-sm text-destructive">Tidak dapat memuat produk saat ini.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {isPending &&
          skeletonCards.map((_, index) => (
            <Skeleton key={`home-product-skeleton-${index}`} className="h-[420px] rounded-2xl" />
          ))}

        {!isPending && data?.data.length
          ? data.data.map((product) => <ProductCard key={product.id} product={product} />)
          : null}
      </div>

      {!isPending && !data?.data.length && !isError && (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Belum ada produk yang ditampilkan.
        </div>
      )}
    </section>
  );
}
