import React from "react";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";

export const CompanyStats: React.FC = () => {
  const stats = [
    {
      value: "780+",
      label: "Manufacturing Lines",
      description: "Automated stamping & converting machinery in Ajman, UAE",
    },
    {
      value: "675+",
      label: "Global Enterprise Clients",
      description: "Airlines, hotel groups & food processing conglomerates",
    },
    {
      value: "42+",
      label: "Export Markets",
      description: "Daily freight to GCC, Europe, North America & Africa",
    },
    {
      value: "28+",
      label: "Years of Heritage",
      description: `Pioneering UAE food-grade packaging since ${companyData.foundingYear}`,
    },
  ];

  return (
    <section className="py-16 border-b border-white/5 relative overflow-hidden font-['Manrope']">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.03] via-transparent to-cyan-500/[0.03] pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="relative">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-emerald-400 mt-2">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
