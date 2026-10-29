"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { QuickQuoteModal } from "@/components/products/QuickQuoteModal";
import { productsData } from "@/data/products";

export const B2BEstimatorWidget: React.FC = () => {
  const [unitsNeeded, setUnitsNeeded] = useState(50000);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedProduct = productsData[selectedProductIndex] || productsData[0];
  const pcsPerCarton = typeof selectedProduct.specs.caseCount === "number"
    ? selectedProduct.specs.caseCount
    : parseInt(String(selectedProduct.specs.caseCount).replace(/\D/g, "") || "500", 10);

  const cartons = Math.ceil(unitsNeeded / (pcsPerCarton || 500));
  const pallets = (cartons / 24).toFixed(1);
  const container20ftPct = Math.min(100, Math.round((cartons / 600) * 100));

  return (
    <section className="py-24 relative overflow-hidden border-b border-white/5 bg-transparent text-white">
      <Container size="wide" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Procurement & Freight
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2">
              Volume & Logistics Estimator
            </h2>
            <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto">
              Estimate carton counts, pallet requirements, and 20ft container utilization for your wholesale orders from Ajman, UAE.
            </p>
          </div>

          {/* Calculator Container */}
          <div className="p-8 sm:p-10 rounded-3xl bg-mesh-card text-white shadow-card-elevated border border-white/10 space-y-8 backdrop-blur-xl">
            {/* Input Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pb-8 border-b border-white/10">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Select Product
                </label>
                <select
                  value={selectedProductIndex}
                  onChange={(e) => setSelectedProductIndex(Number(e.target.value))}
                  className="w-full text-sm bg-black/40 border border-white/15 rounded-xl p-3.5 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {productsData.map((p, idx) => (
                    <option key={p.id} value={idx} className="bg-slate-900 text-white">
                      {p.name} ({p.specs.itemCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Required Units
                  </label>
                  <span className="text-base font-bold text-emerald-400 font-mono">
                    {unitsNeeded.toLocaleString()} pcs
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span>5,000</span>
                  <span>100,000</span>
                  <span>250,000 pcs</span>
                </div>
              </div>
            </div>

            {/* Metrics Output Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-slate-400 font-medium">Cartons</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                  {cartons.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {pcsPerCarton} pcs/case
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-slate-400 font-medium">Pallets</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
                  {pallets}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Euro standard
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-xs text-slate-400 font-medium">20ft Container</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
                  {container20ftPct}%
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Capacity fill
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Direct factory wholesale rates with FOB/CIF shipping to any international port.
                </span>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => setIsModalOpen(true)}
                icon={<ArrowRight className="w-4 h-4" />}
                className="whitespace-nowrap shadow-glow-emerald"
              >
                Get Volume Quote
              </Button>
            </div>
          </div>
        </div>

        <QuickQuoteModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </Container>
    </section>
  );
};
