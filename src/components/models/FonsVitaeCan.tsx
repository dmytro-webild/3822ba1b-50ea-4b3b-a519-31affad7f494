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
  const { silverMetal, labelMaterial, canTopRimMaterial, waterMaterial, dropletMaterial } = useMemo(() => {
    const silverMetal = new THREE.MeshPhysicalMaterial({
      name: "paint",
      color: "#d8dce0",
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.85,
      clearcoatRoughness: 0.08,
    });

    const canTopRimMaterial = new THREE.MeshStandardMaterial({
      name: "chrome",
      color: "#e2e6eb",
      metalness: 0.98,
      roughness: 0.1,
    });

    const labelMaterial = new THREE.MeshPhysicalMaterial({
      name: "label",
      map: labelTexture,
      metalness: 0.65,
      roughness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
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

    return { silverMetal, labelMaterial, canTopRimMaterial, waterMaterial, dropletMaterial };
  }, [labelTexture]);

  // Dynamic Winding Water Tube Geometry
  const waterGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 80;
    for (let i = 0; i <= count; i++) {
      const progress = i / count;
      const angle = progress * Math.PI * 5;
      const radius = 0.95 + Math.sin(progress * Math.PI * 3) * 0.12;
      const y = (progress - 0.5) * 3.4;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
    }
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 100, 0.07, 16, false);
  }, []);

  // Floating Water Droplets positions
  const droplets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const radius = 1.1 + (i % 3) * 0.25;
      const y = ((i % 6) - 2.5) * 0.55;
      const size = 0.04 + (i % 4) * 0.02;
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
