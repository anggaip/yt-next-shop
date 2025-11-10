import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://belajarai.store";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BelajarAI Store",
    template: "%s | BelajarAI Store",
  },
  description: "Belanja perangkat AI, aksesori, dan paket pembelajaran terbaik di BelajarAI Store.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BelajarAI Store",
    description: "Ekosistem produk AI yang terkurasi untuk menunjang produktivitas Anda.",
    url: siteUrl,
    siteName: "BelajarAI Store",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BelajarAI Store",
      },
    ],
    type: "website",
  },
};

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-10">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
