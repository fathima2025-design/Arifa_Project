import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "green" | "blue" | "metal";
  title: string;
  highlight?: string;
  description?: string;
  alignment?: "left" | "center" | "right";
  className?: string;
  lightMode?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeVariant = "green",
  title,
  highlight,
  description,
  alignment = "center",
  className,
  lightMode = true,
}) => {
  const badgeColors = {
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    blue: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    metal: "bg-white/10 text-slate-200 border-white/20",
  };

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 sm:mb-16", alignStyles[alignment], className)}>
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border mb-3.5 shadow-sm backdrop-blur-md",
            badgeColors[badgeVariant]
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badge}
        </span>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white"
        )}
      >
        {title}{" "}
        {highlight && (
          <span className="text-emerald-400">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl text-slate-200 font-normal"
        >
          {description}
        </p>
      )}
    </div>
  );
};
