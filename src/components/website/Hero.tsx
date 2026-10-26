"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";

export const Hero: React.FC = () => {
  const [activeModel, setActiveModel] = useState<
    "aluminium-container" | "platter" | "foil-roll"
  >("aluminium-container");

  return (
    <section className="relative w-full overflow-hidden bg-transparent text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Headline & Two Main CTAs with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8 text-left"
          >
            {/* Minimal Sub-Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
                UAE Manufacturer • Global Distribution
              </span>
            </motion.div>

            {/* Clear, Powerful Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Engineered for Freshness.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                Infinite by Nature.
              </span>
            </h1>

            {/* Crisp Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Premium aluminium food containers, platters, and commercial foils
              manufactured with automated precision in Ajman, UAE for airlines,
              food processors, and international hospitality brands.
            </p>

            {/* Only Two Main CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all"
              >
                Explore Products
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/15 text-white border-white/15 backdrop-blur-md"
              >
                Request a Quote
              </Button>
            </div>

            {/* Clean Key Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  780+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Automated Machines
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  42+
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Export Markets
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
                  100%
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  Infinitely Recyclable
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Product Presentation with Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl">
              <Packaging3DCanvas
                modelType={activeModel}
                initialFinish="mirror"
                allowFinishToggle={true}
                allowModelSwitch={true}
                heightClass="h-[460px] sm:h-[530px]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
