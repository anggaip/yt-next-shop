import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategoriesSection } from "@/components/categories/CategoriesSection";
import { HomeProducts } from "@/components/products/HomeProducts";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="flex flex-col gap-6 rounded-3xl border border-border bg-gradient-to-br from-background via-background to-muted/40 p-10 text-center md:text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          BelajarAI Store
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          Semua perangkat AI favorit Anda dalam satu tempat.
        </h1>
        <p className="text-lg text-muted-foreground">
          Temukan perangkat keras, kit pembelajaran, dan layanan cloud yang siap membantu eksperimen AI Anda.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="gap-2">
            Mulai Belanja
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Lihat katalog lengkap
          </Button>
        </div>
      </section>

      <CategoriesSection />
      <HomeProducts />
    </div>
  );
}
