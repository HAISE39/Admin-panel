'use client';

import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger, onScroll } from 'animejs';
import { ForgeScene } from './3d/ForgeScene';
import { SystemMonitor } from './SystemMonitor';
import MascotCharacter from './MascotCharacter';

export default function HomeSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entrance Animation using Anime.js v4
    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
        duration: 1200
      }
    });

    if (titleRef.current) {
      tl.add(titleRef.current, {
        translateY: [100, 0],
        opacity: [0, 1]
      }, 500);
    }

    if (subtitleRef.current) {
      tl.add(subtitleRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        delay: stagger(100)
      }, '-=800');
    }

    // Scroll Animations
    if (aboutRef.current) {
      animate(aboutRef.current.querySelectorAll('.space-y-8 > *'), {
        translateX: [-100, 0],
        opacity: [0, 1],
        delay: stagger(200),
        autoplay: onScroll({
          target: aboutRef.current
        })
      });
    }

    if (skillsRef.current) {
      animate(skillsRef.current.querySelectorAll('.grid > *'), {
        translateY: [50, 0],
        opacity: [0, 1],
        delay: stagger(150),
        autoplay: onScroll({
          target: skillsRef.current
        })
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-10 overflow-hidden">
      {/* BACKGROUND DECO */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="container mx-auto z-10 flex flex-col items-center px-4">
        {/* HERO SECTION */}
        <div className="text-center space-y-4 mb-8 max-w-4xl">
          <div className="inline-block px-3 py-1 border border-rose-500/30 bg-rose-500/5 text-rose-500 text-[10px] uppercase tracking-[0.3em] font-black mb-2">
            Experimental 3D Forge Environment
          </div>

          <h1
            ref={titleRef}
            className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.9] text-white opacity-0"
          >
            VELLIXAO <span className="text-rose-600 drop-shadow-[0_0_15px_rgba(225,29,72,0.5)] text-glow">SYSTEM</span>
          </h1>

          <div ref={subtitleRef} className="space-y-4 opacity-0">
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto uppercase tracking-[0.4em]">
              Neural Interface Connected // Establishing Connection...
            </p>
          </div>
        </div>

        {/* INTERACTIVE 3D SCENE */}
        <div className="w-full max-w-6xl relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-2xl group shadow-2xl shadow-rose-900/10 mb-24">
          <ForgeScene />

          {/* SYSTEM MONITOR OVERLAY */}
          <div className="absolute bottom-10 left-10 z-10 hidden xl:block w-72">
            <SystemMonitor />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="flex items-center gap-4 text-[8px] text-white/20 uppercase tracking-[0.5em] font-black group-hover:text-rose-500/50 transition-colors">
              <div className="w-12 h-[1px] bg-current" />
              DRAG TO INSPECT
              <div className="w-12 h-[1px] bg-current" />
            </div>
          </div>
        </div>

        {/* ABOUT ME SECTION */}
        <section ref={aboutRef} className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-24">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-rose-500 font-black text-xs uppercase tracking-[0.5em]">Identity Protocol</h2>
              <h3 className="text-6xl font-black uppercase italic tracking-tighter">THE ARCHITECT</h3>
            </div>

            <div className="space-y-6 text-white/60 leading-loose text-lg font-light">
              <p>
                I am <span className="text-white font-bold tracking-widest">VELLIXAO</span>, an AI Engineer and Game Guardian specialist dedicated to breaking boundaries in mobile security and automation.
              </p>
              <p>
                My work focuses on the intersection of <span className="text-rose-500">Cybernetic Aesthetics</span> and <span className="text-cyan-400">Low-Level Logic</span>. I build tools that empower users to control their digital environments with precision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border border-white/5 bg-white/[0.02] p-6">
                <p className="text-3xl font-black text-white italic">4+</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Years Experience</p>
              </div>
              <div className="border border-white/5 bg-white/[0.02] p-6">
                <p className="text-3xl font-black text-white italic">500+</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Scripts Deployed</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-square bg-rose-500/5 border border-rose-500/10 flex items-center justify-center group overflow-hidden rounded-2xl">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent" />
            </div>
            <div className="scale-125">
              <MascotCharacter className="relative w-[300px]" />
            </div>
            {/* DECORATIVE CORNERS */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-rose-500" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-rose-500" />

            <div className="absolute top-4 right-4 text-[10px] font-mono text-white/20 uppercase vertical-text tracking-[1em]">
              NEURAL_UNIT_01
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section ref={skillsRef} className="w-full max-w-6xl py-24">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-rose-500 font-black text-xs uppercase tracking-[0.5em]">Skill Protocol</h2>
            <h3 className="text-5xl font-black uppercase tracking-widest italic">TECHNICAL ARSENAL</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard
              title="Lua Architecture"
              desc="Mastery of Game Guardian scripting, memory manipulation, and anti-detection logic."
              level={95}
              color="rose"
            />
            <SkillCard
              title="Full-Stack Neural"
              desc="Building high-performance web interfaces with Next.js, React, and Three.js."
              level={88}
              color="cyan"
            />
            <SkillCard
              title="Cyber Security"
              desc="Deep understanding of mobile app vulnerabilities and defensive programming."
              level={92}
              color="purple"
            />
            <SkillCard
              title="AI Integration"
              desc="Deploying LLMs and neural models for automated task processing."
              level={85}
              color="amber"
            />
            <SkillCard
              title="UX Experience"
              desc="Designing immersive, motion-heavy interfaces with fluid user journeys."
              level={90}
              color="emerald"
            />
            <SkillCard
              title="Database Logic"
              desc="Optimizing high-concurrency data structures with PostgreSQL and Redis."
              level={82}
              color="blue"
            />
          </div>
        </section>
      </div>

      {/* FOOTER DECOR */}
      <div className="mt-10 mb-24 flex flex-col items-center opacity-30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-rose-600 to-transparent mb-4" />
        <div className="text-[10px] text-white/20 font-black tracking-[0.8em] uppercase">
          Vellixao • Protocol • 2026
        </div>
      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(225, 29, 72, 0.4);
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
}

const SkillCard = ({ title, desc, level, color }: { title: string; desc: string; level: number; color: string }) => {
  const colors: Record<string, string> = {
    rose: 'bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.4)]',
    cyan: 'bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]',
    purple: 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    amber: 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]',
    emerald: 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]',
    blue: 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
  };

  return (
    <div className="bg-black/40 border border-white/5 p-10 relative group overflow-hidden rounded-xl backdrop-blur-sm">
      <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{title}</h4>
      <p className="text-white/40 text-sm leading-relaxed mb-10 h-12">{desc}</p>

      <div className="space-y-3">
        <div className="flex justify-between text-[10px] font-mono tracking-[0.2em] text-white/60">
          <span>OPERATIONAL EFFICIENCY</span>
          <span className="text-white font-bold">{level}%</span>
        </div>
        <div className="w-full h-1 bg-white/5 relative rounded-full overflow-hidden">
          <div className={`absolute top-0 left-0 h-full transition-all duration-1000 ${colors[color]}`} style={{ width: `${level}%` }} />
        </div>
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute -bottom-6 -right-6 text-[80px] font-black italic text-white/[0.02] select-none pointer-events-none group-hover:text-white/[0.04] transition-colors uppercase">
        {title.split(' ')[0]}
      </div>
    </div>
  );
};
