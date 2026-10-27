"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float, Sparkles as DreiSparkles, Environment } from "@react-three/drei";
import * as THREE from "three";
import { AluminiumContainerModel } from "./AluminiumContainerModel";
import { OvalPlatterModel } from "./OvalPlatterModel";
import { FoilRollModel } from "./FoilRollModel";
import { ModelFallback } from "./ModelFallback";
import { RotateCw, Layers, Sparkles, Box, Disc, Maximize2, UnfoldVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Packaging3DCanvasProps {
  modelType?: "aluminium-container" | "foil-roll" | "round-pot" | "plastic-tub" | "platter";
  initialFinish?: "mirror" | "matte-aluminium" | "golden-lacquer" | "clear-poly";
  allowFinishToggle?: boolean;
  allowModelSwitch?: boolean;
  className?: string;
  heightClass?: string;
}

// Dynamic orbiting studio light rig
const DynamicLighting: React.FC = () => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime * 0.8;
      lightRef.current.position.x = Math.sin(t) * 4.5;
      lightRef.current.position.z = Math.cos(t) * 4.5;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[6, 8, 6]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 5, -3]} intensity={1.2} color="#38bdf8" />
      <directionalLight position={[0, -4, 4]} intensity={0.9} color="#34d399" />
      <pointLight ref={lightRef} position={[0, 4, 3]} intensity={1.6} color="#ffffff" />
    </>
  );
};

export const Packaging3DCanvas: React.FC<Packaging3DCanvasProps> = ({
  modelType: initialModelType = "aluminium-container",
  initialFinish = "mirror",
  allowFinishToggle = true,
  allowModelSwitch = true,
  className,
  heightClass = "h-[460px] sm:h-[530px]",
}) => {
  const [modelType, setModelType] = useState(initialModelType);
  const [finish, setFinish] = useState(initialFinish);
  const [autoRotate, setAutoRotate] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebGLError(true);
      }
    } catch {
      setWebGLError(true);
    }
  }, []);

  if (!isClient) {
    return <ModelFallback label="Initializing 3D Motion Engine..." className={heightClass} />;
  }

  if (webGLError) {
    return (
      <ModelFallback
        label="High-Definition 3D Packaging (Interactive Preview)"
        className={heightClass}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative w-full rounded-3xl bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] border border-slate-200/90 shadow-xl overflow-hidden group select-none",
        heightClass,
        className
      )}
    >
      {/* Top Controls Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-none">
        {/* Model Selection Pills */}
        {allowModelSwitch ? (
          <div className="pointer-events-auto flex items-center p-1 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-xs">
            <button
              type="button"
              onClick={() => {
                setModelType("aluminium-container");
                setExploded(false);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer",
                modelType === "aluminium-container"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Container 1000ml</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModelType("platter");
                setExploded(false);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer",
                modelType === "platter"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Platter 55cm</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setModelType("foil-roll");
                setExploded(false);
              }}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer",
                modelType === "foil-roll"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Foil Roll 45cm</span>
            </button>
          </div>
        ) : (
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive 3D Motion (Drag to Rotate 360°)</span>
          </div>
        )}

        {/* Action Toggles: Explode & Auto-Rotate */}
        <div className="pointer-events-auto flex items-center gap-2">
          {modelType === "aluminium-container" && (
            <button
              type="button"
              onClick={() => setExploded(!exploded)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer shadow-sm",
                exploded
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-white/90 text-slate-700 border-slate-200 hover:text-slate-950"
              )}
              title="Separate Lid & Inspect Internal Cavity"
            >
              <UnfoldVertical className="w-3.5 h-3.5 text-emerald-600" />
              <span>{exploded ? "Close Lid" : "Separate Lid"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={cn(
              "p-2 rounded-xl backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer shadow-sm",
              autoRotate
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-white/90 text-slate-600 border-slate-200 hover:text-slate-950"
            )}
            title="Toggle Continuous 360° Rotation"
          >
            <RotateCw className={cn("w-4 h-4", autoRotate ? "animate-spin duration-7000" : "")} />
          </button>
        </div>
      </div>

      {/* Bottom Material Finish & Alloy Selector */}
      {allowFinishToggle && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 px-2 hidden sm:inline">
              Material Finish:
            </span>
            <button
              type="button"
              onClick={() => setFinish("mirror")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer",
                finish === "mirror"
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Mirror Polish
            </button>
            <button
              type="button"
              onClick={() => setFinish("matte-aluminium")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer",
                finish === "matte-aluminium"
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Brushed Satin
            </button>
            <button
              type="button"
              onClick={() => setFinish("golden-lacquer")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer",
                finish === "golden-lacquer"
                  ? "bg-amber-400 text-slate-950 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Golden Lacquer
            </button>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-700 px-3 py-1.5 rounded-xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-sm font-medium">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pure Food-Grade AA8011 Alloy</span>
          </div>
        </div>
      )}

      {/* Three.js R3F Canvas */}
      <Suspense fallback={<ModelFallback label="Loading 3D Visualizer..." className="h-full" />}>
        <Canvas
          camera={{ position: [0, 1.8, 3.8], fov: 45 }}
          shadows
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Dynamic Orbiting Lighting & Studio Environment Reflections */}
          <DynamicLighting />
          <Environment preset="city" />

          {/* Sparkles / Ambient Metallic Dust */}
          <DreiSparkles count={30} scale={5} size={1.5} speed={0.4} opacity={0.3} color="#6ee7b7" />

          {/* Floating Model with Motion Physics */}
          <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.25}>
            {modelType === "foil-roll" && (
              <FoilRollModel finish={finish === "golden-lacquer" ? "mirror" : (finish as any)} autoRotate={autoRotate} />
            )}
            {modelType === "platter" && (
              <OvalPlatterModel finish={finish} autoRotate={autoRotate} />
            )}
            {modelType !== "foil-roll" && modelType !== "platter" && (
              <AluminiumContainerModel
                finish={finish}
                autoRotate={autoRotate}
                exploded={exploded}
              />
            )}
          </Float>

          {/* Realistic Contact Ground Shadows */}
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.65}
            scale={6.5}
            blur={2.2}
            far={3.8}
            color="#000000"
          />

          {/* Orbit Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.0}
            maxDistance={5.5}
            maxPolarAngle={Math.PI / 2 + 0.15}
            minPolarAngle={Math.PI / 6}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
