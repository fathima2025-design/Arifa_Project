import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, FileDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { companyData } from "@/data/company";
import { categoriesData } from "@/data/categories";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#060910]/90 backdrop-blur-md text-slate-400 font-['Manrope'] border-t border-white/10">
      {/* Main Footer Content */}
      <div className="py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-5">
              <BrandLogo variant="light" />
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                {companyData.statement}
              </p>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <p className="font-semibold text-slate-300">
                  Arifa Packing & Packaging LLC (Est. {companyData.foundingYear})
                </p>
                <p className="text-slate-400">
                  Ajman Industrial Area 2, United Arab Emirates
                </p>
              </div>
              <div className="pt-2">
                <a
                  href={companyData.portals.brochurePdf}
                  download
                  className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 transition-colors border border-white/10"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Product Catalog (PDF)</span>
                </a>
              </div>
            </div>

            {/* Product Lines */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Product Lines
              </h4>
              <ul className="space-y-2.5 text-xs">
                {categoriesData.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="hover:text-emerald-400 transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Company
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/custom-packaging" className="hover:text-white transition-colors">
                    Custom Packaging
                  </Link>
                </li>
                <li>
                  <Link href="/sustainability" className="hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Request a Quote
                  </Link>
                </li>
                <li>
                  <a
                    href={companyData.portals.clientLogin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-emerald-400"
                  >
                    Client Portal
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Factory & Plant
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    {companyData.contact.address}, {companyData.contact.city}, {companyData.contact.country}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`tel:${companyData.contact.packagingTel}`}
                    className="hover:text-white transition-colors"
                  >
                    {companyData.contact.packagingTel}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`mailto:${companyData.contact.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {companyData.contact.email}
                  </a>
                </div>
                <div className="flex items-start gap-2.5 pt-1">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400">{companyData.contact.workingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 text-xs text-slate-400">
        <Container size="wide" className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; 2026 {companyData.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <span>Ajman, UAE</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};
