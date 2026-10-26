"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export const PackagingBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#060910] select-none perspective-[1000px]"
    >
      {/* ─── Layer 1: Vivid 3D Packaging Artwork with Dynamic Mouse Parallax ─── */}
      <div
        className="absolute inset-0 w-full h-full will-change-transform transition-transform duration-700 ease-out"
        style={{
          transform: mounted
            ? `rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 7}deg) scale(1.08)`
            : "scale(1.04)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 w-full h-full opacity-80 mix-blend-screen animate-packaging-drift">
          <Image
            src="/images/backgrounds/arifa_packaging_3d_bg.png"
            alt="Arifa Pack 3D Aluminium Packaging Background"
            fill
            priority
            quality={95}
            className="object-cover object-center filter brightness-110 contrast-125 saturate-110"
          />
        </div>

        {/* Dynamic Specular Spotlight Following Cursor */}
        {mounted && (
          <div
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-all duration-300 ease-out opacity-45"
            style={{
              left: `calc(50% + ${mousePos.x * 45}% - 400px)`,
              top: `calc(50% + ${mousePos.y * 45}% - 400px)`,
              background:
                "radial-gradient(circle, rgba(52, 211, 153, 0.45) 0%, rgba(16, 185, 129, 0.22) 35%, transparent 70%)",
            }}
          />
        )}
      </div>

      {/* ─── Layer 2: Precision Manufacturing Matrix & Blueprint Grid ─── */}
      <div
        className="absolute inset-0 bg-repeat opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Layer 3: High-Tech Automated Factory Laser Scan Beam (Visual 3D Element) ─── */}
      <div
        className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
        style={{
          animation: "laser-scan-sweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          background: "linear-gradient(90deg, transparent 0%, #10b981 25%, #00f5a0 50%, #38bdf8 75%, transparent 100%)",
          boxShadow: "0 0 16px #00f5a0, 0 0 32px #10b981, 0 0 50px rgba(56, 189, 248, 0.5)",
        }}
      >
        {/* Soft laser reflection wash */}
        <div className="absolute -top-12 left-0 right-0 h-24 bg-gradient-to-b from-emerald-500/0 via-emerald-400/8 to-emerald-500/0 blur-md pointer-events-none" />
      </div>

      {/* ─── Layer 4: Prominent Continuous Electric Neon Energy Waves (Flowing SVG Streams) ─── */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ animation: "energy-wave-flow 10s ease-in-out infinite alternate" }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="vividRibbon1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#00f5a0" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
              <stop offset="80%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="vividRibbon2" x1="0%" y1="80%" x2="100%" y2="20%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.1" />
              <stop offset="35%" stopColor="#6ee7b7" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="vividRibbon3" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0" />
              <stop offset="50%" stopColor="#a7f3d0" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </linearGradient>

            <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="10" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Ribbon 1: Continuous Flowing Electric Pulse Current */}
          <path
            d="M -150,750 C 280,820 460,420 960,500 C 1200,540 1380,310 1650,350"
            stroke="url(#vividRibbon1)"
            strokeWidth="5"
            strokeDasharray="30 20 60 25"
            filter="url(#electricGlow)"
            style={{
              animation: "ribbon-dash-flow 4s linear infinite, energy-pulse-glow 4s ease-in-out infinite",
            }}
          />

          {/* Ribbon 2: Secondary Flowing Energy Wave */}
          <path
            d="M -80,690 C 360,740 560,380 1060,420 C 1300,450 1440,240 1600,270"
            stroke="url(#vividRibbon2)"
            strokeWidth="3.5"
            strokeDasharray="25 15 45 20"
            filter="url(#electricGlow)"
            style={{
              animation: "ribbon-dash-flow 6s linear infinite reverse, energy-pulse-glow 5s ease-in-out infinite 1s",
            }}
          />

          {/* Ribbon 3: High Precision Eco-Wave Accent */}
          <path
            d="M -50,620 C 400,670 630,340 1130,370 C 1360,400 1460,190 1580,210"
            stroke="url(#vividRibbon3)"
            strokeWidth="2.5"
            strokeDasharray="18 12 36 18"
            style={{
              animation: "ribbon-dash-flow 8s linear infinite",
            }}
          />
        </svg>
      </div>

      {/* ─── Layer 5: Floating 3D Holographic Packaging Prisms (Atmospheric) ─── */}
      {mounted && (
        <>
          {/* Top-Left Floating 3D Holographic Container */}
          <div
            className="absolute top-[14%] left-[2%] w-40 h-32 pointer-events-none z-0 hidden xl:block opacity-65"
            style={{
              perspective: "1000px",
              transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 20}px, 30px)`,
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                animation: "float-levitate-1 8s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Floating Levitating Lid Hologram */}
              <div
                className="absolute -top-5 inset-x-2 h-10 rounded-xl border border-emerald-400/50"
                style={{
                  animation: "lid-levitate 4.5s ease-in-out infinite",
                  background: "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(16,185,129,0.05) 100%)",
                  boxShadow: "0 0 20px rgba(52,211,153,0.3)",
                }}
              >
                <div className="absolute inset-1 border border-emerald-300/30 rounded-lg" />
              </div>

              {/* Tapered Container Base Hologram */}
              <div
                className="absolute bottom-0 inset-x-0 h-24 rounded-2xl border border-emerald-500/40 overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(16,185,129,0.1) 0%, rgba(6,78,59,0.05) 100%)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(16,185,129,0.2)",
                }}
              >
                {/* Fluted holographic ribs */}
                <div className="absolute inset-0 flex justify-between px-2 opacity-30">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-emerald-400/60" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Top-Right Floating 3D Cylindrical Foil Roll Hologram */}
          <div
            className="absolute top-[16%] right-[2%] w-36 h-28 pointer-events-none z-0 hidden xl:block opacity-65"
            style={{
              perspective: "1000px",
              transform: `translate3d(${-mousePos.x * 25}px, ${-mousePos.y * 20}px, 30px)`,
            }}
          >
            <div
              className="relative w-full h-full"
              style={{
                animation: "float-levitate-2 10s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Foil Roll Core */}
              <div
                className="w-28 h-14 rounded-full border border-cyan-400/50 relative overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, rgba(56,189,248,0.2) 0%, rgba(255,255,255,0.4) 40%, rgba(56,189,248,0.1) 100%)",
                  boxShadow: "0 0 20px rgba(56,189,248,0.35)",
                }}
              >
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-cyan-300 bg-cyan-950/60" />
              </div>

              {/* Unwound Foil Wave */}
              <div
                className="w-32 h-8 -mt-2 ml-4 rounded-md border border-cyan-300/40"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(56,189,248,0.1) 100%)",
                  transform: "rotate(-10deg) skewX(-12deg)",
                  boxShadow: "0 0 15px rgba(0,245,160,0.25)",
                }}
              />
            </div>
          </div>
        </>
      )}

      {/* ─── Layer 6: Global Transit Network Pulsing Trade Nodes (UAE to World) ─── */}
      <div className="absolute top-[18%] left-[6%] w-72 h-72 pointer-events-none opacity-75">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          {/* Pulsing Central Hub (UAE) */}
          <circle cx="140" cy="110" r="5" fill="#00f5a0" style={{ animation: "pulse-transit 2.2s infinite" }} />
          <circle cx="140" cy="110" r="14" stroke="#10b981" strokeWidth="1.5" opacity="0.8" style={{ animation: "pulse-transit 2.2s infinite" }} />

          {/* Trade Routes Arcs with active dashes */}
          <path d="M 140,110 Q 90,60 40,75" stroke="#34d399" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.85" />
          <path d="M 140,110 Q 110,40 85,30" stroke="#00f5a0" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.85" />
          <path d="M 140,110 Q 160,70 180,50" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.85" />
          <path d="M 140,110 Q 110,150 70,160" stroke="#34d399" strokeWidth="1.8" strokeDasharray="5 3" opacity="0.85" />

          {/* Destination Nodes */}
          <circle cx="40" cy="75" r="4" fill="#6ee7b7" style={{ animation: "pulse-transit 2.6s infinite 0.4s" }} />
          <circle cx="85" cy="30" r="3.5" fill="#6ee7b7" style={{ animation: "pulse-transit 2.6s infinite 0.8s" }} />
          <circle cx="180" cy="50" r="3.5" fill="#38bdf8" style={{ animation: "pulse-transit 2.6s infinite 1.2s" }} />
          <circle cx="70" cy="160" r="4" fill="#6ee7b7" style={{ animation: "pulse-transit 2.6s infinite 1.6s" }} />
        </svg>
      </div>

      {/* ─── Layer 7: Dynamic 3D Tumbling Eco Leaves (Highly Visible & Vivid) ─── */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
          {[
            { left: "12%", size: 48, delay: "0s", duration: "9s", anim: "leaf-float-vivid-1" },
            { left: "28%", size: 40, delay: "3s", duration: "11s", anim: "leaf-float-vivid-2" },
            { left: "46%", size: 44, delay: "6s", duration: "10s", anim: "leaf-float-vivid-1" },
            { left: "64%", size: 52, delay: "1.5s", duration: "8.5s", anim: "leaf-float-vivid-2" },
            { left: "78%", size: 38, delay: "4.5s", duration: "12s", anim: "leaf-float-vivid-1" },
            { left: "90%", size: 46, delay: "7.5s", duration: "9.5s", anim: "leaf-float-vivid-2" },
          ].map((leaf, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: leaf.left,
                animation: `${leaf.anim} ${leaf.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: leaf.delay,
                filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.7))",
              }}
            >
              <svg width={leaf.size} height={leaf.size} viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z"
                  fill="url(#leafGrad)"
                />
                <path d="M16 8L8 16" stroke="#d1fae5" strokeWidth="1.6" strokeLinecap="round" />
                <defs>
                  <linearGradient id="leafGrad" x1="5" y1="4" x2="20" y2="19">
                    <stop stopColor="#00f5a0" />
                    <stop offset="0.5" stopColor="#10b981" />
                    <stop offset="1" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}
        </div>
      )}

      {/* ─── Layer 8: 3D Tumbling Chrome Foil Shards ─── */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-[1000px]">
          {[
            { left: "8%", size: 16, delay: "0.5s", duration: "8s" },
            { left: "22%", size: 22, delay: "2.5s", duration: "10s" },
            { left: "38%", size: 14, delay: "5s", duration: "9s" },
            { left: "54%", size: 20, delay: "1.5s", duration: "11s" },
            { left: "72%", size: 24, delay: "4s", duration: "8.5s" },
            { left: "85%", size: 18, delay: "6.5s", duration: "10.5s" },
            { left: "95%", size: 16, delay: "3s", duration: "9.5s" },
          ].map((shard, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: shard.left,
                width: `${shard.size}px`,
                height: `${shard.size * 0.75}px`,
                animation: `foil-shard-vivid ${shard.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                animationDelay: shard.delay,
              }}
            >
              <div
                className="w-full h-full rounded-xs shadow-lg border border-white/80"
                style={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #cbd5e1 35%, #94a3b8 70%, #f8fafc 100%)",
                  clipPath: "polygon(25% 0%, 100% 15%, 75% 100%, 0% 85%)",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ─── Layer 9: Luminous Energy Photons / Twinkles Across Viewport ─── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: "15%", left: "20%", size: 6, delay: "0s" },
            { top: "25%", left: "50%", size: 8, delay: "1s" },
            { top: "45%", left: "15%", size: 7, delay: "2s" },
            { top: "60%", left: "80%", size: 9, delay: "0.5s" },
            { top: "75%", left: "35%", size: 6, delay: "1.5s" },
            { top: "35%", left: "88%", size: 8, delay: "2.5s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `photon-pulse 3s ease-in-out infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* ─── Layer 10: Sweeping Metallic Light Sheen ─── */}
      <div
        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-[0.09] pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, transparent 38%, rgba(255, 255, 255, 0.7) 49%, rgba(0, 245, 160, 0.5) 50%, rgba(255, 255, 255, 0.7) 51%, transparent 62%)",
          animation: "foil-sweep 12s ease-in-out infinite",
        }}
      />

      {/* ─── Layer 11: Optimized Readability Vignette (Crystal Clear Center) ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 36%, rgba(6, 9, 16, 0.2) 0%, rgba(6, 9, 16, 0.65) 75%, #060910 100%)",
        }}
      />

      {/* Top & Bottom Seamless Dark Edge Blends */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#060910] via-[#060910]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#060910] via-[#060910]/80 to-transparent pointer-events-none" />
    </div>
  );
};
