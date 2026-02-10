'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

interface KatanaProps {
  mode: 'sheathed' | 'unsheathed' | 'disassembled';
  pull: number;
  skillActive?: boolean;
}

export const KatanaModel: React.FC<KatanaProps> = ({ mode, pull, skillActive = false }) => {
  const bladeRef = useRef<THREE.Group>(null);
  const sayaRef = useRef<THREE.Group>(null);
  const tsubaRef = useRef<THREE.Group>(null);
  const tsukaRef = useRef<THREE.Group>(null);

  const [hovered, setHovered] = useState<string | null>(null);

  // Target positions/rotations based on mode and pull
  const targets = useMemo(() => {
    const pullOffset = pull * 4.5;

    return {
      sheathed: {
        blade: { pos: [0, 0, pullOffset], rot: [0, 0, 0] },
        saya: { pos: [0, 0, 0], rot: [0, 0, 0] },
        tsuba: { pos: [0, 0, pullOffset], rot: [0, 0, 0] },
        tsuka: { pos: [0, 0, pullOffset], rot: [0, 0, 0] },
      },
      unsheathed: {
        blade: { pos: [0, 0, 4.5], rot: [0, 0, 0.2] },
        saya: { pos: [0, 0, -1.5], rot: [0, 0, 0] },
        tsuba: { pos: [0, 0, 4.5], rot: [0, 0, 0.2] },
        tsuka: { pos: [0, 0, 4.5], rot: [0, 0, 0.2] },
      },
      disassembled: {
        blade: { pos: [1.8, 0.5, 0], rot: [0, 1.57, 0] },
        saya: { pos: [-1.8, -0.5, 0], rot: [0, 1.57, 0] },
        tsuba: { pos: [0, 0, 1.5], rot: [1.57, 0, 0] },
        tsuka: { pos: [0, 0, 3], rot: [0, 1.57, 0] },
      }
    };
  }, [mode, pull]);

  useFrame((state, delta) => {
    const step = 6 * delta;
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
      {/* GLOWING BLADE (Nagasa) - Black Blade with Red Edge */}
      <group ref={bladeRef} onPointerOver={() => setHovered('blade')} onPointerOut={() => setHovered(null)}>
        <mesh position={[0, 0, 1.5]}>
          <boxGeometry args={[0.04, 0.45, 3]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={1}
            roughness={0.1}
          />
        </mesh>
        {/* Red Heat Edge */}
        <mesh position={[0, 0.21, 1.5]}>
          <boxGeometry args={[0.05, 0.04, 3.05]} />
          <meshStandardMaterial
            color="#ff1144"
            emissive="#ff1144"
            emissiveIntensity={15}
          />
        </mesh>
        {/* White Edge Highlight */}
        <mesh position={[0, 0.23, 1.5]}>
          <boxGeometry args={[0.01, 0.01, 3.1]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={10} />
        </mesh>
        {hovered === 'blade' && mode !== 'sheathed' && (
          <Html position={[0, 0.5, 1.5]} center distanceFactor={10}>
            <div className="bg-black/90 border border-rose-500 p-2 text-[8px] whitespace-nowrap text-white font-mono uppercase tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(225,29,72,0.5)]">
              <p className="text-rose-500 font-black">MATERIAL: PLASMA STEEL</p>
              <p>HARDNESS: 68 HRC</p>
              <p>TEMP: SUPERCRITICAL</p>
            </div>
          </Html>
        )}
      </group>

      {/* GUARD (Tsuba) */}
      <group ref={tsubaRef} onPointerOver={() => setHovered('tsuba')} onPointerOut={() => setHovered(null)}>
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial color="#111111" metalness={1} roughness={0.1} />
        </mesh>
        {hovered === 'tsuba' && mode === 'disassembled' && (
          <Html position={[0, 0.5, 0]} center distanceFactor={10}>
            <div className="bg-black/90 border border-cyan-500 p-2 text-[8px] whitespace-nowrap text-white font-mono uppercase tracking-widest backdrop-blur-sm">
              <p className="text-cyan-500 font-black">COMPONENT: TSUBA</p>
              <p>ALLOY: TITANIUM-G</p>
            </div>
          </Html>
        )}
      </group>

      {/* HANDLE (Tsuka) */}
      <group ref={tsukaRef} onPointerOver={() => setHovered('tsuka')} onPointerOut={() => setHovered(null)}>
        <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.5} />
        </mesh>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[0, 0, -0.2 - i * 0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.03, 8, 24]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
        {hovered === 'tsuka' && mode === 'disassembled' && (
          <Html position={[0, 0.5, -0.8]} center distanceFactor={10}>
            <div className="bg-black/90 border border-yellow-500 p-2 text-[8px] whitespace-nowrap text-white font-mono uppercase tracking-widest backdrop-blur-sm">
              <p className="text-yellow-500 font-black">GRIP: NEURAL LINKED</p>
              <p>TEXTURE: CARBON WEAVE</p>
            </div>
          </Html>
        )}
      </group>

      {/* SCABBARD (Saya) */}
      <group ref={sayaRef} onPointerOver={() => setHovered('saya')} onPointerOut={() => setHovered(null)}>
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[0.15, 0.55, 3.2]} />
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} />
        </mesh>
        <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.04, 8, 24]} />
          <meshStandardMaterial color="#660000" emissive="#660000" emissiveIntensity={2} />
        </mesh>
        {hovered === 'saya' && mode !== 'unsheathed' && (
          <Html position={[0, 0.7, 1.6]} center distanceFactor={10}>
            <div className="bg-black/90 border border-white/20 p-2 text-[8px] whitespace-nowrap text-white font-mono uppercase tracking-widest backdrop-blur-sm">
              <p className="font-black">CONTAINMENT: SAYA</p>
              <p>COATING: ANTI-MATTER</p>
            </div>
          </Html>
        )}
      </group>

      {/* PARTICLES & AURA */}
      {mode !== 'sheathed' && (
        <group>
          <Sparkles
            count={skillActive ? 300 : 80}
            scale={skillActive ? 6 : 4}
            size={skillActive ? 6 : 3}
            speed={skillActive ? 3 : 1.5}
            color="#ff1144"
          />
          {skillActive && (
            <group>
              <Sparkles
                count={150}
                scale={5}
                size={8}
                speed={4}
                color="#ffa500"
              />
              <mesh scale={[0.8, 0.8, 3.5]} position={[0, 0.2, 1.5]}>
                <boxGeometry />
                <meshStandardMaterial
                  color="#ff4400"
                  transparent
                  opacity={0.2}
                  emissive="#ff0000"
                  emissiveIntensity={20}
                />
              </mesh>
            </group>
          )}
        </group>
      )}
    </group>
  );
};
