import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label?: string;
  name: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  helperText,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-xs font-semibold tracking-wide text-slate-700"
        >
          {label}
        </label>
      )}

      {children}

      {helperText && !error && (
        <span className="text-[11px] text-slate-400">{helperText}</span>
      )}

      {error && (
        <span id={`${name}-error`} className="text-xs font-medium text-rose-400 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};
