import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data processing standards for Arifa Packing & Packaging LLC.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 lg:py-20 bg-transparent min-h-screen font-['Manrope'] text-white">
      <Container size="narrow">
        <div className="bg-[#0b0f19] p-8 sm:p-12 rounded-3xl border border-white/10 shadow-2xl space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-2">
              Corporate Compliance Notice
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Effective Date: January 1, 2025 • Last Updated: October 2026
            </p>
          </div>

          {/* Legal Review Advisory Notice */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-white">
                Information Subject to Corporate Legal Review:
              </strong>
              <span className="text-slate-400">
                This privacy statement outlines the general B2B enquiry, quotation,
                and CRM data handling procedures of Arifa Packing & Packaging LLC.
                Specific contractual data agreements for international distributors
                supersede these public website guidelines where applicable.
              </span>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">
                1. Data Collection & Purpose
              </h2>
              <p>
                When you submit a Request for Quotation (RFQ), sample request, or
                general inquiry through our website, {companyData.legalName} collects
                business contact details including your full name, corporate email,
                telephone number, company name, delivery country, and packaging specifications.
              </p>
              <p>
                This information is gathered strictly for the legitimate commercial
                purpose of calculating CIF/FOB pricing, coordinating sample delivery,
                and fulfilling contractual supply agreements.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                2. Data Sharing & Security
              </h2>
              <p>
                We do not sell, rent, or trade your corporate information to third-party
                marketers. Information is accessible solely to authorized sales engineers,
                logistics dispatchers, and CRM administrators within {companyData.legalName} and
                affiliates of Arifa Group.
              </p>
              <p>
                All quotation transmissions are encrypted via industry-standard Transport
                Layer Security (TLS) protocols.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                3. Customer Rights & Inquiries
              </h2>
              <p>
                You may request access to, correction of, or deletion of your corporate
                contact information by contacting our data protection representative:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                <div>{companyData.legalName}</div>
                <div>Attention: Compliance & Privacy Office</div>
                <div>{companyData.contact.address}, {companyData.contact.poBox}</div>
                <div>{companyData.contact.city}, {companyData.contact.country}</div>
                <div>Email: {companyData.contact.email}</div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
