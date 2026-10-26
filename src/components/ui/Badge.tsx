import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "blue" | "slate" | "amber" | "outline" | "metal";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "green",
  size = "md",
  dot = false,
  ...props
}) => {
  const variantStyles = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
    blue: "bg-sky-50 text-sky-800 border-sky-200/80",
    slate: "bg-slate-100 text-slate-800 border-slate-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200/80",
    outline: "bg-white text-slate-700 border-slate-200",
    metal: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-800 border-slate-300",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium",
    md: "text-xs px-2.5 py-1 font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border tracking-wide select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0" />}
      {children}
    </span>
  );
};
