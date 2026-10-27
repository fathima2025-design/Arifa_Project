"use client";

import React from "react";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";

import { Card3D } from "@/components/ui/Card3D";

export const ContactHighlightBar: React.FC = () => {
  return (
    <section className="bg-slate-950 text-white py-12 border-t border-slate-800 font-['Manrope']">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* 1. Phone Support */}
          <Card3D
            maxTilt={10}
            depth={20}
            className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 shadow-lg shadow-black/40 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-xs text-slate-400 font-medium block">
                Have a question? Call us now
              </span>
              <div className="text-base font-bold text-white tracking-wide">
                Office: +971 6 747 7061
              </div>
              <a
                href="tel:+97167477061"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm shadow-emerald-500/30"
              >
                <span>Contact us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card3D>

          {/* 2. Email Support */}
          <Card3D
            maxTilt={10}
            depth={20}
            className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 shadow-lg shadow-black/40 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <span className="text-xs text-slate-400 font-medium block">
                Need support? Drop us an email
              </span>
              <div className="text-base font-bold text-white tracking-wide">
                info@arifapack.com
              </div>
              <a
                href="mailto:info@arifapack.com"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-sm shadow-emerald-500/30"
              >
                <span>Send message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card3D>

          {/* 3. Working Hours */}
          <Card3D
            maxTilt={10}
            depth={20}
            className="flex items-start gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 shadow-lg shadow-black/40 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <span className="text-xs text-slate-400 font-medium block">
                We are open on
              </span>
              <div className="text-sm font-bold text-white">
                Monday – Saturday: 8:00am to 6:30pm
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Sunday – Closed
              </div>
            </div>
          </Card3D>
        </div>
      </Container>
    </section>
  );
};
