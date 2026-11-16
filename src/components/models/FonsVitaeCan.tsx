/* eslint-disable react-hooks/immutability */
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CAN_TEXTURE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png";

export default function FonsVitaeCan() {
  const labelTexture = useTexture(CAN_TEXTURE_URL);
  const canGroupRef = useRef<THREE.Group>(null);
  const waterStreamRef = useRef<THREE.Group>(null);
  const dropletsGroupRef = useRef<THREE.Group>(null);

  useMemo(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  // Materials
  const { silverMetal, labelMaterial, canTopRimMaterial, tabMaterial, waterMaterial, dropletMaterial } = useMemo(() => {
    const silverMetal = new THREE.MeshPhysicalMaterial({
      name: "paint",
      color: "#dce0e5",
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 0.9,
      clearcoatRoughness: 0.06,
    });

    const canTopRimMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#e8ecf0",
      metalness: 0.98,
      roughness: 0.08,
    });

    const tabMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#f0f4f8",
      metalness: 0.99,
      roughness: 0.12,
    });

    const labelMaterial = new THREE.MeshPhysicalMaterial({
      name: "label",
      map: labelTexture,
      metalness: 0.65,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.08,
    });

    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: "#e0f2fe",
      transmission: 0.92,
      opacity: 0.88,
      transparent: true,
      roughness: 0.04,
      ior: 1.333,
      reflectivity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      attenuationColor: new THREE.Color("#0a192f"),
      attenuationDistance: 1.2,
    });

    const dropletMaterial = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transmission: 0.95,
      opacity: 0.95,
      transparent: true,
      roughness: 0.02,
      ior: 1.333,
      clearcoat: 1.0,
    });

    return { silverMetal, labelMaterial, canTopRimMaterial, tabMaterial, waterMaterial, dropletMaterial };
  }, [labelTexture]);

  // Upper Neck Shoulder Lathe Profile (Smooth contoured transition)
  const shoulderGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const ease = t * t * (3 - 2 * t);
      const y = 1.0 + t * 0.34;
      const r = 0.62 - ease * 0.10;
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
    points.push(new THREE.Vector2(0.50, 1.30));
    points.push(new THREE.Vector2(0.48, 1.30));
    points.push(new THREE.Vector2(0.47, 1.325));
    points.push(new THREE.Vector2(0.0, 1.325));
    return new THREE.LatheGeometry(points, 64);
  }, []);

  // Dynamic Winding Water Tube Geometry (tuned for slim line proportions)
  const waterGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 90;
    for (let i = 0; i <= count; i++) {
      const progress = i / count;
      const angle = progress * Math.PI * 5.2;
      const radius = 0.84 + Math.sin(progress * Math.PI * 3.5) * 0.10;
      const y = (progress - 0.5) * 3.6;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 110, 0.065, 16, false);
  }, []);

  // Floating Water Droplets positions
  const droplets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 0.98 + (i % 3) * 0.22;
      const y = ((i % 6) - 2.5) * 0.58;
      const size = 0.038 + (i % 4) * 0.018;
      arr.push({ angle, radius, y, size, speed: 0.3 + (i % 5) * 0.1 });
    }
    return arr;
  }, []);

  // Slow axis rotation frame loop
  useFrame((state, delta) => {
    if (canGroupRef.current) {
      canGroupRef.current.rotation.y += delta * 0.35;
    }
    if (waterStreamRef.current) {
      waterStreamRef.current.rotation.y -= delta * 0.6;
      waterStreamRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    }
    if (dropletsGroupRef.current) {
      dropletsGroupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group name="fons-vitae-can-scene">
      {/* Rotating Can Container */}
      <group ref={canGroupRef} name="part-can-body">
        {/* Main Cylindrical Label Body */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={labelMaterial}>
          <cylinderGeometry args={[0.62, 0.62, 2.0, 64, 1, true]} />
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

      {/* Dynamic Flowing Water Stream Ribbon */}
      <group ref={waterStreamRef} name="part-water-stream">
        <mesh geometry={waterGeometry} material={waterMaterial} />
      </group>

      {/* Floating Water Droplets */}
      <group ref={dropletsGroupRef} name="part-water-droplets">
        {droplets.map((drop, idx) => {
          const x = Math.cos(drop.angle) * drop.radius;
          const z = Math.sin(drop.angle) * drop.radius;
          return (
            <mesh key={idx} position={[x, drop.y, z]} material={dropletMaterial}>
              <sphereGeometry args={[drop.size, 16, 16]} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}
