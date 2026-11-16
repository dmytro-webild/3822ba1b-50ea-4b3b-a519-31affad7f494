/* eslint-disable react-hooks/immutability */
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CAN_TEXTURE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png";

// Generate points for a helical water stream wrapping around the can
function createHelixCurve(radius: number, height: number, turns: number, offsetAngle = 0) {
  const points: THREE.Vector3[] = [];
  const count = 80;
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2 * turns + offsetAngle;
    const r = radius + Math.sin(t * Math.PI * 3) * 0.12;
    const x = r * Math.sin(angle);
    const z = r * Math.cos(angle);
    const y = (t - 0.5) * height;
    points.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(points);
}

// Generate static positions for floating water droplets
function createDropletData(count: number) {
  const droplets = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2 * 3.5 + (i % 5) * 0.7;
    const r = 0.95 + (i % 7) * 0.08;
    const x = r * Math.sin(angle) + ((i % 3) - 1) * 0.15;
    const z = r * Math.cos(angle) + ((i % 4) - 1.5) * 0.12;
    const y = (t - 0.5) * 2.8;
    const scale = 0.03 + (i % 4) * 0.025;
    droplets.push({ position: [x, y, z] as [number, number, number], scale });
  }
  return droplets;
}

// Generate condensation droplets on the can surface
function createSurfaceDroplets(count: number) {
  const droplets = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 * 2.3 + (i * 1.7);
    const r = 0.755;
    const x = r * Math.sin(angle);
    const z = r * Math.cos(angle);
    const y = ((i / count) - 0.5) * 2.1;
    const scale = 0.02 + (i % 3) * 0.015;
    droplets.push({ position: [x, y, z] as [number, number, number], scale });
  }
  return droplets;
}

export default function FonsVitaeCan() {
  const labelTexture = useTexture(CAN_TEXTURE_URL);

  useMemo(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  // Materials
  const { silverMetal, labelMaterial, waterStreamMaterial, waterDropMaterial, canTopRimMaterial } = useMemo(() => {
    const silverMetal = new THREE.MeshPhysicalMaterial({
      name: "paint",
      color: "#d8dce0",
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });

    const canTopRimMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#e2e6eb",
      metalness: 0.98,
      roughness: 0.12,
    });

    const labelMaterial = new THREE.MeshPhysicalMaterial({
      name: "label",
      map: labelTexture,
      metalness: 0.65,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
    });

    const waterStreamMaterial = new THREE.MeshPhysicalMaterial({
      name: "waterStream",
      color: "#00d4ff",
      emissive: "#0066aa",
      emissiveIntensity: 0.25,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.7,
      transparent: true,
      opacity: 0.78,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.333,
    });

    const waterDropMaterial = new THREE.MeshPhysicalMaterial({
      name: "waterDrop",
      color: "#66e5ff",
      emissive: "#0088cc",
      emissiveIntensity: 0.2,
      roughness: 0.04,
      metalness: 0.05,
      transmission: 0.85,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      ior: 1.333,
    });

    return { silverMetal, labelMaterial, waterStreamMaterial, waterDropMaterial, canTopRimMaterial };
  }, [labelTexture]);

  // Geometries for the water streams
  const { streamGeo1, streamGeo2, dropGeo } = useMemo(() => {
    const curve1 = createHelixCurve(1.02, 2.7, 1.6, 0);
    const streamGeo1 = new THREE.TubeGeometry(curve1, 90, 0.07, 12, false);

    const curve2 = createHelixCurve(1.08, 2.5, 1.4, Math.PI);
    const streamGeo2 = new THREE.TubeGeometry(curve2, 80, 0.05, 10, false);

    const dropGeo = new THREE.IcosahedronGeometry(1, 2);

    return { streamGeo1, streamGeo2, dropGeo };
  }, []);

  const floatingDroplets = useMemo(() => createDropletData(28), []);
  const surfaceDroplets = useMemo(() => createSurfaceDroplets(24), []);

  return (
    <group name="fons-vitae-can-scene">
      {/* 250ml Slim Can Body */}
      <group name="part-can-body">
        {/* Main Cylindrical Label Body */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={labelMaterial}>
          <cylinderGeometry args={[0.75, 0.75, 2.2, 64, 1, false]} />
        </mesh>

        {/* Can Top Tapered Neck */}
        <mesh position={[0, 1.18, 0]} material={silverMetal}>
          <cylinderGeometry args={[0.66, 0.75, 0.16, 64]} />
        </mesh>

        {/* Can Top Metallic Rim Lip */}
        <mesh position={[0, 1.28, 0]} material={canTopRimMaterial}>
          <torusGeometry args={[0.65, 0.035, 16, 64]} />
        </mesh>

        {/* Can Top Lid Disk */}
        <mesh position={[0, 1.27, 0]} rotation={[-Math.PI / 2, 0, 0]} material={silverMetal}>
          <circleGeometry args={[0.64, 64]} />
        </mesh>

        {/* Can Bottom Tapered Base */}
        <mesh position={[0, -1.18, 0]} material={silverMetal}>
          <cylinderGeometry args={[0.75, 0.64, 0.16, 64]} />
        </mesh>

        {/* Can Bottom Chime Rim */}
        <mesh position={[0, -1.27, 0]} material={canTopRimMaterial}>
          <torusGeometry args={[0.64, 0.03, 16, 64]} />
        </mesh>
      </group>

      {/* Condensation droplets directly on can surface */}
      <group name="part-surface-water">
        {surfaceDroplets.map((d, i) => (
          <mesh key={`surf-drop-${i}`} position={d.position} scale={d.scale} geometry={dropGeo} material={waterDropMaterial} />
        ))}
      </group>

      {/* Dynamic 3D Water Streams around the Can */}
      <group name="part-water-streams">
        <mesh geometry={streamGeo1} material={waterStreamMaterial} />
        <mesh geometry={streamGeo2} material={waterStreamMaterial} />
      </group>

      {/* Floating Water Droplets & Energetic Bubbles */}
      <group name="part-floating-water">
        {floatingDroplets.map((d, i) => (
          <mesh key={`float-drop-${i}`} position={d.position} scale={d.scale} geometry={dropGeo} material={waterDropMaterial} />
        ))}
      </group>
    </group>
  );
}
