import { apiFetch } from "@/lib/api";
import type { Category, Paginated } from "@/lib/types";

export type CategoryResponse = Category[] | Paginated<Category>;

export const fetchCategories = async () => {
  const response = await apiFetch<CategoryResponse>("/categories");
  if (Array.isArray(response)) {
    return response;
  }
  return response?.data ?? [];
};
