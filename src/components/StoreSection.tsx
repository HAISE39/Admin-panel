import { useState } from "react";
import { Download, Shield, Zap, Star, Flame, Trophy, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StoreItem {
  id: number;
  name: string;
  game: string;
  type: "SCRIPT" | "MOD";
  features: string[];
  isVip: boolean;
  image: string;
  downloads: string;
}

export default function StoreSection() {
  const [filter, setFilter] = useState<"FREE" | "VIP">("FREE");

  const items: StoreItem[] = [
    // FREE
    {
      id: 1,
      name: "Auto Headshot Free",
      game: "PUBG Mobile",
      type: "SCRIPT",
      features: ["Aimbot", "No Recoil", "Wallhack"],
      isVip: false,
      downloads: "2.4k",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Unlimited Diamonds",
      game: "Free Fire",
      type: "MOD",
      features: ["High Damage", "Speed Hack", "No Fog"],
      isVip: false,
      downloads: "5.1k",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Map Hack V1",
      game: "Mobile Legends",
      type: "SCRIPT",
      features: ["Show Enemy", "Drone View", "Unlock Skin"],
      isVip: false,
      downloads: "1.8k",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Super Jump & Fly",
      game: "Roblox",
      type: "MOD",
      features: ["Bypass Anti-Cheat", "Fly Mode", "Infinite Jump"],
      isVip: false,
      downloads: "8.2k",
      image: "https://images.unsplash.com/photo-1605898960710-9aa393397984?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Imposter Always",
      game: "Among Us",
      type: "MOD",
      features: ["Always Imposter", "No Kill Cooldown", "Unlock All Pets"],
      isVip: false,
      downloads: "3.5k",
      image: "https://images.unsplash.com/photo-1601024445121-e5b82f020549?q=80&w=400&h=250&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Infinite Coins",
      game: "Subway Surfers",
      type: "MOD",
      features: ["Unlimited Coins", "Unlock All Characters", "Max Powerups"],
      isVip: false,
      downloads: "10k+",
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
      downloads: "850",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "God Mode VIP",
      game: "Free Fire",
      type: "MOD",
      features: ["Insta-Kill", "Invisible", "V-Badge"],
      isVip: true,
      downloads: "1.2k",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 9,
      name: "Anti-Ban MLBB",
      game: "Mobile Legends",
      type: "SCRIPT",
      features: ["Rank Booster", "Auto Retribution", "Damage 100%"],
      isVip: true,
      downloads: "600",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 10,
      name: "Unlimited Primogems",
      game: "Genshin Impact",
      type: "MOD",
      features: ["Unlimited Resources", "One Hit Kill", "Teleport Hack"],
      isVip: true,
      downloads: "450",
      image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 11,
      name: "Elite Squad VIP",
      game: "COD Mobile",
      type: "SCRIPT",
      features: ["Aimbot Pro", "Esp Box", "Magic Bullet"],
      isVip: true,
      downloads: "300",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=400&h=251&auto=format&fit=crop"
    },
    {
      id: 12,
      name: "Global Rank Up",
      game: "Arena of Valor",
      type: "SCRIPT",
      features: ["Map Legend", "Gold Hack", "Auto Combo"],
      isVip: true,
      downloads: "200",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&h=252&auto=format&fit=crop"
    }
  ];

  const filteredItems = items.filter(item => filter === "VIP" ? item.isVip : !item.isVip);

  return (
    <div className="space-y-8">
      {/* Store Header / Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">
            DIGITAL<span className="text-neon-pink">VAULT</span>
          </h2>
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            Premium Script & Mod Repository
          </p>
        </div>

        <div className="flex glass p-1.5 rounded-2xl bg-black/40 border border-white/5">
          <button
            onClick={() => setFilter("FREE")}
            className={cn(
              "px-8 py-2.5 rounded-xl text-xs font-black transition-all duration-500 uppercase tracking-widest",
              filter === "FREE" ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"
            )}
          >
            Public
          </button>
          <button
            onClick={() => setFilter("VIP")}
            className={cn(
              "px-8 py-2.5 rounded-xl text-xs font-black transition-all duration-500 flex items-center uppercase tracking-widest",
              filter === "VIP" ? "bg-neon-pink text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]" : "text-gray-500 hover:text-neon-pink"
            )}
          >
            <Lock className="w-3 h-3 mr-2" /> VIP Access
          </button>
        </div>
      </div>

      {/* Grid of Items */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-[2rem] overflow-hidden group flex flex-col border border-white/5 hover:border-white/20 transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>

                <div className="absolute top-4 left-4 flex gap-2">
                  <div className={cn(
                    "px-3 py-1 text-[10px] font-black rounded-lg uppercase tracking-tighter backdrop-blur-md border border-white/20",
                    item.type === "SCRIPT" ? "bg-neon-cyan/80 text-black" : "bg-white/80 text-black"
                  )}>
                    {item.type}
                  </div>
                </div>

                {item.isVip && (
                  <div className="absolute top-4 right-4">
                    <div className="bg-neon-pink/90 backdrop-blur-md text-white p-2 rounded-lg shadow-xl border border-neon-pink/50">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4">
                  <div className="text-[10px] text-white/70 font-mono uppercase tracking-widest bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    {item.game}
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold mb-4 group-hover:text-neon-pink transition-colors line-clamp-1">
                  {item.name}
                </h3>

                <div className="space-y-3 mb-8">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-[11px] text-gray-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-neon-pink mr-3 shadow-[0_0_5px_#ff007f]"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase px-1">
                    <span className="flex items-center"><Download className="w-3 h-3 mr-1" /> {item.downloads}</span>
                    <span className="flex items-center text-neon-cyan"><Shield className="w-3 h-3 mr-1" /> Anti-Ban</span>
                  </div>

                  <button className={cn(
                    "w-full py-4 rounded-2xl flex items-center justify-center font-black text-xs transition-all duration-300 uppercase tracking-[0.2em]",
                    item.isVip
                      ? "bg-neon-pink text-white hover:shadow-[0_0_25px_rgba(255,0,127,0.6)] border border-neon-pink/50"
                      : "bg-white text-black hover:bg-neon-cyan hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                  )}>
                    Initialize Download <Download className="w-4 h-4 ml-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
