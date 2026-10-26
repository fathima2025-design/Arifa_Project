"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OvalPlatterModelProps {
  finish?: "mirror" | "matte-aluminium" | "golden-lacquer" | "clear-poly";
  autoRotate?: boolean;
}

export const OvalPlatterModel: React.FC<OvalPlatterModelProps> = ({
  finish = "mirror",
  autoRotate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.07;
      groupRef.current.rotation.x = 0.35 + Math.sin(state.clock.elapsedTime * 0.9) * 0.04;
    }
  });

  const getMaterialProps = () => {
    switch (finish) {
      case "golden-lacquer":
        return {
          color: new THREE.Color("#d4af37"),
          metalness: 0.94,
          roughness: 0.22,
          clearcoat: 0.45,
        };
      case "matte-aluminium":
        return {
          color: new THREE.Color("#cbd5e1"),
          metalness: 0.88,
          roughness: 0.42,
          clearcoat: 0.2,
        };
      case "mirror":
      default:
        return {
          color: new THREE.Color("#f1f5f9"),
          metalness: 0.98,
          roughness: 0.18,
          clearcoat: 0.6,
        };
    }
  };

  const matProps = getMaterialProps();

  return (
    <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0.4, 0.3, 0]}>
      {/* Oval Platter Rim (Turned Beaded Edge) */}
      <mesh scale={[1.6, 0.12, 1.05]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.35, 0.25, 48]} />
        <meshPhysicalMaterial {...matProps} />
      </mesh>

      {/* Sunburst Radial Structural Ribs Embossing */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * Math.PI) / 8;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.9 * 1.4, 0.1, Math.sin(angle) * 0.9]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.7, 0.04, 0.08]} />
            <meshPhysicalMaterial {...matProps} roughness={0.12} />
          </mesh>
        );
      })}

      {/* Platter Center Well */}
      <mesh position={[0, 0.08, 0]} scale={[1.3, 0.05, 0.85]}>
        <cylinderGeometry args={[1.0, 0.95, 0.2, 40]} />
        <meshPhysicalMaterial
          color={matProps.color}
          metalness={matProps.metalness}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
};
