"use client";

import React, { useEffect, useState, useRef } from "react";

export const PackagingBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8fafc] select-none"
    >
      {/* ─── Layer 1: Ambient Soft Luxury Metallic Silver & Pearl Gradients ─── */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-700 ease-out"
        style={{
          transform: mounted
            ? `translate3d(${mousePos.x * 12}px, ${(mousePos.y * 10) + (scrollY * -0.04)}px, 0)`
            : "none",
        }}
      >
        {/* Liquid Chromium Curved Metallic Wave Ribbons */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center opacity-[0.22] mix-blend-multiply pointer-events-none transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: "url('/images/backgrounds/arifa_luxury_liquid_metal_bg.png')",
            transform: mounted
              ? `scale(1.05) translate3d(${mousePos.x * -8}px, ${(mousePos.y * -8) + (scrollY * 0.03)}px, 0)`
              : "scale(1.05)",
          }}
        />

        {/* Soft Pearlescent Eco Glow Aura */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-3xl opacity-40 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(30, 189, 64, 0.12) 0%, rgba(2, 132, 199, 0.06) 50%, transparent 70%)",
          }}
        />

        {/* Soft Right Glow Accent */}
        <div
          className="absolute top-[30%] -right-[15%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, rgba(30, 189, 64, 0.05) 50%, transparent 70%)",
          }}
        />

        {/* Dynamic Cursor Spotlight (Light Mode Subtle Sheen) */}
        {mounted && (
          <div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-300 ease-out opacity-60"
            style={{
              left: `calc(50% + ${mousePos.x * 45}% - 300px)`,
              top: `calc(50% + ${mousePos.y * 45}% - 300px)`,
              background:
                "radial-gradient(circle, rgba(30, 189, 64, 0.08) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 70%)",
            }}
          />
        )}
      </div>

      {/* ─── Layer 2: Precision Manufacturing Matrix & Blueprint Dot Grid ─── */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.07) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Layer 3: Subtle Sweeping Specular Light Sheen ─── */}
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-[0.04] pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255, 255, 255, 1) 49%, rgba(30, 189, 64, 0.5) 50%, rgba(255, 255, 255, 1) 51%, transparent 60%)",
          animation: "foil-sweep 16s ease-in-out infinite",
        }}
      />

      {/* Top & Bottom Soft Fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/80 to-transparent pointer-events-none" />
    </div>
  );
};
