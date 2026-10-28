"use client";

import React, { useState } from "react";
import {
  Bot,
  Layers,
  ShieldCheck,
  Play,
  Check,
  Sliders,
  History,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { CRMState } from "../lib/engine";
import { AutomationSubTab } from "../lib/types";

interface AIAutomationCenterProps {
  state: CRMState;
  onApprove: (quoteId: string) => void;
  onReject: (quoteId: string, reason?: string) => void;
  onRunWorkflow: (workflowId: string) => void;
  onToggleWorkflow: (workflowId: string) => void;
  onUpdateSettings: (newSettings: Partial<CRMState["settings"]>) => void;
  onTriggerSimulatorStep: (stepNumber: number) => void;
  onRunFullLifecycle: () => void;
  isSimulating: boolean;
}

export default function AIAutomationCenter({
  state,
  onApprove,
  onReject,
  onRunWorkflow,
  onToggleWorkflow,
  onUpdateSettings,
  isSimulating,
}: AIAutomationCenterProps) {
  const [activeTab, setActiveTab] = useState<AutomationSubTab>("dashboard");
  const [timelineFilter, setTimelineFilter] = useState<string>("all");

  const pendingApprovalsCount = state.approvals.filter((a) => a.status === "pending").length;

  return (
    <div className="space-y-5">
      {/* ─── Top Header ─── */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2d5a3f] text-emerald-300 flex items-center justify-center font-bold">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                AI Hub
              </h2>
              <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {state.settings.executionMode === "demo" ? "Demo" : "Live"}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Automated workflows &amp; agents
            </p>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 border border-slate-200/80 overflow-x-auto">
          {[
            { id: "dashboard", label: "Agents", icon: Bot, count: state.agents.length },
            { id: "studio", label: "Workflows", icon: Layers, count: state.workflows.length },
            { id: "approvals", label: "Approvals", icon: ShieldCheck, count: pendingApprovalsCount, alert: pendingApprovalsCount > 0 },
            { id: "timeline", label: "Log", icon: History, count: state.timeline.length },
            { id: "settings", label: "Settings", icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AutomationSubTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#1c2420] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                      tab.alert
                        ? "bg-amber-500 text-white font-bold animate-pulse"
                        : isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── TAB 1: AGENTS ─── */}
      {activeTab === "dashboard" && (
        <div className="space-y-5">
          {/* Summary Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agents</span>
              <div className="text-xl font-black text-slate-900 font-mono flex items-center justify-between">
                <span>{state.agents.length} Online</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold">Active</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks</span>
              <div className="text-xl font-black text-slate-900 font-mono">
                {state.agents.reduce((acc, a) => acc + a.totalExecutions, 0).toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500">Processed</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
              <div className="text-xl font-black text-[#2d5a3f] font-mono">
                {(
                  state.agents.reduce((acc, a) => acc + a.successRate, 0) / state.agents.length
                ).toFixed(1)}%
              </div>
              <div className="text-[10px] text-emerald-600 font-semibold">Verified</div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs space-y-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approvals</span>
              <div className="text-xl font-black text-amber-600 font-mono flex items-center justify-between">
                <span>{pendingApprovalsCount}</span>
                {pendingApprovalsCount > 0 && (
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">Review</span>
                )}
              </div>
              <div className="text-[10px] text-slate-500">Pending</div>
            </div>
          </div>

          {/* 7 Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.agents.map((ag) => {
              const isWaiting = ag.status === "waiting_approval";
              return (
                <div
                  key={ag.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-[#2d5a3f]/30 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-slate-900">{ag.name.replace("AI ", "")}</h3>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isWaiting
                            ? "bg-amber-100 text-amber-800"
                            : ag.status === "running"
                            ? "bg-blue-100 text-blue-800 animate-pulse"
                            : "bg-emerald-50 text-emerald-800"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isWaiting ? "bg-amber-500" : ag.status === "running" ? "bg-blue-500" : "bg-emerald-500"
                          }`}
                        />
                        {isWaiting ? "Review" : ag.status === "running" ? "Busy" : "Ready"}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#2d5a3f]">{ag.role.split("&")[0]}</div>
                    <p className="text-[11px] text-slate-500 leading-normal line-clamp-2">{ag.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Tasks: <strong className="text-slate-800 font-mono">{ag.totalExecutions}</strong></span>
                      <span>Accuracy: <strong className="text-emerald-700 font-mono">{ag.successRate}%</strong></span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 text-[10px] text-slate-600 line-clamp-1">
                      {ag.lastAction}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 2: WORKFLOWS ─── */}
      {activeTab === "studio" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Workflows</h3>
              <p className="text-[11px] text-slate-500">Automated triggers across sales and dispatch</p>
            </div>
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {state.workflows.filter((w) => w.enabled).length} of {state.workflows.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {state.workflows.map((wf) => {
              // Simple trigger labels
              let triggerLabel = "Trigger: Auto";
              if (wf.code === "WF-A") triggerLabel = "When: Quote accepted";
              if (wf.code === "WF-B") triggerLabel = "When: Low stock";
              if (wf.code === "WF-C") triggerLabel = "When: No reply 48h";
              if (wf.code === "WF-D") triggerLabel = "When: Packed";
              if (wf.code === "WF-E") triggerLabel = "Daily: 8:00 AM";

              return (
                <div
                  key={wf.id}
                  className={`bg-white rounded-2xl p-4 sm:p-5 border transition-all ${
                    wf.enabled ? "border-slate-200/80 shadow-xs" : "border-slate-200/40 opacity-70 bg-slate-50/50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900">{wf.name}</h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {triggerLabel}
                        </span>
                        {wf.requiresHumanApproval && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            Sign-off
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onRunWorkflow(wf.id)}
                        disabled={!wf.enabled || isSimulating}
                        className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-[#2d5a3f] disabled:bg-slate-300 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>Run</span>
                      </button>

                      <button
                        onClick={() => onToggleWorkflow(wf.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                          wf.enabled
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : "bg-slate-100 text-slate-600 border-slate-300"
                        }`}
                      >
                        {wf.enabled ? "Active" : "Paused"}
                      </button>
                    </div>
                  </div>

                  {/* Flow Steps */}
                  <div className="pt-3 flex items-center gap-1.5 flex-wrap text-[11px]">
                    {wf.actionSequence.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-200/70 text-slate-700 font-medium">
                          {step.split(" ")[0]} {step.split(" ")[1] || ""}
                        </span>
                        {idx < wf.actionSequence.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── TAB 3: APPROVALS ─── */}
      {activeTab === "approvals" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Approvals</h3>
              <p className="text-[11px] text-slate-500">Items awaiting manager review</p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              {pendingApprovalsCount} Pending
            </span>
          </div>

          {state.approvals.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">Inbox Clean</h4>
              <p className="text-[11px] text-slate-400">All items resolved.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {state.approvals.map((appr) => {
                const isPending = appr.status === "pending";
                return (
                  <div
                    key={appr.id}
                    className={`bg-white rounded-2xl p-4 border transition-all ${
                      isPending ? "border-amber-300 shadow-xs" : "border-slate-200/70 opacity-80"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                              isPending
                                ? "bg-amber-100 text-amber-800"
                                : appr.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {appr.status === "pending" ? "Pending" : appr.status === "approved" ? "Approved" : "Declined"}
                          </span>
                          <span className="text-[11px] text-slate-400">{appr.createdAt}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 mt-1">{appr.title}</h4>
                        <div className="text-xs font-bold text-[#2d5a3f]">{appr.clientOrEntity}</div>
                      </div>

                      {appr.amountAED && (
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Amount</span>
                          <span className="text-base font-black text-slate-900 font-mono">
                            AED {appr.amountAED.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="py-2 space-y-1 text-xs">
                      <p className="text-slate-700 text-[11px]">{appr.details}</p>
                    </div>

                    {isPending ? (
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => onReject(appr.id, "Declined by manager")}
                          className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Decline
                        </button>

                        <button
                          onClick={() => onApprove(appr.id)}
                          className="px-4 py-1.5 rounded-lg bg-[#2d5a3f] hover:bg-[#234731] text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                      </div>
                    ) : (
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        Resolved by: <strong className="text-slate-800">{appr.resolvedBy || "Manager"}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ─── TAB 4: LOG ─── */}
      {activeTab === "timeline" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900">Activity Log</h3>
              <p className="text-[11px] text-slate-500">Recent automated events</p>
            </div>

            <div className="flex items-center gap-1 text-xs">
              {[
                { id: "all", label: "All" },
                { id: "completed", label: "Done" },
                { id: "pending_approval", label: "Review" },
                { id: "warning", label: "Alerts" },
              ].map((flt) => (
                <button
                  key={flt.id}
                  onClick={() => setTimelineFilter(flt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    timelineFilter === flt.id
                      ? "bg-[#1c2420] text-white"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {flt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
            {state.timeline
              .filter((ev) => timelineFilter === "all" || ev.status === timelineFilter)
              .map((ev) => (
                <div key={ev.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start gap-3 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 font-bold text-[10px] text-[#2d5a3f]">
                    {ev.agentName.split(" ")[1]?.[0] || "AI"}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 text-xs">{ev.agentName}</span>
                        {ev.reference && (
                          <span className="text-[#2d5a3f] font-mono font-bold text-[10px]">
                            #{ev.reference}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{ev.timestamp}</span>
                    </div>

                    <p className="text-slate-600 text-[11px] line-clamp-1">{ev.actionDescription}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ─── TAB 5: SETTINGS ─── */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900">Settings</h3>
            <p className="text-[11px] text-slate-500">Mode and discount threshold</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-900 block text-xs">Mode</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateSettings({ executionMode: "demo" })}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    state.settings.executionMode === "demo"
                      ? "bg-[#2d5a3f] text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  ⚡ Demo
                </button>
                <button
                  onClick={() => onUpdateSettings({ executionMode: "live_ai" })}
                  className={`flex-1 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                    state.settings.executionMode === "live_ai"
                      ? "bg-[#1c2420] text-emerald-400 shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200"
                  }`}
                >
                  🧠 Live
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Discount Ceiling</span>
                <span className="font-mono font-bold text-[#2d5a3f] text-xs">
                  {state.settings.autoApproveDiscountThresholdPercent}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={state.settings.autoApproveDiscountThresholdPercent}
                onChange={(e) =>
                  onUpdateSettings({ autoApproveDiscountThresholdPercent: Number(e.target.value) })
                }
                className="w-full accent-[#2d5a3f] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
