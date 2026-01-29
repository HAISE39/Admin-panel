'use client';

import React, { useEffect, useRef } from 'react';
import { createTimeline, stagger } from 'animejs';
import { ForgeScene } from './3d/ForgeScene';

export default function HomeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation using Anime.js v4
    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1200
      }
    });

    if (titleRef.current) {
      tl.add(titleRef.current, {
        translateY: [100, 0],
        opacity: [0, 1]
      }, 500);
    }

    if (subtitleRef.current) {
      tl.add(subtitleRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(100)
      }, '-=800');
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10 px-4 overflow-hidden">
      {/* BACKGROUND DECO */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto z-10 flex flex-col items-center">
        {/* TOP TEXT CONTENT */}
        <div className="text-center space-y-4 mb-8 max-w-4xl">
          <div className="inline-block px-3 py-1 border border-rose-500/30 bg-rose-500/5 text-rose-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2">
            Experimental 3D Forge Environment
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white opacity-0"
          >
            THE <span className="text-rose-600 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)] text-glow">BLOOD</span> <br />
            KATANA
          </h1>

          <div ref={subtitleRef} className="space-y-4 opacity-0">
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Welcome to the <span className="text-rose-500 font-bold">Cyber Forge</span>.
              Experience the fusion of traditional craftsmanship and digital security.
              <span className="text-white"> Rotate, unsheath, and disassemble </span> the legendary blade below.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-2">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 border-l-2 border-rose-600 pl-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Forge Active
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 border-l-2 border-white/20 pl-3">
                Neural Link Established
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE 3D SCENE */}
        <div className="w-full max-w-5xl aspect-square md:aspect-video relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-2xl group shadow-2xl shadow-rose-900/10">
          <ForgeScene />

          {/* SCENE OVERLAY GRADIENTS */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent" />

          {/* UI HINT */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="flex items-center gap-4 text-[8px] text-white/20 uppercase tracking-[0.5em] font-black group-hover:text-rose-500/50 transition-colors">
              <div className="w-12 h-[1px] bg-current" />
              DRAG TO INSPECT
              <div className="w-12 h-[1px] bg-current" />
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER DECOR */}
      <div className="mt-10 mb-6 flex flex-col items-center opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-rose-600 to-transparent mb-4" />
        <div className="text-[10px] text-white/20 font-black tracking-[0.8em] uppercase">
          Vellixao • Protocol • 2026
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
        }
      `}</style>
    </div>
  );
}
