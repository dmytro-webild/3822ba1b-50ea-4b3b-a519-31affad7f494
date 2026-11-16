import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FonsVitaeCan() {
  const canGroupRef = useRef<THREE.Group>(null);

  // High-precision metallic silver materials for an unbranded, photorealistic aluminum can
  const { silverMetal, canTopRimMaterial, tabMaterial } = useMemo(() => {
    const silverMetal = new THREE.MeshPhysicalMaterial({
      name: "paint",
      color: "#e2e8f0",
      metalness: 0.96,
      roughness: 0.12,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
      reflectivity: 0.9,
    });

    const canTopRimMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#edf2f7",
      metalness: 0.98,
      roughness: 0.08,
    });

    const tabMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#f7fafc",
      metalness: 0.99,
      roughness: 0.1,
    });

    return { silverMetal, canTopRimMaterial, tabMaterial };
  }, []);

  // Upper Neck Shoulder Lathe Profile (Smooth contoured transition)
  const shoulderGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ease = t * t * (3 - 2 * t);
      const y = 1.0 + t * 0.34;
      const r = 0.62 - ease * 0.1;
      points.push(new THREE.Vector2(r, y));
    }
    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Bottom Base Chime & Concave Dome Lathe Profile
  const baseGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const outerSteps = 16;
    for (let i = 0; i <= outerSteps; i++) {
      const t = i / outerSteps;
      const ease = t * t * (3 - 2 * t);
      const y = -1.0 - t * 0.26;
      const r = 0.62 - ease * 0.11;
      points.push(new THREE.Vector2(r, y));
    }

    points.push(new THREE.Vector2(0.48, -1.28));

    // Inverted pressure dome curving inwards and upwards
    const domeSteps = 16;
    for (let i = 0; i <= domeSteps; i++) {
      const t = i / domeSteps;
      const r = 0.48 * (1 - t);
      const y = -1.28 + Math.sin(t * Math.PI * 0.5) * 0.14;
      points.push(new THREE.Vector2(r, y));
    }

    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Top Lid Disk with Recessed Countersink Lathe Profile
  const lidGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.515, 1.34));
    points.push(new THREE.Vector2(0.5, 1.3));
    points.push(new THREE.Vector2(0.48, 1.3));
    points.push(new THREE.Vector2(0.47, 1.325));
    points.push(new THREE.Vector2(0.0, 1.325));
    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Slow axis rotation frame loop
  useFrame((_state, delta) => {
    if (canGroupRef.current) {
      canGroupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group name="fons-vitae-can-scene">
      {/* Rotating Blank Metallic Silver Can */}
      <group ref={canGroupRef} name="part-can-body">
        {/* Main Cylindrical Body (Blank, unbranded metallic silver) */}
        <mesh position={[0, 0, 0]} material={silverMetal}>
          <cylinderGeometry args={[0.62, 0.62, 2.0, 64]} />
        </mesh>

        {/* Can Top Curved Shoulder & Neck */}
        <mesh geometry={shoulderGeometry} material={silverMetal} />

        {/* Can Top Double-Seam Rim Lip */}
        <mesh position={[0, 1.34, 0]} material={canTopRimMaterial}>
          <torusGeometry args={[0.515, 0.028, 16, 64]} />
        </mesh>

        {/* Can Top Lid & Recessed Dish */}
        <mesh geometry={lidGeometry} material={silverMetal} />

        {/* Can Pull-Tab Assembly */}
        <group position={[0, 1.33, 0.06]} rotation={[-0.06, 0.12, 0]}>
          {/* Rivet Button */}
          <mesh position={[0, 0.005, 0]} material={tabMaterial}>
            <cylinderGeometry args={[0.032, 0.032, 0.015, 16]} />
          </mesh>
          {/* Tab Ring / Body */}
          <mesh position={[0, 0.01, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={tabMaterial}>
            <torusGeometry args={[0.065, 0.016, 12, 32]} />
          </mesh>
          {/* Tab Lever Bridge */}
          <mesh position={[0, 0.01, 0.02]} material={tabMaterial}>
            <boxGeometry args={[0.07, 0.012, 0.08]} />
          </mesh>
        </group>

        {/* Can Bottom Tapered Base & Concave Dome */}
        <mesh geometry={baseGeometry} material={silverMetal} />

        {/* Can Bottom Chime Accent Rim */}
        <mesh position={[0, -1.26, 0]} material={canTopRimMaterial}>
          <torusGeometry args={[0.51, 0.022, 16, 64]} />
        </mesh>
      </group>
    </group>
  );
}
