import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Calendar,
  Award,
  Cpu,
  Truck,
  Users,
  Recycle,
  CheckCircle,
  ArrowRight,
  FileDown,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "About Us — Heritage, Manufacturing & Leadership",
  description:
    "Learn about Arifa Packing & Packaging LLC (Arifa Group, Est. 1997). Discover our 780+ machine conversion facility in Ajman, UAE, board leadership, and ethical manufacturing standards.",
};

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20 bg-transparent min-h-screen font-['Manrope'] text-white">
      <Container size="wide">
        {/* Hero Banner */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3 bg-white/5 text-emerald-400 border-white/10">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            Established 1997 • Ajman, UAE
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Pioneering Precision Packaging Since{" "}
            <span className="text-emerald-400">{companyData.foundingYear}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            {companyData.statement}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="primary" size="md">
              Contact Leadership Team
            </Button>
            <a
              href={companyData.portals.brochurePdf}
              download
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-slate-200 hover:bg-white/5 transition-colors"
            >
              <FileDown className="w-4 h-4 text-emerald-400" />
              Download Corporate Profile (PDF)
            </a>
          </div>
        </div>

        {/* Verified Heritage & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 border-y border-white/10">
          <div className="lg:col-span-7 space-y-5 text-sm text-slate-300 leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The Arifa Pack Heritage
            </h2>

            <p>
              Founded in 1997 under the visionary direction of President & CEO{" "}
              <strong className="text-white">{companyData.leadership.president}</strong>,
              Arifa Packing & Packaging LLC began with a clear purpose: to produce
              internationally certified food packaging containers capable of meeting
              the rigorous culinary and logistics demands of the fast-growing hospitality,
              aviation, and foodservice sectors across the UAE and the wider Arabian Gulf.
            </p>

            <p>
              Over nearly three decades of dedicated investment in European-engineered
              multi-cavity stamping presses, precision slitting lines, and automated packaging
              machinery, Arifa Pack has expanded into a flagship manufacturer housing over{" "}
              <strong className="text-white">{companyData.metrics.machinesCount}+ active machines</strong>{" "}
              in Al Jurf Industrial Area 2, Ajman.
            </p>

            <div className="p-5 rounded-2xl bg-[#0b0f19]/80 border border-white/10 space-y-2 shadow-lg">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Corporate Core Motto:
              </span>
              <p className="text-base font-extrabold text-white italic">
                &ldquo;{companyData.slogan}&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0b0f19] text-white border border-white/10 space-y-4 shadow-2xl">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                Verified Corporate Governance
              </h3>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="border-b border-white/10 pb-2.5">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    President & CEO:
                  </span>
                  <span className="text-sm font-bold text-white">
                    {companyData.leadership.president}
                  </span>
                </div>

                <div className="border-b border-white/10 pb-2.5">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    Board of Directors:
                  </span>
                  <ul className="mt-1 space-y-1">
                    {companyData.leadership.directors.map((director, i) => (
                      <li key={i} className="font-semibold text-slate-200">
                        {director}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                    Manufacturing Facility:
                  </span>
                  <span className="font-medium text-slate-300">
                    {companyData.contact.fullLocationString}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Operational Values */}
        <div className="py-16">
          <SectionHeading
            badge="Corporate Ethics"
            title="Our Principles of"
            highlight="Engineering & Trust"
            description="Our ethical foundation and uncompromising focus on quality have positioned us as a trusted partner in the global packaging industry."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.coreValues.map((val, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#0b0f19]/80 border border-white/10 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-4 shadow-xs">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white">{val.title}</h3>
                  <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
