/* eslint-disable react-hooks/immutability */
import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const CAN_TEXTURE_URL = "https://storage.googleapis.com/webild/users/user_3MCHHj0ceq4NzsDGHLJ25O0JAmT/uploaded-1794859388392-vrlwghmp.png";

export default function FonsVitaeCan() {
  const labelTexture = useTexture(CAN_TEXTURE_URL);

  useMemo(() => {
    labelTexture.colorSpace = THREE.SRGBColorSpace;
    labelTexture.wrapS = THREE.ClampToEdgeWrapping;
    labelTexture.wrapT = THREE.ClampToEdgeWrapping;
    labelTexture.needsUpdate = true;
  }, [labelTexture]);

  // Materials
  const { silverMetal, labelMaterial, canTopRimMaterial } = useMemo(() => {
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

    return { silverMetal, labelMaterial, canTopRimMaterial };
  }, [labelTexture]);

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
    </group>
  );
}
