import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const CategoryShowcase: React.FC = () => {
  const featuredCategories = [
    {
      name: "Food Containers",
      slug: "aluminium-containers",
      description: "Precision-formed rectangular and multi-compartment containers for hot ovens, airline catering, and cold storage.",
      image: "/images/products/container-hero.jpg",
      formats: "18 Formats",
    },
    {
      name: "Catering Platters",
      slug: "aluminium-platters",
      description: "Heavy-gauge embossed banqueting platters with structural ribbing engineered for luxury food presentation.",
      image: "/images/products/platter-hero.jpg",
      formats: "8 Formats",
    },
    {
      name: "Commercial Foil Rolls",
      slug: "aluminium-foil",
      description: "Professional grade aluminium foil and cling film for commercial kitchens, rotisseries, and bakery prep.",
      image: "/images/products/foil-hero.jpg",
      formats: "12 Formats",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden font-['Manrope'] border-b border-white/5 bg-transparent text-white">
      <Container size="wide" className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Product Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Engineered for Culinary Standards
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group block relative rounded-2xl overflow-hidden bg-mesh-card hover:border-emerald-500/30 transition-all duration-300 shadow-card-elevated"
            >
              {/* Product Category Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/30 to-transparent" />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-medium text-emerald-300 border border-white/10">
                  {category.formats}
                </div>
              </div>

              {/* Category Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>{category.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
