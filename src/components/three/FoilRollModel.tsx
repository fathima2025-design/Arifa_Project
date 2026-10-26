"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FoilRollModelProps {
  finish?: "mirror" | "matte-aluminium";
  autoRotate?: boolean;
}

export const FoilRollModel: React.FC<FoilRollModelProps> = ({
  finish = "mirror",
  autoRotate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const foilSheetRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    }

    // Dynamic wave animation on the extending foil sheet
    if (foilSheetRef.current) {
      foilSheetRef.current.rotation.z =
        -0.12 + Math.sin(state.clock.elapsedTime * 2.8) * 0.05;
      foilSheetRef.current.rotation.x =
        0.2 + Math.cos(state.clock.elapsedTime * 2.2) * 0.04;
    }
  });

  const foilMat = {
    color: new THREE.Color(finish === "mirror" ? "#f8fafc" : "#cbd5e1"),
    metalness: finish === "mirror" ? 0.99 : 0.88,
    roughness: finish === "mirror" ? 0.15 : 0.4,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
  };

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} rotation={[0.35, 0.4, -0.15]}>
      {/* ── Wound Foil Roll Body ── */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 2.6, 48]} />
        <meshPhysicalMaterial {...foilMat} />
      </mesh>

      {/* Subtle Wound Layers (End Grooves) */}
      {[0.74, 0.68, 0.6, 0.52, 0.44].map((rad, i) => (
        <mesh key={`ring-top-${i}`} position={[0, 1.301, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[rad - 0.02, rad, 36]} />
          <meshBasicMaterial color="#94a3b8" />
        </mesh>
      ))}

      {/* Heavy-Duty Cardboard Core Tube */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 2.64, 32]} />
        <meshStandardMaterial color="#785c48" roughness={0.9} />
      </mesh>

      {/* Core Hollow Center */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 2.66, 32]} />
        <meshBasicMaterial color="#090d16" />
      </mesh>

      {/* ── Peeling & Waving Unrolled Foil Sheet Layer ── */}
      <mesh
        ref={foilSheetRef}
        position={[0.82, -0.3, 0.35]}
        rotation={[0.2, 0.25, -0.12]}
        castShadow
      >
        <planeGeometry args={[1.35, 1.9, 12, 12]} />
        <meshPhysicalMaterial
          {...foilMat}
          side={THREE.DoubleSide}
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  );
};
