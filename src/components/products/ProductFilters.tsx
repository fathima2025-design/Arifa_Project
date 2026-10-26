"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { categoriesData } from "@/data/categories";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  filter3DOnly: boolean;
  onToggle3D: () => void;
  filterEcoOnly: boolean;
  onToggleEco: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  filter3DOnly,
  onToggle3D,
  totalResults,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Bar & Results Count */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-9 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:bg-white/[0.05] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle3D}
            className={cn(
              "px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
              filter3DOnly
                ? "bg-emerald-500 text-slate-950 font-bold border-emerald-500"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
            )}
          >
            Interactive 3D Only
          </button>

          <span className="text-xs text-slate-400 hidden sm:inline">
            {totalResults} Products
          </span>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
            selectedCategory === "all"
              ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          All Categories
        </button>

        {categoriesData.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.slug)}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
              selectedCategory === cat.slug
                ? "bg-emerald-500 text-slate-950 font-bold shadow-xs"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
