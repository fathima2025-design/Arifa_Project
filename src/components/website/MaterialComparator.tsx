"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const MaterialComparator: React.FC = () => {
  const comparisonData = [
    {
      feature: "Heat Range & Oven Safety",
      aluminium: "Up to +350°C (Oven, Grill & Direct Heat)",
      plastic: "Max +120°C (Deforms & melts)",
      bagasse: "Max +180°C (Scorches & burns)",
    },
    {
      feature: "Deep Freeze Resilience",
      aluminium: "Down to -40°C (Zero brittleness)",
      plastic: "Down to -20°C (Cracks under stress)",
      bagasse: "Weakens with moisture condensation",
    },
    {
      feature: "Moisture & Oxygen Barrier",
      aluminium: "100% Total Barrier (Locks in freshness)",
      plastic: "Semi-permeable over time",
      bagasse: "Permeable without synthetic coatings",
    },
    {
      feature: "Food Safety & Leaching",
      aluminium: "Zero microplastics, non-toxic",
      plastic: "Risk of chemical/polymer migration",
      bagasse: "Often relies on fluorochemical linings",
    },
    {
      feature: "Recyclability Mechanism",
      aluminium: "100% Infinitely Recyclable without loss",
      plastic: "Downcycled into lower-grade resins",
      bagasse: "Requires commercial composting hubs",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden border-b border-white/5 bg-transparent text-white">
      <Container size="wide" className="relative z-10">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Material Science
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
            Why Aluminium Excels in Food Service
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            A benchmark of thermal tolerance, barrier integrity, and circular sustainability compared with conventional polymers and molded fibers.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-mesh-card shadow-card-elevated">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-4 px-6 font-semibold text-slate-400 w-1/4">
                  Criterion
                </th>
                <th className="py-4 px-6 font-bold text-emerald-300 bg-emerald-500/10 border-x border-emerald-500/20 w-1/3">
                  Aluminium (Arifa Pack)
                </th>
                <th className="py-4 px-6 font-semibold text-slate-400 w-1/5 hidden sm:table-cell">
                  Plastic (PP / PET)
                </th>
                <th className="py-4 px-6 font-semibold text-slate-400 w-1/5 hidden sm:table-cell">
                  Bagasse / Paper
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-200">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 font-semibold text-white bg-emerald-500/[0.04] border-x border-emerald-500/15">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{row.aluminium}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white/5 text-slate-500 flex items-center justify-center shrink-0">
                        <X className="w-3 h-3" />
                      </span>
                      <span>{row.plastic}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-white/5 text-slate-500 flex items-center justify-center shrink-0">
                        <Minus className="w-3 h-3" />
                      </span>
                      <span>{row.bagasse}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};
