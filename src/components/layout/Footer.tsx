import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { 
  Linkedin, 
  Github, 
  Instagram, 
  Mail, 
  Cpu, 
  Radio, 
  Shield, 
  Zap, 
  Binary, 
  Terminal,
  Activity,
  Globe
} from "lucide-react";
import { PROFILE, NAV_LINKS } from "@/data/portfolio";
import logoImg from "@/assets/logo.png";
import { useState, useEffect } from "react";

export function Footer() {
  const [sysTime, setSysTime] = useState("");
  const [pulseScale, setPulseScale] = useState(1);

  // Dynamic system time & ping pulsing simulation
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setSysTime(d.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const pulseInterval = setInterval(() => {
      setPulseScale(1.15);
      setTimeout(() => setPulseScale(1), 200);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  return (
    <footer className="relative border-t border-primary/15 bg-background pt-16 pb-8 overflow-hidden select-none">
      {/* 1. Futuristic Grid & Volumetric Lighting Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(to right, oklch(0.85 0.18 210) 1px, transparent 1px), 
                            linear-gradient(to bottom, oklch(0.85 0.18 210) 1px, transparent 1px)`, 
          backgroundSize: "40px 40px" 
        }} 
      />
      <div className="absolute top-0 left-1/4 w-[400px] h-[300px] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] rounded-full bg-gradient-to-bl from-purple-500/5 to-transparent blur-[80px] pointer-events-none" />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-20" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12">
          
          {/* ────────────────────────────────────────────────────────
              COLUMN 1 (4 Cores): FOUNDER BRANDING & TELEMETRY
             ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              {/* Logo block */}
              <Link to="/" className="inline-flex items-center gap-3 group mb-4">
                <img 
                  src={logoImg} 
                  alt="SYGNIX Logo" 
                  className="h-9 w-9 object-contain filter drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] group-hover:scale-110 transition-transform duration-500" 
                />
                <div>
                  <span className="font-display tracking-[0.2em] text-base uppercase text-gradient font-bold block">
                    SWADEEP
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.3em] text-primary/60 uppercase block -mt-1">
                    FOUNDER
                  </span>
                </div>
              </Link>
              
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                Fusing IoT hardware systems, robotics telemetry, and high-performance software structures to construct next-gen digital networks.
              </p>
            </div>

            {/* GPS coordinates & telemetry info */}
            <div className="glass rounded-xl p-3.5 border border-primary/10 font-mono text-[9px] text-primary/70 space-y-1 bg-black/30">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>[ COORDINATES ]</span>
                <span className="text-emerald-400">SYNC OK</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>NAVI MUMBAI, IND // 19.0330° N, 73.0297° E</span>
              </div>
              <div className="flex justify-between border-t border-primary/10 pt-1 mt-1 text-[8px]">
                <span>CORE_TEMP: 36.4°C</span>
                <span>SYS_TIME: {sysTime || "SYNCHRONIZING..."}</span>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              COLUMN 2 (4 Cores): INTERACTIVE NETWORK MESH
             ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col justify-between glass rounded-2xl p-5 border border-primary/15 relative overflow-hidden bg-black/25">
            {/* HUD Scanline */}
            <div className="absolute inset-0 bg-repeating-linear-gradient opacity-[0.02] pointer-events-none" />
            
            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-primary/80 tracking-widest mb-3 border-b border-primary/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                Network Topology
              </span>
              <span className="text-[8px] text-muted-foreground">MESH_FREQ: 2.4GHZ</span>
            </div>

            {/* SVG Network Nodes Graph */}
            <div className="h-28 w-full relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 100" preserveAspectRatio="none">
                {/* Node Links */}
                <line x1="30" y1="20" x2="100" y2="50" stroke="oklch(0.85 0.18 210 / 0.15)" strokeWidth="1" />
                <line x1="30" y1="20" x2="50" y2="80" stroke="oklch(0.85 0.18 210 / 0.15)" strokeWidth="1" />
                <line x1="100" y1="50" x2="170" y2="20" stroke="oklch(0.85 0.18 210 / 0.15)" strokeWidth="1" />
                <line x1="100" y1="50" x2="150" y2="80" stroke="oklch(0.85 0.18 210 / 0.15)" strokeWidth="1" />
                <line x1="50" y1="80" x2="150" y2="80" stroke="oklch(0.85 0.18 210 / 0.15)" strokeWidth="1" />
                
                {/* Glowing Core Lines */}
                <motion.line 
                  x1="30" y1="20" x2="100" y2="50" 
                  stroke="oklch(0.85 0.18 210)" strokeWidth="1.5" 
                  strokeDasharray="8 12"
                  animate={{ strokeDashoffset: [0, -40] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.line 
                  x1="100" y1="50" x2="170" y2="20" 
                  stroke="oklch(0.7 0.22 285)" strokeWidth="1.5" 
                  strokeDasharray="6 10"
                  animate={{ strokeDashoffset: [0, 32] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes */}
                <circle cx="30" cy="20" r="3" fill="oklch(0.85 0.18 210)" />
                <circle cx="50" cy="80" r="3.5" fill="oklch(0.7 0.22 285)" />
                <circle cx="100" cy="50" r="5" fill="oklch(0.85 0.18 210)" className="animate-pulse" />
                <circle cx="170" cy="20" r="3" fill="oklch(0.7 0.22 285)" />
                <circle cx="150" cy="80" r="4" fill="oklch(0.85 0.18 210)" />
              </svg>
              
              {/* Dynamic Overlay HUD values */}
              <div className="absolute top-1 left-2 font-mono text-[7px] text-muted-foreground">NODE_01 // OK</div>
              <div className="absolute bottom-1 right-2 font-mono text-[7px] text-muted-foreground">NODE_04 // LINKED</div>
            </div>

            {/* Micro Telemetry Bars */}
            <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-primary/10">
              <div>
                <div className="text-[7px] font-mono text-muted-foreground uppercase">SYS_LOAD</div>
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden mt-0.5">
                  <motion.div className="h-full bg-cyan-400" animate={{ width: ["30%", "65%", "45%"] }} transition={{ duration: 6, repeat: Infinity }} />
                </div>
              </div>
              <div>
                <div className="text-[7px] font-mono text-muted-foreground uppercase">RF_MESH</div>
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden mt-0.5">
                  <motion.div className="h-full bg-purple-500" animate={{ width: ["80%", "72%", "94%"] }} transition={{ duration: 4, repeat: Infinity }} />
                </div>
              </div>
              <div>
                <div className="text-[7px] font-mono text-muted-foreground uppercase">AI_COGNITIVE</div>
                <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden mt-0.5">
                  <motion.div className="h-full bg-emerald-400" animate={{ width: ["95%", "90%", "98%"] }} transition={{ duration: 5, repeat: Infinity }} />
                </div>
              </div>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────
              COLUMN 3 (4 Cores): HOLOGRAPHIC CONNECTIONS & NAVIGATION
             ──────────────────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {/* Quick Links Group */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-2 border-b border-primary/10 pb-1">
                  NAVIGATION
                </span>
                <nav className="flex flex-col gap-1.5">
                  {NAV_LINKS.slice(0, 5).map((l) => (
                    <Link 
                      key={l.to} 
                      to={l.to} 
                      className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-cyan-400 hover:translate-x-1 transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-2 border-b border-primary/10 pb-1">
                  SECTORS
                </span>
                <nav className="flex flex-col gap-1.5">
                  {NAV_LINKS.slice(5).map((l) => (
                    <Link 
                      key={l.to} 
                      to={l.to} 
                      className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-purple-400 hover:translate-x-1 transition-all duration-200"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Glowing Holographic Social Pads */}
            <div className="space-y-2">
              <span className="font-mono text-[9px] tracking-widest text-muted-foreground uppercase block mb-1">
                SECURE CONNECTIONS
              </span>
              <div className="flex gap-2">
                {[
                  { icon: <Linkedin className="w-4 h-4" />, url: PROFILE.links.linkedin, color: "hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.25)]" },
                  { icon: <Github className="w-4 h-4" />, url: PROFILE.links.github, color: "hover:border-purple-400/50 hover:text-purple-400 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)]" },
                  { icon: <Instagram className="w-4 h-4" />, url: PROFILE.links.instagram, color: "hover:border-pink-400/50 hover:text-pink-400 hover:shadow-[0_0_12px_rgba(244,63,94,0.25)]" },
                  { icon: <Mail className="w-4 h-4" />, url: `mailto:${PROFILE.links.email}`, color: "hover:border-emerald-400/50 hover:text-emerald-400 hover:shadow-[0_0_12px_rgba(52,211,153,0.25)]" }
                ].map((s, idx) => (
                  <motion.a 
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`h-9 w-9 rounded-lg border border-primary/20 flex items-center justify-center text-muted-foreground bg-black/20 backdrop-blur-md transition-all duration-300 ${s.color}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
        </div>

        {/* ────────────────────────────────────────────────────────
            FOOTER BOTTOM ROW: STATUS NODES & COPYRIGHT
           ──────────────────────────────────────────────────────── */}
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          {/* Status signal block */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <motion.span 
                  style={{ scale: pulseScale }}
                  className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>SYGNIX NETWORK ONLINE</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              <Shield className="w-3 h-3 text-cyan-400" />
              <span>SSL_LINK: SECURE</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <Binary className="w-3 h-3 text-purple-400" />
              <span>v3.0.42</span>
            </div>
          </div>

          <div>
            © {new Date().getFullYear()} SWADEEP BANSODE. ALL CORES ACTIVE.
          </div>
        </div>

      </div>
    </footer>
  );
}
