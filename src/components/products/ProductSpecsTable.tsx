import React from "react";
import { Product } from "@/types/product";
import { Check, ShieldCheck, Thermometer, Info } from "lucide-react";

interface ProductSpecsTableProps {
  product: Product;
}

export const ProductSpecsTable: React.FC<ProductSpecsTableProps> = ({ product }) => {
  const { specs, dimensions } = product;

  return (
    <div className="space-y-6 font-['Manrope']">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600" />
          Technical Specifications
        </h3>
        <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-800 font-bold">
          {specs.itemCode}
        </span>
      </div>

      {/* Main Specifications Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
        <table className="w-full text-xs text-left border-collapse">
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 font-semibold text-slate-500 w-1/3 bg-slate-50/60">
                Alloy / Material
              </td>
              <td className="py-3 px-4 font-bold text-slate-900">
                {specs.material}
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition-colors">
              <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                Shape & Geometry
              </td>
              <td className="py-3 px-4 font-medium text-slate-800">
                {specs.shape}
              </td>
            </tr>

            {specs.rimType && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  Rim / Edge Construction
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  {specs.rimType}
                </td>
              </tr>
            )}

            {dimensions.topOut && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  External Rim Dimensions (Top Out)
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  {dimensions.topOut}
                </td>
              </tr>
            )}

            {dimensions.topIn && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  Internal Fill Rim (Top In)
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  {dimensions.topIn}
                </td>
              </tr>
            )}

            {dimensions.base && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  Base Dimensions
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  {dimensions.base}
                </td>
              </tr>
            )}

            {dimensions.depth && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  Container Depth
                </td>
                <td className="py-3 px-4 font-medium text-slate-800">
                  {dimensions.depth}
                </td>
              </tr>
            )}

            {dimensions.capacityMl && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Liquid / Volumetric Capacity
                </td>
                <td className="py-3 px-4 font-bold text-emerald-400">
                  {dimensions.capacityMl} ml ({dimensions.capacityOz || (dimensions.capacityMl * 0.0338).toFixed(1)} fl. oz)
                </td>
              </tr>
            )}

            {dimensions.gaugeMicrons && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Material Gauge / Thickness
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {dimensions.gaugeMicrons} microns (Heavy Gauge)
                </td>
              </tr>
            )}

            {specs.temperatureRange && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Thermal Stability
                </td>
                <td className="py-3 px-4 font-medium text-slate-200 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  {specs.temperatureRange}
                </td>
              </tr>
            )}

            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                Case / Carton Packaging
              </td>
              <td className="py-3 px-4 font-medium text-slate-200">
                {specs.caseCount}
              </td>
            </tr>

            {product.minOrderQuantity && (
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-500 bg-slate-50/60">
                  Commercial MOQ
                </td>
                <td className="py-3 px-4 font-bold text-emerald-700">
                  {product.minOrderQuantity}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Compatibility Badges */}
      {specs.compatibility && specs.compatibility.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Thermal & Environmental Performance
          </span>
          <div className="flex flex-wrap gap-2">
            {specs.compatibility.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Verified */}
      {specs.certifications && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900 block">
              Verified Plant Certifications
            </span>
            <span className="text-slate-600">
              {specs.certifications.join(" • ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
