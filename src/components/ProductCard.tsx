import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80";

const formatPrice = (value: number, currency = "IDR") => {
  const divisor = currency === "IDR" ? 1 : 100;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value / divisor);
};

export function ProductCard({ product }: { product: Product }) {
  const image = product.assets?.[0] ?? FALLBACK_IMAGE;
  const compareAt = (product.metadata?.compareAtPrice as number | undefined) || null;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Lihat detail ${product.name}`}
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.summary}</p>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.price, product.currency)}
          </span>
          {compareAt && compareAt > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(compareAt, product.currency)}
            </span>
          )}
        </div>
        <Button asChild variant="primary" className="mt-2">
          <Link href={`/products/${product.slug}`}>Lihat Detail</Link>
        </Button>
      </div>
    </article>
  );
}
