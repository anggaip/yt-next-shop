import { NextRequest, NextResponse } from "next/server";

import type { Paginated, Product } from "@/lib/types";
import { products } from "@/mocks/products";

const PER_PAGE = 6;

type SortKey = "price_asc" | "price_desc" | "newest";

const sortProducts = (items: Product[], sort: SortKey) => {
  switch (sort) {
    case "price_asc":
      return [...items].sort((a, b) => a.price - b.price);
    case "price_desc":
      return [...items].sort((a, b) => b.price - a.price);
    case "newest":
    default:
      return [...items].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const category = searchParams.get("category")?.trim() ?? "";
  const sort = (searchParams.get("sort") as SortKey) ?? "newest";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const filtered = products.filter((product) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search) ||
        product.summary.toLowerCase().includes(search)
      : true;
    const categoryId = (product.metadata as Record<string, unknown>)?.categoryId as
      | string
      | undefined;
    const matchesCategory = category ? categoryId === category : true;
    return matchesSearch && matchesCategory;
  });

  const sorted = sortProducts(filtered, sort);
  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const data = sorted.slice(start, start + PER_PAGE);

  const payload: Paginated<Product> = {
    data,
    meta: {
      page,
      perPage: PER_PAGE,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };

  return NextResponse.json(payload);
}
