'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface KatanaProps {
  mode: 'sheathed' | 'unsheathed' | 'disassembled';
}

export const KatanaModel: React.FC<KatanaProps> = ({ mode }) => {
  const bladeRef = useRef<THREE.Group>(null);
  const sayaRef = useRef<THREE.Group>(null);
  const tsubaRef = useRef<THREE.Group>(null);
  const tsukaRef = useRef<THREE.Group>(null);

  // Target positions/rotations based on mode
  const targets = useMemo(() => ({
    sheathed: {
      blade: { pos: [0, 0, 0], rot: [0, 0, 0] },
      saya: { pos: [0, 0, 0], rot: [0, 0, 0] },
      tsuba: { pos: [0, 0, 0], rot: [0, 0, 0] },
      tsuka: { pos: [0, 0, 0], rot: [0, 0, 0] },
    },
    unsheathed: {
      blade: { pos: [0, 0, 4], rot: [0, 0, 0.1] },
      saya: { pos: [0, 0, -1], rot: [0, 0, 0] },
      tsuba: { pos: [0, 0, 4], rot: [0, 0, 0.1] },
      tsuka: { pos: [0, 0, 4], rot: [0, 0, 0.1] },
    },
    disassembled: {
      blade: { pos: [1.5, 0, 0], rot: [0, 1.57, 0] },
      saya: { pos: [-1.5, 0, 0], rot: [0, 1.57, 0] },
      tsuba: { pos: [0, 0, 1], rot: [1.57, 0, 0] },
      tsuka: { pos: [0, 0, 2.5], rot: [0, 1.57, 0] },
    }
  }), []);

  useFrame((state, delta) => {
    const step = 5 * delta;
    const target = targets[mode];

    const lerp = (ref: React.RefObject<THREE.Group | null>, t: { pos: number[], rot: number[] }) => {
      if (!ref.current) return;
      ref.current.position.lerp(new THREE.Vector3(...t.pos), step);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, t.rot[0], step);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, t.rot[1], step);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, t.rot[2], step);
    };

    lerp(bladeRef, target.blade);
    lerp(sayaRef, target.saya);
    lerp(tsubaRef, target.tsuba);
    lerp(tsukaRef, target.tsuka);
  });

  return (
    <group>
      {/* GLOWING BLADE (Nagasa) */}
      <group ref={bladeRef}>
        <mesh position={[0, 0, 1.5]}>
          <boxGeometry args={[0.05, 0.4, 3]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff0000"
            emissiveIntensity={4}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, -0.15, 1.5]}>
          <boxGeometry args={[0.01, 0.1, 3.1]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* GUARD (Tsuba) */}
      <group ref={tsubaRef}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 32]} />
          <meshStandardMaterial color="#111111" metalness={1} roughness={0.2} />
        </mesh>
      </group>

      {/* HANDLE (Tsuka) */}
      <group ref={tsukaRef}>
        <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1.5, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
        </mesh>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0, -0.3 - i * 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.02, 8, 24]} />
            <meshStandardMaterial color="#222222" />
          </mesh>
        ))}
      </group>

      {/* SCABBARD (Saya) */}
      <group ref={sayaRef}>
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[0.12, 0.5, 3.2]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 8, 24]} />
          <meshStandardMaterial color="#440000" />
        </mesh>
      </group>

      {/* PARTICLES */}
      {mode !== 'sheathed' && (
        <Sparkles
          count={40}
          scale={4}
          size={2}
          speed={0.4}
          color="#ff3333"
        />
      )}
    </group>
  );
};
