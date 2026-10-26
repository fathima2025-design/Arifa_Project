"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "Product Enquiries & Bulk Orders",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = "Valid email is required";
    }
    if (!formData.phone.trim()) errs.phone = "Phone is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.6 },
        colors: ["#10b981", "#34d399", "#0284c7"],
      });
    } catch {
      // safe fallback
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
        <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-white">
          Message Sent
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
          Thank you for contacting Arifa Pack. Our customer desk in Ajman will respond within 24 hours.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/10 text-white"
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              company: "",
              subject: "Product Enquiries & Bulk Orders",
              message: "",
            });
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500 focus:bg-white/[0.06] transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-['Manrope']">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Name" name="name" error={errors.name}>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

        <FormField label="Company" name="company">
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Subject" name="subject">
        <select
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className={inputClass}
        >
          <option value="Product Enquiries & Bulk Orders" className="bg-slate-900 text-white">
            Product Enquiries & Bulk Orders
          </option>
          <option value="Distribution & Dealership" className="bg-slate-900 text-white">
            Distribution & Dealership
          </option>
          <option value="Custom Tooling & OEM Converting" className="bg-slate-900 text-white">
            Custom Tooling & OEM Converting
          </option>
          <option value="Quality Assurance & Plant Audit" className="bg-slate-900 text-white">
            Quality Assurance & Plant Audit
          </option>
          <option value="Other Corporate Matters" className="bg-slate-900 text-white">
            Other Corporate Matters
          </option>
        </select>
      </FormField>

      <FormField label="Message" name="message" error={errors.message}>
        <textarea
          id="message"
          rows={4}
          required
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
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
};
