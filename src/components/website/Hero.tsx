"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";

export const Hero: React.FC = () => {
  const [activeModel, setActiveModel] = useState<
    "aluminium-container" | "platter" | "foil-roll"
  >("aluminium-container");

  return (
    <section className="relative w-full overflow-hidden bg-transparent text-slate-900 pt-10 pb-16 lg:pt-16 lg:pb-24">
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline & Two Main CTAs with Motion */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Minimal Sub-Badge (Light Mode) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase">
                Arifa Packing & Packaging LLC • Ajman, UAE
              </span>
            </motion.div>

            {/* arifapack.com Authentic Headline with Gen-Z Impact */}
            <div className="space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-600 uppercase font-mono">
                SUSTAINABLE PACKAGING SOLUTIONS
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 uppercase">
                Next-Gen <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-slate-900">
                  Aluminium
                </span>{" "}
                Packaging
              </h1>
            </div>

            {/* Clean, Authentic 1-Line Proposition */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              Direct UAE manufacturer of premium food-grade aluminium containers, catering platters, and commercial foils since 1997.
            </p>

            {/* Quick Actions (Pill Buttons with Glow) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all font-bold rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              >
                Request Quote
              </Button>
              <a
                href="https://www.arifapack.com/images/Arifapack-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-300 shadow-md hover:shadow-lg transition-all"
              >
                Download Brochure (PDF)
              </a>
            </div>

            {/* Interactive 3D Key Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-3 sm:gap-4">
              <Card3D
                maxTilt={14}
                depth={15}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                  780+
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Automated Machines
                </div>
              </Card3D>

              <Card3D
                maxTilt={14}
                depth={15}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                  42+
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Export Markets
                </div>
              </Card3D>

              <Card3D
                maxTilt={14}
                depth={15}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 tracking-tight">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Infinitely Recyclable
                </div>
              </Card3D>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Product Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white via-slate-100/60 to-slate-200/40 shadow-xl border border-slate-200">
              <Packaging3DCanvas
                modelType={activeModel}
                initialFinish="mirror"
                allowFinishToggle={true}
                allowModelSwitch={true}
                heightClass="h-[360px] sm:h-[420px] lg:h-[450px]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
