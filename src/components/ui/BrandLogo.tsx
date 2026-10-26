import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark";
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  variant = "dark",
  showTagline = true,
}) => {
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 group select-none", className)}
      aria-label="Arifa Pack — Home"
    >
      {/* Authentic Eco-Leaf Emblem SVG */}
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Hexagonal Packaging Shell */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="10"
            fill={isDark ? "#0A2540" : "#0F172A"}
            className="transition-colors"
          />
          {/* Metallic container rim gradient */}
          <rect
            x="4"
            y="4"
            width="36"
            height="36"
            rx="8"
            stroke="url(#metalGradient)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          {/* Dynamic Eco-Green Swoosh / Leaf */}
          <path
            d="M12 28C14 18 24 13 32 12C32 12 30 23 22 27C17 29.5 13.5 28.8 12 28Z"
            fill="url(#greenGlow)"
          />
          {/* Corporate Blue Wave Line */}
          <path
            d="M13 29C18 31 27 30 31 23"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Gradients */}
          <defs>
            <linearGradient id="metalGradient" x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E2E8F0" />
              <stop offset="0.5" stopColor="#94A3B8" />
              <stop offset="1" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="greenGlow" x1="12" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E676" />
              <stop offset="1" stopColor="#1EBD40" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span
            className={cn(
              "text-xl sm:text-2xl font-black tracking-wider uppercase font-['Manrope']",
              isDark ? "text-slate-900" : "text-white"
            )}
          >
            ARIFA
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#1ebd40] tracking-wider uppercase ml-1.5 font-['Manrope']">
            PACK
          </span>
        </div>
        {showTagline && (
          <span
            className={cn(
              "text-[9px] font-semibold tracking-widest uppercase mt-0.5",
              isDark ? "text-slate-500" : "text-slate-400"
            )}
          >
            Packing & Packaging LLC
          </span>
        )}
      </div>
    </Link>
  );
};
