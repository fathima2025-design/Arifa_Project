"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Award,
  Cpu,
  Truck,
  Users,
  CheckCircle,
  FileDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  Globe2,
  Factory,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { companyData } from "@/data/company";

export default function AboutPage() {
  const milestones = [
    {
      year: "1997",
      title: "Foundation in Ajman",
      desc: "Founded under the visionary leadership of President & CEO Mr. Sulthanul Arifeen to serve UAE airline catering and institutional hospitality.",
    },
    {
      year: "2008",
      title: "Conversion Plant Expansion",
      desc: "Invested in multi-cavity automated stamping lines, scaling production capacity to hundreds of millions of containers annually.",
    },
    {
      year: "2016",
      title: "GCC & Global Export Expansion",
      desc: "Established direct freight shipping to 42+ global export markets with certified ISO 9001 and food contact safety compliance.",
    },
    {
      year: "Today",
      title: "780+ Machine UAE Ecosystem",
      desc: "Operating one of the largest specialized packaging manufacturing plants in the Middle East with 100% recyclable circular aluminium.",
    },
  ];

  return (
    <div className="py-12 lg:py-20 bg-slate-50 min-h-screen text-slate-900 overflow-hidden relative">
      {/* Ambient Hardware-Accelerated Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-10 w-[450px] h-[450px] rounded-full bg-blue-400/10 blur-[120px] pointer-events-none -z-10" />

      <Container size="wide">
        {/* 1. Animated Hero & Factory Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-16 lg:mb-24">
          {/* Left: Text & Story */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Pulsing Established Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Established 1997 • Ajman, UAE</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
              About{" "}
              <span className="font-safira font-bold italic text-emerald-600 text-[1.12em] inline-block pr-1">
                Arifa
              </span>{" "}
              <span className="text-slate-900">
                Pack
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Direct UAE manufacturer of high-precision aluminium food containers, platters, and commercial foils engineered with strict international hygiene and food contact safety standards.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" size="md">
                Contact Leadership Team
              </Button>
              <a
                href="https://www.arifapack.com/images/Arifapack-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 bg-white transition-all shadow-xs hover:scale-105"
              >
                <FileDown className="w-4 h-4 text-emerald-600" />
                <span>Download Corporate Profile (PDF)</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Floating Factory Image with Interactive Floating Metric Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            {/* Main Factory Plant Image Card with Card3D */}
            <Card3D
              maxTilt={8}
              depth={20}
              className="relative h-[340px] sm:h-[400px] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl group"
            >
              <Image
                src="/images/company/factory-plant.jpg"
                alt="Arifa Pack 780+ Machine Manufacturing Plant in Ajman"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5" />
                  Al Jurf Industrial Area 2, Ajman
                </span>
                <div className="text-lg font-extrabold text-white">
                  Modern High-Speed Stamping & Converting Ecosystem
                </div>
              </div>
            </Card3D>

            {/* Floating Metric 1: 780+ Machines */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 sm:-right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl text-slate-900 hidden sm:flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 leading-none">780+</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Conversion Machines</div>
              </div>
            </motion.div>

            {/* Floating Metric 2: 42+ Countries */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-4 sm:-left-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl text-slate-900 hidden sm:flex items-center gap-3.5 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Globe2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-xl font-black text-slate-900 leading-none">42+</div>
                <div className="text-[11px] text-slate-500 font-semibold mt-1">Export Markets</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 2. Key Stats Strip with 3D Tilt */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 lg:mb-24">
          {[
            { label: "Founded Year", val: "1997", sub: "Three Decades in UAE" },
            { label: "Active Machines", val: "780+", sub: "Stamping & Slitting Lines" },
            { label: "Industry Awards", val: "143+", sub: "Excellence & Compliance" },
            { label: "Global Reach", val: "42+", sub: "Export Destinations" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-emerald-400 transition-all duration-300 text-center sm:text-left h-full">
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {stat.val}
                </div>
                <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. Bento Grid: Heritage, Facility & Corporate Governance with 3D Card Engine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-slate-200/80 mb-20">
          {/* Card 1: Heritage */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card3D
              maxTilt={9}
              depth={25}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 flex flex-col justify-between hover:border-emerald-300 transition-all h-full"
            >
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2 font-mono">
                  HERITAGE • EST. 1997
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Three Decades of UAE Manufacturing
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Founded in 1997 under the visionary leadership of President & CEO{" "}
                  <strong className="text-slate-900">{companyData.leadership.president}</strong>, Arifa Pack began with a clear mission: producing certified food containers for airlines, hospitality, and catering chains across the UAE and GCC.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <span className="text-xs text-slate-500 block font-semibold">Corporate Motto:</span>
                <span className="text-sm font-bold text-emerald-600 italic mt-0.5 block">
                  &ldquo;{companyData.slogan}&rdquo;
                </span>
              </div>
            </Card3D>
          </motion.div>

          {/* Card 2: 780+ Machines Facility */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card3D
              maxTilt={9}
              depth={25}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 flex flex-col justify-between hover:border-emerald-300 transition-all h-full"
            >
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2 font-mono">
                  CONVERSION PLANT
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  780+ Precision Machines
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                  Equipped with automated multi-cavity stamping presses, slitting lines, and robotic stackers in Al Jurf Industrial Area 2, Ajman, delivering enterprise-scale bulk orders on tight production timelines.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-2xl font-black text-slate-900">143+</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Industry Awards</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-emerald-600">42+</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Export Markets</span>
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Card 3: Board Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card3D
              maxTilt={9}
              depth={25}
              className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-100 flex flex-col justify-between hover:border-emerald-300 transition-all h-full"
            >
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2 font-mono">
                  CORPORATE GOVERNANCE
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Board of Directors
                </h2>
                <div className="mt-4 space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">President & CEO</span>
                    <span className="text-sm font-bold text-slate-900">{companyData.leadership.president}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">Board Directors</span>
                    <div className="text-xs font-medium text-slate-700 mt-1 space-y-0.5">
                      {companyData.leadership.directors.map((dir, i) => (
                        <div key={i}>• {dir}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Al Jurf 2, Ajman, UAE</span>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* 4. Journey & Milestones Timeline with 3D Tilt Cards */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              GROWTH & EVOLUTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Our Journey Over Three Decades
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {milestones.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
              >
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-md shadow-slate-100 flex flex-col justify-between hover:border-emerald-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs mb-3 border border-emerald-200/60">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>{item.year}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 5. Four Core Pillars of Engineering & Trust */}
        <div className="pb-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              ETHICAL MANUFACTURING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1.5">
              Principles of Engineering & Trust
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Our ethical foundation and uncompromising focus on quality have positioned us as a trusted partner in the global packaging industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.coreValues.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-md shadow-slate-100 flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 shadow-xs">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{val.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
