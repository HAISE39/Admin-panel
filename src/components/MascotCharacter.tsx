'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MascotCharacter() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-0 right-0 w-[300px] md:w-[450px] pointer-events-none z-0 hidden lg:block"
    >
      <div className="relative group">
        {/* Glow Effect Behind */}
        <div className="absolute inset-0 bg-pink-500/20 blur-[100px] rounded-full animate-pulse" />

        {/* Mascot Image */}
        <div className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2023/09/04/17/48/ai-generated-8233290_1280.png"
            alt="Mascot"
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(236,72,153,0.3)] filter contrast-125 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
          />

          {/* Scanning Line Effect */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-pink-500/10 to-transparent h-[20%] w-full animate-scan" />
        </div>

        {/* Floating Tag */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-12 bg-black/80 border border-pink-500/50 backdrop-blur-md px-4 py-2 rounded-sm rotate-[-10deg]"
        >
          <span className="text-pink-500 font-mono text-xs uppercase tracking-widest">System Guardian: V-01</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
