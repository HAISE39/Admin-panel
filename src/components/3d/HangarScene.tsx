'use client';

import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Grid,
  Text,
  MeshReflectorMaterial
} from '@react-three/drei';
import { CyberCar } from './CyberCar';

export const HangarScene = () => {
  const [exploded, setExploded] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);

  return (
    <div className="relative w-full h-[700px] md:h-[900px] bg-[#020202] overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
      {/* HUD OVERLAY */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-6 w-72">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white tracking-tighter italic">V-ALPHA PROTOCOL</h2>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
            <span className="text-[10px] text-cyan-500 font-mono tracking-widest uppercase">Structural Analysis Active</span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 space-y-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-white/40 uppercase tracking-widest">Global State</p>
            <button
              onClick={() => setExploded(!exploded)}
              className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                exploded ? 'bg-cyan-600 border-cyan-500 text-white' : 'bg-transparent border-white/20 text-white/60 hover:border-white'
              }`}
            >
              {exploded ? 'Collapse Structure' : 'Explode Structure'}
            </button>
            <button
              onClick={() => setDoorOpen(!doorOpen)}
              className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest border transition-all ${
                doorOpen ? 'bg-rose-600 border-rose-500 text-white' : 'bg-transparent border-white/20 text-white/60 hover:border-white'
              }`}
            >
              {doorOpen ? 'Seal Cabin' : 'Access Interior'}
            </button>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between text-[8px] text-white/30 uppercase">
              <span>Engine Status</span>
              <span className="text-cyan-400">Optimal</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[85%]" />
            </div>
            <div className="flex justify-between text-[8px] text-white/30 uppercase">
              <span>Structural Integrity</span>
              <span className="text-rose-400">92%</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full w-[92%]" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 text-right pointer-events-none max-w-xs">
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-tight font-mono">
            Experimental 0-Series Chassis with Integrated Neural Link. Full structural breakdown enabled for R&D purposes.
          </p>
          <div className="inline-block px-3 py-1 bg-white/10 border border-white/20 text-[10px] text-white font-mono">
            SEC_LEVEL: 05 // ADMIN
          </div>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[5, 3, 8]} fov={40} />

        <Suspense fallback={null}>
          <group position={[0, -0.5, 0]}>
            <CyberCar exploded={exploded} doorOpen={doorOpen} />

            {/* REFLECTIVE FLOOR */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
              />
            </mesh>
            <Grid
              infiniteGrid
              fadeDistance={50}
              fadeStrength={5}
              sectionSize={1}
              sectionColor="#111"
              cellSize={0.5}
              cellColor="#080808"
              position={[0, -0.49, 0]}
            />
          </group>

          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight position={[-10, 5, 10]} intensity={1} color="#ff3333" />
          <pointLight position={[0, 10, -5]} intensity={1.5} color="#00ffff" />
          <spotLight
            position={[0, 15, 0]}
            angle={0.3}
            penumbra={1}
            intensity={5}
            castShadow
          />

          <Environment preset="night" />
          <ContactShadows
            position={[0, -0.5, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
        </Suspense>

        <OrbitControls
          autoRotate={!exploded}
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
};
