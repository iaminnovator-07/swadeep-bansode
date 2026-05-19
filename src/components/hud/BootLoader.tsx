import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aurora } from "@/lib/audio";
import logoImg from "@/assets/logo.png";

const BOOT_LOGS = [
  "INITIALIZING NEURAL LINK...",
  "CONNECTING TO SYGNIX CORE CLUSTER...",
  "ESTABLISHING SECURE MESH GRID...",
  "PARSING TELEMETRY DATA NODES...",
  "CALIBRATING HOLOGRAPHIC COMPANION...",
  "LOADING CORE ASSETS...",
  "AURORA companion v3.0 [ONLINE]",
  "SYSTEM STATUS: NOMINAL"
];

export function BootLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [currentLogs, setCurrentLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Play boot sound
    try { aurora.boot(); } catch (e) { /* ignore */ }

    // Progress timer
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + step, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Log messages sync to progress
    const maxLogs = Math.floor((progress / 100) * BOOT_LOGS.length);
    if (maxLogs > logIndex && logIndex < BOOT_LOGS.length) {
      setCurrentLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
      setLogIndex(logIndex + 1);
    }
  }, [progress, logIndex]);

  // Auto-scroll logic when currentLogs updates
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [currentLogs]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background select-none overflow-hidden"
    >
      {/* Scanline & ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-radial-at-c from-primary/10 via-transparent to-transparent opacity-60" />

      {/* Holographic Glowing Ring */}
      <div className="relative mb-8 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-28 h-28 rounded-full border border-primary/20 border-t-primary/80 filter drop-shadow-[0_0_15px_rgba(0,255,255,0.4)]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border border-purple-500/20 border-b-purple-500/80 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
        />
        {/* Glowing Logo Zooming In */}
        <motion.img
          src={logoImg}
          alt="Swadeep Logo"
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 14,
            delay: 0.15
          }}
          className="absolute w-14 h-14 object-contain filter drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]"
        />
      </div>

      {/* Website Header Text (HTML) formatted like the logo */}
      <div className="text-center mb-8 flex flex-col items-center">
        <h1 className="font-display text-3xl tracking-[0.25em] uppercase text-gradient font-bold filter drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
          SWADEEP
        </h1>
        {/* Founder text with lines */}
        <div className="flex items-center gap-3 mt-1.5 w-full justify-center">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/45" />
          <span className="font-mono text-[9px] text-primary/70 tracking-[0.4em] uppercase font-medium">
            FOUNDER
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/45" />
        </div>
      </div>

      {/* Terminal log window */}
      <div 
        ref={logContainerRef}
        className="w-[min(480px,calc(100vw-3rem))] glass rounded-xl border border-primary/25 p-4 mb-6 font-mono text-[9px] text-primary/80 space-y-1.5 h-36 overflow-y-auto scrollbar-none shadow-2xl"
      >
        <AnimatePresence>
          {currentLogs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 leading-relaxed"
            >
              <span className="text-purple-400">&gt;</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Bar Container */}
      <div className="w-[min(480px,calc(100vw-3rem))] space-y-2 px-1">
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          <span>Uplink Status</span>
          <span className="text-primary font-bold">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-primary/10 border border-primary/20 overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
