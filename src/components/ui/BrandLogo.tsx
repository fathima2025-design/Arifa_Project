import React from "react";
import Link from "next/link";
import Image from "next/image";
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
      {/* Authentic 3-Leaf Arifa Emblem from Original Brand Assets */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 overflow-hidden flex items-center justify-start rounded-lg bg-white/60 p-0.5">
        <Image
          src="/images/arifa-logo-emblem.png"
          alt="Arifa Pack Official Emblem"
          width={44}
          height={44}
          className="object-contain object-left scale-125 -translate-x-1 transform transition-transform duration-300 group-hover:scale-130"
          priority
        />
      </div>

      {/* Official Typography (Deep Royal Navy + Eco-Green) */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span
            className={cn(
              "text-2xl sm:text-[25px] font-black tracking-tight",
              isDark ? "text-[#0a3a78]" : "text-white"
            )}
          >
            ARIFA
          </span>
          <span className="text-xl sm:text-[22px] font-black text-[#1ebd40] tracking-wider uppercase ml-1.5">
            PACK
          </span>
        </div>
        {showTagline && (
          <span
            className={cn(
              "text-[9px] font-bold tracking-widest uppercase mt-0.5",
              isDark ? "text-slate-500" : "text-slate-300"
            )}
          >
            Packing &amp; Packaging LLC
          </span>
        )}
      </div>
    </Link>
  );
};
