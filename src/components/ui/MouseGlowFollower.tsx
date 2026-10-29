"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const MouseGlowFollower: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    if (!glowRef.current) return;

    // GSAP quickTo for silky 120 FPS cursor tracking
    const xTo = gsap.quickTo(glowRef.current, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(glowRef.current, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        setHasMoved(true);
        gsap.to(glowRef.current, { opacity: 1, duration: 0.5 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    };

    const handleMouseEnter = () => {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.4 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [hasMoved]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{ opacity: 0, transform: "translate(-50%, -50%)" }}
      className="fixed top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-emerald-400/14 via-teal-400/8 to-blue-400/10 blur-3xl pointer-events-none z-30 will-change-transform"
    />
  );
};
