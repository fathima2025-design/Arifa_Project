"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { QuickQuoteModal } from "./QuickQuoteModal";
import { PackageOpen, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onResetFilters,
}) => {
  const [selectedProductForQuote, setSelectedProductForQuote] =
    useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 my-8">
        <div className="w-16 h-16 rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mx-auto">
          <PackageOpen className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            No packaging items found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing active filters, or contact
            our Ajman engineering desk for custom OEM tooling.
          </p>
        </div>
        {onResetFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickQuote={(p) => setSelectedProductForQuote(p)}
          />
        ))}
      </div>

      <QuickQuoteModal
        product={selectedProductForQuote}
        isOpen={!!selectedProductForQuote}
        onClose={() => setSelectedProductForQuote(null)}
      />
    </>
  );
};
