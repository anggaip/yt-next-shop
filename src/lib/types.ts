export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  parentId?: string | null;
};

export type Variant = {
  id: string;
  sku: string;
  title: string;
  price: number;
  currency: string;
  stock: number;
  attributes: Record<string, string | number>;
  imageUrl?: string | null;
  isDefault?: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  price: number;
  currency: string;
  status: "draft" | "active" | "archived";
  categories: Category[];
  variants: Variant[];
  tags?: string[];
  assets: string[];
  metadata?: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId?: string | null;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  subtotal: number;
  imageUrl?: string | null;
};

export type Voucher = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  maxDiscount?: number;
  description?: string | null;
  expiresAt?: string | null;
};

export type Cart = {
  id: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  shippingTotal: number;
  taxTotal: number;
  total: number;
  currency: string;
  voucher?: Voucher | null;
  updatedAt: string;
};

export type ShippingQuote = {
  id: string;
  carrier: string;
  service: string;
  cost: number;
  currency: string;
  estimatedDays: {
    min: number;
    max: number;
  };
};

export type Order = {
  id: string;
  number: string;
  status: "pending" | "processing" | "fulfilled" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  items: CartItem[];
  totals: {
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    grandTotal: number;
    currency: string;
  };
  shippingAddress: Address;
  billingAddress: Address;
  shippingQuote?: ShippingQuote;
  placedAt: string;
  updatedAt: string;
};

export type Address = {
  fullName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state?: string | null;
  postalCode: string;
  country: string;
  phone?: string | null;
};

export type PaymentInitResponse = {
  reference: string;
  provider: string;
  paymentUrl?: string;
  clientSecret?: string;
  expiresAt: string;
  payload: Record<string, unknown>;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
