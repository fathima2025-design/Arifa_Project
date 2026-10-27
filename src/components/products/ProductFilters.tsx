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
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
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
                ? "bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs"
                : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
            )}
          >
            Interactive 3D Only
          </button>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            {totalResults} Products
          </span>
        </div>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-slate-200">
        <button
          type="button"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer",
            selectedCategory === "all"
              ? "bg-emerald-600 text-white font-bold shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
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
                ? "bg-emerald-600 text-white font-bold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};
