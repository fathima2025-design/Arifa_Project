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
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400" />
          Technical Specifications
        </h3>
        <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-300">
          {specs.itemCode}
        </span>
      </div>

      {/* Main Specifications Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-mesh-card shadow-card-elevated">
        <table className="w-full text-xs text-left border-collapse">
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 font-semibold text-slate-400 w-1/3 bg-white/[0.02]">
                Alloy / Material
              </td>
              <td className="py-3 px-4 font-bold text-white">
                {specs.material}
              </td>
            </tr>

            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                Shape & Geometry
              </td>
              <td className="py-3 px-4 font-medium text-slate-200">
                {specs.shape}
              </td>
            </tr>

            {specs.rimType && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Rim / Edge Construction
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {specs.rimType}
                </td>
              </tr>
            )}

            {dimensions.topOut && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  External Rim Dimensions (Top Out)
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {dimensions.topOut}
                </td>
              </tr>
            )}

            {dimensions.topIn && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Internal Fill Rim (Top In)
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {dimensions.topIn}
                </td>
              </tr>
            )}

            {dimensions.base && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Base Dimensions
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
                  {dimensions.base}
                </td>
              </tr>
            )}

            {dimensions.depth && (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Container Depth
                </td>
                <td className="py-3 px-4 font-medium text-slate-200">
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
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-400 bg-white/[0.02]">
                  Commercial MOQ
                </td>
                <td className="py-3 px-4 font-semibold text-emerald-300">
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Thermal & Environmental Performance
          </span>
          <div className="flex flex-wrap gap-2">
            {specs.compatibility.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Verified */}
      {specs.certifications && (
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block">
              Verified Plant Certifications
            </span>
            <span className="text-slate-400">
              {specs.certifications.join(" • ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
