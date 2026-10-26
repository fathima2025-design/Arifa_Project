import React from "react";
import { Hero } from "@/components/website/Hero";
import { CompanyStats } from "@/components/website/CompanyStats";
import { CategoryShowcase } from "@/components/website/CategoryShowcase";
import { FeaturedProducts } from "@/components/website/FeaturedProducts";
import { B2BEstimatorWidget } from "@/components/website/B2BEstimatorWidget";
import { MaterialComparator } from "@/components/website/MaterialComparator";
import { CapabilitiesSection } from "@/components/website/CapabilitiesSection";
import { SustainabilityHighlight } from "@/components/website/SustainabilityHighlight";
import { QuotationCTA } from "@/components/website/QuotationCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 3D Multi-Model Hero Section & Live Ticker */}
      <Hero />

      {/* Verified Global Metrics Bar */}
      <CompanyStats />

      {/* Product Categories Showcase */}
      <CategoryShowcase />

      {/* Featured Products with Real Studio Photography */}
      <FeaturedProducts />

      {/* Interactive B2B Volume & Freight Estimator Widget */}
      <B2BEstimatorWidget />

      {/* Interactive Material Comparator Benchmark */}
      <MaterialComparator />

      {/* Company Capabilities & 780+ Machines Infrastructure */}
      <CapabilitiesSection />

      {/* Environmental & Infinite Recyclability Benchmark */}
      <SustainabilityHighlight />

      {/* Global B2B Quotation Callout */}
      <QuotationCTA />
    </div>
  );
}
