import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
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
    <div
      className={cn(
        "group relative flex flex-col bg-mesh-card rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden shadow-card-elevated",
        className
      )}
    >
      {/* Product Image Area */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] bg-slate-950 overflow-hidden block"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500 text-xs font-medium">
            Arifa Pack Packaging
          </div>
        )}

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono font-medium text-slate-200 border border-white/10">
          {product.specs.itemCode}
        </div>

        {product.has3DModel && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
            3D
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
            {product.categoryName}
          </span>

          <h3 className="text-base font-bold text-white mt-1 line-clamp-1 group-hover:text-emerald-400 transition-colors">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Essential Specs Only */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-slate-400">
            <div>
              <span className="text-slate-400 text-[10px] block">Capacity / Dim</span>
              <span className="font-semibold text-slate-200">
                {product.dimensions.capacityMl
                  ? `${product.dimensions.capacityMl} ml`
                  : product.dimensions.topOut || "Standard"}
              </span>
            </div>
            {product.specs.caseCount && (
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Case Pack</span>
                <span className="font-semibold text-slate-200">
                  {product.specs.caseCount}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-bold text-slate-300 hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {onQuickQuote && (
            <button
              type="button"
              onClick={() => onQuickQuote(product)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
            >
              Get Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
