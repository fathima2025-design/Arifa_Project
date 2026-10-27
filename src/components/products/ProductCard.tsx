"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Product } from "@/types/product";
import { Card3D } from "@/components/ui/Card3D";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickQuote?: (product: Product) => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickQuote,
  className,
}) => {
  return (
    <Card3D
      maxTilt={10}
      depth={25}
      className={cn(
        "group relative flex flex-col bg-white rounded-3xl border border-slate-200/80 hover:border-emerald-400/60 transition-all duration-300 overflow-hidden shadow-xs hover:shadow-2xl h-full",
        className
      )}
    >
      {/* Product Image Area with Zoom */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] bg-slate-100 overflow-hidden block"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-medium">
            Arifa Pack Packaging
          </div>
        )}

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold text-slate-800 border border-slate-200 shadow-xs">
          {product.specs.itemCode}
        </div>

        {product.has3DModel && (
          <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-600 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>3D</span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            {product.categoryName}
          </span>

          <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription}
          </p>

          {/* Essential Specs */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div>
              <span className="text-slate-400 text-[10px] block">Capacity / Dim</span>
              <span className="font-semibold text-slate-800">
                {product.dimensions.capacityMl
                  ? `${product.dimensions.capacityMl} ml`
                  : product.dimensions.topOut || "Standard"}
              </span>
            </div>
            {product.specs.caseCount && (
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Case Pack</span>
                <span className="font-semibold text-slate-800">
                  {product.specs.caseCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-bold text-slate-700 hover:text-emerald-600 inline-flex items-center gap-1 transition-colors group-hover:translate-x-0.5"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
          </Link>

          {onQuickQuote && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickQuote(product);
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-200/80 shadow-2xs hover:scale-105 cursor-pointer"
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    </Card3D>
  );
};
