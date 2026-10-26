import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { companyData } from "@/data/company";

export const QuotationCTA: React.FC = () => {
  return (
    <section className="py-24 bg-transparent text-white border-t border-white/5 font-['Manrope']">
      <Container size="wide">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Wholesale Procurement
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Upgrade Your Packaging Supply Chain
          </h2>

          <p className="text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
            Get factory-direct pricing on standard container lines or consult our engineering team for custom tool manufacturing in Ajman, UAE.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-lg shadow-emerald-600/20"
            >
              Request a Quote
            </Button>
            <Button
              href={`tel:${companyData.contact.packagingTel}`}
              variant="secondary"
              size="lg"
              icon={<Phone className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white border-white/10"
            >
              Call {companyData.contact.packagingTel}
            </Button>
          </div>

          <div className="pt-8 text-xs text-slate-400 flex items-center justify-center gap-6">
            <span>Direct UAE Factory Rates</span>
            <span>•</span>
            <span>Worldwide FOB/CIF Sea Freight</span>
            <span>•</span>
            <span>ISO 9001:2015 QA</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
