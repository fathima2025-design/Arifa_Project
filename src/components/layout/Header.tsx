"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Layers,
  ArrowRight,
  FileDown,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { companyData } from "@/data/company";
import { categoriesData } from "@/data/categories";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Products", href: "/products", hasDropdown: true },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-['Manrope']">
      {/* Top Announcement Bar (arifapack.com authentic contacts, login & brochure) */}
      <div className="bg-slate-100/95 backdrop-blur-md text-slate-700 text-xs py-2 border-b border-slate-200/90 hidden sm:block">
        <Container size="wide" className="flex items-center justify-end">

          <div className="flex items-center gap-4 text-slate-700">
            {/* Direct Contact */}
            <a
              href={`mailto:${companyData.contact.email}`}
              className="hover:text-slate-900 transition-colors inline-flex items-center gap-1.5 font-medium"
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>{companyData.contact.email}</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="tel:+97167485384"
              className="hover:text-slate-900 font-bold transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+971 6 74 85384</span>
            </a>
            <span className="text-slate-300">•</span>

            {/* Social Channels - Prominent, Clearly Sized Icons */}
            <div className="flex items-center gap-2">
              <a
                href={companyData.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp (+971 6 747 7061)"
                className="h-7 sm:h-8 px-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center gap-1.5 font-extrabold text-xs transition-all shadow-sm hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.003-.477-1.674-.694-2.73-2.42-2.815-2.531-.082-.113-.674-.897-.674-1.71 0-.814.428-1.215.58-1.381.153-.166.333-.208.444-.208.11 0 .222.001.32.006.101.005.236-.038.37.283.138.33.473 1.15.513 1.235.042.085.068.185.013.297-.056.113-.084.185-.168.283-.085.099-.178.22-.254.296-.086.084-.176.175-.075.348.1.174.444.733.953 1.187.656.584 1.21.765 1.382.85.172.085.273.071.375-.043.102-.114.435-.506.55-.679.117-.172.232-.143.39-.086.158.058 1.002.472 1.174.558.172.086.287.129.33.201.042.072.042.417-.102.822z" />
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.36 5L2 22l5.22-1.33C8.63 21.49 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.21l-.31-.18-3.1.81.83-3.02-.2-.32C4.1 14.83 3.6 13.45 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a
                href={companyData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Follow on Facebook"
                className="w-8 h-8 rounded-full bg-white hover:bg-blue-50 text-blue-600 border border-slate-300 flex items-center justify-center transition-all shadow-xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href={companyData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                title="Follow on Twitter / X"
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 flex items-center justify-center transition-all shadow-xs hover:scale-105"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={companyData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow on Instagram"
                className="w-8 h-8 rounded-full bg-white hover:bg-pink-50 text-pink-600 border border-slate-300 flex items-center justify-center transition-all shadow-xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={companyData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="Connect on LinkedIn"
                className="w-8 h-8 rounded-full bg-white hover:bg-blue-50 text-[#0077b5] border border-slate-300 flex items-center justify-center transition-all shadow-xs hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>

            <span className="text-slate-300">•</span>

            {/* Client Portal Login */}
            <a
              href={companyData.portals.clientLogin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs transition-colors border border-emerald-200 shadow-xs"
            >
              <User className="w-3.5 h-3.5 text-emerald-600" />
              <span>Login</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Clean Light Glass Navigation Bar */}
      <nav
        className={cn(
          "w-full bg-white/95 backdrop-blur-xl transition-all duration-300 border-b border-slate-200/80",
          isScrolled ? "py-3 shadow-md" : "py-4"
        )}
      >
        <Container size="wide" className="flex items-center justify-between">
          {/* Logo with dark text for light background */}
          <BrandLogo variant="dark" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors",
                        isActive
                          ? "text-emerald-600 bg-emerald-50 font-bold"
                          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200 text-slate-400",
                          isProductsDropdownOpen ? "rotate-180" : ""
                        )}
                      />
                    </Link>

                    {/* Mega Dropdown Menu */}
                    {isProductsDropdownOpen && (
                      <div className="absolute top-full left-0 w-[540px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {categoriesData.map((category) => (
                              <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                              >
                                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                                    {category.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                    {category.tagline}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-2 text-xs">
                            <span className="text-slate-500 font-medium">
                              ISO 9001 & Food Contact Certified
                            </span>
                            <Link
                              href="/products"
                              className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-1"
                            >
                              Explore All Products
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors",
                    isActive
                      ? "text-emerald-600 bg-emerald-50 font-bold"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Header CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              className="shadow-sm shadow-emerald-600/30 font-bold"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>
        </Container>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in fade-in duration-200">
            <Container className="py-4 space-y-3">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors",
                      isActive
                        ? "text-emerald-600 bg-emerald-50"
                        : "text-slate-800 hover:bg-slate-50"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={companyData.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm transition-all shadow-md"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.003-.477-1.674-.694-2.73-2.42-2.815-2.531-.082-.113-.674-.897-.674-1.71 0-.814.428-1.215.58-1.381.153-.166.333-.208.444-.208.11 0 .222.001.32.006.101.005.236-.038.37.283.138.33.473 1.15.513 1.235.042.085.068.185.013.297-.056.113-.084.185-.168.283-.085.099-.178.22-.254.296-.086.084-.176.175-.075.348.1.174.444.733.953 1.187.656.584 1.21.765 1.382.85.172.085.273.071.375-.043.102-.114.435-.506.55-.679.117-.172.232-.143.39-.086.158.058 1.002.472 1.174.558.172.086.287.129.33.201.042.072.042.417-.102.822z" />
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.36 5L2 22l5.22-1.33C8.63 21.49 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.21l-.31-.18-3.1.81.83-3.02-.2-.32C4.1 14.83 3.6 13.45 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
                <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                  Request a Quote
                </Button>
                <a
                  href="https://www.arifapack.com/images/Arifapack-profile.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <FileDown className="w-4 h-4 text-emerald-600" />
                  <span>Download Brochure (PDF)</span>
                </a>
              </div>
            </Container>
          </div>
        )}
      </nav>
    </header>
  );
};
