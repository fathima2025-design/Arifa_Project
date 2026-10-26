import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Recycle,
  Sparkles,
  Phone,
  Mail,
  Box,
  Truck,
  CheckCircle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductSpecsTable } from "@/components/products/ProductSpecsTable";
import { ProductCard } from "@/components/products/ProductCard";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { productsData } from "@/data/products";
import { companyData } from "@/data/company";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} (${product.specs.itemCode})`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Arifa Pack UAE`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from the same or complementary category
  const relatedProducts = productsData
    .filter((p) => p.id !== product.id)
    .filter((p) => p.category === product.category || p.isFeatured)
    .slice(0, 3);

  return (
    <div className="py-10 lg:py-16 bg-transparent text-white min-h-screen font-['Manrope']">
      <Container size="wide">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Catalogue</span>
          </Link>

          <span className="text-xs font-mono font-bold text-emerald-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
            {product.specs.itemCode}
          </span>
        </div>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive 3D Model or Visual Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {product.has3DModel ? (
              <div className="space-y-3">
                <Packaging3DCanvas
                  modelType={product.model3DConfig?.modelType || "aluminium-container"}
                  initialFinish={product.model3DConfig?.defaultFinish || "mirror"}
                  allowFinishToggle={true}
                  heightClass="h-[440px] sm:h-[500px]"
                />
                <div className="flex items-center justify-between px-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    PBR Surface Materials • Drag to rotate 360°
                  </span>
                  <span>Alloy AA8011 / AA3003</span>
                </div>
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#0e1422] to-[#080c14] p-8 flex flex-col items-center justify-center text-white relative border border-white/10">
                <Box className="w-16 h-16 text-emerald-400 mb-3" />
                <h3 className="text-lg font-bold text-white">{product.name}</h3>
                <span className="text-xs text-slate-400 mt-1 font-mono">
                  {product.specs.itemCode}
                </span>
              </div>
            )}

            {/* Verified Capabilities Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-[#0b0f19] border border-white/10 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">
                  Food Contact Safe
                </span>
                <span className="text-[10px] text-slate-400">FDA 21 CFR Certified</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b0f19] border border-white/10 text-center">
                <Recycle className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">
                  100% Recyclable
                </span>
                <span className="text-[10px] text-slate-400">Infinitely Circular</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0b0f19] border border-white/10 text-center">
                <Truck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">
                  Export Ready
                </span>
                <span className="text-[10px] text-slate-400">FOB / CIF Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Overview, Key Features & Direct Quotation Form */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="blue" size="sm">
                  {product.categoryName}
                </Badge>
                {product.isEcoFriendly && (
                  <Badge variant="green" size="sm">
                    Circular Alloy
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs font-semibold text-slate-400 mt-1">
                {product.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                Engineering Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct RFQ Proposal Box */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Request Pricing & Sample Kit
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct factory wholesale rates from Ajman plant
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-white/5 border border-white/10 px-2 py-1 rounded">
                  MOQ: {product.minOrderQuantity || "Inquire"}
                </span>
              </div>

              <QuoteRequestForm
                initialProductId={product.id}
                isCompact={true}
              />
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <ProductSpecsTable product={product} />
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Related Packaging Solutions
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complementary containers and commercial packaging formats
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                View Complete Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
