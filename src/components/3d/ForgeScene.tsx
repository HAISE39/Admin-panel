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
  const [pull, setPull] = useState(0);
  const [skillActive, setSkillActive] = useState(false);

  return (
    <div className="relative w-full h-[600px] md:h-[900px] group overflow-hidden">
      {/* UI CONTROLS OVERLAY */}
      <div className="absolute top-10 left-10 z-10 flex flex-col gap-4">
        <div className="bg-black/80 backdrop-blur-xl border border-rose-500/20 p-6 flex flex-col gap-4">
          <h3 className="text-rose-500 font-black text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 animate-pulse rounded-full" />
            FORGE INTERFACE
          </h3>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setMode('sheathed'); setPull(0); }}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                mode === 'sheathed' ? 'bg-rose-600 border-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-black border-white/10 text-white/40 hover:text-white hover:border-white'
              }`}
            >
              System Locked (Sheathed)
            </button>
            <button
              onClick={() => { setMode('unsheathed'); setPull(1); }}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                mode === 'unsheathed' ? 'bg-rose-600 border-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-black border-white/10 text-white/40 hover:text-white hover:border-white'
              }`}
            >
              Manual Override (Unsheath)
            </button>
            <button
              onClick={() => { setMode('disassembled'); setPull(1); }}
              className={`px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all ${
                mode === 'disassembled' ? 'bg-rose-600 border-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-black border-white/10 text-white/40 hover:text-white hover:border-white'
              }`}
            >
              Structural Analysis
            </button>
          </div>

          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => setSkillActive(!skillActive)}
              className={`w-full px-6 py-4 text-[11px] font-black uppercase tracking-[0.3em] border transition-all flex items-center justify-center gap-3 group/skill ${
                skillActive
                  ? 'bg-orange-600 border-orange-500 text-white shadow-[0_0_40px_rgba(249,115,22,0.6)] animate-pulse'
                  : 'bg-black border-orange-500/30 text-orange-500/60 hover:text-orange-500 hover:border-orange-500 hover:bg-orange-500/5'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${skillActive ? 'bg-white' : 'bg-orange-500 animate-ping'}`} />
              {skillActive ? 'SUN BREATHING: UNLEASHED' : 'SUN BREATHING: STANDBY'}
            </button>
          </div>

          <div className="mt-4">
            <p className="text-[9px] text-white/40 uppercase mb-2">Haptic Pull Interaction</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={pull}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setPull(val);
                if (val > 0.05 && mode === 'sheathed') setMode('unsheathed');
                if (val < 0.05 && mode === 'unsheathed') setMode('sheathed');
              }}
              className="w-full accent-rose-500 h-1 bg-white/10 appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-10 text-right pointer-events-none">
        <div className="flex flex-col items-end gap-1">
          <p className="text-sm font-black text-white uppercase tracking-[0.5em] mb-2">
            VELLIXAO PROTOCOL
          </p>
          <p className="text-[10px] text-rose-500/80 font-mono">STABILITY: 98.4%</p>
          <p className="text-[10px] text-rose-500/80 font-mono">MATERIAL: CYBER-TAMAHAGANE</p>
          <p className="text-[10px] text-rose-500/80 font-mono">CORE TEMP: 1,420°C</p>
        </div>
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
              <Float
                speed={skillActive ? 4 : 1.5}
                rotationIntensity={skillActive ? 1.5 : 0.5}
                floatIntensity={skillActive ? 2 : 0.5}
              >
                <KatanaModel mode={mode} pull={pull} skillActive={skillActive} />
              </Float>
            </group>
          </PresentationControls>

          {/* LIGHTING & ENVIRONMENT - BOOSTED */}
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
          <pointLight position={[-10, 5, 10]} intensity={2} color="#ff3333" />
          <pointLight position={[0, 5, -5]} intensity={2} color="#00ffff" />
          <spotLight
            position={[15, 15, 5]}
            angle={0.15}
            penumbra={1}
            intensity={4}
            castShadow
          />

          {/* FORGE GLOW (ANVIL AREA) */}
          <mesh position={[0, -2.5, 0]} receiveShadow>
            <cylinderGeometry args={[2.5, 2.8, 0.8, 32]} />
            <meshStandardMaterial color="#080808" metalness={1} roughness={0.1} />
          </mesh>
          <mesh position={[0, -2.1, 0]}>
            <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
            <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={15} />
          </mesh>

          <pointLight position={[0, -1.8, 0]} intensity={15} color="#ff4400" distance={10} />

          {/* RISING EMBERS */}
          <Sparkles
            count={100}
            scale={[8, 12, 8]}
            size={4}
            speed={1}
            color="#ffaa00"
            position={[0, 0, 0]}
          />

          <Environment preset="studio" />
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
