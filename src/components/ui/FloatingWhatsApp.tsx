"use client";

import React, { useState } from "react";
import { companyData } from "@/data/company";

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Direct WhatsApp Support"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 font-['Manrope']"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip Badge */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200 text-xs font-bold transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-3 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Chat with Arifa Pack</span>
      </div>

      {/* Pulsing Floating Action Button */}
      <a
        href={companyData.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with Arifa Pack on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Radar ping ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping -z-10 group-hover:opacity-60" />

        {/* WhatsApp Official SVG */}
        <svg
          className="w-7 h-7 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.067-2.003-.477-1.674-.694-2.73-2.42-2.815-2.531-.082-.113-.674-.897-.674-1.71 0-.814.428-1.215.58-1.381.153-.166.333-.208.444-.208.11 0 .222.001.32.006.101.005.236-.038.37.283.138.33.473 1.15.513 1.235.042.085.068.185.013.297-.056.113-.084.185-.168.283-.085.099-.178.22-.254.296-.086.084-.176.175-.075.348.1.174.444.733.953 1.187.656.584 1.21.765 1.382.85.172.085.273.071.375-.043.102-.114.435-.506.55-.679.117-.172.232-.143.39-.086.158.058 1.002.472 1.174.558.172.086.287.129.33.201.042.072.042.417-.102.822z" />
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.36 5L2 22l5.22-1.33C8.63 21.49 10.27 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.05-.44-4.32-1.21l-.31-.18-3.1.81.83-3.02-.2-.32C4.1 14.83 3.6 13.45 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z" />
        </svg>
      </a>
    </aside>
  );
};
