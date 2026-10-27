"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card3D } from "@/components/ui/Card3D";

export const CompanyStats: React.FC = () => {
  const stats = [
    {
      value: "780+",
      label: "Automated Machines",
      description: "High-speed stamping presses in Ajman, UAE",
    },
    {
      value: "1997",
      label: "Established Year",
      description: "Nearly 3 decades of manufacturing excellence",
    },
    {
      value: "42+",
      label: "Export Markets",
      description: "Daily sea & road freight across GCC & worldwide",
    },
    {
      value: "100%",
      label: "Infinitely Recyclable",
      description: "Pure food-grade sustainable aluminium",
    },
  ];

  return (
    <section className="py-12 border-b border-slate-200/80 relative overflow-hidden font-['Manrope'] bg-transparent">
      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card3D
                maxTilt={14}
                depth={25}
                className="p-6 sm:p-7 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-2xl hover:border-emerald-400/50 group h-full"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight group-hover:text-emerald-600 transition-colors font-mono">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-emerald-600 mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                  {stat.description}
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
