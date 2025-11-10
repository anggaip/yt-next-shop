import type { Category } from "@/lib/types";

import { categoriesTable } from "./catalog";

export const categories: Category[] = categoriesTable.map((row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  parentId: row.parent_id ?? null,
  parent_id: row.parent_id ?? null,
}));
