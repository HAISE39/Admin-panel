'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Stars,
  PresentationControls,
  Sparkles
} from '@react-three/drei';
import { KatanaModel } from './KatanaModel';

export const ForgeScene = () => {
  const [mode, setMode] = useState<'sheathed' | 'unsheathed' | 'disassembled'>('sheathed');

  return (
    <div className="relative w-full h-[600px] md:h-[800px] group">
      {/* UI CONTROLS OVERLAY */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => setMode('sheathed')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-widest border transition-all ${
            mode === 'sheathed' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:border-white'
          }`}
        >
          Sheathed
        </button>
        <button
          onClick={() => setMode('unsheathed')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-widest border transition-all ${
            mode === 'unsheathed' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:border-white'
          }`}
        >
          Unsheath
        </button>
        <button
          onClick={() => setMode('disassembled')}
          className={`px-4 py-2 text-xs font-black uppercase tracking-widest border transition-all ${
            mode === 'disassembled' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-black/40 border-white/10 text-white/40 hover:text-white hover:border-white'
          }`}
        >
          Disassemble
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 text-right">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-black">
          Cyber Forge System v1.0
        </p>
        <p className="text-[8px] text-rose-500/40 uppercase tracking-[0.2em]">
          Interactive 3D Simulation
        </p>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <group position={[0, 0.5, 0]}>
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <KatanaModel mode={mode} />
              </Float>
            </group>
          </PresentationControls>

          {/* LIGHTING & ENVIRONMENT */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#ff3333" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />

          {/* FORGE GLOW (ANVIL AREA) */}
          <mesh position={[0, -2.2, 0]} receiveShadow>
            <cylinderGeometry args={[2, 2.2, 0.5, 32]} />
            <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.9, 0]}>
            <cylinderGeometry args={[1.8, 1.8, 0.1, 32]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={10} />
          </mesh>

          <pointLight position={[0, -1.5, 0]} intensity={10} color="#ff4400" distance={8} />

          {/* RISING EMBERS */}
          <Sparkles
            count={60}
            scale={[5, 10, 5]}
            size={3}
            speed={0.6}
            color="#ffaa00"
            position={[0, 0, 0]}
          />

          <Environment preset="night" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.6}
            scale={20}
            blur={1.5}
            far={4.5}
          />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* BACKGROUND ELEMENTS (Decorative) */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 m-4 flex flex-col justify-between p-4">
        <div className="flex justify-between items-start">
          <div className="w-8 h-8 border-t-2 border-l-2 border-rose-500/50" />
          <div className="w-8 h-8 border-t-2 border-r-2 border-rose-500/50" />
        </div>
        <div className="flex justify-between items-end">
          <div className="w-8 h-8 border-b-2 border-l-2 border-rose-500/50" />
          <div className="w-8 h-8 border-b-2 border-r-2 border-rose-500/50" />
        </div>
      </div>
    </div>
  );
};
