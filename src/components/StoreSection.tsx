'use client';

import { useState, useEffect, useRef } from "react";
import { Download, Shield, Zap, Star, Flame, Trophy, Lock, ExternalLink, ChevronRight } from "lucide-react";
import { animate, utils } from 'animejs';
import { cn } from "@/lib/utils";

interface StoreItem {
  id: number;
  name: string;
  game: string;
  type: "SCRIPT" | "MOD";
  features: string[];
  isVip: boolean;
  image: string;
  status: "SAFE" | "DETECTED" | "MAINTENANCE";
}

export default function StoreSection() {
  const [filter, setFilter] = useState<"FREE" | "VIP">("FREE");
  const containerRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_URL = "https://wa.me/6285706400133";

  const items: StoreItem[] = [
    // FREE
    {
      id: 1,
      name: "Auto Headshot Free",
      game: "PUBG Mobile",
      type: "SCRIPT",
      features: ["Aimbot", "No Recoil", "Wallhack"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Unlimited Diamonds",
      game: "Free Fire",
      type: "MOD",
      features: ["High Damage", "Speed Hack", "No Fog"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Map Hack V1",
      game: "Mobile Legends",
      type: "SCRIPT",
      features: ["Show Enemy", "Drone View", "Unlock Skin"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Super Jump & Fly",
      game: "Roblox",
      type: "MOD",
      features: ["Bypass Anti-Cheat", "Fly Mode", "Infinite Jump"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1605898960710-9aa393397984?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Imposter Always",
      game: "Among Us",
      type: "MOD",
      features: ["Always Imposter", "No Kill Cooldown", "Unlock All Pets"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Infinite Coins",
      game: "Subway Surfers",
      type: "MOD",
      features: ["Unlimited Coins", "Unlock All Characters", "Max Powerups"],
      isVip: false,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=400&h=250&auto=format&fit=crop"
    },
    // VIP
    {
      id: 7,
      name: "Brutal Cheat VIP",
      game: "PUBG Mobile",
      type: "SCRIPT",
      features: ["Safe Bypass", "Bullet Track", "Memory Hack"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "God Mode VIP",
      game: "Free Fire",
      type: "MOD",
      features: ["Insta-Kill", "Invisible", "V-Badge"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Anti-Ban MLBB",
      game: "Mobile Legends",
      type: "SCRIPT",
      features: ["Rank Booster", "Auto Retribution", "Damage 100%"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Unlimited Primogems",
      game: "Genshin Impact",
      type: "MOD",
      features: ["Unlimited Resources", "One Hit Kill", "Teleport Hack"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 11,
      name: "Elite Squad VIP",
      game: "COD Mobile",
      type: "SCRIPT",
      features: ["Aimbot Pro", "Esp Box", "Magic Bullet"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Global Rank Up",
      game: "Arena of Valor",
      type: "SCRIPT",
      features: ["Map Legend", "Gold Hack", "Auto Combo"],
      isVip: true,
      status: "SAFE",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=252&auto=format&fit=crop"
    }
  ];

  const filteredItems = items.filter(item => filter === "VIP" ? item.isVip : !item.isVip);

  useEffect(() => {
    animate('.store-card', {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: utils.stagger(50),
      duration: 600,
      ease: 'easeOutQuart'
    });
  }, [filter]);

  const handleRedirect = () => {
    window.open(WHATSAPP_URL, '_blank');
  };

  return (
    <div className="space-y-12">
      {/* Store Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-[2px] bg-neon-pink" />
            <span className="text-xs font-black tracking-[0.4em] text-neon-pink uppercase">Marketplace</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter">
            SYSTEM<span className="text-white">STORE</span>
          </h2>
        </div>

        <div className="flex bg-black/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setFilter("FREE")}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black transition-all duration-500 uppercase tracking-widest flex items-center gap-2",
              filter === "FREE" ? "bg-white text-black shadow-lg scale-105" : "text-gray-500 hover:text-white"
            )}
          >
            <Zap className="w-3 h-3" /> Public Core
          </button>
          <button
            onClick={() => setFilter("VIP")}
            className={cn(
              "px-8 py-3 rounded-xl text-[10px] font-black transition-all duration-500 flex items-center gap-2 uppercase tracking-widest",
              filter === "VIP" ? "bg-neon-pink text-white shadow-[0_0_20px_rgba(255,0,127,0.5)] scale-105" : "text-gray-500 hover:text-neon-pink"
            )}
          >
            <Lock className="w-3 h-3" /> VIP Protocol
          </button>
        </div>
      </div>

      {/* Grid of Items */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={handleRedirect}
            className="store-card group cursor-pointer relative bg-black/40 border border-white/5 rounded-3xl overflow-hidden hover:border-neon-pink/50 transition-all duration-500 flex flex-col h-full opacity-0"
          >
            {/* Header Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <div className={cn(
                  "px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md",
                  item.type === "SCRIPT" ? "border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10" : "border-white/50 text-white bg-white/10"
                )}>
                  {item.type}
                </div>
              </div>

              {item.isVip && (
                <div className="absolute top-4 right-4 animate-bounce">
                  <Star className="w-5 h-5 text-neon-pink fill-neon-pink drop-shadow-[0_0_8px_#ff007f]" />
                </div>
              )}

              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-neon-cyan" />
                  {item.game}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-neon-pink transition-colors">
                  {item.name}
                </h3>
              </div>

              <div className="space-y-2 mb-8 flex-grow">
                {item.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-[11px] text-gray-500 font-mono">
                    <ChevronRight className="w-3 h-3 text-neon-pink mr-2" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Status: {item.status}</span>
                  </div>
                  <Shield className="w-4 h-4 text-white/20" />
                </div>

                <button className={cn(
                  "w-full py-4 rounded-xl flex items-center justify-center font-black text-[10px] transition-all duration-300 uppercase tracking-[0.3em] group-hover:gap-4",
                  item.isVip
                    ? "bg-neon-pink text-white shadow-[0_0_15px_rgba(255,0,127,0.3)]"
                    : "bg-white text-black hover:bg-neon-cyan"
                )}>
                  Get Access <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Hover Glitch Overlay */}
            <div className="absolute inset-0 bg-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}
