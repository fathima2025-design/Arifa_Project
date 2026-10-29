"use client";

import React, { useEffect, useState } from "react";

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll during splash screen
    document.body.style.overflow = "hidden";

    // Clean unmount after the unbroken continuous GPU animation completes
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      setIsVisible(false);
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* 
        PURE UNBROKEN GPU-COMPOSITOR ANIMATION:
        Zero React state updates during animation = Zero re-renders = True 120fps fluid silk.
      */}
      <style>{`
        @keyframes fullSplashCurtain {
          0%, 65% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(0, -100%, 0);
          }
        }

        @keyframes emblemSoftBloom {
          0% {
            opacity: 0;
            transform: translate3d(0, 18px, 0) scale(0.9);
          }
          32% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
          100% {
            opacity: 0.9;
            transform: translate3d(0, -25px, 0) scale(0.96);
          }
        }

        @keyframes leafWave1 {
          0% {
            opacity: 0;
            transform: translate3d(-6px, 12px, 0) scale(0.85);
          }
          40%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes leafWave2 {
          0%, 8% {
            opacity: 0;
            transform: translate3d(-4px, 14px, 0) scale(0.85);
          }
          48%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes leafWave3 {
          0%, 16% {
            opacity: 0;
            transform: translate3d(-2px, 16px, 0) scale(0.85);
          }
          56%, 100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes textSoftFade {
          0%, 20% {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
          }
          45%, 72% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
          100% {
            opacity: 0.85;
            transform: translate3d(0, -20px, 0);
          }
        }

        .splash-curtain-container {
          animation: fullSplashCurtain 2.35s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        .splash-emblem-content {
          animation: emblemSoftBloom 2.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
        }

        .splash-leaf-1 {
          animation: leafWave1 2.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .splash-leaf-2 {
          animation: leafWave2 2.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .splash-leaf-3 {
          animation: leafWave3 2.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .splash-brand-text {
          animation: textSoftFade 2.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Main Luxury Silk Screen */}
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden splash-curtain-container"
        style={{
          background: "radial-gradient(circle at 50% 50%, #daf2e2 0%, #e8f6ed 48%, #f3faf5 85%)",
        }}
      >
        {/* Soft Organic Emerald Ambient Aura */}
        <div
          className="absolute w-[500px] h-[500px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(30,189,64,0.20) 0%, rgba(52,211,153,0.08) 45%, transparent 70%)",
          }}
        />

        {/* Center Stage Content */}
        <div className="relative flex flex-col items-center justify-center pointer-events-none z-10 splash-emblem-content">
          {/* Exact 3 Leaves SVG */}
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Top Leaf Gradient (Lime/Chartreuse) */}
                <linearGradient id="silkTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a4d322" />
                  <stop offset="100%" stopColor="#4ba32e" />
                </linearGradient>

                {/* Middle Leaf Gradient (Vibrant Light Green) */}
                <linearGradient id="silkMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#5db728" />
                  <stop offset="100%" stopColor="#2e8925" />
                </linearGradient>

                {/* Bottom Leaf Gradient (Forest Emerald) */}
                <linearGradient id="silkBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38982a" />
                  <stop offset="100%" stopColor="#166820" />
                </linearGradient>
              </defs>

              {/* 1. Bottom Leaf */}
              <path
                className="splash-leaf-1"
                d="M 34 54 C 38 68, 54 82, 88 88 C 89 82, 87 75, 85 71 C 70 65, 52 57, 34 54 Z"
                fill="url(#silkBotGrad)"
              />

              {/* 2. Middle Leaf */}
              <path
                className="splash-leaf-2"
                d="M 42 35 C 47 48, 62 62, 86 70 C 87 63, 85 55, 83 50 C 68 45, 54 38, 42 35 Z"
                fill="url(#silkMidGrad)"
              />

              {/* 3. Top Leaf */}
              <path
                className="splash-leaf-3"
                d="M 57 18 C 60 28, 70 42, 84 48 C 86 42, 84 32, 79 26 C 74 20, 66 17, 57 18 Z"
                fill="url(#silkTopGrad)"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <div className="mt-3 flex flex-col items-center text-center splash-brand-text">
            <div className="flex items-center tracking-tight">
              <span className="text-2xl sm:text-[28px] font-black text-[#0a3a78] tracking-wider">
                ARIFA
              </span>
              <span className="text-2xl sm:text-[28px] font-black text-[#1ebd40] tracking-wider ml-2">
                PACK
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-[0.28em] mt-0.5 font-cinzel">
              Packing &amp; Packaging LLC
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
