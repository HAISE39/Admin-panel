'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface PartProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  label?: string;
  explodedPos: [number, number, number];
  isExploded: boolean;
  children?: React.ReactNode;
}

const CyberPart: React.FC<PartProps> = ({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  color = "#222",
  label,
  explodedPos,
  isExploded,
  children
}) => {
  const ref = useRef<THREE.Group>(null);
  const targetPos = isExploded ? explodedPos : position;

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.lerp(new THREE.Vector3(...targetPos), 5 * delta);
  });

  return (
    <group ref={ref} rotation={rotation} scale={scale}>
      {children || (
        <mesh castShadow receiveShadow>
          <boxGeometry />
          <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
        </mesh>
      )}
      {label && isExploded && (
        <Html distanceFactor={10}>
          <div className="bg-black/90 border border-cyan-500/50 p-1 text-[6px] text-cyan-400 font-mono uppercase whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

export const CyberCar: React.FC<{ exploded: boolean; doorOpen: boolean }> = ({ exploded, doorOpen }) => {
  return (
    <group>
      {/* MAIN CHASSIS */}
      <CyberPart
        position={[0, 0, 0]}
        explodedPos={[0, 0, 0]}
        isExploded={exploded}
        label="CORE_CHASSIS_V1"
      >
        <mesh castShadow>
          <boxGeometry args={[2, 0.5, 4]} />
          <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.2} />
        </mesh>
        {/* Cockpit Base */}
        <mesh position={[0, 0.4, 0.2]} castShadow>
          <boxGeometry args={[1.8, 0.4, 2]} />
          <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} />
        </mesh>
      </CyberPart>

      {/* INTERIOR - SEATS */}
      <CyberPart
        position={[0.4, 0.4, 0.2]}
        explodedPos={[1.5, 1.2, 0.2]}
        isExploded={exploded}
        label="NEURAL_PILOT_SEAT_R"
      >
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.8]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
        </mesh>
      </CyberPart>
      <CyberPart
        position={[-0.4, 0.4, 0.2]}
        explodedPos={[-1.5, 1.2, 0.2]}
        isExploded={exploded}
        label="NEURAL_PILOT_SEAT_L"
      >
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.8, 0.8]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
        </mesh>
      </CyberPart>

      {/* DOORS */}
      <group rotation={[0, 0, doorOpen ? -0.8 : 0]} position={[1, 0.3, 0.2]}>
        <CyberPart
          position={[0, 0, 0]}
          explodedPos={[1.5, 0, 0]}
          isExploded={exploded}
          label="GULLWING_DRIVE_R"
        >
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.8, 1.8]} />
            <meshStandardMaterial color="#0f0f0f" metalness={1} roughness={0.1} />
          </mesh>
        </CyberPart>
      </group>

      <group rotation={[0, 0, doorOpen ? 0.8 : 0]} position={[-1, 0.3, 0.2]}>
        <CyberPart
          position={[0, 0, 0]}
          explodedPos={[-1.5, 0, 0]}
          isExploded={exploded}
          label="GULLWING_DRIVE_L"
        >
          <mesh castShadow>
            <boxGeometry args={[0.1, 0.8, 1.8]} />
            <meshStandardMaterial color="#0f0f0f" metalness={1} roughness={0.1} />
          </mesh>
        </CyberPart>
      </group>

      {/* ENGINE BLOCK (REAR) */}
      <CyberPart
        position={[0, 0.3, -1.4]}
        explodedPos={[0, 2, -1.4]}
        isExploded={exploded}
        label="FUSION_CELL_ENGINE"
      >
        <mesh castShadow>
          <boxGeometry args={[1.4, 0.6, 1]} />
          <meshStandardMaterial color="#222" metalness={1} roughness={0.5} />
        </mesh>
        <Sparkles count={20} scale={1} size={2} color="#00ffff" />
      </CyberPart>

      {/* WHEELS */}
      {[
        { pos: [1.1, -0.1, 1.4], exp: [2.5, -0.1, 2], label: "WHEEL_FR" },
        { pos: [-1.1, -0.1, 1.4], exp: [-2.5, -0.1, 2], label: "WHEEL_FL" },
        { pos: [1.1, -0.1, -1.4], exp: [2.5, -0.1, -2], label: "WHEEL_RR" },
        { pos: [-1.1, -0.1, -1.4], exp: [-2.5, -0.1, -2], label: "WHEEL_RL" },
      ].map((w, i) => (
        <CyberPart
          key={i}
          position={w.pos as [number, number, number]}
          explodedPos={w.exp as [number, number, number]}
          isExploded={exploded}
          label={w.label}
        >
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
            <meshStandardMaterial color="#050505" metalness={1} roughness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow scale={[1.02, 0.5, 1.02]}>
            <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
            <meshStandardMaterial color="#ff1144" emissive="#ff1144" emissiveIntensity={2} />
          </mesh>
        </CyberPart>
      ))}

      {/* AERODYNAMICS - SPOILER */}
      <CyberPart
        position={[0, 0.7, -1.8]}
        explodedPos={[0, 1.5, -2.5]}
        isExploded={exploded}
        label="ACTIVE_AERO_WING"
      >
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.05, 0.6]} />
          <meshStandardMaterial color="#0a0a0a" metalness={1} />
        </mesh>
      </CyberPart>
    </group>
  );
};
