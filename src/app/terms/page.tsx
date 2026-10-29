import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AlertTriangle, FileText } from "lucide-react";
import { companyData } from "@/data/company";

export const metadata: Metadata = {
  title: "Terms and Conditions of Supply",
  description:
    "Standard commercial quotation and supply terms for Arifa Packing & Packaging LLC.",
};

export default function TermsPage() {
  return (
    <div className="py-12 lg:py-20 bg-transparent min-h-screen text-slate-900">
      <Container size="narrow">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 space-y-8">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider block mb-2">
              Commercial Operations Framework
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Terms & Conditions of Supply
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Applicable to Wholesale Quotations, Tooling Contracts & Ocean Freight
            </p>
          </div>

          {/* Legal Review Advisory Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-950">
                Information Subject to Corporate & Legal Review:
              </strong>
              <span className="text-amber-800 leading-relaxed block mt-0.5">
                These terms provide the baseline framework for quotation requests
                and online product inquiries. Executed proforma invoices, sales
                contracts, letters of credit (LC), and signed distributor agreements
                supersede these general terms.
              </span>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                1. Quotations & Pricing Validity
              </h2>
              <p>
                All wholesale quotations generated through this website or provided
                by our Ajman sales desk are based on prevailing aluminium ingot market
                rates (LME - London Metal Exchange) and are valid for a period of 14
                calendar days from the date of issuance unless explicitly stated otherwise.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                2. Manufacturing Tolerances & Standards
              </h2>
              <p>
                Standard industrial tolerances apply to container depths, rim curls,
                and material micron gauges in accordance with international aluminium
                packaging standards (DIN / ASTM / ISO). Minor variance within ±5%
                of stated micron thickness falls within commercial tolerances.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                3. Custom Tooling & Intellectual Property
              </h2>
              <p>
                Custom dies, molds, and tooling developed for bespoke customer logos
                or proprietary compartment designs remain exclusively reserved for
                the contracting customer as specified in the signed OEM agreement.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900">
                4. Governing Jurisdiction
              </h2>
              <p>
                These terms and any commercial contracts arising under them are
                governed by and construed in accordance with the federal laws of the
                United Arab Emirates and the local laws of the Emirate of Ajman.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
