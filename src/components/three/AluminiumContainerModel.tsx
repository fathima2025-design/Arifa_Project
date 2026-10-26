"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AluminiumContainerModelProps {
  finish?: "mirror" | "matte-aluminium" | "golden-lacquer" | "clear-poly";
  autoRotate?: boolean;
  exploded?: boolean;
}

export const AluminiumContainerModel: React.FC<AluminiumContainerModelProps> = ({
  finish = "mirror",
  autoRotate = true,
  exploded = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);

  // Smooth floating & rotation animation
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.4) * 0.06;
    }

    // Exploded view lid animation
    if (lidRef.current) {
      const targetLidY = exploded ? 0.95 : 0.44;
      const targetLidRot = exploded ? 0.15 : 0;
      lidRef.current.position.y = THREE.MathUtils.lerp(
        lidRef.current.position.y,
        targetLidY,
        delta * 4.5
      );
      lidRef.current.rotation.x = THREE.MathUtils.lerp(
        lidRef.current.rotation.x,
        targetLidRot,
        delta * 4.5
      );
    }
  });

  const getMaterialProps = () => {
    switch (finish) {
      case "golden-lacquer":
        return {
          color: new THREE.Color("#d4af37"),
          metalness: 0.95,
          roughness: 0.22,
          clearcoat: 0.6,
          clearcoatRoughness: 0.1,
        };
      case "matte-aluminium":
        return {
          color: new THREE.Color("#cbd5e1"),
          metalness: 0.88,
          roughness: 0.42,
          clearcoat: 0.2,
          clearcoatRoughness: 0.25,
        };
      case "clear-poly":
        return {
          color: new THREE.Color("#ffffff"),
          metalness: 0.05,
          roughness: 0.12,
          transmission: 0.9,
          transparent: true,
          opacity: 0.8,
        };
      case "mirror":
      default:
        return {
          color: new THREE.Color("#e6edf5"),
          metalness: 0.98,
          roughness: 0.18,
          clearcoat: 0.65,
          clearcoatRoughness: 0.08,
        };
    }
  };

  const matProps = getMaterialProps();

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} rotation={[0.25, 0.4, 0]}>
      {/* ── Main Container Base & Cavity ── */}
      <group position={[0, 0, 0]}>
        {/* Outer Tapered Container Wall */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.5, 0.85, 1.7]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>

        {/* Inner Food Chamber Depth Illusion */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[2.32, 0.82, 1.52]} />
          <meshPhysicalMaterial
            color={matProps.color}
            metalness={matProps.metalness}
            roughness={matProps.roughness * 1.3}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Structural Ribbing Stamping on Sidewalls */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((xOffset, i) => (
          <mesh key={`rib-front-${i}`} position={[xOffset, 0, 0.86]}>
            <boxGeometry args={[0.06, 0.55, 0.03]} />
            <meshPhysicalMaterial {...matProps} roughness={0.15} />
          </mesh>
        ))}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((xOffset, i) => (
          <mesh key={`rib-back-${i}`} position={[xOffset, 0, -0.86]}>
            <boxGeometry args={[0.06, 0.55, 0.03]} />
            <meshPhysicalMaterial {...matProps} roughness={0.15} />
          </mesh>
        ))}

        {/* Hemmed Full-Curl Flange (Upper Rim Lip) */}
        <mesh castShadow position={[0, 0.43, 0]}>
          <boxGeometry args={[2.7, 0.05, 1.9]} />
          <meshPhysicalMaterial
            {...matProps}
            roughness={0.12}
            metalness={0.99}
          />
        </mesh>

        {/* Rolled Outer Curl Beads */}
        <mesh position={[0, 0.44, 0.94]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.032, 0.032, 2.7, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        <mesh position={[0, 0.44, -0.94]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.032, 0.032, 2.7, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        <mesh position={[1.34, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 1.9, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>
        <mesh position={[-1.34, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 1.9, 16]} />
          <meshPhysicalMaterial {...matProps} />
        </mesh>

        {/* Stepped Base Perimeter */}
        <mesh position={[0, -0.42, 0]}>
          <boxGeometry args={[2.2, 0.04, 1.4]} />
          <meshPhysicalMaterial {...matProps} roughness={0.3} />
        </mesh>
      </group>

      {/* ── Detachable / Levitating Aluminium Lid ── */}
      <group ref={lidRef} position={[0, 0.44, 0]}>
        {/* Lid Plate */}
        <mesh castShadow position={[0, 0.02, 0]}>
          <boxGeometry args={[2.62, 0.03, 1.82]} />
          <meshPhysicalMaterial
            {...matProps}
            roughness={0.16}
            clearcoat={0.7}
          />
        </mesh>

        {/* Embossed Recessed Center Panel on Lid */}
        <mesh position={[0, 0.035, 0]}>
          <boxGeometry args={[2.2, 0.015, 1.4]} />
          <meshPhysicalMaterial
            color={matProps.color}
            metalness={matProps.metalness}
            roughness={0.22}
          />
        </mesh>

        {/* Embossed Circular Brand Medallion on Lid */}
        <mesh position={[0, 0.045, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.38, 32]} />
          <meshPhysicalMaterial
            color={finish === "golden-lacquer" ? "#fef08a" : "#ffffff"}
            metalness={0.98}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};
