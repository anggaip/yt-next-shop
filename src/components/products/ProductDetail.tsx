"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { CheckCircle, Star, MessageCircle } from "lucide-react";

import type { Product, Variant } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const formatPrice = (value: number, currency = "IDR") => {
  const divisor = currency === "IDR" ? 1 : 100;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value / divisor);
};

type ProductDetailProps = {
  product: Product;
  variants: Variant[];
};

export function ProductDetail({ product, variants }: ProductDetailProps) {
  const defaultVariant = variants.find((variant) => variant.isDefault) ?? variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id);
  const [isPending, startTransition] = useTransition();

  const selectedVariant = useMemo(() => {
    return variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;
  }, [selectedVariantId, variants, defaultVariant]);

  const basePrice = selectedVariant?.price ?? product.price;
  const overridePrice = selectedVariant?.priceOverride ?? selectedVariant?.price_override;
  const finalPrice = overridePrice ?? basePrice;
  const compareAt = overridePrice ? basePrice : (product.metadata?.compareAtPrice as number | undefined);

  const stockText = selectedVariant?.stock ?? 0;
  const image = selectedVariant?.imageUrl ?? product.assets[0];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted">
          {image ? (
            <div className="relative aspect-square">
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center text-muted-foreground">
              Tidak ada gambar
            </div>
          )}
        </div>

        <section className="rounded-2xl border border-dashed border-border p-6">
          <header className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Star className="h-4 w-4 text-yellow-500" />
            Rating & Ulasan
          </header>
          <p className="text-sm text-muted-foreground">Belum ada ulasan. Bagian ini siap untuk komponen rating di masa depan.</p>
        </section>

        <section className="rounded-2xl border border-dashed border-border p-6">
          <header className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <MessageCircle className="h-4 w-4" />
            Q&A Produk
          </header>
          <p className="text-sm text-muted-foreground">Tampilkan daftar pertanyaan pelanggan atau modul komunitas di sini.</p>
        </section>
      </div>

      <div className="space-y-6 rounded-3xl border border-border bg-card p-6">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit">Produk Resmi</Badge>
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <p className="text-base text-muted-foreground">{product.summary}</p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-foreground">
              {formatPrice(finalPrice, selectedVariant?.currency ?? product.currency)}
            </span>
            {compareAt && compareAt > finalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(compareAt, selectedVariant?.currency ?? product.currency)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">Stok varian: {stockText} unit</p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Pilih Varian
          </h2>
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => {
              const options = variant.optionJson ?? variant.option_json ?? variant.attributes;
              const optionLabel = Object.entries(options)
                .map(([key, value]) => `${key}: ${value}`)
                .join(" • ");

              return (
                <button
                  type="button"
                  key={variant.id}
                  onClick={() =>
                    startTransition(() => {
                      setSelectedVariantId(variant.id);
                    })
                  }
                  className={cn(
                    "rounded-2xl border px-4 py-3 text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    selectedVariant?.id === variant.id
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/40",
                    variant.stock === 0 && "opacity-60",
                  )}
                  disabled={variant.stock === 0}
                  aria-pressed={selectedVariant?.id === variant.id}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      className={cn(
                        "h-4 w-4",
                        selectedVariant?.id === variant.id ? "text-foreground" : "text-muted-foreground",
                      )}
                    />
                    <span className="font-medium">{variant.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{optionLabel}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Deskripsi
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">{product.description}</p>
        </div>

        <Button size="lg" disabled={!selectedVariant || (selectedVariant?.stock ?? 0) === 0 || isPending} className="w-full">
          Tambah ke Keranjang
        </Button>
      </div>
    </div>
  );
}
