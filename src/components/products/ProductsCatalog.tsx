"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Filter, Loader2 } from "lucide-react";

import { fetchCategories } from "@/features/categories/api";
import { fetchProducts, type ProductsQuery } from "@/features/products/api";
import { ProductCard } from "@/components/ProductCard";
import { Pagination } from "@/components/pagination/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const sortOptions = [
  { label: "Terbaru", value: "newest" },
  { label: "Harga Terendah", value: "price_asc" },
  { label: "Harga Tertinggi", value: "price_desc" },
] as const;

const skeletonCards = Array.from({ length: 6 });

export type CatalogInitialParams = {
  search?: string;
  category?: string;
  page?: number;
  sort?: ProductsQuery["sort"];
};

export function ProductsCatalog({ initialParams }: { initialParams: CatalogInitialParams }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = useMemo(() => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const result: Required<ProductsQuery> = {
      search: params.get("search") ?? initialParams.search ?? "",
      category: params.get("category") ?? initialParams.category ?? "",
      sort: (params.get("sort") as ProductsQuery["sort"]) ?? initialParams.sort ?? "newest",
      page: Number(params.get("page")) || initialParams.page || 1,
    };
    return result;
  }, [initialParams.category, initialParams.page, initialParams.search, initialParams.sort, searchParams]);

  const [searchInput, setSearchInput] = useState(currentParams.search);

  useEffect(() => {
    startTransition(() => {
      setSearchInput(currentParams.search);
    });
  }, [currentParams.search]);

  const { data: products, isPending } = useQuery({
    queryKey: ["products", currentParams],
    queryFn: () => fetchProducts(currentParams),
    staleTime: 60_000,
    keepPreviousData: true,
  });

  const { data: categories, isPending: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const updateQuery = (updates: Partial<ProductsQuery>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    (Object.entries(updates) as [keyof ProductsQuery, ProductsQuery[keyof ProductsQuery]][]).forEach(
      ([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      },
    );

    const queryString = params.toString();
    const target = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(target, { scroll: false });
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateQuery({ search: searchInput, page: 1 });
  };

  const handleCategoryChange = (categoryId?: string) => {
    updateQuery({ category: categoryId ?? "", page: 1 });
  };

  const handleSortChange = (value: ProductsQuery["sort"]) => {
    updateQuery({ sort: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateQuery({ page });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <h3 className="text-base font-semibold">Kategori</h3>
        </div>
        <div className="space-y-3">
          {isCategoriesLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={`category-filter-${index}`} className="h-8 w-full" />
            ))}

          {!isCategoriesLoading && (
            <div className="flex flex-col gap-2">
              <Button
                variant={!currentParams.category ? "primary" : "outline"}
                onClick={() => handleCategoryChange(undefined)}
                className="justify-start"
              >
                Semua Produk
              </Button>
              {categories?.map((category) => {
                const isActive =
                  currentParams.category === category.id ||
                  currentParams.category === category.parentId ||
                  currentParams.category === category.parent_id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? "primary" : "outline"}
                    className="justify-start"
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      </aside>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Cari produk..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <Button type="submit">Cari</Button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="outline" className="gap-2">
              {products?.meta.totalItems ?? 0} produk
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Urutkan
              <Select
                value={currentParams.sort ?? "newest"}
                onValueChange={(value) => handleSortChange(value as ProductsQuery["sort"])}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih urutan" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {isPending &&
            skeletonCards.map((_, index) => (
              <Skeleton key={`product-skeleton-${index}`} className="h-[420px] rounded-2xl" />
            ))}

          {!isPending && products && products.data.length > 0 &&
            products.data.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        {!isPending && products && products.data.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-lg font-semibold">Tidak ada produk</p>
            <p className="text-sm text-muted-foreground">
              Coba ubah kata kunci, kategori, atau reset filter.
            </p>
          </div>
        )}

        {isPending && !products && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Memuat produk...
          </div>
        )}

        {products && (
          <Pagination
            currentPage={products.meta.page}
            totalPages={products.meta.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
}
