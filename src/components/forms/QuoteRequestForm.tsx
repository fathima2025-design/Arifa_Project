"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { productsData } from "@/data/products";
import { EnquirySubmission } from "@/types/enquiry";

interface QuoteRequestFormProps {
  initialProductId?: string;
  onSuccess?: () => void;
  isCompact?: boolean;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  initialProductId,
  onSuccess,
  isCompact = false,
}) => {
  const [formData, setFormData] = useState<Partial<EnquirySubmission>>({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    country: "United Arab Emirates",
    city: "Ajman",
    enquiryType: "product-quotation",
    estimatedMonthlyVolume: "10,000 – 50,000 units",
    message: "",
  });

  const [selectedProductId, setSelectedProductId] = useState(
    initialProductId || productsData[0]?.id || ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  const selectedProduct = productsData.find((p) => p.id === selectedProductId);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName?.trim()) errs.fullName = "Name is required";
    if (!formData.email?.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Valid email is required";
    }
    if (!formData.phone?.trim()) errs.phone = "Phone is required";
    if (!formData.companyName?.trim()) errs.companyName = "Company is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));

    const ref = `AP-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(ref);
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#10b981", "#34d399", "#0284c7"],
      });
    } catch {
      // safe fallback
    }

    if (onSuccess) onSuccess();
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8 px-4 space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">
            Quotation Request Received
          </h4>
          <p className="text-xs text-slate-600 mt-1">
            Reference:{" "}
            <span className="font-mono font-bold text-emerald-600">
              {referenceCode}
            </span>
          </p>
        </div>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Our Ajman sales desk will contact you within 24 hours with wholesale rates.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="bg-slate-200 hover:bg-slate-300 text-slate-800"
          onClick={() => {
            setIsSubmitted(false);
            setReferenceCode("");
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300/80 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-['Manrope']">
      {/* Product Selection */}
      <FormField label="Product" name="selectedProduct">
        <select
          id="selectedProduct"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className={inputClass}
        >
          {productsData.map((p) => (
            <option key={p.id} value={p.id} className="bg-white text-slate-900">
              {p.name} ({p.specs.itemCode})
            </option>
          ))}
        </select>
      </FormField>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Name" name="fullName" error={errors.fullName}>
          <input
            id="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={inputClass}
          />
        </FormField>

        <FormField label="Email" name="email" error={errors.email}>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Company" name="companyName" error={errors.companyName}>
          <input
            id="companyName"
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            className={inputClass}
          />
        </FormField>

        <FormField label="Phone" name="phone" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>

      {!isCompact && (
        <FormField label="Monthly Volume" name="estimatedMonthlyVolume">
          <select
            id="estimatedMonthlyVolume"
            value={formData.estimatedMonthlyVolume}
            onChange={(e) => setFormData({ ...formData, estimatedMonthlyVolume: e.target.value })}
            className={inputClass}
          >
            <option value="Sample Pack Testing (< 5,000)" className="bg-white text-slate-900">
              Under 5,000 pcs (Sample Evaluation)
            </option>
            <option value="10,000 – 50,000 units" className="bg-white text-slate-900">
              10,000 – 50,000 pcs (Standard Wholesale)
            </option>
            <option value="50,000 – 250,000 units (FCL)" className="bg-white text-slate-900">
              50,000 – 250,000 pcs (Full Container Load)
            </option>
            <option value="250,000+ units (Wholesale Contract)" className="bg-white text-slate-900">
              250,000+ pcs (Annual Supply Contract)
            </option>
          </select>
        </FormField>
      )}

      {/* Additional Notes */}
      <FormField label="Specifications / Notes" name="message">
        <textarea
          id="message"
          rows={isCompact ? 2 : 3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputClass}
        />
      </FormField>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isSubmitting}
          icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Request Quote"}
        </Button>
      </div>
    </form>
  );
};
