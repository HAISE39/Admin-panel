import { motion } from "framer-motion";
import { User, Cpu, Shield, Globe } from "lucide-react";

export default function HomeSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Intro */}
      <motion.div variants={item} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink to-neon-cyan rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative glass p-8 rounded-2xl border-l-4 border-neon-pink bg-black/50">
          <h2 className="text-3xl font-bold mb-4 flex items-center font-mono">
            <span className="text-neon-pink mr-3">❯</span> SYSTEM.IDENTITY
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg font-medium">
            Greetings. I am <span className="text-white font-bold">Vellixao</span>,
            an <span className="text-neon-cyan">AI Engineer</span> and
            <span className="text-neon-pink">Lua specialist</span> based in the digital realm.
            I architect high-performance Game Guardian scripts and modern web applications
            with a focus on <span className="italic">cybernetic aesthetics</span> and seamless performance.
          </p>
        </div>
      </motion.div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={item} className="glass p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-20 h-20" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-neon-cyan uppercase tracking-wider flex items-center">
            <Cpu className="w-5 h-5 mr-2" /> Core Expertise
          </h3>
          <div className="space-y-4">
            {[
              { label: "Lua Scripting", level: "95%" },
              { label: "Frontend Eng.", level: "88%" },
              { label: "Backend Architecture", level: "82%" },
              { label: "Reverse Eng.", level: "75%" },
            ].map((skill) => (
              <div key={skill.label}>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>{skill.label}</span>
                  <span className="text-neon-pink">{skill.level}</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: skill.level }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-neon-pink to-neon-purple"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="glass p-6 rounded-2xl border-b-4 border-neon-cyan flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-4 text-neon-pink uppercase tracking-wider flex items-center">
              <Shield className="w-5 h-5 mr-2" /> Security First
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every script and application I develop undergoes rigorous testing to ensure
              maximum stability and <span className="text-neon-cyan">anti-detection</span> capabilities.
              My mission is to provide premium, safe, and efficient tools for the gaming community.
            </p>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px] font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-500 font-mono uppercase">Verified by 1k+ users</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Stats */}
      <motion.div variants={item} className="flex justify-around py-6 glass rounded-2xl border-t border-white/5 font-mono">
        <div className="text-center">
          <div className="text-2xl font-bold text-neon-pink">50+</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Projects</div>
        </div>
        <div className="text-center border-x border-white/10 px-10">
          <div className="text-2xl font-bold text-neon-cyan">12k</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Downloads</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">99%</div>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Uptime</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
