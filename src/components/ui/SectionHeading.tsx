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
}) => {
  const badgeColors = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-xs",
    blue: "bg-sky-50 text-sky-700 border-sky-200 shadow-xs",
    metal: "bg-slate-100 text-slate-700 border-slate-200 shadow-xs",
  };

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-10 sm:mb-14", alignStyles[alignment], className)}>
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border mb-3",
            badgeColors[badgeVariant]
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {badge}
        </span>
      )}

      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900"
      >
        {title}{" "}
        {highlight && (
          <span className="text-emerald-600">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="mt-3.5 text-base sm:text-lg leading-relaxed max-w-2xl text-slate-600 font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
