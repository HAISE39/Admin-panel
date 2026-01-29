'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from "@/lib/utils";

export default function MascotCharacter({ className = "fixed bottom-0 right-0 w-[300px] md:w-[450px] z-0 hidden lg:block" }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={cn("pointer-events-none", className)}
    >
      <div className="relative group">
        {/* SOLAR CORE GLOW (Sun Breathing Energy) */}
        <div className="absolute inset-0 bg-orange-600/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-400/20 blur-[60px] rounded-full" />

        {/* Mascot Image - Stylized with Red/Warm tones */}
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2023/09/04/17/48/ai-generated-8233290_1280.png"
            alt="Yoriichi-Inspired Cyber Samurai"
            className="w-full h-auto drop-shadow-[0_0_40px_rgba(234,88,12,0.4)] filter brightness-110 contrast-125 sepia-[0.3] hue-rotate-[-15deg] group-hover:sepia-0 transition-all duration-1000"
          />

          {/* SUN MARK OVERLAY (CSS) */}
          <div className="absolute top-[18%] left-[45%] w-4 h-4 bg-orange-600/60 blur-[2px] rounded-full mix-blend-screen animate-pulse shadow-[0_0_10px_#ea580c]" />

          {/* ENERGY EMBERS */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-20, -100],
                x: [0, (i % 2 === 0 ? 20 : -20)],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
              className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-400 rounded-full blur-[1px]"
            />
          ))}

          {/* SOLAR FLARE EFFECT */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-orange-500/5 to-transparent opacity-50" />
        </div>

        {/* Floating Tag */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -left-8 bg-black/90 border-l-4 border-orange-600 backdrop-blur-xl px-4 py-2 rounded-r-sm"
        >
          <div className="flex flex-col">
            <span className="text-orange-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Sun Protocol</span>
            <span className="text-white/40 font-mono text-[8px] uppercase tracking-widest">Type: Origin-00</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
