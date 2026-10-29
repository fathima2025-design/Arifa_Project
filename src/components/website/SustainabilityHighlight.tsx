import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const SustainabilityHighlight: React.FC = () => {
  return (
    <section className="py-24 bg-transparent text-white relative overflow-hidden">
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Circular Economy
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              100% Infinitely Recyclable Food Packaging
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Unlike plastics and multi-layer composites that degrade or end up in landfills, aluminium can be remelted and recycled indefinitely with zero loss in material quality, purity, or strength.
            </p>

            <ul className="space-y-3 text-sm text-slate-300 pt-1">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>95% less energy needed to recycle compared to primary production</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Zero plastic liners, zero fluorochemicals (PFAS-free)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>Complete barrier protection reducing worldwide food spoilage</span>
              </li>
            </ul>

            <div className="pt-2">
              <Button
                href="/sustainability"
                variant="secondary"
                size="md"
                className="bg-white/10 hover:bg-white/15 text-white border-white/15"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Learn About Our Circular Mission
              </Button>
            </div>
          </div>

          {/* Right Metrics Box */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  100%
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  Recyclability Rate
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Pure elemental aluminium with zero structural decay.
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  -95%
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  Energy Consumption
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Saved during secondary conversion versus raw ore smelting.
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  0%
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  Microplastics
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Safe under high temperature baking and sub-zero freeze.
                </div>
              </div>

              <div>
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  +350°C
                </div>
                <div className="text-sm font-bold text-white mt-2">
                  Thermal Ceiling
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Certified for standard ovens, rotisseries, and air fryers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
