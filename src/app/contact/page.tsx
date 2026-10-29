"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { companyData } from "@/data/company";
import { Card3D } from "@/components/ui/Card3D";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Interactive 3D Card Tilt State for Hero Banner
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: -(normY * 16), y: normX * 16 });
    setMousePos({ x: xPct, y: yPct });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      {/* Ambient Floating Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-40 left-10 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
        className="absolute top-[600px] right-10 w-[450px] h-[450px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none -z-10"
      />

      {/* 1. Hero Banner with Customer Support Team Background & Floating Elements */}
      <section className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden flex items-center">
        {/* Real Team Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/company/contact-team-banner.jpg"
            alt="Arifa Pack Customer Support Team"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle frosted glass and darkening gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-900/40 backdrop-blur-[1px]" />
        </div>

        {/* Banner Content & Floating Interactive Badges */}
        <Container size="wide" className="relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Left: Main Title Card with Interactive 3D Perspective Tilt */}
            <motion.div
              onMouseMove={handleCardMouseMove}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={handleCardMouseLeave}
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: cardTilt.x,
                rotateY: cardTilt.y,
                scale: isCardHovered ? 1.025 : 1,
                boxShadow: isCardHovered
                  ? "0 30px 60px -15px rgba(16, 185, 129, 0.35), 0 0 45px rgba(14, 165, 233, 0.25)"
                  : "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 20,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
              className="lg:col-span-7 p-7 sm:p-9 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/20 text-white shadow-2xl space-y-4 relative overflow-hidden group cursor-pointer transition-colors duration-300 hover:border-emerald-400/40"
            >
              {/* Dynamic 3D Holographic Light Sheen moving with mouse */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
                style={{
                  opacity: isCardHovered ? 0.35 : 0,
                  background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.6) 0%, transparent 65%)`,
                }}
              />

              {/* Unified, Stunning CONTACT US Title (No weird separated C box) */}
              <div style={{ transform: "translateZ(35px)" }}>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 drop-shadow-md">
                    CONTACT US
                  </span>
                </h1>
              </div>

              {/* Subtitle with 3D Depth */}
              <div
                style={{ transform: "translateZ(25px)" }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-extrabold uppercase tracking-[0.25em] text-emerald-300 shadow-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SECURE CONNECTION</span>
              </div>

              {/* Authentic Paragraph with 3D Depth */}
              <p
                style={{ transform: "translateZ(20px)" }}
                className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal max-w-xl"
              >
                Official communication channel. Experience premium connectivity where
                technology is protected and innovation meets security. Your confidential
                conversation begins here.
              </p>
            </motion.div>

            {/* Right: Floating Gen-Z Glass Badges with Smooth Physics Loops */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-end gap-3.5 relative">
              {/* Floating Badge 1: Direct Support */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 1.5, -1.5, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="p-3.5 px-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-xl shadow-slate-950/30 flex items-center gap-3 text-slate-900 text-xs font-bold"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <div>
                  <div className="font-extrabold text-slate-900">Direct Factory Support</div>
                  <div className="text-[10px] text-slate-500 font-medium">Average Response: &lt; 2 Hours</div>
                </div>
              </motion.div>

              {/* Floating Badge 2: ISO & Food Safety */}
              <motion.div
                animate={{ y: [0, 14, 0], rotate: [0, -2, 2, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.5 }}
                className="p-3 px-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-white/20 shadow-xl text-white text-xs font-bold flex items-center gap-2.5"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ISO 9001 & Food Contact Certified Plant</span>
              </motion.div>

              {/* Floating Badge 3: Wholesale RFQ */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1 }}
                className="p-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/30 flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Direct Wholesale Packaging Quotes</span>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Workspace: Let's Start a Conversation & Send us a Message */}
      <section className="relative z-20 -mt-10 sm:-mt-14 pb-16">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
              {/* Left Column: Contact Details (Let's Start a Conversation) */}
              <div className="lg:col-span-5 p-8 sm:p-10 space-y-7 bg-slate-50/50">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Get In Touch
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Let&apos;s Start a Conversation
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                  </p>
                </div>

                {/* 4 Details Items with Interactive 3D Tilt */}
                <div className="space-y-4">
                  {/* Phone */}
                  <Card3D
                    maxTilt={8}
                    depth={14}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-colors hover:border-emerald-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Phone Number
                      </span>
                      <a
                        href="tel:+97167485384"
                        className="text-sm font-extrabold text-slate-900 hover:text-emerald-600 transition-colors block mt-0.5"
                      >
                        +971 6 74 85384
                      </a>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        Office: +971 6 747 7061
                      </span>
                    </div>
                  </Card3D>

                  {/* Email */}
                  <Card3D
                    maxTilt={8}
                    depth={14}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-colors hover:border-emerald-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${companyData.contact.email}`}
                        className="text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors block mt-0.5"
                      >
                        {companyData.contact.email}
                      </a>
                    </div>
                  </Card3D>

                  {/* Location */}
                  <Card3D
                    maxTilt={8}
                    depth={14}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-colors hover:border-emerald-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Office Location
                      </span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">
                        Ajman, United Arab Emirates
                      </span>
                      <span className="text-[11px] text-slate-500 leading-relaxed block mt-0.5">
                        Al Jurf Industrial Area 2, P.O. Box: 7526
                      </span>
                    </div>
                  </Card3D>

                  {/* Hours */}
                  <Card3D
                    maxTilt={8}
                    depth={14}
                    className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-colors hover:border-emerald-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-slate-400 block">
                        Working Hours
                      </span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">
                        Mon – Fri: 8:00 AM – 6:00 PM
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        Saturday: 8:00 AM – 2:00 PM • Sunday: Closed
                      </span>
                    </div>
                  </Card3D>
                </div>

                {/* Follow Us Social Icons */}
                <div className="pt-4 border-t border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Follow Us
                  </span>
                  <div className="flex items-center gap-2.5">
                    <a
                      href={companyData.social.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.003-.477-1.674-.694-2.73-2.42-2.815-2.531-.082-.113-.674-.897-.674-1.71 0-.814.428-1.215.58-1.381.153-.166.333-.208.444-.208.11 0 .222.001.32.006.101.005.236-.038.37.283.138.33.473 1.15.513 1.235.042.085.068.185.013.297-.056.113-.084.185-.168.283-.085.099-.178.22-.254.296-.086.084-.176.175-.075.348.1.174.444.733.953 1.187.656.584 1.21.765 1.382.85.172.085.273.071.375-.043.102-.114.435-.506.55-.679.117-.172.232-.143.39-.086.158.058 1.002.472 1.174.558.172.086.287.129.33.201.042.072.042.417-.102.822z" />
                        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.36 5L2 22l5.22-1.33C8.63 21.49 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.21l-.31-.18-3.1.81.83-3.02-.2-.32C4.1 14.83 3.6 13.45 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" />
                      </svg>
                    </a>
                    <a
                      href={companyData.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-50 text-blue-600 border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                    <a
                      href={companyData.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={companyData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-50 text-[#0077b5] border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href={companyData.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-pink-50 text-pink-600 border border-slate-200 flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Send us a Message Form */}
              <div className="lg:col-span-7 p-8 sm:p-10">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Send us a Message
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                    Fill out the form below and we&apos;ll get back to you as soon as possible.
                  </p>
                </div>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                        Thank you for contacting Arifa Pack. Our customer support team will review your inquiry and respond within 24 business hours.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: "",
                          email: "",
                          phone: "",
                          serviceInterest: "",
                          message: "",
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 shadow-xs cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Enter your email address"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-emerald-600">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="Enter your phone number"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Service Interest
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceInterest: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-700 bg-white outline-none transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="aluminium-containers">Aluminium Food Containers</option>
                        <option value="aluminium-platters">Aluminium Platters & Pots</option>
                        <option value="aluminium-foil">Aluminium Foil & Cling Film</option>
                        <option value="plastic-containers">Plastic Microwave Containers</option>
                        <option value="disposable-cutlery">Disposable Cutlery</option>
                        <option value="custom-tooling">Custom Tooling & Wholesale RFQ</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Message <span className="text-emerald-600">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none resize-none transition-all"
                      />
                    </div>

                    {/* Send Message Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#1ebd40] hover:bg-[#19a537] text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 3. WayPoint Navigator & Location Section */}
      <section className="py-10 pb-20">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Office Details */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    Head Office
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    WayPoint Navigator
                  </h3>
                </div>

                {/* Office photo with floating radar beacon and Card3D tilt */}
                <Card3D
                  maxTilt={8}
                  depth={20}
                  className="relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer"
                >
                  <Image
                    src="/images/company/office-interior.jpg"
                    alt="Arifa Pack Head Office Interior"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Floating Location Beacon */}
                  <div className="absolute top-4 left-4 p-2 px-3 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-2 border border-white/20 z-10">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span>Ajman Headquarters</span>
                  </div>
                </Card3D>

                <div className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Arifa Packing & Packaging LLC</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ajman, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Easy Access & Dedicated Visitor Parking Available</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed & Get Directions */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Find Our Location
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                    Navigate to our office using the interactive map below.
                  </p>
                </div>

                {/* Interactive Map */}
                <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                  <iframe
                    title="Arifa Pack Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.208759187313!2d55.5186592!3d25.3995383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5f7c35eb65a7f%3A0xb3381fa8b5cfb2a6!2sArifa%20Packing%20%26%20Packaging%20LLC!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>

                {/* Get Directions Button */}
                <a
                  href="https://maps.google.com/?q=Arifa+Packing+%26+Packaging+LLC+Ajman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl bg-[#1ebd40] hover:bg-[#19a537] text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
