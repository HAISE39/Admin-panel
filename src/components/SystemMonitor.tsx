'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createTimer } from 'animejs';

export const SystemMonitor = () => {
  const timeRef = useRef<HTMLSpanElement>(null);
  const cycleRef = useRef<HTMLSpanElement>(null);
  const [uptime, setUptime] = useState('00:00:00');

  useEffect(() => {
    const timer = createTimer({
      duration: Infinity,
      frameRate: 60,
      onUpdate: (self) => {
        if (timeRef.current) {
          const ms = Math.floor(self.currentTime % 1000);
          const sec = Math.floor((self.currentTime / 1000) % 60);
          const min = Math.floor((self.currentTime / 60000) % 60);
          timeRef.current.innerHTML = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}:${ms.toString().padStart(3, '0')}`;
        }
        if (cycleRef.current) {
          cycleRef.current.innerHTML = Math.floor(self.currentTime / 10).toString().padStart(8, '0');
        }
      }
    });

    return () => { timer.pause(); };
  }, []);

  return (
    <div className="bg-black/40 backdrop-blur-md border border-white/5 p-4 font-mono text-[10px] uppercase tracking-widest text-white/60">
      <div className="flex justify-between items-center mb-2">
        <span>Kernel Uptime</span>
        <span ref={timeRef} className="text-rose-500 font-black">00:00:000</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span>Neural Cycles</span>
        <span ref={cycleRef} className="text-cyan-400">00000000</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>CPU Load</span>
          <span>42%</span>
        </div>
        <div className="w-full h-1 bg-white/5 overflow-hidden">
          <div className="h-full bg-rose-500/50 w-[42%]" />
        </div>
        <div className="flex justify-between mt-2">
          <span>Memory Usage</span>
          <span>1.2GB / 8GB</span>
        </div>
        <div className="w-full h-1 bg-white/5 overflow-hidden">
          <div className="h-full bg-cyan-500/50 w-[15%]" />
        </div>
      </div>
    </div>
  );
};
