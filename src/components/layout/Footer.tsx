"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { companyData } from "@/data/company";

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail("");
      }, 4000);
    }
  };

  return (
    <footer className="relative z-20 w-full font-['Manrope'] select-none">
      {/* ─── 1. Top Pre-Footer Contact Highlight Bar (Dark Charcoal / Navy) ─── */}
      <section className="bg-[#2f3842] text-white py-12 border-t border-slate-700/60">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-600/50">
            {/* Column 1: Phone Support */}
            <div className="flex flex-col items-center justify-between pt-4 md:pt-0 px-4 space-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#1ebd40]">
                <Phone className="w-7 h-7 fill-current" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white tracking-tight">
                  Have a question? Call us now
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Office : +971 6 747 7061
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2 rounded-md bg-[#1ebd40] hover:bg-[#19a537] text-white text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Column 2: Email Support */}
            <div className="flex flex-col items-center justify-between pt-6 md:pt-0 px-4 space-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#1ebd40]">
                <Mail className="w-7 h-7 fill-current" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white tracking-tight">
                  Need support? Drop us an email
                </div>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="text-xs text-slate-300 font-medium hover:text-white transition-colors block"
                >
                  {companyData.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2 rounded-md bg-[#1ebd40] hover:bg-[#19a537] text-white text-xs font-bold transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  Send Message
                </Link>
              </div>
            </div>

            {/* Column 3: Working Hours */}
            <div className="flex flex-col items-center justify-between pt-6 md:pt-0 px-4 space-y-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#1ebd40]">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-white tracking-tight">
                  We are open on
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Monday - Saturday: 8.00am to 8.00pm
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Sunday &ndash; Closed
                </div>
              </div>
              <div className="h-8" />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 2. Main 4-Column Footer (Clean White Background) ─── */}
      <section className="bg-white text-slate-700 py-14 border-t border-slate-200">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            {/* Column 1: Brand Logo & Company Description (Col span 4) */}
            <div className="lg:col-span-4 space-y-4">
              <BrandLogo variant="dark" />
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm font-normal">
                ARIFA PACK specializes in high-quality disposable packaging solutions
                including aluminum containers, plastic containers, and disposable cutlery.
              </p>
              <div className="pt-2 text-xs text-slate-500 space-y-0.5">
                <div className="font-semibold text-slate-800">
                  {companyData.legalName}
                </div>
                <div>Al Jurf Industrial Area 2, Ajman, United Arab Emirates</div>
              </div>
            </div>

            {/* Column 2: Quick Links (Col span 2) */}
            <div className="lg:col-span-2 space-y-1">
              <h4 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
                Quick Links
              </h4>
              <div className="w-9 h-[2.5px] bg-[#1ebd40] mb-4 rounded-full" />
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li>
                  <Link href="/about" className="hover:text-[#1ebd40] transition-colors block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-[#1ebd40] transition-colors block">
                    Our Products
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.arifapack.com/images/Arifapack-profile.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#1ebd40] transition-colors block"
                  >
                    Quality Standards
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#1ebd40] transition-colors block">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Product Categories (Col span 3) */}
            <div className="lg:col-span-3 space-y-1">
              <h4 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
                Product Categories
              </h4>
              <div className="w-9 h-[2.5px] bg-[#1ebd40] mb-4 rounded-full" />
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li>
                  <Link
                    href="/products?category=aluminium-containers"
                    className="hover:text-[#1ebd40] transition-colors block"
                  >
                    Aluminum Containers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=plastic-containers"
                    className="hover:text-[#1ebd40] transition-colors block"
                  >
                    Plastic Containers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=disposable-cutlery"
                    className="hover:text-[#1ebd40] transition-colors block"
                  >
                    Disposable Cutlery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=aluminium-foil"
                    className="hover:text-[#1ebd40] transition-colors block"
                  >
                    Aluminum Foil
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Newsletter & Round Social Channels (Col span 3) */}
            <div className="lg:col-span-3 space-y-1">
              <h4 className="text-sm font-extrabold text-[#0A2540] tracking-tight">
                Newsletter
              </h4>
              <div className="w-9 h-[2.5px] bg-[#1ebd40] mb-4 rounded-full" />
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Subscribe for the latest updates and product releases.
              </p>

              {isSubscribed ? (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-stretch rounded-md overflow-hidden max-w-sm shadow-xs border border-slate-300">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address Here...."
                    className="flex-1 px-3.5 py-2.5 bg-[#e5e7eb]/80 text-xs text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#1ebd40] hover:bg-[#19a537] text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    Go
                  </button>
                </form>
              )}

              {/* Black Round Social Buttons */}
              <div className="pt-4 flex items-center gap-2.5">
                <a
                  href={companyData.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#1ebd40] transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a
                  href={companyData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#1ebd40] transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href={companyData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#1ebd40] transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── 3. Bottom Black Copyright Bar ─── */}
      <section className="bg-[#181d21] py-4 text-center border-t border-slate-800">
        <Container size="wide">
          <p className="text-xs text-slate-300 font-normal">
            Copyright &copy; 2025 ARIFA PACKING &amp; PACKAGING LLC. All rights reserved.
          </p>
        </Container>
      </section>
    </footer>
  );
};
