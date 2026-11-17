import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaterMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  // Grid dimensions
  const gridWidth = 26;
  const gridHeight = 18;
  const segmentsX = 64;
  const segmentsY = 64;

  const originalPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(gridWidth, gridHeight, segmentsX, segmentsY);
    return new Float32Array(geo.attributes.position.array);
  }, [gridWidth, gridHeight, segmentsX, segmentsY]);

  useFrame((state) => {
    if (!geometryRef.current) return;
    const time = state.clock.getElapsedTime() * 0.8;
    const pos = geometryRef.current.attributes.position;
    const count = pos.count;

    for (let i = 0; i < count; i++) {
      const u = originalPositions[i * 3];
      const v = originalPositions[i * 3 + 1];

      // Subtle light blue water wave calculations
      const wave1 = Math.sin(u * 0.4 + time * 1.2) * 0.35;
      const wave2 = Math.cos(v * 0.5 + time * 0.9) * 0.25;
      const wave3 = Math.sin((u + v) * 0.3 + time * 1.5) * 0.15;

      pos.setZ(i, wave1 + wave2 + wave3);
    }

    pos.needsUpdate = true;
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} rotation={[-Math.PI / 4, 0, 0]}>
      <planeGeometry
        ref={geometryRef}
        args={[gridWidth, gridHeight, segmentsX, segmentsY]}
      />
      <meshStandardMaterial
        color="#38bdf8"
        roughness={0.1}
        metalness={0.15}
        transparent
        opacity={0.035}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function WaterBubbles({ count = 50 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate bubble parameters positioned subtley along the left & right sides
  const bubbleData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const isRight = i % 2 === 0;
      // Position on outer sides of viewport: Left (-12 to -5) or Right (5 to 12)
      const sideX = isRight
        ? 5 + pseudoRandom(i * 3 + 1) * 7
        : -12 + pseudoRandom(i * 3 + 1) * 7;

      data.push({
        x: sideX,
        isRight,
        y: (pseudoRandom(i * 4 + 2) - 0.5) * 18,
        z: (pseudoRandom(i * 4 + 3) - 0.5) * 4 - 0.5,
        scale: 0.02 + pseudoRandom(i * 4 + 4) * 0.06,
        speed: 0.4 + pseudoRandom(i + 200) * 0.6,
        wobbleSpeed: 1.0 + pseudoRandom(i + 300) * 1.5,
        wobbleAmp: 0.08 + pseudoRandom(i + 400) * 0.12,
        phase: pseudoRandom(i + 500) * Math.PI * 2,
      });
    }
    return data;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    bubbleData.forEach((b, i) => {
      // Move upward continuously
      b.y += b.speed * delta;
      if (b.y > 9.5) {
        b.y = -9.5;
        const newSide = b.isRight
          ? 5 + pseudoRandom(i * 7 + time) * 7
          : -12 + pseudoRandom(i * 7 + time) * 7;
        b.x = newSide;
      }

      // Smooth horizontal wobble
      const currentX = b.x + Math.sin(time * b.wobbleSpeed + b.phase) * b.wobbleAmp;
      const currentZ = b.z + Math.cos(time * b.wobbleSpeed * 0.8 + b.phase) * (b.wobbleAmp * 0.6);

      dummy.position.set(currentX, b.y, currentZ);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#38bdf8"
        emissiveIntensity={0.03}
        roughness={0.05}
        metalness={0.05}
        transparent
        opacity={0.10}
      />
    </instancedMesh>
  );
}

function WaterParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 90;

  const [positions, speeds] = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const speedArray = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const isRight = i % 2 === 0;
      posArray[i * 3] = isRight ? 5 + pseudoRandom(i * 3 + 1) * 7 : -12 + pseudoRandom(i * 3 + 1) * 7;
      posArray[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 16;
      posArray[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 4 - 1;
      speedArray[i] = 0.3 + pseudoRandom(i + 100) * 0.5;
    }
    return [posArray, speedArray];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + speeds[i] * delta * 1.1;
      if (y > 8.5) y = -8.5;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#bae6fd"
        transparent
        opacity={0.12}
        sizeAttenuation
      />
    </points>
  );
}

function SideBubblesOverlay() {
  const leftBubbles = [
    { id: "l1", size: 14, left: "15%", duration: 9, delay: 0 },
    { id: "l2", size: 22, left: "45%", duration: 12, delay: 2 },
    { id: "l3", size: 10, left: "70%", duration: 8, delay: 4 },
    { id: "l4", size: 18, left: "28%", duration: 11, delay: 1 },
    { id: "l5", size: 26, left: "60%", duration: 14, delay: 3.5 },
    { id: "l6", size: 12, left: "85%", duration: 10, delay: 5.5 },
  ];

  const rightBubbles = [
    { id: "r1", size: 16, right: "20%", duration: 10, delay: 1 },
    { id: "r2", size: 24, right: "50%", duration: 13, delay: 3 },
    { id: "r3", size: 12, right: "75%", duration: 9, delay: 0.5 },
    { id: "r4", size: 20, right: "35%", duration: 11.5, delay: 2.5 },
    { id: "r5", size: 28, right: "65%", duration: 15, delay: 4.5 },
    { id: "r6", size: 14, right: "85%", duration: 8.5, delay: 6 },
  ];

  return (
    <>
      {/* Left side floating transparent water bubbles */}
      <div className="fixed top-0 bottom-0 left-0 w-12 sm:w-20 md:w-28 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {leftBubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full border border-sky-300/50 bg-sky-400/15 backdrop-blur-[0.5px] shadow-[inset_0_0_8px_rgba(255,255,255,0.7)] animate-side-bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              left: b.left,
              bottom: "-40px",
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Right side floating transparent water bubbles */}
      <div className="fixed top-0 bottom-0 right-0 w-12 sm:w-20 md:w-28 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
        {rightBubbles.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full border border-sky-300/50 bg-sky-400/15 backdrop-blur-[0.5px] shadow-[inset_0_0_8px_rgba(255,255,255,0.7)] animate-side-bubble"
            style={{
              width: `${b.size}px`,
              height: `${b.size}px`,
              right: b.right,
              bottom: "-40px",
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export default function WaterDropsBackground() {
  return (
    <>
      <SideBubblesOverlay />
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 55 }}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#e0f2fe" />
          <pointLight position={[-5, -5, 2]} intensity={0.8} color="#38bdf8" />

          <WaterMesh />
          <WaterBubbles />
          <WaterParticles />
        </Canvas>
      </div>
    </>
  );
}
