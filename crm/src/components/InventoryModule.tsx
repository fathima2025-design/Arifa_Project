"use client";

import React from "react";
import { ProductItem } from "../lib/types";
import { Package, AlertTriangle, CheckCircle2, TrendingDown, RefreshCw } from "lucide-react";

interface InventoryModuleProps {
  products: ProductItem[];
  onTriggerLowStock: (sku: string) => void;
}

export default function InventoryModule({ products, onTriggerLowStock }: InventoryModuleProps) {
  const totalStock = products.reduce((acc, p) => acc + p.currentStock, 0);
  const totalReserved = products.reduce((acc, p) => acc + p.reservedStock, 0);
  const lowStockCount = products.filter((p) => p.status !== "optimal").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Factory Warehouse &amp; Inventory (Ajman Plant)
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Live physical warehouse counts, available-to-promise (ATP) allocations, and automated safety buffers
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-xs">
            Bays A, B, C Active
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Physical Stock</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalStock.toLocaleString()} Units</div>
          <div className="text-[11px] text-slate-500">Across 5 Primary Production Lines</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Allocated / Reserved</span>
          <div className="text-2xl font-black text-amber-600 font-mono">{totalReserved.toLocaleString()} Units</div>
          <div className="text-[11px] text-amber-800 font-semibold">Locked for Confirmed Factory Work Orders</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Safety Buffer Alerts</span>
          <div className="text-2xl font-black text-rose-600 font-mono flex items-center justify-between">
            <span>{lowStockCount} SKUs</span>
            {lowStockCount > 0 && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">Action Needed</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500">Monitored continuously by AI Inventory Agent</div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900">Current Stock Allocations</h3>
          <span className="text-xs text-slate-400 font-medium">Automatic sync with Stamping Dies</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] uppercase font-bold text-slate-400">
                <th className="pb-3">SKU &amp; Product</th>
                <th className="pb-3">Location</th>
                <th className="pb-3 text-right">Physical Stock</th>
                <th className="pb-3 text-right">Reserved</th>
                <th className="pb-3 text-right">Free to Promise</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const freeStock = p.currentStock - p.reservedStock;
                const isCritical = p.status === "critical" || freeStock <= p.reorderThreshold;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-black text-slate-900">{p.name}</div>
                      <div className="text-[11px] font-mono text-[#2d5a3f]">{p.sku}</div>
                    </td>
                    <td className="py-3.5 text-slate-600 font-medium">{p.warehouseLocation}</td>
                    <td className="py-3.5 text-right font-mono font-bold text-slate-900">
                      {p.currentStock.toLocaleString()} {p.unit}
                    </td>
                    <td className="py-3.5 text-right font-mono text-amber-700 font-bold">
                      {p.reservedStock.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-right font-mono font-black text-[#2d5a3f]">
                      {freeStock.toLocaleString()}
                    </td>
                    <td className="py-3.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          isCritical
                            ? "bg-rose-100 text-rose-800"
                            : p.status === "low_stock"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {isCritical ? "Low Stock Alert" : p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onTriggerLowStock(p.sku)}
                        className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-bold text-[11px] transition-colors cursor-pointer"
                      >
                        Simulate Alert
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
