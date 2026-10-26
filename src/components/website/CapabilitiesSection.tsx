import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      title: "780+ Precision Presses",
      description: "High-speed multi-cavity automated stamping with precision progressive dies.",
    },
    {
      title: "Continuous Coil Slitting",
      description: "Automated narrow tolerance slitting and high-barrier food lacquering lines.",
    },
    {
      title: "ISO 9001 & Food Contact QA",
      description: "Rigorous tensile, rim curl, and hermetic barrier testing compliant with FDA 21 CFR.",
    },
    {
      title: "Port-Linked Logistics",
      description: "Direct haulage routes to Jebel Ali Port and Port Khalid for worldwide container shipping.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden font-['Manrope'] border-b border-white/5 bg-transparent text-white">
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Manufacturing Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Manufacturing Infrastructure
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Industrial Scale with Precision Tooling
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Arifa Packing & Packaging LLC operates one of the region’s largest automated aluminium converting facilities in Ajman, UAE. We process premium food-grade alloy coils into high-barrier containers, heavy platters, and catering foils designed for high-heat baking and sub-zero storage.
            </p>

            {/* Clean Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {capabilities.map((cap, i) => (
                <div key={i} className="p-4 rounded-xl bg-mesh-card border border-white/10">
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{cap.title}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                href="/custom-packaging"
                variant="secondary"
                size="md"
                className="bg-white/10 hover:bg-white/15 text-white border-white/15"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Custom Packaging Solutions
              </Button>
            </div>
          </div>

          {/* Right: Factory Facility Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 p-1">
              <Image
                src="/images/company/factory-plant.jpg"
                alt="Arifa Pack Manufacturing Plant Ajman UAE"
                fill
                className="object-cover rounded-[22px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/90 via-transparent to-transparent rounded-[22px]" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
                <div className="text-sm font-bold">
                  Ajman Manufacturing Plant — UAE
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Automated stamping, converting, and quality laboratory
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
