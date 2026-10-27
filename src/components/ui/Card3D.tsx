"use client";

import React, { useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  depth?: number;
  glare?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  maxTilt = 12,
  depth = 30,
  glare = true,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const scale = useSpring(1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / rect.width) * 100;
    const yPct = (mouseY / rect.height) * 100;

    const normX = (mouseX / rect.width - 0.5) * 2; // -1 to 1
    const normY = (mouseY / rect.height - 0.5) * 2; // -1 to 1

    rotateX.set(-normY * maxTilt);
    rotateY.set(normX * maxTilt);
    setGlarePos({ x: xPct, y: yPct });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn(
        "relative transition-colors duration-300 will-change-transform cursor-pointer",
        className
      )}
      onClick={onClick}
      id={id}
    >
      {/* Glare Sheen Layer */}
      {glare && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 -z-0 overflow-hidden"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.7) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Children with 3D Depth */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: isHovered ? `translateZ(${depth}px)` : "translateZ(0px)",
          transition: "transform 0.25s ease-out",
        }}
        className="w-full h-full relative z-10"
      >
        {children}
      </div>
    </motion.div>
  );
};
