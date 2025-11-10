import { apiFetch } from "@/lib/api";
import type { Paginated, Product, Variant } from "@/lib/types";

export type ProductsQuery = {
  search?: string;
  category?: string;
  page?: number;
  sort?: "price_asc" | "price_desc" | "newest";
};

export const fetchProducts = async (params: ProductsQuery) => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (typeof params.page === "number") query.set("page", String(params.page));
  if (params.sort) query.set("sort", params.sort);

  const queryString = query.toString();
  const basePath = "/api/products";
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  return apiFetch<Paginated<Product>>(endpoint);
};

export type ProductDetailResponse = {
  product: Product;
  variants: Variant[];
};

export const fetchProductDetail = async (slug: string) => {
  return apiFetch<ProductDetailResponse>(`/api/products/${slug}`);
};
