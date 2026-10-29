"use client";

import React from "react";
import {
  Plane,
  Award,
  Recycle,
  Globe2,
  Factory,
  ShieldCheck,
  PackageCheck,
  Truck,
  Sparkles,
} from "lucide-react";

export const TrustMarquee: React.FC = () => {
  const items = [
    {
      icon: <Plane className="w-4 h-4 text-emerald-600" />,
      label: "Airline Catering Standard",
      highlight: "Grade AA8011",
    },
    {
      icon: <Award className="w-4 h-4 text-emerald-600" />,
      label: "ISO 9001:2015 Certified",
      highlight: "Global QA",
    },
    {
      icon: <Recycle className="w-4 h-4 text-emerald-600" />,
      label: "100% Infinitely Recyclable",
      highlight: "Circular Economy",
    },
    {
      icon: <Globe2 className="w-4 h-4 text-emerald-600" />,
      label: "Exporting to 42+ Countries",
      highlight: "GCC & Worldwide",
    },
    {
      icon: <Factory className="w-4 h-4 text-emerald-600" />,
      label: "780+ Precision Stamping Lines",
      highlight: "Ajman Industrial 2",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      label: "HACCP Food Contact Compliant",
      highlight: "100% Sterile",
    },
    {
      icon: <PackageCheck className="w-4 h-4 text-emerald-600" />,
      label: "Direct Factory Wholesale",
      highlight: "Zero Middlemen",
    },
    {
      icon: <Truck className="w-4 h-4 text-emerald-600" />,
      label: "24-48h UAE Fleet Dispatch",
      highlight: "Express Freight",
    },
  ];

  // Repeat twice for seamless infinite marquee scroll
  const marqueeList = [...items, ...items];

  return (
    <section className="relative w-full py-4 bg-slate-900 border-y border-emerald-500/20 overflow-hidden shadow-inner select-none">
      {/* Ambient green back-glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 pointer-events-none" />

      {/* Edge gradient masks for smooth fade-in and fade-out */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-900 via-slate-900/80 to-transparent z-10 pointer-events-none" />

      {/* Continuous Marquee Track */}
      <div className="flex w-max items-center gap-6 animate-marquee hover:[animation-play-state:paused]">
        {marqueeList.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-xs hover:border-emerald-400/50 hover:bg-slate-800 transition-all duration-300 group cursor-default"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                {item.label}
              </span>
              <span className="text-[10px] font-mono text-emerald-400/90 font-semibold tracking-wider uppercase">
                {item.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
