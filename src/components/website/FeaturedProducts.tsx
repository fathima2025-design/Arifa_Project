"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { QuickQuoteModal } from "@/components/products/QuickQuoteModal";
import { productsData } from "@/data/products";
import { Product } from "@/types/product";

export const FeaturedProducts: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = productsData.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <section className="py-24 relative overflow-hidden font-['Manrope'] border-b border-white/5 bg-transparent text-white">
      <Container size="wide" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Featured Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              High-Demand Foodservice Packaging
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Precision-stamped aluminium food containers, platters, and commercial foils trusted across global catering networks.
            </p>
          </div>

          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <span>Explore Complete Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickQuote={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        <QuickQuoteModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </Container>
    </section>
  );
};
