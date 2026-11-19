import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const FRONT_CAN_IMAGE = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1795132125149-eraq7h8f.png";
const BACK_CAN_IMAGE = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794865744195-vid929mb.png";

export default function FonsVitaeCan() {
  const canGroupRef = useRef<THREE.Group>(null);

  // Load textures for front and back of the product can
  const [frontTexture, backTexture] = useTexture([FRONT_CAN_IMAGE, BACK_CAN_IMAGE]);

  // Materials for aluminum can parts and textured faces
  const { silverMetal, canTopRimMaterial, tabMaterial, frontMaterial, backMaterial } = useMemo(() => {
    const silverMetal = new THREE.MeshPhysicalMaterial({
      name: "paint",
      color: "#f1f5f9",
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
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

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.18,
      metalness: 0.45,
      side: THREE.FrontSide,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.18,
      metalness: 0.45,
      side: THREE.FrontSide,
    });

    return { silverMetal, canTopRimMaterial, tabMaterial, frontMaterial, backMaterial };
  }, [frontTexture, backTexture]);

  // Front semi-cylinder geometry (facing front +Z)
  const frontCylinderGeo = useMemo(() => {
    return new THREE.CylinderGeometry(0.62, 0.62, 2.0, 32, 1, true, -Math.PI / 2, Math.PI);
  }, []);

  // Back semi-cylinder geometry (facing back -Z)
  const backCylinderGeo = useMemo(() => {
    return new THREE.CylinderGeometry(0.62, 0.62, 2.0, 32, 1, true, Math.PI / 2, Math.PI);
  }, []);

  // Upper Neck Shoulder Lathe Profile
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

    const domeSteps = 16;
    for (let i = 0; i <= domeSteps; i++) {
      const t = i / domeSteps;
      const r = 0.48 * (1 - t);
      const y = -1.28 + Math.sin(t * Math.PI * 0.5) * 0.14;
      points.push(new THREE.Vector2(r, y));
    }

    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Top Lid Disk
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
      {/* Rotating 3D Metallic Can with Front and Back Branding Images */}
      <group ref={canGroupRef} name="part-can-body">
        {/* Front Can Face (Vorne Dose) */}
        <mesh geometry={frontCylinderGeo} material={frontMaterial} position={[0, 0, 0]} />

        {/* Back Can Face (Hinten Dose) */}
        <mesh geometry={backCylinderGeo} material={backMaterial} position={[0, 0, 0]} />

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
          <mesh position={[0, 0.005, 0]} material={tabMaterial}>
            <cylinderGeometry args={[0.032, 0.032, 0.015, 16]} />
          </mesh>
          <mesh position={[0, 0.01, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={tabMaterial}>
            <torusGeometry args={[0.065, 0.016, 12, 32]} />
          </mesh>
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
