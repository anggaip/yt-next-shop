export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id?: string | null;
};

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  compare_at_price?: number | null;
  status: "draft" | "active" | "archived";
};

export type ProductVariantRow = {
  id: string;
  product_id: string;
  sku: string;
  option_json: Record<string, string>;
  stock: number;
  price_override?: number | null;
};

export const categoriesTable: CategoryRow[] = [
  {
    id: "cat-ai-devices",
    name: "Perangkat AI",
    slug: "perangkat-ai",
    description: "Perangkat keras untuk eksperimen AI dan IoT.",
  },
  {
    id: "cat-smart-home",
    name: "Smart Home",
    slug: "smart-home",
    description: "Perangkat rumah pintar terintegrasi AI.",
  },
  {
    id: "cat-learning-kit",
    name: "Learning Kit",
    slug: "learning-kit",
    description: "Paket pembelajaran AI lengkap.",
  },
  {
    id: "cat-vision-module",
    name: "Vision Module",
    slug: "vision-module",
    description: "Modul kamera dan penglihatan komputer.",
    parent_id: "cat-ai-devices",
  },
  {
    id: "cat-voice-assistant",
    name: "Voice Assistant",
    slug: "voice-assistant",
    description: "Perangkat speaker pintar dan mikrofon AI.",
    parent_id: "cat-smart-home",
  },
  {
    id: "cat-robotics",
    name: "Robotik",
    slug: "robotik",
    description: "Komponen robot dan otomasi.",
    parent_id: "cat-ai-devices",
  },
  {
    id: "cat-cloud-service",
    name: "Layanan Cloud",
    slug: "layanan-cloud",
    description: "Langganan cloud inference dan data labeling.",
  },
  {
    id: "cat-accessories",
    name: "Aksesori",
    slug: "aksesori",
    description: "Sensor, casing, dan konektor tambahan.",
    parent_id: "cat-ai-devices",
  },
];

export const productsTable: ProductRow[] = [
  {
    id: "prd-edge-vision",
    name: "BelajarAI Edge Vision Kit",
    slug: "edge-vision-kit",
    description:
      "Kit kamera edge AI lengkap dengan modul NVIDIA Jetson, sensor 4K, dan casing industri yang siap produksi.",
    category_id: "cat-vision-module",
    price: 14999000,
    compare_at_price: 16999000,
    status: "active",
  },
  {
    id: "prd-voice-home",
    name: "Voice Home Smart Speaker",
    slug: "voice-home-speaker",
    description:
      "Speaker pintar dengan dukungan penuh Bahasa Indonesia, array mikrofon 6 arah, dan edge processing.",
    category_id: "cat-voice-assistant",
    price: 2499000,
    compare_at_price: 2999000,
    status: "active",
  },
  {
    id: "prd-robot-arm",
    name: "Robotik Arm Starter",
    slug: "robotic-arm-starter",
    description: "Lengan robot 6 DOF dengan kontroler web untuk pembelajaran otomasi dan kontrol AI.",
    category_id: "cat-robotics",
    price: 9999000,
    compare_at_price: 11999000,
    status: "active",
  },
  {
    id: "prd-cloud-credit",
    name: "Cloud AI Credit 1.000 Jam",
    slug: "cloud-ai-credit",
    description: "Paket 1.000 jam GPU inference di cloud BelajarAI termasuk observability dan data labeling basic.",
    category_id: "cat-cloud-service",
    price: 5599000,
    compare_at_price: 6599000,
    status: "active",
  },
  {
    id: "prd-learning-kit",
    name: "Learning Kit AI Dasar",
    slug: "learning-kit-ai",
    description: "Kit pembelajaran AI dengan modul microcontroller, sensor, dan kurikulum pendamping.",
    category_id: "cat-learning-kit",
    price: 1899000,
    compare_at_price: 2199000,
    status: "active",
  },
  {
    id: "prd-smart-light",
    name: "Smart Light Pro",
    slug: "smart-light-pro",
    description: "Lampu pintar multi-spektrum dengan konektivitas Matter dan sensor cahaya ambient.",
    category_id: "cat-smart-home",
    price: 1299000,
    compare_at_price: 1499000,
    status: "active",
  },
  {
    id: "prd-accessory-pack",
    name: "Accessory Pack",
    slug: "accessory-pack",
    description: "Bundle sensor tambahan—suhu, gerak, konektor—untuk melengkapi proyek AI.",
    category_id: "cat-accessories",
    price: 799000,
    compare_at_price: 999000,
    status: "active",
  },
  {
    id: "prd-ai-display",
    name: "AI Display 13\"",
    slug: "ai-display-13",
    description: "Panel sentuh 13 inci dengan chip NPU terintegrasi untuk kiosk AI dan prototyping UI.",
    category_id: "cat-ai-devices",
    price: 8999000,
    compare_at_price: 9999000,
    status: "active",
  },
];

export const productVariantsTable: ProductVariantRow[] = [
  {
    id: "var-edge-black-32",
    product_id: "prd-edge-vision",
    sku: "EV-BLK-32",
    option_json: { warna: "Hitam", penyimpanan: "32GB" },
    stock: 12,
    price_override: 13999000,
  },
  {
    id: "var-edge-silver-64",
    product_id: "prd-edge-vision",
    sku: "EV-SLV-64",
    option_json: { warna: "Perak", penyimpanan: "64GB" },
    stock: 7,
  },
  {
    id: "var-voice-black",
    product_id: "prd-voice-home",
    sku: "VH-BLK",
    option_json: { warna: "Hitam" },
    stock: 20,
  },
  {
    id: "var-voice-white",
    product_id: "prd-voice-home",
    sku: "VH-WHT",
    option_json: { warna: "Putih" },
    stock: 14,
    price_override: 2399000,
  },
  {
    id: "var-robot-kit",
    product_id: "prd-robot-arm",
    sku: "RA-KIT",
    option_json: { paket: "Lengkap" },
    stock: 5,
  },
  {
    id: "var-robot-bare",
    product_id: "prd-robot-arm",
    sku: "RA-BARE",
    option_json: { paket: "Tanpa Controller" },
    stock: 3,
    price_override: 8999000,
  },
  {
    id: "var-cloud-standard",
    product_id: "prd-cloud-credit",
    sku: "CC-STD",
    option_json: { paket: "Standard" },
    stock: 50,
  },
  {
    id: "var-cloud-priority",
    product_id: "prd-cloud-credit",
    sku: "CC-PRIO",
    option_json: { paket: "Priority" },
    stock: 25,
    price_override: 6599000,
  },
  {
    id: "var-learning-stu",
    product_id: "prd-learning-kit",
    sku: "LK-STU",
    option_json: { paket: "Student" },
    stock: 18,
  },
  {
    id: "var-learning-pro",
    product_id: "prd-learning-kit",
    sku: "LK-PRO",
    option_json: { paket: "Pro" },
    stock: 10,
    price_override: 2199000,
  },
  {
    id: "var-light-single",
    product_id: "prd-smart-light",
    sku: "SL-SINGLE",
    option_json: { paket: "Single" },
    stock: 30,
  },
  {
    id: "var-light-triple",
    product_id: "prd-smart-light",
    sku: "SL-TRIPLE",
    option_json: { paket: "Triple" },
    stock: 15,
    price_override: 3499000,
  },
  {
    id: "var-acc-basic",
    product_id: "prd-accessory-pack",
    sku: "AP-BASIC",
    option_json: { paket: "Basic" },
    stock: 40,
  },
  {
    id: "var-acc-ext",
    product_id: "prd-accessory-pack",
    sku: "AP-EXT",
    option_json: { paket: "Extended" },
    stock: 22,
    price_override: 999000,
  },
  {
    id: "var-display-matte",
    product_id: "prd-ai-display",
    sku: "AD-MATTE",
    option_json: { finishing: "Matte" },
    stock: 9,
  },
  {
    id: "var-display-glossy",
    product_id: "prd-ai-display",
    sku: "AD-GLOSS",
    option_json: { finishing: "Glossy" },
    stock: 11,
    price_override: 9299000,
  },
];
