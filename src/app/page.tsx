import React from "react";
import { Hero } from "@/components/website/Hero";
import { CompanyStats } from "@/components/website/CompanyStats";
import { CategoryShowcase } from "@/components/website/CategoryShowcase";
import { FeaturedProducts } from "@/components/website/FeaturedProducts";
import { QuotationCTA } from "@/components/website/QuotationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero: Sustainable Packaging Solutions with 3D Interactive Model */}
      <Hero />

      {/* 2. Key Manufacturing Stats & Global Heritage */}
      <CompanyStats />

      {/* 3. Core 5 Packaging Categories (Gen-Z Bento Grid) */}
      <CategoryShowcase />

      {/* 4. Top Selling Products Catalogue */}
      <FeaturedProducts />

      {/* 5. Wholesale RFQ & Factory Direct Contact */}
      <QuotationCTA />
    </div>
  );
}
