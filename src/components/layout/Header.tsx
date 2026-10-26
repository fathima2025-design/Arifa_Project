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
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Custom Packaging", href: "/custom-packaging" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full font-['Manrope']">
      {/* Sleek Minimalist Top Announcement Bar */}
      <div className="bg-[#05080e]/95 text-slate-400 text-xs py-2 border-b border-white/5 hidden sm:block">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">
              Direct Manufacturer • Ajman Industrial 2, UAE
            </span>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a
              href={`mailto:${companyData.contact.email}`}
              className="hover:text-white transition-colors"
            >
              {companyData.contact.email}
            </a>
            <span className="text-white/20">•</span>
            <a
              href={`tel:${companyData.contact.packagingTel}`}
              className="hover:text-white font-medium transition-colors"
            >
              {companyData.contact.packagingTel}
            </a>
            <span className="text-white/20">•</span>
            <a
              href={companyData.portals.brochurePdf}
              download
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Brochure (PDF)
            </a>
          </div>
        </Container>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav
        className={cn(
          "w-full bg-[#080c14]/85 backdrop-blur-xl transition-all duration-300 border-b border-white/10",
          isScrolled ? "py-3 shadow-2xl" : "py-4"
        )}
      >
        <Container size="wide" className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogo variant="light" />

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
                          ? "text-emerald-400 bg-white/5"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
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
                        <div className="bg-[#0c111c] rounded-2xl shadow-2xl border border-white/10 p-4">
                          <div className="grid grid-cols-2 gap-2">
                            {categoriesData.map((category) => (
                              <Link
                                key={category.id}
                                href={`/products?category=${category.slug}`}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                              >
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                                    {category.name}
                                  </div>
                                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                    {category.tagline}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between px-2 text-xs">
                            <span className="text-slate-400 font-medium">
                              ISO 9001 & Food Contact Certified
                            </span>
                            <Link
                              href="/products"
                              className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1"
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
                      ? "text-emerald-400 bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
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
              className="shadow-glow-emerald"
            >
              Request a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </Container>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0c111c] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-1">
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
                    "px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="px-4 py-2 text-xs text-slate-400 flex flex-col gap-1">
              <span>Plant & HQ: {companyData.contact.fullLocationString}</span>
              <span>Tel: {companyData.contact.packagingTel}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button href="/products" variant="secondary" size="sm" className="bg-white/10 text-white">
                View Catalog
              </Button>
              <Button href="/contact" variant="primary" size="sm">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
