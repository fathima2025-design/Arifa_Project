"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  FileDown,
  ShieldCheck,
  Globe,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { ContactForm } from "@/components/forms/ContactForm";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";
import { companyData } from "@/data/company";
import { cn } from "@/lib/utils";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"quote" | "general">("quote");

  return (
    <div className="py-12 lg:py-20 min-h-screen font-['Manrope'] bg-transparent text-white">
      <Container size="wide">
        {/* Header Section */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Contact & Procurement
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            Get in Touch with Arifa Pack
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Direct factory wholesale quotes, sample kits, and OEM packaging consultations from our manufacturing facility in Ajman, UAE.
          </p>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quotation & Contact Forms */}
          <div className="lg:col-span-7 bg-[#0b0f19]/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 shadow-2xl">
            {/* Form Mode Selector */}
            <div className="flex items-center p-1 bg-white/[0.03] rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("quote")}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "quote"
                    ? "bg-white/10 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                Commercial Quotation (RFQ)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "general"
                    ? "bg-white/10 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                General Inquiry
              </button>
            </div>

            {/* Active Form */}
            {activeTab === "quote" ? (
              <div>
                <div className="mb-5 pb-3 border-b border-white/10">
                  <h2 className="text-base font-bold text-white">
                    Request Wholesale Quotation
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select product format and specifications for direct factory pricing.
                  </p>
                </div>
                <QuoteRequestForm isCompact={false} />
              </div>
            ) : (
              <div>
                <div className="mb-5 pb-3 border-b border-white/10">
                  <h2 className="text-base font-bold text-white">
                    General Inquiry
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    For dealership inquiries, factory audits, or corporate visits.
                  </p>
                </div>
                <ContactForm />
              </div>
            )}
          </div>

          {/* Right Column: 3D Visualizer & Factory Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive 3D Model Card */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  3D Packaging Inspection
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  360° Interactive Orbit
                </span>
              </div>

              <Packaging3DCanvas
                modelType="aluminium-container"
                initialFinish="mirror"
                allowFinishToggle={true}
                allowModelSwitch={true}
                heightClass="h-[280px]"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Alloy: AA8011 Food Grade</span>
                <span>Temp: -40°C to +350°C</span>
              </div>
            </div>

            {/* Plant Details Card */}
            <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 space-y-5 shadow-2xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                Headquarters & Manufacturing Plant
              </h3>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">
                      Location:
                    </strong>
                    <span className="text-slate-400 leading-relaxed block mt-0.5">
                      {companyData.legalName}
                      <br />
                      {companyData.contact.address}, {companyData.contact.poBox}
                      <br />
                      {companyData.contact.city}, {companyData.contact.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">
                      Phone:
                    </strong>
                    <div className="space-y-1 mt-0.5 text-slate-300">
                      <div>
                        Packaging:{" "}
                        <a
                          href={`tel:${companyData.contact.packagingTel}`}
                          className="font-bold text-emerald-400 hover:text-emerald-300"
                        >
                          {companyData.contact.packagingTel}
                        </a>
                      </div>
                      <div>
                        Head Office:{" "}
                        <a
                          href={`tel:${companyData.contact.headOfficeTel}`}
                          className="hover:text-white"
                        >
                          {companyData.contact.headOfficeTel}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">
                      Email:
                    </strong>
                    <div className="mt-0.5">
                      <a
                        href={`mailto:${companyData.contact.email}`}
                        className="font-bold text-emerald-400 hover:text-emerald-300 block"
                      >
                        {companyData.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">
                      Hours (GST):
                    </strong>
                    <span className="text-slate-400 block mt-0.5">
                      {companyData.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <a
                  href={companyData.portals.brochurePdf}
                  download
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Company Profile (PDF)</span>
                </a>
              </div>
            </div>

            {/* Strategic Logistics Card */}
            <div className="p-5 rounded-2xl bg-[#0b0f19] text-white border border-white/10 space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  UAE Strategic Logistics
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Ajman & Jebel Ali
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Direct highway access to Dubai (E311 / E611) and major UAE sea ports, enabling scheduled ocean container departures to 42+ countries.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300">
                  Container freight dock operating 6 days a week
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
