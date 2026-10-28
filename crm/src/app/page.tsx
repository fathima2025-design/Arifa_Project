"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutGrid,
  FileText,
  BarChart3,
  Building2,
  Users2,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  MessageSquare,
  Bell,
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Factory,
  Layers,
  Coins,
  Wrench,
  Zap,
  Truck,
  CheckCircle2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Plus,
  Download,
  ShieldCheck,
  Eye,
  RefreshCw,
  ShoppingBag,
  FileCheck,
  Sparkles,
  Bot,
  Cpu,
  Play,
  X,
  Check,
  CheckCheck,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  Package,
} from "lucide-react";

import { CRMMenu, UserRole } from "@/lib/types";
import {
  initialAgents,
  initialWorkflows,
  initialProducts,
  initialClients,
  initialQuotations,
  initialOrders,
  initialDispatchTasks,
  initialApprovals,
  initialTimelineEvents,
  initialSettings,
} from "@/lib/seed";
import {
  CRMState,
  createLead,
  checkInventory,
  createQuotationDraft,
  approveQuotation,
  rejectQuotation,
  convertQuotationToOrder,
  createDispatchTask,
  triggerLowStockAlert,
  triggerCustomerFollowUp,
  runDailyBIReport,
  recordAgentAction,
} from "@/lib/engine";

import AIAutomationCenter from "@/components/AIAutomationCenter";
import ScenarioSimulatorBar from "@/components/ScenarioSimulatorBar";
import InventoryModule from "@/components/InventoryModule";
import OrdersModule from "@/components/OrdersModule";

export default function CRMPreviewPage() {
  // ─── 1. CORE SHARED APPLICATION STATE ───
  const [crmState, setCrmState] = useState<CRMState>({
    clients: initialClients,
    products: initialProducts,
    quotations: initialQuotations,
    orders: initialOrders,
    dispatchTasks: initialDispatchTasks,
    approvals: initialApprovals,
    agents: initialAgents,
    workflows: initialWorkflows,
    timeline: initialTimelineEvents,
    settings: initialSettings,
  });

  // Perspective: "manager" or "client"
  const [userRole, setUserRole] = useState<UserRole>("manager");
  const [activeMenu, setActiveMenu] = useState<CRMMenu>("dashboard");
  const [selectedDay, setSelectedDay] = useState("Thu");
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);

  // Simulation runner state
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentSimStep, setCurrentSimStep] = useState(0);

  // AI Copilot Slide-over Drawer
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [agentActiveTab, setAgentActiveTab] = useState<"rfq" | "whatsapp" | "reorder" | "chat">("rfq");

  // Notes state
  const [newNote, setNewNote] = useState("");
  const [notesList, setNotesList] = useState([
    {
      author: "Sarah Al-Mansoori (Sales Lead)",
      time: "Today, 11:30 AM",
      text: "Meeting held with Emirates inflight procurement. Sample of AP-C1000-IVC approved by hygiene audit team. Moving to contract signing.",
    },
    {
      author: "Rashid Khan (Tooling Eng)",
      time: "Yesterday, 4:15 PM",
      text: "Tested embossed Emirates Falcon logo on multi-cavity stamping die #4 in Ajman plant. Precision depth: 0.65mm. Tooling QA passed.",
    },
    {
      author: "Sulthanul Arifeen (President)",
      time: "24 Oct 2026, 2:00 PM",
      text: "Approved custom wholesale discount tier (1.05 AED / unit for annual 500,000 unit commitment). 30-day credit terms authorized.",
    },
  ]);

  // WhatsApp Copilot Simulator State
  const [waMessages, setWaMessages] = useState([
    {
      sender: "client",
      time: "12:14 PM",
      text: "Hello Arifa team, where is our container delivery PO-EK-9921 right now?",
    },
    {
      sender: "agent",
      time: "12:14 PM",
      text: "Hi Sarah! 🚚 Querying factory dispatch telemetry for PO-EK-9921... UAE Fleet Truck #AE-4921 has cleared Bay C in Al Jurf 2. Driver Tariq is on E311 highway with 50,000 units AP-C1000. Estimated arrival at your Dubai Inflight Hub: Today, 2:30 PM.",
    },
  ]);
  const [waInput, setWaInput] = useState("");
  const [isWaTyping, setIsWaTyping] = useState(false);

  // Copilot Chat
  const [chatLog, setChatLog] = useState([
    {
      role: "agent",
      text: "Hello Sulthanul! I am your Arifa Operations & CRM AI Agent. You can ask me to calculate custom volume discounts, check Ajman plant stamping capacity, or generate quotes.",
    },
  ]);
  const [chatPrompt, setChatPrompt] = useState("");

  const pendingApprovalsCount = crmState.approvals.filter((a) => a.status === "pending").length;
  const currentClient = crmState.clients[selectedClientIndex] || crmState.clients[0];

  // ─── 2. SIMULATOR STEP HANDLERS (PHASE 6) ───
  const handleSimulatorStep = (stepNumber: number) => {
    setCurrentSimStep(stepNumber);

    switch (stepNumber) {
      case 1: {
        // Step 1: Generate Customer Inquiry (Dubai Aviation Hub)
        const { newState } = createLead(crmState, {
          name: "Dubai Aviation Hub Catering",
          contactPerson: "Capt. Rashid Al-Nuaimi",
          email: "procure@dubaiaviation.ae",
          phone: "+971 4 703 1111",
          location: "Dubai South Aviation District",
          sector: "Aviation Inflight Dining",
        });
        setCrmState(newState);
        break;
      }
      case 2: {
        // Step 2: Trigger Quotation Generation
        const targetClient = crmState.clients.find((c) => c.name.includes("Dubai Aviation")) || crmState.clients[0];
        const { newState } = createQuotationDraft(crmState, {
          clientId: targetClient.id,
          sku: "AP-C1000-IVC",
          quantity: 75000,
        });
        setCrmState(newState);
        break;
      }
      case 3: {
        // Step 3: Check Inventory
        const inv = checkInventory(crmState, "AP-C1000-IVC", 75000);
        const logged = recordAgentAction(
          crmState,
          "ag-inventory",
          `Checked ATP for AP-C1000-IVC: ${inv.currentStock.toLocaleString()} in stock, ${inv.reservedStock.toLocaleString()} reserved. Free stock: ${inv.freeStock.toLocaleString()} units.`,
          "inventory.stock.checked",
          "AP-C1000-IVC"
        );
        setCrmState(logged);
        break;
      }
      case 4: {
        // Step 4: Simulate Low Stock
        const lowState = triggerLowStockAlert(crmState, "AP-C200-DIV");
        setCrmState(lowState);
        break;
      }
      case 5: {
        // Step 5: Approve Quotation
        const pendingQuote = crmState.quotations.find((q) => q.status === "pending_approval") || crmState.quotations[0];
        if (pendingQuote) {
          const approved = approveQuotation(crmState, pendingQuote.id, "Sulthanul Arifeen");
          setCrmState(approved);
        }
        break;
      }
      case 6: {
        // Step 6: Convert Quotation to Order
        const approvedQuote = crmState.quotations.find((q) => q.status === "approved") || crmState.quotations[0];
        if (approvedQuote) {
          const { newState } = convertQuotationToOrder(crmState, approvedQuote.id);
          setCrmState(newState);
        }
        break;
      }
      case 7: {
        // Step 7: Simulate Dispatch
        const confirmedOrder = crmState.orders.find((o) => o.status === "confirmed") || crmState.orders[0];
        if (confirmedOrder) {
          const { newState } = createDispatchTask(crmState, confirmedOrder.id);
          setCrmState(newState);
        }
        break;
      }
      case 8: {
        // Step 8: Trigger Follow-up
        const followState = triggerCustomerFollowUp(crmState);
        setCrmState(followState);
        break;
      }
      case 9: {
        // Step 9: Run Daily AI Report
        const biState = runDailyBIReport(crmState);
        setCrmState(biState);
        break;
      }
    }
  };

  // Run Complete Autonomous Lifecycle (1-Click End-to-End Orchestration)
  const handleRunFullLifecycle = () => {
    setIsSimulating(true);
    setCurrentSimStep(1);

    handleSimulatorStep(1);

    setTimeout(() => {
      handleSimulatorStep(2);
      setCurrentSimStep(2);
    }, 1100);

    setTimeout(() => {
      handleSimulatorStep(3);
      setCurrentSimStep(3);
    }, 2200);

    setTimeout(() => {
      handleSimulatorStep(5);
      setCurrentSimStep(5);
    }, 3300);

    setTimeout(() => {
      handleSimulatorStep(6);
      setCurrentSimStep(6);
    }, 4400);

    setTimeout(() => {
      handleSimulatorStep(7);
      setCurrentSimStep(7);
    }, 5500);

    setTimeout(() => {
      handleSimulatorStep(9);
      setCurrentSimStep(9);
      setIsSimulating(false);
    }, 6600);
  };

  const handleResetState = () => {
    setCrmState({
      clients: initialClients,
      products: initialProducts,
      quotations: initialQuotations,
      orders: initialOrders,
      dispatchTasks: initialDispatchTasks,
      approvals: initialApprovals,
      agents: initialAgents,
      workflows: initialWorkflows,
      timeline: initialTimelineEvents,
      settings: initialSettings,
    });
    setCurrentSimStep(0);
  };

  // Quotation Approval Handlers for Human Approval Center
  const handleApproveQuotation = (quoteOrApprId: string) => {
    // Find matching quote
    const matchQuote = crmState.quotations.find(
      (q) => q.id === quoteOrApprId || crmState.approvals.some((a) => a.id === quoteOrApprId && a.title.includes(q.quoteNumber))
    ) || crmState.quotations[0];

    if (matchQuote) {
      const updated = approveQuotation(crmState, matchQuote.id, "Sulthanul Arifeen");
      setCrmState(updated);
    }
  };

  const handleRejectQuotation = (quoteOrApprId: string, reason?: string) => {
    const matchQuote = crmState.quotations.find(
      (q) => q.id === quoteOrApprId || crmState.approvals.some((a) => a.id === quoteOrApprId && a.title.includes(q.quoteNumber))
    ) || crmState.quotations[0];

    if (matchQuote) {
      const updated = rejectQuotation(crmState, matchQuote.id, reason);
      setCrmState(updated);
    }
  };

  const handleRunWorkflow = (workflowId: string) => {
    const wf = crmState.workflows.find((w) => w.id === workflowId);
    if (!wf) return;

    if (wf.code === "WF-A") handleSimulatorStep(6);
    else if (wf.code === "WF-B") handleSimulatorStep(4);
    else if (wf.code === "WF-C") handleSimulatorStep(8);
    else if (wf.code === "WF-D") handleSimulatorStep(7);
    else if (wf.code === "WF-E") handleSimulatorStep(9);
  };

  const handleToggleWorkflow = (workflowId: string) => {
    setCrmState((prev) => ({
      ...prev,
      workflows: prev.workflows.map((w) => (w.id === workflowId ? { ...w, enabled: !w.enabled } : w)),
    }));
  };

  const handleUpdateSettings = (newSettings: Partial<CRMState["settings"]>) => {
    setCrmState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }));
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotesList([
        {
          author: "Sulthanul Arifeen (Admin)",
          time: "Just now",
          text: newNote.trim(),
        },
        ...notesList,
      ]);
      setNewNote("");
    }
  };

  // WhatsApp Chat Simulator handler
  const handleSendWa = (presetText?: string) => {
    const textToSend = presetText || waInput;
    if (!textToSend.trim()) return;

    setWaMessages((prev) => [...prev, { sender: "client", time: "Just now", text: textToSend }]);
    setWaInput("");
    setIsWaTyping(true);

    setTimeout(() => {
      let reply = "Our factory sales engineer will inspect this and update your portal.";
      const lower = textToSend.toLowerCase();

      if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
        reply = "⚡ Wholesale volume rate for AP-C1000: 1.05 AED / unit for 50,000+ commitments (includes free food-grade hygiene testing & net-30 credit terms).";
      } else if (lower.includes("emboss") || lower.includes("tooling") || lower.includes("logo")) {
        reply = "🛠️ Yes! We manufacture custom multi-cavity stamping dies in our Ajman plant. Logo embossing die fee is AED 18,500 (waived on contracts above 250,000 units).";
      } else if (lower.includes("po") || lower.includes("truck") || lower.includes("delivery") || lower.includes("where")) {
        reply = "🚚 Truck #AE-4921 is en route to Dubai Hub via E311. Driver Tariq Mahmood: +971 50 123 4567. ETA: 2:30 PM.";
      }

      setWaMessages((prev) => [...prev, { sender: "agent", time: "Just now", text: reply }]);
      setIsWaTyping(false);
    }, 1000);
  };

  // Free-form Chat Simulator handler
  const handleSendChat = (promptText?: string) => {
    const query = promptText || chatPrompt;
    if (!query.trim()) return;

    setChatLog((prev) => [...prev, { role: "user", text: query }]);
    setChatPrompt("");

    setTimeout(() => {
      let ans = "Analysis completed. Relevant factory parameters updated.";
      const q = query.toLowerCase();

      if (q.includes("calculate") || q.includes("quote") || q.includes("100")) {
        ans = "📊 Wholesale Calculation for 100,000 Units (2-Compartment Meal Trays):\n• Base Rate: 1.00 AED\n• Volume Tier (100k+): 20% discount applied ➔ 0.80 AED / unit\n• Subtotal: AED 80,000.00\n• 5% UAE VAT: AED 4,000.00\n• Grand Total: AED 84,000.00\nWould you like me to dispatch this Proforma Quote to the client portal?";
      } else if (q.includes("machine") || q.includes("plant") || q.includes("line")) {
        ans = "🏭 Ajman Facility Live Status:\n• Stamping Line #1: 4,200 pcs/hr (Optimal)\n• Deep-Draw Line #4: 1,850 pcs/hr (Emirates Falcon Die loaded)\n• Foil Rewinding #2: 320 rolls/hr (Active)\nOverall factory utilization is at 92.4%. All QA ISO 9001 sensors green.";
      } else if (q.includes("pipeline") || q.includes("total")) {
        const total = crmState.quotations.reduce((sum, item) => sum + item.totalAED, 0);
        ans = `💰 Current Pipeline Summary:\n• Total Pipeline Value: AED ${total.toLocaleString()} across ${crmState.quotations.length} wholesale accounts.\n• Win Rate this month: 81.2%.`;
      }

      setChatLog((prev) => [...prev, { role: "agent", text: ans }]);
    }, 800);
  };

  // Weekly bar data
  const weeklyData = [
    { day: "Mon", amount: 2800, formatted: "AED 28,000" },
    { day: "Tue", amount: 3200, formatted: "AED 32,000" },
    { day: "Wed", amount: 3100, formatted: "AED 31,000" },
    { day: "Thu", amount: 4250, formatted: "AED 42,500", active: true },
    { day: "Fri", amount: 3600, formatted: "AED 36,000" },
    { day: "Sat", amount: 3900, formatted: "AED 39,000" },
    { day: "Sun", amount: 1400, formatted: "AED 14,000 (Shift 1)" },
  ];

  return (
    <div className="w-full max-w-[1440px] bg-[#f8faf7] rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-slate-900/10 border border-emerald-900/5 p-4 sm:p-7 flex flex-col lg:flex-row gap-6 relative overflow-hidden my-auto font-['Manrope']">
      
      {/* ─── 1. Left Floating Icon Rail (Sidebar) ─── */}
      <aside className="lg:w-16 flex lg:flex-col items-center justify-between bg-transparent shrink-0 py-2 border-b lg:border-b-0 lg:border-r border-slate-200/60 pb-3 lg:pb-0 lg:pr-3">
        <div className="flex lg:flex-col items-center gap-5">
          {/* Top Brand Logo Icon */}
          <div
            title="Arifa Pack Enterprise CRM"
            className="w-11 h-11 rounded-2xl bg-[#e3ede5] border border-emerald-700/15 flex items-center justify-center text-[#2d5a3f]"
          >
            <svg className="w-6 h-6 stroke-current stroke-[2.2]" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
            </svg>
          </div>

          {/* Menu Icons Rail */}
          <div className="flex lg:flex-col items-center gap-2">
            {/* 1. Dashboard */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("dashboard");
              }}
              title="Executive Dashboard Overview"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "manager" && activeMenu === "dashboard"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>

            {/* 2. Client 360° */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("clients");
              }}
              title="Client 360° Relationship View"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative ${
                userRole === "manager" && activeMenu === "clients"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <Users2 className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2" />
            </button>

            {/* 3. Deal Pipeline (Kanban) */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("pipeline");
              }}
              title="Wholesale Deal Pipeline (Kanban)"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "manager" && activeMenu === "pipeline"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <Layers className="w-5 h-5" />
            </button>

            {/* 4. Quotes & Proformas */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("quotes");
              }}
              title="Wholesale Quotations & Proformas"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "manager" && activeMenu === "quotes"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <FileText className="w-5 h-5" />
            </button>

            {/* 5. Inventory */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("inventory");
              }}
              title="Warehouse & Raw Stock Inventory"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "manager" && activeMenu === "inventory"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <Package className="w-5 h-5" />
            </button>

            {/* 6. Orders */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("orders");
              }}
              title="Factory Sales Orders & Fulfillment"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "manager" && activeMenu === "orders"
                  ? "bg-[#1c2420] text-white shadow-md shadow-slate-900/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
            </button>

            {/* 7. AI Automation Center (STAR FEATURE) */}
            <button
              onClick={() => {
                setUserRole("manager");
                setActiveMenu("automation");
              }}
              title="AI Automation Center (Agents & Workflows)"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative ${
                userRole === "manager" && activeMenu === "automation"
                  ? "bg-gradient-to-tr from-[#1c2420] to-[#2d5a3f] text-emerald-400 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/40"
                  : "text-slate-500 hover:text-emerald-700 hover:bg-[#eaf0eb]"
              }`}
            >
              <Bot className="w-5 h-5" />
              {pendingApprovalsCount > 0 ? (
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute top-1.5 right-1.5 ring-2 ring-white animate-pulse" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-2 right-2 animate-ping" />
              )}
            </button>

            {/* 8. Perspective Switcher to Client Portal */}
            <button
              onClick={() => setUserRole("client")}
              title="Switch to Client Wholesale Portal (Buyer Perspective)"
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                userRole === "client"
                  ? "bg-[#2d5a3f] text-white shadow-md shadow-emerald-900/30"
                  : "text-slate-500 hover:text-slate-800 hover:bg-[#eaf0eb]"
              }`}
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Rail Controls */}
        <div className="flex lg:flex-col items-center gap-3">
          {/* AI Drawer Floating Rail Button */}
          <button
            onClick={() => setIsAgentDrawerOpen(true)}
            title="Open Arifa AI Copilot Drawer"
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2d5a3f] to-emerald-400 text-white flex items-center justify-center shadow-md hover:scale-105 transition-transform cursor-pointer relative"
          >
            <Sparkles className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-emerald-300 absolute -top-0.5 -right-0.5 animate-ping" />
          </button>

          <a
            href="https://www.arifapack.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Main Arifa Pack Website"
            className="w-10 h-10 rounded-xl text-slate-500 hover:text-[#2d5a3f] hover:bg-[#eaf0eb] flex items-center justify-center transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <div
            title={userRole === "manager" ? "Sulthanul Arifeen (Admin)" : "Sarah Ahmed (Client: Emirates Catering)"}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white text-white ${
              userRole === "manager" ? "bg-[#2d5a3f]" : "bg-blue-600"
            }`}
          >
            {userRole === "manager" ? "SA" : "EK"}
          </div>
        </div>
      </aside>

      {/* ─── 2. Main Content Canvas ─── */}
      <main className="flex-1 space-y-6 overflow-x-hidden">
        {/* Top Header: Greeting, AI Trigger & Role Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {userRole === "manager" ? "Hello, Sulthanul!" : "Welcome, Emirates Flight Catering"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#eaf2ec] text-[#2d5a3f] border border-[#2d5a3f]/20">
                {userRole === "manager" ? "Arifa Manager CRM" : "B2B Client Portal"}
              </span>

              {/* AI Agent Status Pill */}
              <button
                onClick={() => {
                  setUserRole("manager");
                  setActiveMenu("automation");
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1c2420] text-emerald-400 border border-emerald-500/30 shadow-xs hover:bg-slate-900 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI Active</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {userRole === "manager"
                ? "Wholesale relationships, quick quotes, and factory orders"
                : "View active wholesale contracts, track container dispatches & 1-click reorder"}
            </p>
          </div>

          {/* Right: Role Perspective Switcher & Search */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Perspective Pill Toggle */}
            <div className="p-1 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-1">
              <button
                onClick={() => setUserRole("manager")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  userRole === "manager" ? "bg-[#1c2420] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🏢 Manager CRM
              </button>
              <button
                onClick={() => setUserRole("client")}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  userRole === "client" ? "bg-[#2d5a3f] text-white shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                🛒 Client Portal
              </button>
            </div>

            {/* Rounded Search Bar */}
            <div className="relative flex items-center bg-white rounded-full shadow-xs border border-slate-200/80 px-3.5 py-1.5 w-48 sm:w-56">
              <input
                type="text"
                placeholder="Search CRM..."
                className="bg-transparent text-xs text-slate-800 placeholder:text-slate-400 outline-none w-full pr-7 font-medium"
              />
              <button
                aria-label="Search"
                className="w-6 h-6 rounded-full bg-[#1c2420] text-white flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Search className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* ─── SCENARIO SIMULATOR BAR (PHASE 6) ─── */}
        {userRole === "manager" && (
          <ScenarioSimulatorBar
            onStep={handleSimulatorStep}
            onRunAll={handleRunFullLifecycle}
            onReset={handleResetState}
            isSimulating={isSimulating}
            currentSimStep={currentSimStep}
          />
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW A: CLIENT PORTAL PERSPECTIVE ("What the Client Sees")
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "client" && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1c2420] to-[#2d5a3f] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400">
                  DIRECT FACTORY CONTRACT • AJMAN, UAE
                </span>
                <div className="text-xl sm:text-2xl font-black">
                  Emirates Flight Catering — Procurement Desk
                </div>
                <div className="text-xs text-slate-300 font-medium">
                  Contract ID: <span className="text-white font-mono font-bold">EK-AF-2026-VIP</span> • 
                  Dedicated Key Account Manager: <span className="text-white font-bold">Sarah Al-Mansoori</span> (+971 6 747 7061)
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSimulatorStep(6)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>1-Click Reorder (50,000 pcs)</span>
                </button>
              </div>
            </div>

            {/* 3 Client Status Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Active Factory Order
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {crmState.orders[0]?.items[0]?.quantity.toLocaleString() || "50,000"} Units
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>{crmState.orders[0]?.status === "dispatched" ? "Dispatched in Truck #AE-4921" : "Stamping Press Line #4"}</span>
                </div>
                <div className="text-[11px] text-slate-400">Estimated delivery: Today, 2:30 PM</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Your Locked Wholesale Price
                </span>
                <div className="text-2xl font-black text-[#2d5a3f] font-mono">
                  1.05 AED / unit
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Volume Tier: 50,000+ pcs (16% off standard 1.25 AED)
                </div>
                <div className="text-[11px] text-slate-400">Valid through: 31 Dec 2026</div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Credit Limit &amp; Billing
                </span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  AED 250,000
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  Terms: 30-Day Net (Utilized: AED 52,500)
                </div>
                <div className="text-[11px] text-emerald-600 font-bold">Good Standing • ISO 9001 Approved</div>
              </div>
            </div>

            {/* Live Tracking & Compliance Downloads */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  Active Order Timeline: {crmState.orders[0]?.orderNumber || "PO-EK-9921"}
                </h3>
                <div className="space-y-4 pt-2">
                  {[
                    { step: "Order Placed & Die Tooling Verified", time: "25 Oct, 9:00 AM", done: true },
                    { step: "780+ Press Line Stamping in Ajman Plant", time: "25 Oct, 3:30 PM", done: true },
                    { step: "Quality Assurance & Food Contact Lab Inspection Passed", time: "26 Oct, 8:00 AM", done: true },
                    { step: "Palletized & Loaded into Dispatch Truck #AE-4921", time: "Today, 10:45 AM", done: crmState.orders[0]?.status === "dispatched" },
                    { step: "Arrival at Emirates Catering Dubai Hub", time: "Estimated 2:30 PM", done: false },
                  ].map((st, i) => (
                    <div key={i} className="flex items-center gap-3.5 text-xs">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          st.done ? "bg-[#2d5a3f] text-white" : "bg-slate-100 text-slate-400 border border-slate-200"
                        }`}
                      >
                        {st.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className={st.done ? "font-bold text-slate-900" : "text-slate-400"}>
                          {st.step}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{st.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900">
                  Compliance &amp; Documents
                </h3>
                <div className="space-y-2.5">
                  {[
                    { name: "ISO 9001:2015 QA Certificate", type: "PDF (1.2 MB)" },
                    { name: "Aluminium Food Contact Safety Sheet", type: "PDF (840 KB)" },
                    { name: "Commercial Invoice #PI-2026-0811", type: "PDF (420 KB)" },
                    { name: "Custom Embossing Die Spec Sheet", type: "CAD / PDF" },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/50 transition-colors"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                        <div className="text-[10px] text-slate-400">{doc.type}</div>
                      </div>
                      <Download className="w-4 h-4 text-[#2d5a3f] cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW B: ARFA MANAGER DASHBOARD
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "dashboard" && (
          <div className="space-y-6">
            {/* Row 1: KPI Metric Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold tracking-wider uppercase">Active Pipeline</span>
                  <div className="w-8 h-8 rounded-xl bg-[#eaf2ec] text-[#2d5a3f] flex items-center justify-center">
                    <Coins className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  AED {crmState.quotations.reduce((sum, q) => sum + q.totalAED, 0).toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+18.4% vs last month</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold tracking-wider uppercase">Active Orders</span>
                  <div className="w-8 h-8 rounded-xl bg-[#eaf2ec] text-[#2d5a3f] flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  AED {crmState.orders.reduce((sum, o) => sum + o.totalAED, 0).toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{crmState.orders.length} in production / dispatch</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold tracking-wider uppercase">Enterprise Accounts</span>
                  <div className="w-8 h-8 rounded-xl bg-[#eaf2ec] text-[#2d5a3f] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {crmState.clients.length} Accounts
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Emirates, Talabat, Lulu, Carrefour</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold tracking-wider uppercase">Pending Approvals</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-amber-600 font-mono flex items-center justify-between">
                  <span>{pendingApprovalsCount}</span>
                  {pendingApprovalsCount > 0 && (
                    <button
                      onClick={() => setActiveMenu("automation")}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold hover:bg-amber-200 cursor-pointer"
                    >
                      Resolve →
                    </button>
                  )}
                </div>
                <div className="text-xs text-slate-400">Discount &amp; material requisitions</div>
              </div>
            </div>

            {/* Row 2: Production Bar Chart & Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                      Weekly Stamping Output &amp; Sales (Ajman Plant)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Average 4,200 pcs / hour across 780+ machine tools</p>
                  </div>
                  <span className="text-xs font-bold text-[#2d5a3f] bg-[#eaf2ec] px-3 py-1 rounded-full">
                    Shift 1 &amp; 2 Active
                  </span>
                </div>

                <div className="h-52 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
                  {weeklyData.map((d) => (
                    <div
                      key={d.day}
                      onClick={() => setSelectedDay(d.day)}
                      className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div className="w-full flex items-end justify-center h-40">
                        <div
                          style={{ height: `${(d.amount / 4500) * 100}%` }}
                          className={`w-full max-w-[42px] rounded-t-xl transition-all duration-300 relative ${
                            d.day === selectedDay
                              ? "bg-[#2d5a3f] shadow-lg shadow-emerald-900/20"
                              : "bg-slate-200 group-hover:bg-slate-300"
                          }`}
                        >
                          {d.day === selectedDay && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1c2420] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md whitespace-nowrap shadow-md">
                              {d.formatted}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${d.day === selectedDay ? "text-slate-900" : "text-slate-400"}`}>
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Donut */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Packaging Categories</h3>
                  <button onClick={() => setActiveMenu("inventory")} className="text-xs font-bold text-[#2d5a3f] hover:underline cursor-pointer">
                    See Details
                  </button>
                </div>

                <div className="flex items-center justify-center relative py-2">
                  <div className="relative w-44 h-44">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="#2d5a3f" strokeWidth="14" strokeDasharray="114 238" strokeDashoffset="0" />
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="#8fbfa3" strokeWidth="14" strokeDasharray="62 238" strokeDashoffset="-114" />
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="#b5c4d4" strokeWidth="14" strokeDasharray="38 238" strokeDashoffset="-176" />
                      <circle cx="50" cy="50" r="38" fill="transparent" stroke="#e8cbb5" strokeWidth="14" strokeDasharray="24 238" strokeDashoffset="-214" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Value</span>
                      <span className="text-xl font-black text-slate-900 font-mono">AED 485K</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2d5a3f]" />
                    <span className="text-slate-600 font-medium">Aluminium Food</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8fbfa3]" />
                    <span className="text-slate-600 font-medium">Commercial Foil</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b5c4d4]" />
                    <span className="text-slate-600 font-medium">Catering Platters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#e8cbb5]" />
                    <span className="text-slate-600 font-medium">Cling Film</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Factory Line Operations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Active Wholesale Orders</h3>
                  <button onClick={() => setActiveMenu("orders")} className="text-xs font-bold text-[#2d5a3f] hover:underline cursor-pointer">
                    View Orders ({crmState.orders.length}) →
                  </button>
                </div>
                <div className="space-y-3.5">
                  {crmState.orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#2d5a3f] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          {ord.orderNumber.split("-")[1]}
                        </div>
                        <div>
                          <div className="text-xs font-extrabold text-slate-900">{ord.clientName}</div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {ord.items[0]?.quantity.toLocaleString()}x {ord.items[0]?.name}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{ord.createdAt}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-[#2d5a3f] font-mono">AED {ord.totalAED.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Ajman Plant Line Status</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    780+ Machines Active
                  </span>
                </div>
                <div className="space-y-3.5">
                  {[
                    {
                      line: "Automated Press Line #4 | Al Jurf 2",
                      id: "Machine: AP-PRESS-04",
                      status: "Running 50k Tray Batch",
                      operator: "Rashid Khan",
                      role: "Chief Tooling Eng.",
                      icon: Wrench,
                      iconBg: "bg-[#eaf2ec] text-[#2d5a3f]",
                      avatar: "RK",
                    },
                    {
                      line: "Commercial Foil Slitter #2 | Bay B",
                      id: "Machine: AP-SLIT-02",
                      status: "45cm Kitchen Foil Slitting",
                      operator: "Albert Flores",
                      role: "Shift Supervisor",
                      icon: Zap,
                      iconBg: "bg-[#edf2f7] text-[#4a5568]",
                      avatar: "AF",
                    },
                    {
                      line: "Platter Deep-Draw Embosser #1 | Bay C",
                      id: "Machine: AP-EMB-01",
                      status: "Luxury 55cm Oval Platters",
                      operator: "Robert Fox",
                      role: "Lead QA Inspector",
                      icon: Factory,
                      iconBg: "bg-[#fdf4eb] text-[#c05621]",
                      avatar: "RF",
                    },
                  ].map((m, idx) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${m.iconBg}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">{m.line}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{m.id}</div>
                            <div className="text-[11px] font-semibold text-[#2d5a3f] mt-0.5">{m.status}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pl-2 text-right">
                          <div>
                            <div className="text-xs font-bold text-slate-800">{m.operator}</div>
                            <div className="text-[10px] text-slate-400">{m.role}</div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-white">
                            {m.avatar}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW C: CLIENT 360° RELATIONSHIP VIEW
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "clients" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/70 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">Key Accounts ({crmState.clients.length})</h3>
                <button
                  onClick={() => handleSimulatorStep(1)}
                  className="text-xs text-[#2d5a3f] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Simulate New Lead</span>
                </button>
              </div>

              <div className="space-y-2">
                {crmState.clients.map((client, idx) => (
                  <button
                    key={client.id}
                    onClick={() => setSelectedClientIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedClientIndex === idx
                        ? "bg-[#eaf2ec] border-[#2d5a3f]/40 shadow-xs"
                        : "bg-white border-slate-200/80 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 line-clamp-1">{client.name}</span>
                      <span className="text-[10px] font-bold text-[#2d5a3f] font-mono shrink-0 ml-1">
                        {client.lifetimeValue}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{client.sector}</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100/80 text-[10px]">
                      <span className="font-semibold text-slate-600">{client.contactPerson.split(" ")[0]}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white text-slate-700 font-bold border border-slate-200">
                        {client.totalOrders} Orders
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-slate-900">{currentClient.name}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                        {currentClient.tier}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {currentClient.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        {currentClient.sector}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${currentClient.phone}`}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2d5a3f]" />
                      <span>Call</span>
                    </a>
                    <button
                      onClick={() => handleSimulatorStep(2)}
                      className="px-3 py-1.5 rounded-xl bg-[#2d5a3f] text-white text-xs font-bold hover:bg-[#234731] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>AI Draft Quote</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Lifetime Orders</span>
                    <span className="text-base font-black text-slate-900">{currentClient.lifetimeValue}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Volume</span>
                    <span className="text-base font-black text-slate-900">{currentClient.totalOrders} Shipments</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Contract Rate</span>
                    <span className="text-xs font-black text-[#2d5a3f]">{currentClient.contractRate}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Credit Terms</span>
                    <span className="text-xs font-bold text-slate-800">{currentClient.creditTerms.split("(")[0]}</span>
                  </div>
                </div>
              </div>

              {/* Relationship Timeline & Notes */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center justify-between">
                  <span>Client Relationship Log &amp; Interactions</span>
                  <span className="text-xs text-slate-400 font-normal">Internal Sales Log</span>
                </h3>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder={`Add client note for ${currentClient.name}...`}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#2d5a3f]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#2d5a3f] text-white text-xs font-bold hover:bg-[#234731] flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Log Note</span>
                  </button>
                </form>

                <div className="space-y-3 pt-2">
                  {notesList.map((nt, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#f8faf8] border border-slate-200/60 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-extrabold text-slate-900">{nt.author}</span>
                        <span className="text-slate-400 font-mono">{nt.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-normal">{nt.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW D: DEAL PIPELINE (KANBAN BOARD)
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "pipeline" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">Live Wholesale Deal Pipeline</h3>
                <p className="text-xs text-slate-500">
                  Move quotes through stages from website inquiry to factory work order
                </p>
              </div>
              <button
                onClick={() => handleSimulatorStep(1)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c2420] text-emerald-400 text-xs font-bold hover:bg-slate-900 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulate Inflow</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stage 1: Inquiries */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 border-b border-slate-100 pb-2">
                  <span>1. Website Inquiries</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    {crmState.clients.length} Leads
                  </span>
                </div>
                {crmState.clients.map((lead) => (
                  <div key={lead.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center text-xs font-black text-slate-900">
                      <span>{lead.name}</span>
                      <span className="text-[#2d5a3f]">{lead.contractRate}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{lead.location}</div>
                    <span className="inline-block px-2 py-0.5 rounded-md text-[9px] font-black bg-emerald-50 text-emerald-800">
                      ⚡ Qualified Lead
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage 2: Quotations Drafted */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 border-b border-slate-100 pb-2">
                  <span>2. Quotations &amp; Proformas</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    {crmState.quotations.length} Quotes
                  </span>
                </div>
                {crmState.quotations.map((q) => (
                  <div key={q.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-black text-slate-900">
                      <span>{q.clientName}</span>
                      <span className="text-[#2d5a3f]">AED {q.totalAED.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">{q.quoteNumber}</div>
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black ${
                      q.status === "pending_approval" ? "bg-amber-100 text-amber-800" : "bg-purple-50 text-purple-800"
                    }`}>
                      {q.status.replace("_", " ").toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage 3: Factory Work Orders */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 border-b border-slate-100 pb-2">
                  <span>3. Factory Work Orders</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    {crmState.orders.length} Orders
                  </span>
                </div>
                {crmState.orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-black text-slate-900">
                      <span>{ord.clientName}</span>
                      <span className="text-[#2d5a3f]">AED {ord.totalAED.toLocaleString()}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{ord.assignedLine}</div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[9px] font-black">
                      {ord.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stage 4: Dispatched / Export */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-slate-800 border-b border-slate-100 pb-2">
                  <span>4. Dispatched / Export</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
                    {crmState.dispatchTasks.length} Trucks
                  </span>
                </div>
                {crmState.dispatchTasks.map((disp) => (
                  <div key={disp.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-black text-slate-900">
                      <span>{disp.clientName}</span>
                      <span className="text-[#2d5a3f]">{disp.carrierFleet.split("#")[1] || "Truck"}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{disp.deliveryLocation}</div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[9px] font-black">
                      🚚 {disp.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW E: QUOTATIONS MODULE
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "quotes" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Wholesale Quotations &amp; Proformas
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Direct commercial price calculations with automated volume discounts and 5% UAE VAT
                </p>
              </div>

              <button
                onClick={() => handleSimulatorStep(2)}
                className="px-4 py-2.5 rounded-xl bg-[#2d5a3f] hover:bg-[#234731] text-white text-xs font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate New Quote</span>
              </button>
            </div>

            <div className="space-y-4">
              {crmState.quotations.map((q) => (
                <div
                  key={q.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-black">
                        {q.quoteNumber}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          q.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : q.status === "pending_approval"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {q.status.replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">• {q.createdAt}</span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900">{q.clientName}</h3>
                      <div className="text-xs text-slate-600 font-medium mt-0.5">
                        {q.items.map((it) => `${it.quantity.toLocaleString()}x ${it.name} (AED ${it.unitPriceAED}/unit)`).join(", ")}
                      </div>
                    </div>

                    {q.approvalReason && (
                      <div className="text-[11px] text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/60 inline-block font-medium">
                        ⚠️ {q.approvalReason}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total (Inc. 5% VAT)</span>
                      <span className="text-xl font-black text-slate-900 font-mono">
                        AED {q.totalAED.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {q.status === "pending_approval" && (
                        <button
                          onClick={() => handleApproveQuotation(q.id)}
                          className="px-4 py-2 rounded-xl bg-[#2d5a3f] text-white text-xs font-black hover:bg-[#234731] cursor-pointer shadow-xs"
                        >
                          Approve Discount
                        </button>
                      )}
                      {q.status === "approved" && (
                        <button
                          onClick={() => handleSimulatorStep(6)}
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black hover:bg-slate-800 cursor-pointer shadow-xs"
                        >
                          Convert to Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW F: INVENTORY MODULE
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "inventory" && (
          <InventoryModule
            products={crmState.products}
            onTriggerLowStock={(sku) => handleSimulatorStep(4)}
          />
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW G: ORDERS MODULE
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "orders" && (
          <OrdersModule
            orders={crmState.orders}
            dispatchTasks={crmState.dispatchTasks}
            onDispatchOrder={(orderId) => handleSimulatorStep(7)}
          />
        )}

        {/* ═════════════════════════════════════════════════════════════
            VIEW H: AI AUTOMATION CENTER (PHASE 4 STAR COMPONENT)
           ═════════════════════════════════════════════════════════════ */}
        {userRole === "manager" && activeMenu === "automation" && (
          <AIAutomationCenter
            state={crmState}
            onApprove={handleApproveQuotation}
            onReject={handleRejectQuotation}
            onRunWorkflow={handleRunWorkflow}
            onToggleWorkflow={handleToggleWorkflow}
            onUpdateSettings={handleUpdateSettings}
            onTriggerSimulatorStep={handleSimulatorStep}
            onRunFullLifecycle={handleRunFullLifecycle}
            isSimulating={isSimulating}
          />
        )}
      </main>

      {/* ═════════════════════════════════════════════════════════════
          3. FLOATING TRIGGER BUTTON (Always visible in bottom-right)
         ═════════════════════════════════════════════════════════════ */}
      <button
        onClick={() => setIsAgentDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#1c2420] to-[#2d5a3f] text-white px-4 py-3 rounded-2xl shadow-2xl shadow-emerald-950/30 border border-emerald-500/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold relative">
          <Sparkles className="w-4 h-4 fill-current animate-spin" style={{ animationDuration: "8s" }} />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300 absolute -top-1 -right-1 ring-2 ring-slate-900 animate-ping" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-extrabold flex items-center gap-1.5">
            <span>AI Copilot</span>
          </div>
          <div className="text-[10px] text-slate-300">Quick Actions</div>
        </div>
      </button>

      {/* ═════════════════════════════════════════════════════════════
          4. AI AGENT COPILOT SLIDE-OVER DRAWER (WhatsApp & Chat Simulator)
         ═════════════════════════════════════════════════════════════ */}
      {isAgentDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#f8faf7] h-full shadow-2xl border-l border-emerald-900/10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 font-['Manrope']">
            
            {/* Drawer Header */}
            <div className="p-5 bg-[#1c2420] text-white flex items-center justify-between border-b border-emerald-800/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-black flex items-center gap-2">
                    <span>Arifa AI Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Wholesale and factory order assistant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsAgentDrawerOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Workflow Navigation Tabs */}
            <div className="grid grid-cols-4 p-2 bg-slate-100/80 border-b border-slate-200 text-xs font-bold gap-1">
              {[
                { id: "rfq", label: "⚡ Auto-RFQ", sub: "Triage & Quote" },
                { id: "whatsapp", label: "💬 WhatsApp", sub: "24/7 Support" },
                { id: "reorder", label: "📈 Retention", sub: "Predict Churn" },
                { id: "chat", label: "🧠 Copilot", sub: "Ask Anything" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAgentActiveTab(tab.id as typeof agentActiveTab)}
                  className={`p-2 rounded-xl text-center transition-all cursor-pointer ${
                    agentActiveTab === tab.id
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/80 font-black"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/40"
                  }`}
                >
                  <div className="text-[11px]">{tab.label}</div>
                  <div className="text-[9px] text-slate-400 font-normal">{tab.sub}</div>
                </button>
              ))}
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* TAB 1: Auto-RFQ Demo */}
              {agentActiveTab === "rfq" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <span className="text-[10px] uppercase font-black tracking-wider text-[#2d5a3f]">
                      Simulate Incoming Enterprise RFQ
                    </span>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Click below to simulate a wholesale client submitting a customized request via website form. The AI will parse specs, check stock, calculate volume discounts, and add the lead live to your CRM.
                    </p>
                    <button
                      onClick={handleRunFullLifecycle}
                      disabled={isSimulating}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2d5a3f] to-emerald-600 hover:from-[#234731] hover:to-emerald-500 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>{isSimulating ? "Running Orchestrator..." : "Simulate Live Inflow"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#eaf2ec] border border-[#2d5a3f]/20 text-xs space-y-2">
                    <span className="font-bold text-slate-900 block">Current Pipeline State:</span>
                    <div className="text-slate-700">
                      Total Quotes: <strong>{crmState.quotations.length}</strong> | Total Value: <strong>AED {crmState.quotations.reduce((acc, q) => acc + q.totalAED, 0).toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WhatsApp AI Support */}
              {agentActiveTab === "whatsapp" && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-[#075e54] text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-400 text-slate-900 font-black flex items-center justify-center text-xs">
                        AP
                      </div>
                      <div>
                        <div className="font-bold text-xs">Arifa Factory WhatsApp Desk</div>
                        <div className="text-[10px] text-emerald-200">Connected to UAE Fleet GPS</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* WhatsApp Messages Feed */}
                  <div className="p-4 rounded-2xl bg-[#efeae2] space-y-3 min-h-[220px]">
                    {waMessages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col ${
                          msg.sender === "client" ? "items-start" : "items-end"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                            msg.sender === "client"
                              ? "bg-white text-slate-800 rounded-tl-xs"
                              : "bg-[#dcf8c6] text-slate-900 rounded-tr-xs"
                          }`}
                        >
                          <p>{msg.text}</p>
                          <div className="text-[9px] text-slate-400 text-right mt-1 flex items-center justify-end gap-1 font-mono">
                            <span>{msg.time}</span>
                            {msg.sender === "agent" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isWaTyping && (
                      <div className="text-[11px] text-slate-500 italic flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-ping" />
                        <span>Arifa AI is checking plant telemetry...</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "Where is truck AE-4921?",
                      "Cost of custom container tooling die?",
                      "What is MOQ for embossed platters?",
                    ].map((pill, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendWa(pill)}
                        className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        {pill}
                      </button>
                    ))}
                  </div>

                  {/* WA Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={waInput}
                      onChange={(e) => setWaInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendWa()}
                      placeholder="Ask factory bot..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#2d5a3f]"
                    />
                    <button
                      onClick={() => handleSendWa()}
                      className="px-4 py-2 rounded-xl bg-[#075e54] text-white font-bold text-xs hover:bg-[#064e46] transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: Retention & Churn Prediction */}
              {agentActiveTab === "reorder" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">Lulu Group International</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Reorder Due in 2 Days
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Average Reorder Cadence:</span>
                        <strong className="text-slate-800">Every 21 Days</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Days Since Last Dispatch:</span>
                        <strong className="text-slate-800">19 Days (88% stock depleted)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Favorite Item:</span>
                        <strong className="text-slate-800">Heavy-Duty Catering Foil (1,500 Ctns)</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSimulatorStep(8)}
                      className="w-full py-2.5 rounded-xl bg-[#2d5a3f] hover:bg-[#234731] text-white text-xs font-black transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      <span>⚡ 1-Click Send Reorder Prompt</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: Free-form Copilot Chat */}
              {agentActiveTab === "chat" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 min-h-[220px]">
                    {chatLog.map((c, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                          c.role === "agent"
                            ? "bg-[#eaf2ec] text-slate-900"
                            : "bg-slate-900 text-white ml-8"
                        }`}
                      >
                        <div className="font-bold text-[10px] text-[#2d5a3f] mb-1">
                          {c.role === "agent" ? "Arifa AI Operations Agent" : "Sulthanul Arifeen"}
                        </div>
                        {c.text}
                      </div>
                    ))}
                  </div>

                  {/* Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Calculate bulk discount for 120,000 trays",
                      "Check Line 3 die stamping status",
                      "Summarize pipeline total for this week",
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendChat(chip)}
                        className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 text-[10px] font-semibold text-slate-700 transition-colors cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatPrompt}
                      onChange={(e) => setChatPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                      placeholder="Ask Arifa AI operations agent..."
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs outline-none focus:border-[#2d5a3f]"
                    />
                    <button
                      onClick={() => handleSendChat()}
                      className="px-4 py-2 rounded-xl bg-[#2d5a3f] text-white font-bold text-xs hover:bg-[#234731] transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Automation Ready</span>
              </span>
              <button
                onClick={() => {
                  setIsAgentDrawerOpen(false);
                  setActiveMenu("automation");
                }}
                className="font-bold text-[#2d5a3f] hover:underline cursor-pointer"
              >
                Open AI Hub →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
