import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Cinematic HUD overlay: boot sequence + ambient telemetry chips.
// Sits above the background but below all interactive content.
export function SystemHUD() {
  // Removed redundant booting overlay since AuroraOrb handles the cinematic intro
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <>

      {/* Persistent telemetry — bottom-left */}
      <div className="fixed bottom-4 left-4 z-30 hidden md:flex flex-col gap-1 font-mono text-[10px] text-primary/70 pointer-events-none animate-hud-flicker">
        <div>◉ link · stable</div>
        <div>◈ uplink · {(98 + Math.sin(tick / 3) * 1.2).toFixed(2)}%</div>
        <div>⌬ aurora · idle</div>
      </div>

      {/* Corner brackets — top-left & top-right */}
      <CornerBracket className="top-3 left-3" />
      <CornerBracket className="top-3 right-3" flipX />
    </>
  );
}

function CornerBracket({ className = "", flipX = false }: { className?: string; flipX?: boolean }) {
  return (
    <div
      className={`fixed z-30 w-10 h-10 pointer-events-none ${className}`}
      style={{ transform: flipX ? "scaleX(-1)" : undefined }}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-primary/60" />
      <div className="absolute top-0 left-0 w-px h-full bg-primary/60" />
    </div>
  );
}