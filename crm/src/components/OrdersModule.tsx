"use client";

import React from "react";
import { SalesOrder, DispatchTask } from "../lib/types";
import { ShoppingBag, Truck, CheckCircle2, Clock, FileText } from "lucide-react";

interface OrdersModuleProps {
  orders: SalesOrder[];
  dispatchTasks: DispatchTask[];
  onDispatchOrder: (orderId: string) => void;
}

export default function OrdersModule({ orders, dispatchTasks, onDispatchOrder }: OrdersModuleProps) {
  const totalOrdersValue = orders.reduce((acc, o) => acc + o.totalAED, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Factory Work Orders &amp; Fulfillment
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Authorized sales orders scheduled on Ajman stamping presses and staged for dispatch
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Orders Value</span>
          <span className="text-xl font-black text-[#2d5a3f] font-mono">
            AED {totalOrdersValue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => {
          const associatedDispatch = dispatchTasks.find((d) => d.orderId === ord.id);
          const isDispatched = ord.status === "dispatched";

          return (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-black">
                    {ord.orderNumber}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isDispatched
                        ? "bg-emerald-100 text-emerald-800"
                        : ord.status === "in_production"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {ord.status.replace("_", " ")}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">• {ord.createdAt}</span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900">{ord.clientName}</h3>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    {ord.items.map((it) => `${it.quantity.toLocaleString()}x ${it.name}`).join(", ")}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 flex-wrap">
                  <span>Factory Line: <strong className="text-slate-800">{ord.assignedLine}</strong></span>
                  <span>Terms: <strong className="text-slate-800">{ord.paymentTerms}</strong></span>
                  <span>Est. Delivery: <strong className="text-slate-800">{ord.estimatedDelivery}</strong></span>
                </div>
              </div>

              {/* Commercials & Dispatch Status */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Amount</span>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    AED {ord.totalAED.toLocaleString()}
                  </span>
                </div>

                <div>
                  {isDispatched ? (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                        <Truck className="w-3.5 h-3.5" />
                        <span>En Route</span>
                      </div>
                      <div className="text-[10px] text-emerald-700">
                        {associatedDispatch?.carrierFleet || "UAE Fleet Truck #AE-4921"}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onDispatchOrder(ord.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#2d5a3f] hover:bg-[#234731] text-white text-xs font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Simulate Dispatch</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
