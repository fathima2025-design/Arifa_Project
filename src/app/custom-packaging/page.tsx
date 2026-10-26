import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Sliders,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Package,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Custom Packaging & Foil Converting Services — OEM Tooling",
  description:
    "Bespoke packaging design, progressive die tooling, brand logo embossing, and high-speed aluminium converting services by Arifa Pack (Ajman, UAE).",
};

export default function CustomPackagingPage() {
  const steps = [
    {
      step: "01",
      title: "CAD Geometry & Volume Estimation",
      desc: "Our engineering team reviews your food-filling line requirements, sealing flange tolerances, and thermal baking constraints.",
    },
    {
      step: "02",
      title: "Precision Die & Tooling Prototyping",
      desc: "In-house CNC machining and trial tooling dies manufactured within 10–14 working days for dimensional pilot runs.",
    },
    {
      step: "03",
      title: "Embossing & Surface Lacquering",
      desc: "Bespoke company logos, recycling markings, and heat-resistant gold/white lacquers applied via rotogravure lines.",
    },
    {
      step: "04",
      title: "Full-Scale Stamping & Quality Sign-Off",
      desc: "High-speed multi-cavity press runs with 100% automated optical inspection and automated robotic stacking.",
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-transparent min-h-screen font-['Manrope'] text-white">
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3 bg-white/5 text-emerald-400 border-white/10">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            OEM & Custom Converting Services
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tailored Packaging Engineered for{" "}
            <span className="text-emerald-400">Automated Lines</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            From custom compartment geometries for international airlines to
            bespoke embossed bakery platters, Arifa Pack harnesses 780+ active
            conversion machines to deliver high-tolerance custom packaging solutions.
          </p>
        </div>

        {/* 3D Showcase & Technical Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <Packaging3DCanvas
              modelType="aluminium-container"
              initialFinish="golden-lacquer"
              allowFinishToggle={true}
              heightClass="h-[420px] sm:h-[480px]"
            />
            <div className="text-xs text-slate-400 flex items-center justify-between px-2">
              <span>Interactive Model: Custom Golden Lacquered Container</span>
              <span className="font-mono text-emerald-400 font-bold">Custom Tooling Batch</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Global Brands Choose Arifa Custom Tooling
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0b0f19]/80 border border-white/10 shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">
                    Micron-Precise Flange Sealing
                  </strong>
                  Uniform rim hems engineered to integrate seamlessly with automated
                  foil-crimping and heat-seal lid machinery without jamming.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0b0f19]/80 border border-white/10 shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">
                    Brand Logo Base Embossing
                  </strong>
                  Permanent crisp radial or centered company crests stamped directly
                  into the container floor, elevating end-user brand perception.
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0b0f19]/80 border border-white/10 shadow-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold mb-0.5">
                    Specialized High-Acid & Retort Lacquers
                  </strong>
                  Internal epoxy or polymer linings preventing corrosion from high-salinity
                  marinades, citrus sauces, or aggressive spices.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Engineering Workflow */}
        <div className="py-12 border-t border-white/10 mb-16">
          <SectionHeading
            badge="Engineering Process"
            title="From Concept CAD to"
            highlight="Mass Production"
            description="Our structured tooling workflow ensures zero defects and rapid commercial deployment."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0b0f19]/80 border border-white/10 shadow-lg relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-emerald-400/20 block mb-3 font-mono">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Tooling Inquiry Card */}
        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Direct Engineering Consultation
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">
              Start Your Custom Packaging Project
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Share your drawing specifications, target dimensions, and annual batch requirements.
            </p>
          </div>

          <QuoteRequestForm initialProductId="ap-oem-emb" isCompact={false} />
        </div>
      </Container>
    </div>
  );
}
