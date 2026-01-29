import { ExternalLink, Globe, Layout, Database, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function WebsitesSection() {
  const sites = [
    {
      name: "Tools Game Guardian",
      url: "http://vellixao.byethost3.com",
      desc: "Advanced tools and utilities for Game Guardian users. Featuring script generators and optimization tools.",
      color: "border-neon-pink",
      icon: Database,
      glow: "group-hover:shadow-[0_0_20px_rgba(255,0,127,0.3)]"
    },
    {
      name: "Rekapan Coding",
      url: "https://basiccode.vercel.app",
      desc: "Comprehensive collection of programming notes, snippets, and guides for the modern developer.",
      color: "border-neon-cyan",
      icon: Layout,
      glow: "group-hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
    },
    {
      name: "GG Panel Free",
      url: "https://vellixaoggpanelfree.vercel.app",
      desc: "Cloud-based management panel for distributing and protecting Game Guardian scripts.",
      color: "border-neon-purple",
      icon: Share2,
      glow: "group-hover:shadow-[0_0_20px_rgba(188,19,254,0.3)]"
    },
    {
      name: "File Hosting",
      url: "https://uploader-website.vercel.app",
      desc: "Ultra-fast and secure hosting solution for images, scripts, and temporary files.",
      color: "border-white",
      icon: Globe,
      glow: "group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sites.map((site, index) => (
        <motion.a
          key={site.name}
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`group glass p-8 rounded-3xl border-l-4 ${site.color} transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full ${site.glow}`}
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <site.icon className="w-24 h-24" />
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-black/50 border border-white/10 ${site.color.replace('border-', 'text-')}`}>
                <site.icon className="w-6 h-6" />
              </div>
              <ExternalLink className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
              {site.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {site.desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">
              {site.url.replace("https://", "").replace("http://", "")}
            </span>
            <span className="text-[10px] font-bold text-neon-cyan uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
              Live Now
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
