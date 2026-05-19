import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Tiny sparkline bar graph ──────────────────────────────────────────
function Sparkline({ color = "var(--color-primary)" }: { color?: string }) {
  const [bars, setBars] = useState(() => Array.from({ length: 14 }, () => 20 + Math.random() * 80));
  useEffect(() => {
    const t = setInterval(() => {
      setBars(b => [...b.slice(1), 20 + Math.random() * 80]);
    }, 700);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-end gap-[2px] h-6">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-1 rounded-sm"
          style={{ background: color, opacity: 0.5 + i / bars.length * 0.5 }}
        />
      ))}
    </div>
  );
}

// ── Radar sweep ───────────────────────────────────────────────────────
function RadarSweep() {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; age: number }[]>([]);
  const id = useRef(0);
  useEffect(() => {
    const t = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const r = 20 + Math.random() * 60;
      setDots(d => [
        ...d.filter(x => x.age < 3),
        { id: ++id.current, x: 50 + Math.cos(angle) * r / 1.4, y: 50 + Math.sin(angle) * r / 1.4, age: 0 },
      ]);
    }, 600);
    const age = setInterval(() => setDots(d => d.map(x => ({ ...x, age: x.age + 0.15 }))), 100);
    return () => { clearInterval(t); clearInterval(age); };
  }, []);

  return (
    <div className="relative w-24 h-24">
      {/* Rings */}
      {[1, 0.66, 0.33].map((s, i) => (
        <div key={i} className="absolute inset-0 rounded-full border border-primary/20"
          style={{ transform: `scale(${s})`, top: `${(1 - s) * 50}%`, left: `${(1 - s) * 50}%`, width: `${s * 100}%`, height: `${s * 100}%`, position: "absolute" }} />
      ))}
      {/* Cross hairs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-primary/15" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-[1px] bg-primary/15" />
      </div>
      {/* Sweep arm */}
      <motion.div className="absolute inset-0 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-1/2 h-[1px] origin-left"
          style={{ background: "linear-gradient(90deg, oklch(0.7 0.22 285), transparent)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      {/* Dots */}
      {dots.map(d => (
        <motion.div key={d.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary"
          style={{ left: `${d.x}%`, top: `${d.y}%`, translateX: "-50%", translateY: "-50%", opacity: Math.max(0, 1 - d.age / 3) }}
        />
      ))}
    </div>
  );
}

// ── Animated number ticker ────────────────────────────────────────────
function Ticker({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(v => {
        const diff = value - v;
        if (Math.abs(diff) < 1) return value;
        return v + diff * 0.12;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{Math.round(display)}{suffix}</span>;
}

// ── Animated HUD panel ────────────────────────────────────────────────
function HudPanel({ label, children, className = "", delay = 0 }: {
  label: string; children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`glass rounded-xl border border-primary/20 p-3 relative overflow-hidden ${className}`}
    >
      {/* Shimmer */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)" }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
      <div className="text-[9px] tracking-widest uppercase text-primary/60 mb-2 font-mono">{label}</div>
      {children}
    </motion.div>
  );
}

// ── Status row ────────────────────────────────────────────────────────
function StatusRow({ label, value, ok = true }: { label: string; value: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[10px] py-0.5">
      <span className="text-muted-foreground font-mono">{label}</span>
      <span className={`font-mono ${ok ? "text-emerald-400" : "text-amber-400"}`}>{value}</span>
    </div>
  );
}

// ── NODE NETWORK ──────────────────────────────────────────────────────
function NodeNetwork() {
  const nodes = [
    { x: 50, y: 50, label: "CORE" },
    { x: 20, y: 20, label: "IoT" },
    { x: 80, y: 15, label: "AI" },
    { x: 85, y: 70, label: "NET" },
    { x: 15, y: 75, label: "SEC" },
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 4], [2, 3]];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="oklch(0.7 0.22 285)" strokeWidth="0.5" strokeOpacity="0.4"
          strokeDasharray="2 2"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.x} cy={n.y} r={i === 0 ? 5 : 3}
            fill="oklch(0.7 0.22 285)" fillOpacity={i === 0 ? 0.8 : 0.5}
            animate={{ r: i === 0 ? [5, 6.5, 5] : [3, 3.8, 3] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <text x={n.x} y={n.y + (i === 0 ? 9 : 7)} textAnchor="middle"
            fontSize="4" fill="oklch(0.8 0.1 285)" fontFamily="monospace">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ── HOLOGRAPHIC RINGS ─────────────────────────────────────────────────
export function HoloRings({ size = 280 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer rings */}
      {[1, 0.82, 0.65, 0.5].map((s, i) => (
        <motion.div key={i}
          className="absolute rounded-full border border-primary/20"
          style={{
            width: size * s, height: size * s,
            top: size * (1 - s) / 2, left: size * (1 - s) / 2,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 8 + i * 4, repeat: Infinity, ease: "linear" }}
        />
      ))}
      {/* Glowing dot on outermost ring */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-primary"
        style={{ top: "50%", left: "50%", translateX: "-50%", translateY: `-${size / 2 - 6}px` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Pulse rings */}
      {[0, 0.4, 0.8].map(delay => (
        <motion.div key={delay}
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 0.4, opacity: 0.8 }}
          animate={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 3, delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      {/* Core glow */}
      <div className="absolute inset-[38%] rounded-full"
        style={{ background: "radial-gradient(circle, oklch(0.8 0.25 285), oklch(0.5 0.18 285) 60%, transparent)", filter: "blur(4px)", opacity: 0.8 }} />
      {/* Inner radar */}
      <div className="absolute inset-[32%] flex items-center justify-center">
        <RadarSweep />
      </div>
    </div>
  );
}

// ── MAIN COMMAND CENTER ───────────────────────────────────────────────
export function CommandCenter() {
  const [cpuVal, setCpuVal] = useState(72);
  const [memVal, setMemVal] = useState(58);
  const [netVal, setNetVal] = useState(91);

  useEffect(() => {
    const t = setInterval(() => {
      setCpuVal(60 + Math.random() * 35);
      setMemVal(50 + Math.random() * 30);
      setNetVal(80 + Math.random() * 18);
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-4 w-[420px]">
      {/* Top: holo rings + status */}
      <div className="flex items-center gap-4">
        <HoloRings size={200} />
        <div className="flex flex-col gap-3 flex-1">
          <HudPanel label="AI.STATUS" delay={0.1}>
            <div className="flex items-center gap-2">
              <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
              <span className="font-mono text-xs text-emerald-400">ONLINE</span>
            </div>
            <Sparkline />
          </HudPanel>

          <HudPanel label="SYS.LOAD" delay={0.2}>
            <div className="space-y-1">
              {[{ l: "CPU", v: cpuVal }, { l: "MEM", v: memVal }, { l: "NET", v: netVal }].map(({ l, v }) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-muted-foreground w-6">{l}</span>
                  <div className="flex-1 h-1 rounded-full bg-primary/10 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-primary"
                      animate={{ width: `${v}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
                  </div>
                  <span className="font-mono text-[9px] text-primary w-6 text-right"><Ticker value={Math.round(v)} suffix="%" /></span>
                </div>
              ))}
            </div>
          </HudPanel>
        </div>
      </div>

      {/* Node network */}
      <HudPanel label="SYGNIX.NODE.NETWORK" delay={0.3}>
        <div className="h-28">
          <NodeNetwork />
        </div>
      </HudPanel>

      {/* Bottom row panels */}
      <div className="grid grid-cols-2 gap-3">
        <HudPanel label="TELEMETRY" delay={0.4}>
          <StatusRow label="SENSOR.A" value="94.2°C" ok />
          <StatusRow label="SIGNAL" value="−42 dBm" ok />
          <StatusRow label="UPTIME" value="99.8%" ok />
          <StatusRow label="ALERTS" value="NONE" ok />
        </HudPanel>

        <HudPanel label="PROJECTS.ACTIVE" delay={0.5}>
          {["AranyaSync", "HazardEye", "MediRoute", "Phantom Grid"].map((p, i) => (
            <motion.div key={p}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className="flex items-center gap-1.5 py-0.5"
            >
              <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5 + i * 0.2, repeat: Infinity }} />
              <span className="font-mono text-[9px] text-foreground/70">{p}</span>
            </motion.div>
          ))}
        </HudPanel>
      </div>

      {/* Live stream ticker */}
      <HudPanel label="NEURAL.STREAM" delay={0.6}>
        <LiveTicker />
      </HudPanel>
    </div>
  );
}

// ── LIVE LOG TICKER ───────────────────────────────────────────────────
const LOG_LINES = [
  "> AranyaSync: forest mesh sync OK",
  "> HazardEye: vision model loaded",
  "> AURORA: companion v3.0 active",
  "> ESP32-C6: telemetry nominal",
  "> SYGNIX: node cluster online",
  "> MediRoute: API handshake OK",
  "> Phantom Grid: encrypted tunnel",
  "> ATL: mentor session scheduled",
  "> Groq LLM: 0.3s avg response",
  "> Blockchain: ledger synced",
];

function LiveTicker() {
  const [lines, setLines] = useState(LOG_LINES.slice(0, 3));
  const idx = useRef(3);
  useEffect(() => {
    const t = setInterval(() => {
      const next = LOG_LINES[idx.current % LOG_LINES.length];
      idx.current++;
      setLines(l => [...l.slice(-4), next]);
    }, 1600);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-0.5 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {lines.map((l, i) => (
          <motion.div key={l + i}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: i === lines.length - 1 ? 1 : 0.4 }}
            exit={{ opacity: 0 }}
            className="font-mono text-[9px] text-primary/80 truncate"
          >
            {l}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
