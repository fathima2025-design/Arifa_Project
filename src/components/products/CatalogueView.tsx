"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { productsData } from "@/data/products";
import { categoriesData } from "@/data/categories";

export const CatalogueView: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filter3DOnly, setFilter3DOnly] = useState(false);
  const [filterEcoOnly, setFilterEcoOnly] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const activeCategoryMeta = categoriesData.find(
    (c) => c.slug === selectedCategory
  );

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Category match
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // 3D Model filter
      if (filter3DOnly && !product.has3DModel) {
        return false;
      }

      // Eco / Recyclable filter
      if (filterEcoOnly && !product.isEcoFriendly) {
        return false;
      }

      // Text search match (name, itemCode, description, material)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCode = product.specs.itemCode.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesMat = product.specs.material.toLowerCase().includes(query);
        return matchesName || matchesCode || matchesDesc || matchesMat;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, filter3DOnly, filterEcoOnly]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setFilter3DOnly(false);
    setFilterEcoOnly(false);
  };

  return (
    <div className="py-16 min-h-screen font-['Manrope'] bg-transparent text-white relative">
      <Container size="wide" className="relative z-10">
        {/* Page Title & Category Header */}
        <div className="mb-10 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Product Catalogue
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            {activeCategoryMeta ? activeCategoryMeta.name : "All Packaging Solutions"}
          </h1>

          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            {activeCategoryMeta
              ? activeCategoryMeta.description
              : "Explore our full range of food containers, platters, hot pots, and commercial foil rolls manufactured in Ajman, UAE."}
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-mesh-card p-5 rounded-2xl border border-white/10 shadow-card-elevated mb-8 backdrop-blur-xl">
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            filter3DOnly={filter3DOnly}
            onToggle3D={() => setFilter3DOnly(!filter3DOnly)}
            filterEcoOnly={filterEcoOnly}
            onToggleEco={() => setFilterEcoOnly(!filterEcoOnly)}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          onResetFilters={handleResetFilters}
        />
      </Container>
    </div>
  );
};
