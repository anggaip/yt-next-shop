import { notFound } from "next/navigation";

import { ProductsCatalog } from "@/components/products/ProductsCatalog";
import { fetchCategories } from "@/features/categories/api";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{
    search?: string;
    page?: string;
    sort?: "price_asc" | "price_desc" | "newest";
  }>;
};

const parseNumber = (value?: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams ?? Promise.resolve({})]);

  const categories = await fetchCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const initial = {
    search: query?.search ?? "",
    category: category.id,
    page: parseNumber(query?.page),
    sort: query?.sort ?? "newest",
  } as const;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Kategori
        </p>
        <h1 className="text-4xl font-bold capitalize">{category.name}</h1>
        <p className="text-base text-muted-foreground">{category.description}</p>
      </div>

      <ProductsCatalog initialParams={initial} />
    </div>
  );
}
