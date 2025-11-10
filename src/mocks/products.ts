import type { Product, Variant } from "@/lib/types";

const imageBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL || "https://images.unsplash.com";

const buildVariants = (
  slug: string,
  currency: string,
  basePrice: number,
  imageUrl: string,
  combos: Array<{
    suffix: string;
    sku: string;
    title: string;
    stock: number;
    price?: number;
    priceOverride?: number;
    options: Record<string, string>;
    isDefault?: boolean;
  }>,
): Variant[] =>
  combos.map((combo, index) => {
    const price = combo.price ?? basePrice;
    const priceOverride = combo.priceOverride;
    return {
      id: `${slug}-${combo.suffix}`,
      sku: combo.sku,
      title: combo.title,
      price,
      priceOverride,
      price_override: priceOverride,
      currency,
      stock: combo.stock,
      attributes: combo.options,
      optionJson: combo.options,
      option_json: combo.options,
      imageUrl,
      isDefault: combo.isDefault ?? index === 0,
    };
  });

const edgeVisionImage = `${imageBase}/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80`;
const voiceHomeImage = `${imageBase}/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80`;
const robotArmImage = `${imageBase}/photo-1504275107627-0c2ba7a43dba?auto=format&fit=crop&w=800&q=80`;
const cloudCreditImage = `${imageBase}/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`;
const learningKitImage = `${imageBase}/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=800&q=80`;
const smartLightImage = `${imageBase}/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80`;
const accessoryPackImage = `${imageBase}/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80`;
const aiDisplayImage = `${imageBase}/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80`;

export const products: Product[] = [
  {
    id: "prd-edge-vision",
    name: "BelajarAI Edge Vision Kit",
    slug: "edge-vision-kit",
    summary: "Kit kamera edge AI dengan modul NVIDIA dan sensor 4K.",
    description: "Lengkap dengan modul NVIDIA Jetson, kamera 4K, dan casing industri.",
    price: 14999000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("edge-vision", "IDR", 14999000, edgeVisionImage, [
      {
        suffix: "black-32",
        sku: "EV-BLK-32",
        title: "Hitam / 32GB",
        stock: 12,
        priceOverride: 13999000,
        options: { warna: "Hitam", penyimpanan: "32GB" },
        isDefault: true,
      },
      {
        suffix: "silver-64",
        sku: "EV-SLV-64",
        title: "Perak / 64GB",
        stock: 7,
        price: 15999000,
        options: { warna: "Perak", penyimpanan: "64GB" },
      },
    ]),
    tags: ["camera", "jetson"],
    assets: [edgeVisionImage],
    metadata: {
      compareAtPrice: 16999000,
      categoryId: "cat-vision-module",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-voice-home",
    name: "Voice Home Smart Speaker",
    slug: "voice-home-speaker",
    summary: "Speaker pintar dengan dukungan Bahasa Indonesia.",
    description: "Speaker dengan array mikrofon 6 arah dan edge processing.",
    price: 2499000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("voice-home", "IDR", 2499000, voiceHomeImage, [
      {
        suffix: "black",
        sku: "VH-BLK",
        title: "Hitam",
        stock: 20,
        options: { warna: "Hitam" },
        isDefault: true,
      },
      {
        suffix: "white",
        sku: "VH-WHT",
        title: "Putih",
        stock: 14,
        priceOverride: 2399000,
        options: { warna: "Putih" },
      },
    ]),
    tags: ["speaker"],
    assets: [voiceHomeImage],
    metadata: {
      compareAtPrice: 2999000,
      categoryId: "cat-voice-assistant",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-robot-arm",
    name: "Robotik Arm Starter",
    slug: "robotic-arm-starter",
    summary: "Lengan robot 6 DOF dengan kontroler web.",
    description: "Cocok untuk pembelajaran otomasi dan kontrol AI.",
    price: 9999000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("robot-arm", "IDR", 9999000, robotArmImage, [
      {
        suffix: "kit",
        sku: "RA-KIT",
        title: "Kit Lengkap",
        stock: 5,
        options: { paket: "Lengkap" },
        isDefault: true,
      },
      {
        suffix: "bare",
        sku: "RA-BARE",
        title: "Tanpa Controller",
        stock: 3,
        price: 8999000,
        options: { paket: "Tanpa Controller" },
      },
    ]),
    tags: ["robotics"],
    assets: [robotArmImage],
    metadata: {
      compareAtPrice: 11999000,
      categoryId: "cat-robotics",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-cloud-credit",
    name: "Cloud AI Credit 1.000 Jam",
    slug: "cloud-ai-credit",
    summary: "1.000 jam GPU inference di cloud BelajarAI.",
    description: "Termasuk observability dan data labeling basic.",
    price: 5599000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("cloud-credit", "IDR", 5599000, cloudCreditImage, [
      {
        suffix: "standard",
        sku: "CC-STD",
        title: "Standard",
        stock: 50,
        options: { paket: "Standard" },
        isDefault: true,
      },
      {
        suffix: "priority",
        sku: "CC-PRIO",
        title: "Priority Support",
        stock: 25,
        price: 6599000,
        options: { paket: "Priority" },
      },
    ]),
    tags: ["cloud"],
    assets: [cloudCreditImage],
    metadata: {
      compareAtPrice: 6599000,
      categoryId: "cat-cloud-service",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-learning-kit",
    name: "Learning Kit AI Dasar",
    slug: "learning-kit-ai",
    summary: "Kit pembelajaran AI dengan modul microcontroller dan sensor.",
    description: "Disertai modul kurikulum dan akses komunitas.",
    price: 1899000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("learning-kit", "IDR", 1899000, learningKitImage, [
      {
        suffix: "student",
        sku: "LK-STU",
        title: "Student",
        stock: 18,
        options: { paket: "Student" },
        isDefault: true,
      },
      {
        suffix: "pro",
        sku: "LK-PRO",
        title: "Pro",
        stock: 10,
        price: 2199000,
        options: { paket: "Pro" },
      },
    ]),
    tags: ["education"],
    assets: [learningKitImage],
    metadata: {
      compareAtPrice: 2199000,
      categoryId: "cat-learning-kit",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-smart-light",
    name: "Smart Light Pro",
    slug: "smart-light-pro",
    summary: "Lampu pintar multi-spektrum dengan konektivitas Matter.",
    description: "Dilengkapi sensor cahaya ambient dan kontrol suara.",
    price: 1299000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("smart-light", "IDR", 1299000, smartLightImage, [
      {
        suffix: "single",
        sku: "SL-SINGLE",
        title: "Single Pack",
        stock: 30,
        options: { paket: "Single" },
        isDefault: true,
      },
      {
        suffix: "triple",
        sku: "SL-TRIPLE",
        title: "Triple Pack",
        stock: 15,
        priceOverride: 3499000,
        options: { paket: "Triple" },
      },
    ]),
    tags: ["smart-home"],
    assets: [smartLightImage],
    metadata: {
      compareAtPrice: 1499000,
      categoryId: "cat-smart-home",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-accessory-pack",
    name: "Accessory Pack",
    slug: "accessory-pack",
    summary: "Bundle sensor tambahan untuk proyek AI.",
    description: "Termasuk sensor suhu, gerak, dan modul koneksi.",
    price: 799000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("accessory-pack", "IDR", 799000, accessoryPackImage, [
      {
        suffix: "basic",
        sku: "AP-BASIC",
        title: "Basic",
        stock: 40,
        options: { paket: "Basic" },
        isDefault: true,
      },
      {
        suffix: "extended",
        sku: "AP-EXT",
        title: "Extended",
        stock: 22,
        price: 999000,
        options: { paket: "Extended" },
      },
    ]),
    tags: ["accessories"],
    assets: [accessoryPackImage],
    metadata: {
      compareAtPrice: 999000,
      categoryId: "cat-accessories",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "prd-ai-display",
    name: "AI Display 13\"",
    slug: "ai-display-13",
    summary: "Panel sentuh dengan chip NPU terintegrasi.",
    description: "Dirancang untuk kiosk AI dan prototyping UI.",
    price: 8999000,
    currency: "IDR",
    status: "active",
    categories: [],
    variants: buildVariants("ai-display", "IDR", 8999000, aiDisplayImage, [
      {
        suffix: "matte",
        sku: "AD-MATTE",
        title: "Matte",
        stock: 9,
        options: { finishing: "Matte" },
        isDefault: true,
      },
      {
        suffix: "glossy",
        sku: "AD-GLOSS",
        title: "Glossy",
        stock: 11,
        priceOverride: 9299000,
        options: { finishing: "Glossy" },
      },
    ]),
    tags: ["display"],
    assets: [aiDisplayImage],
    metadata: {
      compareAtPrice: 9999000,
      categoryId: "cat-ai-devices",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
