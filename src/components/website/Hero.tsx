"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import { Packaging3DCanvas } from "@/components/three/Packaging3DCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const Hero: React.FC = () => {
  const [activeModel, setActiveModel] = useState<
    "aluminium-container" | "platter" | "foil-roll"
  >("aluminium-container");

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Silky Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.5"
        )
        .fromTo(
          descRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          buttonsRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-stat-card",
          { y: 30, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          rightColRef.current,
          { opacity: 0, scale: 0.92, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out" },
          "-=1.1"
        );

      // 2. ScrollTrigger Parallax Scrub for 3D WebGL Canvas
      if (rightColRef.current && sectionRef.current) {
        gsap.to(rightColRef.current, {
          y: 80,
          scale: 0.95,
          rotateZ: -1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(leftColRef.current, {
          y: -30,
          opacity: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent text-slate-900 pt-10 pb-16 lg:pt-16 lg:pb-24"
    >
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline & Main CTAs with GSAP */}
          <div ref={leftColRef} className="lg:col-span-6 space-y-6 text-left">
            {/* Minimal Sub-Badge with Radar Ping */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50/90 backdrop-blur-md border border-emerald-200/90 shadow-xs hover:border-emerald-400 hover:scale-[1.02] transition-all cursor-default"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold tracking-widest text-emerald-900 uppercase font-cinzel">
                Arifa Packing &amp; Packaging LLC • Ajman, UAE
              </span>
            </div>

            {/* Headline with Metallic Shimmer */}
            <div className="space-y-2">
              <span className="text-xs font-black tracking-widest text-emerald-600 uppercase font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SUSTAINABLE PACKAGING SOLUTIONS
              </span>
              <h1
                ref={titleRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900"
              >
                NEXT-GEN <br />
                <span className="font-safira font-bold italic text-emerald-600 text-[1.14em] inline-block pr-1 capitalize">
                  Aluminium
                </span>{" "}
                <span className="uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-emerald-600 to-slate-950 animate-text-shimmer inline-block">
                  Packaging
                </span>
              </h1>
            </div>

            {/* Authentic 1-Line Proposition */}
            <p
              ref={descRef}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal"
            >
              Direct UAE manufacturer of premium food-grade aluminium containers, catering platters, and commercial foils since 1997.
            </p>

            {/* Quick Actions (Pill Buttons with Glow & Hover Animations) */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                className="shadow-xl shadow-emerald-600/30 hover:shadow-2xl hover:shadow-emerald-600/50 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 transition-all duration-300 font-bold rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
              >
                Request Quote
              </Button>
              <a
                href="https://www.arifapack.com/images/Arifapack-profile.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                Download Brochure (PDF)
              </a>
            </div>

            {/* Interactive 3D Key Metrics */}
            <div ref={metricsRef} className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-3 sm:gap-4">
              <Card3D
                maxTilt={14}
                depth={15}
                className="hero-stat-card p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                  780+
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Automated Machines
                </div>
              </Card3D>

              <Card3D
                maxTilt={14}
                depth={15}
                className="hero-stat-card p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                  42+
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Export Markets
                </div>
              </Card3D>

              <Card3D
                maxTilt={14}
                depth={15}
                className="hero-stat-card p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all text-center sm:text-left group"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 tracking-tight">
                  100%
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-semibold leading-tight">
                  Infinitely Recyclable
                </div>
              </Card3D>
            </div>
          </div>

          {/* Right Column: 3D Interactive Product Presentation */}
          <div ref={rightColRef} className="lg:col-span-6 relative">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-white via-slate-100/60 to-slate-200/40 shadow-xl border border-slate-200">
              <Packaging3DCanvas
                modelType={activeModel}
                initialFinish="mirror"
                allowFinishToggle={true}
                allowModelSwitch={true}
                heightClass="h-[360px] sm:h-[420px] lg:h-[450px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
