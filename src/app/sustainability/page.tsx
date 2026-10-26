import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Recycle,
  Leaf,
  ShieldCheck,
  Flame,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Circular Sustainability & Recyclable Packaging",
  description:
    "Explore Arifa Pack's commitment to circular aluminium packaging, 95% recycling energy savings, scrap reclaim systems, and verified food safety standards.",
};

export default function SustainabilityPage() {
  const pillars = [
    {
      title: "Infinite Material Circularity",
      stat: "100%",
      sub: "Recyclable without property loss",
      desc: "Unlike plastics that degrade after downcycling, aluminium can be remelted indefinitely into the same high-purity alloy with zero loss of tensile strength or barrier performance.",
      icon: Recycle,
    },
    {
      title: "Energy & Carbon Abatement",
      stat: "95%",
      sub: "Energy savings vs virgin ore",
      desc: "Recycling aluminium scrap requires only 5% of the electric energy required to produce primary metal from bauxite ore, drastically curbing carbon emissions throughout the supply chain.",
      icon: Flame,
    },
    {
      title: "Plant Scrap Reclaim Protocol",
      stat: "Zero",
      sub: "Internal metal landfill waste",
      desc: "100% of stamping skeleton web off-cuts, trimmings, and punch scrap generated at our Ajman plant are baled and channeled directly into certified metallurgical recycling loops.",
      icon: Leaf,
    },
    {
      title: "Food Waste Reduction Barrier",
      stat: "Zero",
      sub: "Light, moisture, and aroma transmission",
      desc: "By preventing premature oxidative decay and moisture evaporation, hermetic aluminium packaging extends commercial shelf-life, preventing high-carbon food waste.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-transparent min-h-screen font-['Manrope'] text-white">
      <Container size="wide">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3 bg-white/5 text-emerald-400 border-white/10">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Verified Environmental Standards
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Circular Economy of{" "}
            <span className="text-emerald-400">Aluminium Packaging</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            At Arifa Packing & Packaging LLC, we believe authentic environmental
            responsibility is grounded in material physics, closed-loop scrap
            capture, and the elimination of single-use landfill waste.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-[#0b0f19]/80 border border-white/10 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-white font-mono">
                        {pillar.stat}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        {pillar.sub}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Facts & Legal Transparency Notice */}
        <div className="p-8 rounded-3xl bg-[#0b0f19] text-white border border-white/10 space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Verified Scientific & Industry Commitments
              </h3>
              <p className="text-xs text-slate-400">
                Data verified against international metallurgical standards and official plant audits
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 pt-2 border-t border-white/10">
            <div className="space-y-1">
              <strong className="text-white block font-semibold">
                Alloy Grade Purity:
              </strong>
              <span>
                Exclusively AA8011 and AA3003 food-contact certified aluminium.
              </span>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">
                No Microplastic Shedding:
              </strong>
              <span>
                Thermal baking in aluminium does not release microplastic particles into meals.
              </span>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">
                Global Compliance:
              </strong>
              <span>
                Manufactured in accordance with ISO 9001:2015, FDA 21 CFR, and HACCP guidelines.
              </span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10 text-xs">
            <span className="text-slate-400">
              Interested in transitioning your brand from single-use plastics to recyclable aluminium?
            </span>
            <Button href="/contact" variant="primary" size="sm">
              Speak with Sustainability Engineers
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
