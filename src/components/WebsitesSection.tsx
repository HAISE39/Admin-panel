'use client';

import { useEffect, useRef } from 'react';
import { animate, utils } from 'animejs';
import { ExternalLink, Globe, Layout, Database, Share2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WebsitesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const sites = [
    {
      name: "Tools Game Guardian",
      url: "http://vellixao.byethost3.com",
      desc: "Cybernetic toolset for advanced memory manipulation and script optimization.",
      tag: "CORE UTILITY",
      icon: Database,
      color: "#ff007f", // neon-pink
    },
    {
      name: "Rekapan Coding",
      url: "https://basiccode.vercel.app",
      desc: "Neural archive of programming architecture and development protocols.",
      tag: "DATA ARCHIVE",
      icon: Layout,
      color: "#00ffff", // neon-cyan
    },
    {
      name: "GG Panel Free",
      url: "https://vellixaoggpanelfree.vercel.app",
      desc: "Secure distribution nexus for decentralized script management.",
      tag: "MANAGEMENT",
      icon: Share2,
      color: "#bc13fe", // neon-purple
    },
    {
      name: "File Hosting",
      url: "https://uploader-website.vercel.app",
      desc: "Encrypted transmission uplink for volatile data and media assets.",
      tag: "TRANSMISSION",
      icon: Globe,
      color: "#ffffff",
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      animate('.website-card', {
        translateY: [20, 0],
        opacity: [0, 1],
        scale: [0.9, 1],
        delay: utils.stagger(100),
        duration: 800,
        ease: 'easeOutElastic(1, .8)'
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {sites.map((site) => (
        <div
          key={site.name}
          className="website-card group relative opacity-0"
        >
          {/* Holographic Border Effect */}
          <div
            className="absolute -inset-[1px] rounded-2xl opacity-20 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"
            style={{ background: `linear-gradient(45deg, transparent, ${site.color}, transparent)` }}
          />

          <div className="relative glass p-6 rounded-2xl overflow-hidden border border-white/5 h-full flex flex-col">
            {/* Corner Decorative Element */}
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
              <div
                className="absolute top-0 right-0 w-[200%] h-[2px] rotate-[-45deg] origin-top-right translate-x-4"
                style={{ backgroundColor: site.color }}
              />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div
                className="p-3 rounded-lg bg-black/40 border border-white/10 relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
                style={{ color: site.color, boxShadow: `0 0 15px ${site.color}33` }}
              >
                <site.icon className="w-6 h-6 relative z-10" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] opacity-50 uppercase" style={{ color: site.color }}>
                  {site.tag}
                </span>
                <h3 className="text-xl font-bold tracking-tight group-hover:text-white transition-colors">
                  {site.name}
                </h3>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
              {site.desc}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: site.color }} />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Protocol Active</span>
              </div>

              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all border border-white/5 hover:border-white/20 active:scale-95 group/btn"
              >
                <span className="text-xs font-bold uppercase tracking-widest">Visit Project</span>
                <Zap className="w-3 h-3 group-hover/btn:text-neon-cyan group-hover/btn:animate-bounce" />
              </a>
            </div>

            {/* Scanning Line Effect (Only on hover) */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent h-[50%] w-full -translate-y-full group-hover:animate-scan-fast pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
}
