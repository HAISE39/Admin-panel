"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Globe, ShoppingCart, User, Zap } from "lucide-react";
import { createTimeline, utils } from 'animejs';
import { cn } from "@/lib/utils";
import HomeSection from "@/components/HomeSection";
import WebsitesSection from "@/components/WebsitesSection";
import StoreSection from "@/components/StoreSection";
import HangarSection from "@/components/HangarSection";
import MascotCharacter from "@/components/MascotCharacter";

type Tab = "home" | "websites" | "store" | "hangar";

export default function Main() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const tl = createTimeline({
      defaults: {
        ease: 'easeOutExpo',
      },
      onComplete: () => setIsBooted(true)
    });

    tl.add('.boot-text', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: utils.stagger(100),
      duration: 800,
    })
    .add('.boot-screen', {
      opacity: [1, 0],
      duration: 1000,
      ease: 'easeInOutQuad',
    }, '+=500');
  }, []);

  const tabs = [
    { id: "home", label: "HOME", icon: Home },
    { id: "websites", label: "WEBSITES", icon: Globe },
    { id: "store", label: "STORE", icon: ShoppingCart },
    { id: "hangar", label: "HANGAR", icon: Zap },
  ];

  return (
    <main className="min-h-screen pb-20 pt-10 px-4 md:px-0">
      <AnimatePresence>
        {!isBooted && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center boot-screen"
          >
            <div className="space-y-2 font-mono text-[10px] tracking-[0.3em] uppercase">
              <div className="boot-text text-neon-pink">Initializing V-01 Protocol...</div>
              <div className="boot-text text-white/50">Loading Neural Assets...</div>
              <div className="boot-text text-neon-cyan">Access Granted.</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MascotCharacter />
      <div className={cn("max-w-4xl mx-auto transition-all duration-1000", isBooted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
        {/* Header / Logo */}
        <div className="text-center mb-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter"
          >
            VELLI<span className="text-neon-pink neon-text-pink">XAO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            className="text-sm tracking-[0.5em] mt-2 text-neon-cyan neon-text-cyan font-mono"
          >
            夢のデベロッパー
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 glass rounded-full space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "relative flex items-center px-6 py-2 rounded-full transition-all duration-300",
                  activeTab === tab.id ? "text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-neon-pink rounded-full z-0 shadow-[0_0_15px_#ff007f]"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <tab.icon className="w-4 h-4 mr-2 relative z-10" />
                <span className="text-sm font-bold relative z-10 font-mono">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="relative overflow-hidden min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "home" && <HomeSection />}
              {activeTab === "websites" && <WebsitesSection />}
              {activeTab === "store" && <StoreSection />}
              {activeTab === "hangar" && <HangarSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Kanji in background */}
      <div className="fixed bottom-10 right-10 text-9xl font-bold opacity-5 pointer-events-none select-none">
        力
      </div>
      <div className="fixed top-40 left-10 text-9xl font-bold opacity-5 pointer-events-none select-none">
        魂
      </div>
    </main>
  );
}
