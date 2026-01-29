'use client';

import { motion } from 'framer-motion';
import { HangarScene } from './3d/HangarScene';
import { cn } from '@/lib/utils';

export default function HangarSection() {
  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-4">
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-1 w-12 bg-cyan-500" />
            <span className="text-cyan-500 font-black text-xs uppercase tracking-[0.3em]">Advanced R&D Facility</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white italic tracking-tighter"
          >
            THE <span className="text-cyan-500">HANGAR</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-sm text-white/60 leading-relaxed"
          >
            Explore the structural blueprint of the V-ALPHA sports vehicle.
            Toggle structural explosion to analyze internal components,
            aerodynamics, and cockpit layout.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg hidden md:block"
        >
          <div className="text-[10px] text-cyan-400 font-mono space-y-1">
            <p>MODEL: ALPHA-001</p>
            <p>CHASSIS: CARBON-REINFORCED</p>
            <p>DRIVE: NEURAL-QUANTUM</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 to-rose-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <HangarScene />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
          { title: "STRUCTURAL ANALYSIS", desc: "Break down the vehicle into its core components for deep structural review.", color: "text-cyan-400" },
          { title: "INTERIOR ACCESS", desc: "Examine the neural-linked cockpit and pilot seating configuration.", color: "text-rose-400" },
          { title: "360° INSPECTION", desc: "Full orbital control allowing for detailed viewing from every possible angle.", color: "text-white" }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-3 backdrop-blur-sm"
          >
            <h4 className={cn("font-black text-xs uppercase tracking-widest", item.color)}>{item.title}</h4>
            <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
