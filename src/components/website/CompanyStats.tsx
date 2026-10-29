"use client";

import React, { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Card3D } from "@/components/ui/Card3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const CompanyStats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Staggered card entrance with ScrollTrigger
      gsap.fromTo(
        ".stat-box",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Animated Number Count-Up with ScrollTrigger
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          // Stat 1: 0 -> 780
          const obj1 = { val: 0 };
          gsap.to(obj1, {
            val: 780,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (num1Ref.current) num1Ref.current.innerText = Math.floor(obj1.val).toString();
            },
          });

          // Stat 2: 1980 -> 1997
          const obj2 = { val: 1980 };
          gsap.to(obj2, {
            val: 1997,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
              if (num2Ref.current) num2Ref.current.innerText = Math.floor(obj2.val).toString();
            },
          });

          // Stat 3: 0 -> 42
          const obj3 = { val: 0 };
          gsap.to(obj3, {
            val: 42,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              if (num3Ref.current) num3Ref.current.innerText = Math.floor(obj3.val).toString();
            },
          });

          // Stat 4: 0 -> 100
          const obj4 = { val: 0 };
          gsap.to(obj4, {
            val: 100,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              if (num4Ref.current) num4Ref.current.innerText = Math.floor(obj4.val).toString();
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 border-b border-slate-200/80 relative overflow-hidden bg-transparent"
    >
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Stat 1: 780+ */}
          <div className="stat-box">
            <Card3D
              maxTilt={14}
              depth={25}
              className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:border-emerald-400/50 group h-full transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors font-mono">
                <span ref={num1Ref}>780</span>+
              </div>
              <div className="text-sm font-bold text-emerald-600 mt-2">Automated Machines</div>
              <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                High-speed stamping presses in Ajman, UAE
              </div>
            </Card3D>
          </div>

          {/* Stat 2: 1997 */}
          <div className="stat-box">
            <Card3D
              maxTilt={14}
              depth={25}
              className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:border-emerald-400/50 group h-full transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors font-mono">
                <span ref={num2Ref}>1997</span>
              </div>
              <div className="text-sm font-bold text-emerald-600 mt-2">Established Year</div>
              <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                Nearly 3 decades of manufacturing excellence
              </div>
            </Card3D>
          </div>

          {/* Stat 3: 42+ */}
          <div className="stat-box">
            <Card3D
              maxTilt={14}
              depth={25}
              className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:border-emerald-400/50 group h-full transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors font-mono">
                <span ref={num3Ref}>42</span>+
              </div>
              <div className="text-sm font-bold text-emerald-600 mt-2">Export Markets</div>
              <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                Daily sea &amp; road freight across GCC &amp; worldwide
              </div>
            </Card3D>
          </div>

          {/* Stat 4: 100% */}
          <div className="stat-box">
            <Card3D
              maxTilt={14}
              depth={25}
              className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:border-emerald-400/50 group h-full transition-all"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors font-mono">
                <span ref={num4Ref}>100</span>%
              </div>
              <div className="text-sm font-bold text-emerald-600 mt-2">Infinitely Recyclable</div>
              <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                Pure food-grade sustainable aluminium
              </div>
            </Card3D>
          </div>
        </div>
      </Container>
    </section>
  );
};
