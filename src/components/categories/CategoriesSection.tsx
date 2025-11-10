"use client";

import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { fetchCategories } from "@/features/categories/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const skeletonCards = Array.from({ length: 6 });

export function CategoriesSection() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Jelajahi
          </p>
          <h2 className="text-2xl font-bold">Kategori Unggulan</h2>
        </div>
        <Badge variant="outline" className="gap-2">
          <PackageSearch className="h-4 w-4" />
          {data?.length ?? 0} kategori
        </Badge>
      </div>

      {isError && (
        <p className="text-sm text-destructive">
          Tidak dapat memuat kategori saat ini.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending &&
          skeletonCards.map((_, index) => (
            <Skeleton key={`category-card-skeleton-${index}`} className="h-32 rounded-xl" />
          ))}

        {!isPending &&
          data?.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className="group rounded-xl border border-border bg-card/40 p-4 transition hover:-translate-y-0.5 hover:border-foreground/40"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {category.parentId ? "Subkategori" : "Kategori"}
              </p>
              <h3 className="mt-1 text-lg font-semibold group-hover:text-foreground">
                {category.name}
              </h3>
              {category.description && (
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              )}
            </Link>
          ))}

        {!isPending && !data?.length && !isError && (
          <p className="text-sm text-muted-foreground">Kategori belum tersedia.</p>
        )}
      </div>
    </section>
  );
}
