"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card3D } from "@/components/ui/Card3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CategoryShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      name: "Aluminium Food Containers",
      slug: "aluminium-containers",
      tagline: "Oven & freezer safe rectangular & compartment trays",
      image: "/images/products/container-hero.jpg",
      badge: "Flagship Line",
      colSpan: "md:col-span-2",
    },
    {
      name: "Aluminium Platters & Pots",
      slug: "aluminium-platters",
      tagline: "Heavy-gauge embossed banqueting & catering platters",
      image: "/images/products/platter-hero.jpg",
      badge: "Catering Luxury",
      colSpan: "md:col-span-1",
    },
    {
      name: "Aluminium Foil & Cling Film",
      slug: "aluminium-foil",
      tagline: "Commercial kitchen rolls & food wrapping films",
      image: "/images/products/foil-hero.jpg",
      badge: "Commercial Grade",
      colSpan: "md:col-span-1",
    },
    {
      name: "Plastic Microwave Containers",
      slug: "plastic-containers",
      tagline: "Food-grade airtight hot & cold deli containers",
      image: "/images/products/plastic-mw-750.jpg",
      badge: "Microwave Safe",
      colSpan: "md:col-span-1",
    },
    {
      name: "Disposable Cutlery",
      slug: "disposable-cutlery",
      tagline: "Sturdy hygiene-sealed forks, spoons & dining kits",
      image: "/images/products/cutlery-kit-4in1.jpg",
      badge: "Hygiene Packaged",
      colSpan: "md:col-span-1",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Bento cards staggered cascade
      gsap.fromTo(
        ".bento-card-wrapper",
        { y: 55, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 relative overflow-hidden border-b border-slate-200/80 bg-transparent text-slate-900"
    >
      <Container size="wide" className="relative z-10">
        {/* Header with GSAP ScrollTrigger */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Direct Manufacturing Lines
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Our Core Packaging Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors group"
          >
            <span>View Full Product Catalogue</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Layout with GSAP ScrollTrigger */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.slug} className={`bento-card-wrapper ${cat.colSpan}`}>
              <Link href={`/products?category=${cat.slug}`} className="block h-full">
                <Card3D
                  maxTilt={10}
                  depth={30}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200/80 hover:border-emerald-400/60 shadow-sm hover:shadow-2xl flex flex-col justify-between h-full transition-all"
                >
                  {/* Image Area with Zoom */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent" />

                    {/* Floating Pill Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-emerald-800 border border-slate-200 shadow-sm group-hover:scale-105 transition-transform">
                      {cat.badge}
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="p-6 pt-3 bg-white">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1.5 transition-transform" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>
                </Card3D>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
