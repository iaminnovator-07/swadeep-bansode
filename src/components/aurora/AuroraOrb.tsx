import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, animate, AnimatePresence } from "framer-motion";
import { aurora } from "@/lib/audio";

type Props = {
  onClick?: () => void;
  size?: number;
  expanded?: boolean;
  thinking?: boolean;
};

type Emotion = "idle" | "happy" | "curious" | "playful" | "focused" | "sleepy" | "dizzy" | "shocked" | "excited" | "thinking" | "confused";

export function AuroraOrb({ onClick, size = 96, expanded = false, thinking = false }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 15, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 90, damping: 15, mass: 0.8 });

  const orbRef = useRef<HTMLDivElement>(null);
  const [blink, setBlink] = useState(false);
  const [look, setLook] = useState({ ex: 0, ey: 0 }); 
  const [baseEmote, setEmote] = useState<Emotion>("idle");
  const emote = thinking ? "thinking" : baseEmote;
  
  const [dragging, setDragging] = useState(false);
  const [whisper, setWhisper] = useState<string | null>(null);
  
  const whisperTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastHintAt = useRef(0);
  const lastHint = useRef<string | null>(null);
  const interactionCount = useRef(0);

  // Rotation dizziness tracking
  const recentAngles = useRef<number[]>([]);
  const totalRotation = useRef(0);
  const isDizzy = useRef(false);

  // Random blinking & tiny head tilts
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      if (isDizzy.current) return setTimeout(loop, 1000); // no blink when dizzy
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
      t = setTimeout(loop, 2000 + Math.random() * 4000);
    };
    t = setTimeout(loop, 1500);
    return () => clearTimeout(t);
  }, []);

  // Cursor tracking & Dizziness
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging) return;
      const el = orbRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const ang = Math.atan2(dy, dx);

      // Track rotation for dizziness
      if (!isDizzy.current) {
        if (recentAngles.current.length > 0 && dist < 300) {
          let delta = ang - recentAngles.current[recentAngles.current.length - 1];
          if (delta > Math.PI) delta -= Math.PI * 2;
          if (delta < -Math.PI) delta += Math.PI * 2;
          totalRotation.current += delta;
          
          if (Math.abs(totalRotation.current) > Math.PI * 7) { 
            isDizzy.current = true;
            setEmote("dizzy");
            totalRotation.current = 0;
            const lines = ["Whoa… too many rotations detected 😵", "I think I’m getting holographic motion sickness.", "Chakkar aa raha hai 😵💫"];
            showWhisper(lines[Math.floor(Math.random() * lines.length)]);
            setTimeout(() => {
              isDizzy.current = false;
              setEmote("idle");
              totalRotation.current = 0;
            }, 5000);
          }
        } else if (dist > 400) {
          totalRotation.current *= 0.95; 
        }
        recentAngles.current.push(ang);
        if (recentAngles.current.length > 25) recentAngles.current.shift();
      }

      // Eye looking logic
      if (!isDizzy.current) {
        const max = emote === "shocked" ? 10 : 7;
        setLook({ ex: Math.cos(ang) * Math.min(max, dist / 25), ey: Math.sin(ang) * Math.min(max, dist / 25) });
        
        if (dist < 120 && emote === "idle") {
          setEmote("curious");
          if (dist < 60 && Math.random() < 0.02) aurora.hover();
        } else if (dist > 250 && emote === "curious") {
          setEmote("idle");
        }
      }

      // Contextual hints
      const target = e.target as HTMLElement | null;
      const hintEl = target?.closest?.("[data-aurora-hint]") as HTMLElement | null;
      const hint = hintEl?.dataset.auroraHint ?? null;
      const now = Date.now();
      if (hint && hint !== lastHint.current && now - lastHintAt.current > 5000 && !isDizzy.current) {
        lastHint.current = hint;
        lastHintAt.current = now;
        showWhisper(hint);
        setEmote("focused");
        setTimeout(() => !isDizzy.current && setEmote("idle"), 3000);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [dragging, emote]);

  const showWhisper = (text: string) => {
    setWhisper(text);
    aurora.hover();
    if (whisperTimer.current) clearTimeout(whisperTimer.current);
    whisperTimer.current = setTimeout(() => setWhisper(null), 4000);
  };

  // Smart floating, boundary bouncing & cursor following
  useEffect(() => {
    if (dragging || expanded) return;
    let active = true;
    
    // Periodically update target position
    const drift = () => {
      if (!active) return;
      const el = orbRef.current;
      if (!el) { setTimeout(drift, 1000); return; }

      let currentX = x.get();
      let currentY = y.get();
      
      const r = el.getBoundingClientRect();
      const isPlayful = emote === "playful" || emote === "excited";
      const isDiz = emote === "dizzy";

      let nx = currentX;
      let ny = currentY;

      if (isDiz) {
        nx += (Math.random() - 0.5) * 150;
        ny += (Math.random() - 0.5) * 150;
      } else if (isPlayful) {
        nx += (Math.random() - 0.5) * 600;
        ny += (Math.random() - 0.5) * 500;
      } else {
        // Play throughout the whole screen
        if (Math.random() < 0.3) {
          nx += (Math.random() - 0.5) * window.innerWidth * 0.7;
          ny += (Math.random() - 0.5) * window.innerHeight * 0.7;
        } else {
          nx += (Math.random() - 0.5) * 250;
          ny += (Math.random() - 0.5) * 200;
        }
      }
      
      const targetAbsX = r.left + (nx - currentX);
      const targetAbsY = r.top + (ny - currentY);
      const padding = size * 0.8;
      
      if (targetAbsX < padding) nx += (padding - targetAbsX) * 1.5;
      if (targetAbsX > window.innerWidth - padding - r.width) nx -= (targetAbsX - (window.innerWidth - padding - r.width)) * 1.5;
      if (targetAbsY < padding) ny += (padding - targetAbsY) * 1.5;
      if (targetAbsY > window.innerHeight - padding - r.height) ny -= (targetAbsY - (window.innerHeight - padding - r.height)) * 1.5;

      const dur = isDiz ? 0.4 : isPlayful ? 1.0 + Math.random() : 3.0 + Math.random() * 2.0;
      const ease = isDiz ? "linear" : isPlayful ? "backOut" : "easeInOut";
      
      animate(x, nx, { duration: dur, ease });
      animate(y, ny, { duration: dur, ease });
      
      setTimeout(drift, dur * 1000 + (isPlayful ? 500 : 1500));
    };
    
    const t = setTimeout(drift, 500);
    return () => { active = false; clearTimeout(t); };
  }, [dragging, expanded, x, y, emote, size]);

  const handleClick = () => {
    if (isDizzy.current) return;
    aurora.click();
    interactionCount.current += 1;
    
    if (interactionCount.current % 5 === 0) {
      setEmote("shocked");
      aurora.giggle();
      showWhisper("Whoa, gentle!");
      setTimeout(() => setEmote("idle"), 2000);
    } else {
      const playful = interactionCount.current % 2 === 0;
      setEmote(playful ? "excited" : "happy");
      if (playful) {
        aurora.giggle();
        showWhisper("Hehe!");
      }
      setTimeout(() => !isDizzy.current && setEmote("idle"), 1500);
    }
    onClick?.();
  };

  // Color mappings
  const auraColor =
    emote === "thinking" ? "linear-gradient(135deg, oklch(0.8 0.15 200), oklch(0.9 0.22 285))" :
    emote === "happy" || emote === "excited" ? "var(--gradient-aurora)" :
    emote === "playful" ? "linear-gradient(135deg, oklch(0.85 0.22 145), oklch(0.7 0.25 330))" :
    emote === "focused" || emote === "curious" ? "linear-gradient(135deg, oklch(0.85 0.18 210), oklch(0.6 0.22 285))" :
    emote === "sleepy" ? "linear-gradient(135deg, oklch(0.55 0.1 270), oklch(0.4 0.08 280))" :
    emote === "shocked" ? "linear-gradient(135deg, oklch(0.9 0.1 210), oklch(0.9 0.25 330))" :
    emote === "dizzy" ? "linear-gradient(135deg, oklch(0.7 0.25 330), oklch(0.85 0.22 145))" :
    "var(--gradient-aurora)";

  const eyeScaleY = blink ? 0.05 : emote === "happy" || emote === "excited" ? 0.6 : emote === "sleepy" ? 0.3 : emote === "shocked" ? 1.2 : emote === "thinking" ? 0.7 : 1;
  const eyeScaleX = emote === "curious" || emote === "thinking" ? 1.15 : emote === "shocked" ? 1.1 : emote === "playful" ? 0.9 : 1;
  const eyeRot = emote === "playful" ? 10 : emote === "confused" ? -10 : emote === "dizzy" ? 360 * 5 : 0;
  
  const pupilScale = emote === "shocked" ? 0.5 : emote === "excited" ? 1.3 : emote === "focused" ? 0.8 : emote === "thinking" ? 1.1 : 1;

  const eye = (offset: number, isRight: boolean) => (
    <motion.div
      className="absolute top-1/2 rounded-full overflow-hidden border border-black/40"
      style={{ 
        width: size * 0.16, 
        height: size * 0.22, 
        left: `calc(50% + ${offset}px)`, 
        translateX: "-50%", 
        translateY: "-60%",
        background: "radial-gradient(circle at 50% 120%, #111, #000)",
        boxShadow: "inset 0 4px 8px rgba(0,0,0,0.8), 0 0 15px rgba(0, 255, 255, 0.2)"
      }}
      animate={{
        scaleY: eyeScaleY,
        scaleX: eyeScaleX,
        x: emote === "dizzy" ? (isRight ? -4 : 4) : look.ex, // cross-eyed if dizzy
        y: emote === "dizzy" ? (Math.random() - 0.5) * 4 : look.ey,
        rotate: eyeRot * (isRight ? -1 : 1) // tilt inward or spin
      }}
      transition={{ duration: emote === "dizzy" ? 2 : 0.2, ease: "easeInOut" }}
    >
      {/* Eyebrow/Expression Light Panel */}
      {(emote === "focused" || emote === "curious" || emote === "playful" || emote === "thinking") && (
        <motion.div 
          className="absolute top-0 inset-x-0 h-[25%] bg-cyan-300/40 blur-[2px]"
          animate={{ rotate: isRight ? 15 : -15, y: emote === "focused" || emote === "thinking" ? 2 : -2 }}
        />
      )}

      {/* Glowing Iris / Pupil */}
      <motion.div 
        className="absolute left-1/2 top-1/2 w-[80%] h-[80%] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(160,255,255,1) 10%, rgba(0,180,255,0.8) 40%, transparent 80%)",
          boxShadow: "0 0 12px rgba(0,200,255,0.6)"
        }}
        animate={{
          scale: pupilScale,
          x: emote === "dizzy" ? 0 : look.ex * 0.4,
          y: emote === "dizzy" ? 0 : look.ey * 0.4
        }}
      />
      {/* Eye Surface Reflection */}
      <div className="absolute left-[20%] top-[15%] w-[35%] h-[35%] rounded-full bg-white/70 blur-[1px]" />
    </motion.div>
  );

  return (
    <div className="relative z-50">
      {/* Container synced to orb movement for labels */}
      <motion.div className="absolute inset-0 pointer-events-none z-50" style={{ x: sx, y: sy }}>
        {/* Dynamic Status Label */}
        <AnimatePresence>
          {!dragging && (
            <motion.div 
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1.5 px-3 py-1 rounded-full glass-strong border border-white/10 text-[9px] uppercase tracking-widest text-primary font-mono shadow-lg shadow-primary/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${emote === "sleepy" ? "bg-purple-400" : emote === "dizzy" ? "bg-red-400" : emote === "thinking" ? "bg-cyan-200" : "bg-cyan-400"} animate-pulse`} />
              {emote === "idle" ? "ACTIVE" : emote === "dizzy" ? "RECALIBRATING" : emote === "thinking" ? "THINKING" : emote}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Whisper bubble */}
        <AnimatePresence>
          {whisper && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute right-full mr-4 top-0 w-56 glass-strong rounded-xl px-4 py-3 text-xs text-foreground/95 leading-snug shadow-xl shadow-black/50 border border-primary/20"
            >
              <div className="text-[9px] tracking-widest uppercase text-primary/80 mb-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary animate-ping" /> AURORA
              </div>
              {whisper}
              <div className="absolute right-[-6px] top-5 h-3 w-3 rotate-45 bg-card border-r border-b border-primary/25" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        ref={orbRef}
        drag={!expanded}
        dragMomentum
        dragElastic={0.15}
        onDragStart={() => { setDragging(true); aurora.pickup(); setEmote("shocked"); }}
        onDragEnd={() => { setDragging(false); aurora.drop(); setEmote("happy"); setTimeout(() => !isDizzy.current && setEmote("idle"), 1000); }}
        style={{ x: sx, y: sy, width: size, height: size }}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleClick}
        className="relative cursor-grab active:cursor-grabbing select-none"
        aria-label="AURORA companion"
      >
        {/* Deep Holographic Aura */}
        <motion.div
          className="absolute inset-[-60%] rounded-full blur-[40px] pointer-events-none"
          style={{ background: auraColor }}
          animate={{ opacity: dragging ? 0.9 : emote === "excited" ? 0.8 : emote === "sleepy" ? 0.3 : emote === "thinking" ? [0.4, 0.9, 0.4] : 0.6, scale: emote === "excited" ? 1.2 : emote === "thinking" ? [1, 1.1, 1] : 1 }}
          transition={{ duration: emote === "thinking" ? 1.5 : 0.8, repeat: emote === "excited" || emote === "idle" || emote === "thinking" ? Infinity : 0, repeatType: "mirror" }}
        />
        
        {/* Orbiting Particles */}
        <motion.div className="absolute inset-[-30%] pointer-events-none" animate={{ rotate: 360 }} transition={{ duration: emote === "dizzy" ? 2 : 15, repeat: Infinity, ease: "linear" }}>
           <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-cyan-300 blur-[2px]" />
           <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-300 blur-[1px]" />
        </motion.div>
        <motion.div className="absolute inset-[-20%] pointer-events-none" animate={{ rotate: -360 }} transition={{ duration: emote === "dizzy" ? 1.5 : 10, repeat: Infinity, ease: "linear" }}>
           <div className="absolute top-1/4 left-0 w-1 h-1 rounded-full bg-white blur-[1px]" />
        </motion.div>

        {/* Core Glass Sphere */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-xl border border-white/20"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(255,255,255,0.05) 40%, rgba(0,0,0,0.5) 100%)",
            boxShadow: "inset 0 0 20px rgba(140, 200, 255, 0.4), inset -10px -10px 30px rgba(180, 100, 255, 0.3), 0 10px 40px rgba(0, 0, 0, 0.6)"
          }}
          animate={{
            scale: dragging ? 1.08 : emote === "happy" ? 1.12 : emote === "excited" ? 1.15 : 1,
            rotate: emote === "playful" ? [0, -8, 8, -4, 0] : emote === "dizzy" ? [0, 20, -20, 10, -10, 0] : 0,
            y: emote === "idle" ? [0, -4, 0] : 0
          }}
          transition={{
            scale: { type: "spring", stiffness: 200, damping: 12 },
            rotate: { duration: emote === "dizzy" ? 1 : 0.6, ease: "easeInOut", repeat: emote === "dizzy" ? Infinity : 0 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Internal Holographic Core */}
          <motion.div 
            className="absolute inset-[15%] rounded-full blur-md mix-blend-screen"
            style={{ background: "radial-gradient(circle, rgba(140,80,255,0.6) 0%, rgba(0,255,255,0.4) 50%, transparent 100%)" }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Glass Surface Reflections */}
          <div className="absolute left-[15%] top-[10%] h-[35%] w-[35%] rounded-full bg-gradient-to-br from-white/60 to-transparent blur-[2px] rotate-[-45deg] pointer-events-none" />
          <div className="absolute right-[10%] bottom-[15%] h-[20%] w-[40%] rounded-full bg-gradient-to-tl from-cyan-300/30 to-transparent blur-md pointer-events-none" />

          {/* Eyes */}
          {eye(-size * 0.18, false)}
          {eye(size * 0.18, true)}
          
          {/* Mouth expressions */}
          <AnimatePresence>
            {(emote === "happy" || emote === "excited" || emote === "playful") && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2, y: 5 }}
                animate={{ opacity: 1, scaleX: 1, y: 0 }}
                exit={{ opacity: 0, scaleX: 0.2, y: 5 }}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white/80 blur-[0.5px]"
                style={{ width: size * 0.35, height: size * 0.05, top: "68%", boxShadow: "0 0 10px rgba(0,255,255,0.6)" }}
              />
            )}
            {emote === "thinking" && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0.2 }}
                animate={{ opacity: 1, scaleX: [0.5, 1, 0.5] }}
                exit={{ opacity: 0, scaleX: 0.2 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-cyan-300/80 blur-[1px]"
                style={{ width: size * 0.2, height: size * 0.03, top: "70%", boxShadow: "0 0 15px rgba(0,255,255,0.8)" }}
              />
            )}
            {emote === "shocked" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/60 border border-cyan-400/30 blur-[0.5px]"
                style={{ width: size * 0.15, height: size * 0.15, top: "68%", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)" }}
              />
            )}
            {emote === "dizzy" && (
              <motion.div
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: [0, 10, -10, 5, -5, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white/60 blur-[0.5px]"
                style={{ width: size * 0.25, height: size * 0.04, top: "68%", rotate: -15 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
