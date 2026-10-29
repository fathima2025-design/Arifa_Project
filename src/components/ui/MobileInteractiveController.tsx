"use client";

import React, { useEffect, useState, useRef } from "react";

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const MobileInteractiveController: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const rippleIdRef = useRef(0);

  // 1. Scroll Momentum & Progress Tracking
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Touch Interaction Feedback: Organic Touch Pulse on Every Tap & Click
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const newRipple: TouchRipple = {
        id: ++rippleIdRef.current,
        x: touch.clientX,
        y: touch.clientY,
      };

      setRipples((prev) => [...prev.slice(-4), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 550);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  // 3. Viewport Scroll Observer for Mobile: Reveals cards & sections with animation as user scrolls
  useEffect(() => {
    // Select cards, bento blocks, and showcase items across all pages
    const targets = document.querySelectorAll(
      "article, .product-card, [data-interactive-card], .group, section > div > div"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mobile-inview-active");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* 1. Touch Ripple Keyframe */
        @keyframes mobileTouchWave {
          0% {
            transform: translate3d(-50%, -50%, 0) scale(0.2);
            opacity: 0.65;
          }
          100% {
            transform: translate3d(-50%, -50%, 0) scale(2.4);
            opacity: 0;
          }
        }

        .touch-pulse-ring {
          position: fixed;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          background: radial-gradient(circle, rgba(30, 189, 64, 0.45) 0%, rgba(52, 211, 153, 0.25) 45%, transparent 75%);
          animation: mobileTouchWave 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        /* 2. Tactile Touch Press Response for all interactive elements */
        @media (hover: none) and (pointer: coarse) {
          button:active, 
          a:active, 
          [role="button"]:active,
          .interactive-press:active {
            transform: scale(0.96) translateZ(0) !important;
            transition: transform 0.12s ease-out !important;
          }

          /* Auto-shimmer animation on mobile viewport reveal */
          .mobile-inview-active {
            transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out;
          }
        }
      `}</style>

      {/* ─── Top Scroll Progress Laser Bar ─── */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[9990] pointer-events-none"
        style={{
          background: "rgba(226, 232, 240, 0.2)",
        }}
      >
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#1ebd40] shadow-[0_0_10px_rgba(30,189,64,0.7)] transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* ─── Dynamic Touch Ripples Container ─── */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="touch-pulse-ring"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
          }}
        />
      ))}
    </>
  );
};
