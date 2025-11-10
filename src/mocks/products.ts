import type { Product, Variant } from "@/lib/types";

import { categoriesTable, productVariantsTable, productsTable } from "./catalog";

const imageBase =
  process.env.NEXT_PUBLIC_ASSET_BASE_URL || "https://images.unsplash.com";

const productImages: Record<string, string> = {
  "edge-vision-kit": `${imageBase}/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80`,
  "voice-home-speaker": `${imageBase}/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80`,
  "robotic-arm-starter": `${imageBase}/photo-1504275107627-0c2ba7a43dba?auto=format&fit=crop&w=900&q=80`,
  "cloud-ai-credit": `${imageBase}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80`,
  "learning-kit-ai": `${imageBase}/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=900&q=80`,
  "smart-light-pro": `${imageBase}/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80`,
  "accessory-pack": `${imageBase}/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80`,
  "ai-display-13": `${imageBase}/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80`,
};

const buildVariants = (productId: string, productSlug: string, basePrice: number): Variant[] => {
  const variants = productVariantsTable.filter((variant) => variant.product_id === productId);

  return variants.map((variant, index) => {
    const optionLabel = Object.values(variant.option_json).join(" / ");
    const imageUrl = productImages[productSlug];

    return {
      id: variant.id,
      sku: variant.sku,
      title: optionLabel || variant.sku,
      price: basePrice,
      currency: "IDR",
      stock: variant.stock,
      attributes: variant.option_json,
      optionJson: variant.option_json,
      option_json: variant.option_json,
      priceOverride: variant.price_override ?? undefined,
      price_override: variant.price_override ?? undefined,
      imageUrl,
      isDefault: index === 0,
    };
  });
};

export const products: Product[] = productsTable.map((row) => {
  const category = categoriesTable.find((cat) => cat.id === row.category_id);
  const summary =
    row.description.length > 150 ? `${row.description.slice(0, 147)}...` : row.description;
  const variants = buildVariants(row.id, row.slug, row.price);

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    summary,
    description: row.description,
    price: row.price,
    currency: "IDR",
    status: row.status,
    categories: category
      ? [
          {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            imageUrl: null,
            parentId: category.parent_id ?? null,
          },
        ]
      : [],
    variants,
    tags: [],
    assets: [productImages[row.slug] ?? productImages["edge-vision-kit"]],
    metadata: {
      compareAtPrice: row.compare_at_price ?? undefined,
      categoryId: row.category_id,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});
