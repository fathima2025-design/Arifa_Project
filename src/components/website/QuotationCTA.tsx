"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card3D } from "@/components/ui/Card3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const QuotationCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-transparent text-slate-900 border-t border-slate-200/60"
    >
      <Container size="wide">
        <div ref={cardRef} className="max-w-4xl mx-auto">
          <Card3D
            maxTilt={6}
            depth={20}
            className="text-center space-y-6 bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 border border-slate-200/90 shadow-2xl shadow-slate-200/50 rounded-3xl p-8 sm:p-14 hover:border-emerald-400/50 transition-all"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Direct Factory Wholesale
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
              Ready to Order Direct from Manufacturer?
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
              Factory-direct container orders, custom embossed tooling, and fast sample dispatch from Ajman Industrial Area 2, UAE.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-xl shadow-emerald-600/30 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold"
              >
                Request a Wholesale Quote
              </Button>
              <a
                href="tel:+97167477061"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-300 shadow-sm transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call +971 6 747 7061</span>
              </a>
            </div>

            <div className="pt-6 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium border-t border-slate-100">
              <span>Direct UAE Factory Rates</span>
              <span>•</span>
              <span>Global Sea &amp; Land Freight</span>
              <span>•</span>
              <span>100% Recyclable Food Grade</span>
            </div>
          </Card3D>
        </div>
      </Container>
    </section>
  );
};
