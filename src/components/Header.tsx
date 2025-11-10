"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCategories } from "@/features/categories/api";

const skeletonItems = Array.from({ length: 4 });

function SearchBar({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire up actual search navigation or mutation.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-2"
      role="search"
      aria-label="Search products"
    >
      <Input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Cari produk, kategori, atau brand"
        type="search"
        className="h-11 flex-1"
      />
      <Button type="submit" variant="primary" size="lg" className="gap-2 px-4">
        <Search className="h-4 w-4" aria-hidden />
        Cari
      </Button>
    </form>
  );
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: categories,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const visibleCategories = useMemo(() => {
    if (!categories?.length) return [];
    return categories.slice(0, 6);
  }, [categories]);

  const showSkeleton = isPending && !categories?.length;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
              BA
            </span>
            BelajarAI Store
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Lihat keranjang">
              <ShoppingCart className="h-5 w-5" aria-hidden />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Akun saya">
              <User className="h-5 w-5" aria-hidden />
            </Button>
          </div>
        </div>

        {showSkeleton ? (
          <Skeleton className="h-11 w-full max-w-xl" />
        ) : (
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
        )}

        <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
          {showSkeleton &&
            skeletonItems.map((_, index) => (
              <Skeleton key={`category-skeleton-${index}`} className="h-7 w-24" />
            ))}

          {!showSkeleton && !isError && visibleCategories.length > 0 &&
            visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.slug}`}
                className="rounded-full bg-muted px-4 py-1.5 text-foreground transition-colors hover:bg-muted/70"
              >
                {category.name}
              </Link>
            ))}

          {!showSkeleton && !isError && visibleCategories.length === 0 && (
            <span className="text-sm text-muted-foreground">Kategori belum tersedia</span>
          )}

          {isError && (
            <span className="text-sm text-destructive">
              Gagal memuat kategori, coba lagi nanti.
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
