"use client";

import React from "react";
import { Box, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModelFallbackProps {
  label?: string;
  className?: string;
}

export const ModelFallback: React.FC<ModelFallbackProps> = ({
  label = "Loading Interactive 3D Packaging...",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full min-h-[300px] flex flex-col items-center justify-center rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 text-center overflow-hidden",
        className
      )}
    >
      {/* Background Sheen Effect */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />

      {/* Animated Hexagon */}
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
          <Box className="w-8 h-8" />
        </div>
        <div className="absolute -top-1 -right-1 text-emerald-300">
          <Sparkles className="w-4 h-4 animate-spin duration-3000" />
        </div>
      </div>

      <p className="text-sm font-semibold text-slate-200 tracking-wide">
        {label}
      </p>
      <span className="text-xs text-slate-500 mt-1">
        Three.js PBR Aluminium Engine
      </span>
    </div>
  );
};
