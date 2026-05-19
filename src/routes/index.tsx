import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Code2, Trophy, Sparkles, Zap, Shield, Radio } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PROFILE, HARDWARE_PROJECTS, SOFTWARE_PROJECTS, ACHIEVEMENTS, TIMELINE_DATA } from "@/data/portfolio";
import { HoloCard } from "@/components/layout/PageShell";
import { CommandCenter } from "@/components/hud/CommandCenter";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Swadeep Bansode — Futuristic Engineering Ecosystem" },
      { name: "description", content: "IoT Hardware engineer, robotics developer, innovator. Lead of SYGNIX. Meet AURORA — the holographic AI companion." },
    ],
  }),
});


// ── Animated background grid ──────────────────────────────────────────
function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.25 0.08 285 / 0.4), transparent 70%)"
      }} />
      {/* Animated aurora fog */}
      <motion.div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.2 285 / 0.12), transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.2 210 / 0.1), transparent 70%)", filter: "blur(60px)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(oklch(0.9 0.2 285) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.2 285) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      {/* Floating particles */}
      <Particles />
    </div>
  );
}

function Particles() {
  const pts = useRef(Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dur: 8 + Math.random() * 12,
    delay: Math.random() * 6,
  }))).current;
  return (
    <>
      {pts.map(p => (
        <motion.div key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

// ── Scanning line effect ──────────────────────────────────────────────
function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 h-[2px] z-0"
      style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.22 285 / 0.15), transparent)" }}
      animate={{ top: ["-2px", "100vh"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
    />
  );
}

// ── Stat widget ───────────────────────────────────────────────────────
function Widget({ label, value, icon, className = "" }: { label: string; value: string; icon: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      className={`glass rounded-xl px-4 py-3 inline-flex items-center gap-3 border border-primary/20 cursor-default ${className}`}
    >
      <div className="text-primary">{icon}</div>
      <div>
        <div className="text-[10px] tracking-widest text-muted-foreground uppercase">{label}</div>
        <div className="font-mono text-xl text-foreground neon-text">{value}</div>
      </div>
    </motion.div>
  );
}



function TimelineSection() {
  return (
    <section className="mt-32 relative z-10">
      <div className="mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="chip mb-4 inline-flex items-center gap-2">
            <Radio className="w-3 h-3" /> TIMELINE ACTIVE
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gradient mb-6">Engineering Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Evolution from 6th standard hardware experiments to pursuing a B.Tech in CSE (IoT, Cybersecurity & Blockchain) and building flagship ecosystems.
          </p>
        </motion.div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Center Line for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-primary/20 -translate-x-1/2" style={{ maskImage: "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)" }} />
        
        {/* Mobile Line */}
        <div className="md:hidden absolute left-5 top-4 bottom-4 w-[2px] bg-primary/20" style={{ maskImage: "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, transparent, black 2%, black 98%, transparent)" }} />
        
        <div className="space-y-16 md:space-y-24">
          {TIMELINE_DATA.map((phase, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={phase.year} className="relative flex flex-col md:flex-row w-full group">
                
                {/* The Content Card */}
                <div className={`w-full md:w-1/2 relative z-10 pl-12 md:pl-0 ${isLeft ? "md:pr-16" : "md:order-2 md:pl-16"}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 30 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
                  >
                    <HoloCard className="w-full hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_-5px_oklch(0.7_0.22_285/0.15)]">
                      <div className={`flex flex-col items-start ${isLeft ? "md:items-end md:text-right" : ""} mb-6`}>
                        <div className="chip mb-4 inline-flex items-center gap-2 text-primary font-bold shadow-[0_0_15px_-3px_oklch(0.7_0.22_285/0.4)]">
                           <Sparkles className="w-3 h-3" /> {phase.year}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3">{phase.title}</h3>
                        <p className="text-sm text-muted-foreground">{phase.focus}</p>
                      </div>

                      {phase.status && (
                        <div className={`text-[10px] uppercase tracking-widest text-amber-400/80 mb-6 font-mono text-left ${isLeft ? "md:text-right" : ""}`}>
                          [ {phase.status} ]
                        </div>
                      )}

                      <div className="flex flex-col gap-6">
                        {phase.hardware.length > 0 && (
                          <div className="w-full">
                            <h4 className={`text-[10px] font-mono uppercase text-primary/70 tracking-widest mb-3 flex items-center gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                              {isLeft && <span className="hidden md:inline">Hardware / IoT</span>}
                              <Cpu className="w-3 h-3" />
                              <span className={isLeft ? "md:hidden" : ""}>Hardware / IoT</span>
                            </h4>
                            <div className={`flex flex-wrap gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                              {phase.hardware.map(item => {
                                const hash = item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                return (
                                  <Link to="/hardware" hash={hash} key={item} className="px-3 py-1 text-[11px] font-bold rounded-md bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_12px_oklch(0.7_0.22_285/0.3)] transition-all cursor-pointer shadow-sm">
                                    {item}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {phase.software.length > 0 && (
                          <div className="w-full">
                            <h4 className={`text-[10px] font-mono uppercase text-cyan-400/70 tracking-widest mb-3 flex items-center gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                              {isLeft && <span className="hidden md:inline">Software / Apps</span>}
                              <Code2 className="w-3 h-3" />
                              <span className={isLeft ? "md:hidden" : ""}>Software / Apps</span>
                            </h4>
                            <div className={`flex flex-wrap gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                              {phase.software.map(item => {
                                const hash = item.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                return (
                                  <Link to="/software" hash={hash} key={item} className="px-2.5 py-1 text-[11px] rounded-md bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all cursor-pointer">
                                    {item}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {phase.achievements.length > 0 && (
                          <div className="w-full">
                            <h4 className={`text-[10px] font-mono uppercase text-emerald-400/70 tracking-widest mb-3 flex items-center gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                              {isLeft && <span className="hidden md:inline">Achievements</span>}
                              <Trophy className="w-3 h-3" />
                              <span className={isLeft ? "md:hidden" : ""}>Achievements</span>
                            </h4>
                            <ul className={`space-y-1.5 text-left ${isLeft ? "md:text-right" : ""}`}>
                              {phase.achievements.map(item => (
                                <li key={item} className={`text-xs text-foreground/70 flex items-start gap-2 justify-start ${isLeft ? "md:justify-end" : ""}`}>
                                  {!isLeft && <span className="text-emerald-500/50 mt-0.5">•</span>}
                                  {isLeft && <span className="md:hidden text-emerald-500/50 mt-0.5">•</span>}
                                  
                                  <span>{item}</span>
                                  
                                  {isLeft && <span className="hidden md:inline text-emerald-500/50 mt-0.5">•</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </HoloCard>
                  </motion.div>
                </div>

                {/* Empty Spacer */}
                <div className={`hidden md:block md:w-1/2 ${isLeft ? "md:order-2" : "md:order-1"}`} />

                {/* Center Node */}
                <div className="absolute left-5 md:left-1/2 top-12 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-4 h-4 rounded-full bg-background border-2 border-primary relative group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_oklch(0.7_0.22_285/0.8)]"
                  >
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-primary/50"
                      animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <div className="absolute inset-[3px] rounded-full bg-primary" />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <GridBackground />
      <ScanLine />
      <main className="relative pt-24 md:pt-28 pb-40 px-4 md:px-8 max-w-7xl mx-auto overflow-x-hidden">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative min-h-[520px] flex flex-col lg:flex-row gap-12 lg:gap-8 items-start justify-between">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="max-w-[520px] w-full relative z-10"
          >
            <motion.div className="chip mb-6 inline-flex items-center gap-1.5"
              animate={{ boxShadow: ["0 0 0px oklch(0.7 0.22 285 / 0)", "0 0 12px oklch(0.7 0.22 285 / 0.4)", "0 0 0px oklch(0.7 0.22 285 / 0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-3 w-3" /> AURORA OS · v3.0
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.93] tracking-tight">
              <span className="block text-foreground/90">{PROFILE.name.split(" ")[0]}</span>
              <span className="block text-gradient neon-text">{PROFILE.name.split(" ")[1]}</span>
            </h1>

            <div className="mt-5 flex flex-wrap gap-2">
              {PROFILE.titles.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>

            <p className="mt-7 text-base md:text-lg text-muted-foreground leading-relaxed">
              {PROFILE.tagline} A living command center for hardware, software, robotics and AI — orbited by AURORA, an emotionally-responsive holographic companion.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/sygnix" className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground text-sm uppercase tracking-widest font-medium hover:brightness-110 transition glow-cyan">
                Enter SYGNIX <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/hardware" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass border border-primary/30 text-sm uppercase tracking-widest hover:bg-primary/10 transition">
                Explore Projects
              </Link>
            </div>

            {/* Quick stat widgets */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Widget label="HARDWARE.PROJECTS" value={String(HARDWARE_PROJECTS.length)} icon={<Cpu className="h-4 w-4" />} />
              <Widget label="SOFTWARE" value={String(SOFTWARE_PROJECTS.length)} icon={<Code2 className="h-4 w-4" />} />
              <Widget label="ACHIEVEMENTS" value={String(ACHIEVEMENTS.length)} icon={<Trophy className="h-4 w-4" />} />
            </motion.div>
          </motion.div>

          {/* Right: Command Center */}
          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.9 }}
            className="w-full lg:w-auto flex justify-center lg:justify-end relative z-10"
          >
            <CommandCenter />
          </motion.div>
        </section>

        {/* ── HUD STATUS BAR ─────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-16 flex flex-wrap gap-2 items-center"
        >
          {[
            { icon: <Zap className="h-3 w-3" />, label: "SYGNIX", val: "ONLINE", ok: true },
            { icon: <Radio className="h-3 w-3" />, label: "AURORA LINK", val: "ACTIVE", ok: true },
            { icon: <Shield className="h-3 w-3" />, label: "SECURITY", val: "NOMINAL", ok: true },
            { icon: <Cpu className="h-3 w-3" />, label: "EMBEDDED", val: "12 NODES", ok: true },
          ].map(({ icon, label, val, ok }) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-primary/15 text-[10px] font-mono">
              <motion.div className={`${ok ? "text-emerald-400" : "text-amber-400"}`}
                animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                {icon}
              </motion.div>
              <span className="text-muted-foreground">{label}:</span>
              <span className={ok ? "text-emerald-400" : "text-amber-400"}>{val}</span>
            </div>
          ))}
        </motion.section>

        {/* ── ENGINEERING JOURNEY TIMELINE ────────────────────────────────────────────── */}
        <TimelineSection />

        {/* ── AURORA BANNER ────────────────────────────────────────── */}
        <section className="mt-20 glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full"
            style={{ background: "var(--gradient-aurora)", filter: "blur(80px)", opacity: 0.35 }} />
          <motion.div
            className="absolute -left-10 -bottom-10 w-60 h-60 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.2 210 / 0.2), transparent)", filter: "blur(40px)" }}
            animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <div className="chip mb-4 inline-flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" /> AI Companion
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient">Meet AURORA</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                A holographic AI orb that floats with you across this entire site. Drag her, click her, ask her anything about Swadeep's work. She's curious — and ready to help.
              </p>
            </div>
            <motion.div
              className="text-xs text-muted-foreground tracking-widest uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
            >
              ↘ tap the orb
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}
