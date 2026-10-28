"use client";

import React, { useState } from "react";
import {
  Sparkles,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Inbox,
  FileText,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
  MessageSquare,
  BarChart3,
  Bot,
} from "lucide-react";

interface ScenarioSimulatorBarProps {
  onStep: (step: number) => void;
  onRunAll: () => void;
  onReset: () => void;
  isSimulating: boolean;
  currentSimStep: number;
}

export default function ScenarioSimulatorBar({
  onStep,
  onRunAll,
  onReset,
  isSimulating,
  currentSimStep,
}: ScenarioSimulatorBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const scenarioSteps = [
    { num: 1, label: "Inquiry", icon: Inbox, desc: "Dubai Hub" },
    { num: 2, label: "Quote", icon: FileText, desc: "Auto-calc" },
    { num: 3, label: "Stock", icon: Package, desc: "Check stock" },
    { num: 4, label: "Reorder", icon: Package, desc: "Low stock" },
    { num: 5, label: "Approve", icon: ShieldCheck, desc: "Sign-off" },
    { num: 6, label: "Order", icon: ShoppingBag, desc: "Reserve" },
    { num: 7, label: "Dispatch", icon: Truck, desc: "Truck" },
    { num: 8, label: "Follow-up", icon: MessageSquare, desc: "Check" },
    { num: 9, label: "Report", icon: BarChart3, desc: "Daily" },
  ];

  return (
    <div className="bg-[#1c2420] text-white rounded-2xl p-3 shadow-md border border-emerald-500/20 space-y-2.5 transition-all">
      {/* Top Bar Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#2d5a3f] text-emerald-300 flex items-center justify-center font-bold">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-tight">
              Workflow Simulator
            </span>
            <span className="text-[11px] text-slate-400">
              • Test flow in 1-click
            </span>
            {isSimulating && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold animate-pulse ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Step {currentSimStep}...
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* 1-Click Run All */}
          <button
            onClick={onRunAll}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>{isSimulating ? "Running..." : "⚡ Run All"}</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            disabled={isSimulating}
            title="Reset"
            className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Action Buttons Grid */}
      {isOpen && (
        <div className="pt-2 border-t border-slate-800/80">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5">
            {scenarioSteps.map((step) => {
              const Icon = step.icon;
              const isCurrent = currentSimStep === step.num;
              return (
                <button
                  key={step.num}
                  onClick={() => onStep(step.num)}
                  disabled={isSimulating}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? "bg-emerald-500/20 border-emerald-400 text-white ring-1 ring-emerald-400/50"
                      : "bg-slate-800/50 border-slate-700/40 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-3 h-3 ${isCurrent ? "text-emerald-400" : "text-slate-400"}`} />
                    <span className="text-[9px] font-mono text-slate-400">{step.num}</span>
                  </div>
                  <div className="mt-1">
                    <div className="text-[11px] font-bold line-clamp-1">{step.label}</div>
                    <div className="text-[9px] text-slate-400 line-clamp-1">{step.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
