import React, { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogueView } from "@/components/products/CatalogueView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Product Catalogue — Aluminium Containers, Platters & Foil",
  description:
    "Browse Arifa Pack's complete range of aluminium food containers, catering platters, deep pots, heavy-duty foil rolls, and microwave packaging. Request wholesale quotes and custom tooling.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <Container>
            <div className="animate-pulse space-y-4 max-w-md mx-auto">
              <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto" />
              <div className="h-64 bg-slate-200 rounded-2xl mt-8" />
            </div>
          </Container>
        </div>
      }
    >
      <CatalogueView />
    </Suspense>
  );
}
