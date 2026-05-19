// Web Audio synthesizer for AURORA's playful sounds.
// All sounds are generated procedurally — no asset files.

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function blip(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.08, slideTo?: number) {
  const c = getCtx();
  if (!c || muted) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo !== undefined) o.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export const aurora = {
  setMuted(v: boolean) { muted = v; },
  isMuted() { return muted; },
  hover() { blip(880, 0.08, "sine", 0.04, 1320); },
  click() { blip(660, 0.12, "triangle", 0.07, 990); blip(990, 0.1, "sine", 0.05, 1320); },
  giggle() {
    const seq = [880, 1100, 980, 1320, 1180];
    seq.forEach((f, i) => setTimeout(() => blip(f, 0.09, "sine", 0.05, f * 1.15), i * 60));
  },
  pickup() { blip(440, 0.18, "sawtooth", 0.05, 880); },
  drop() { blip(880, 0.18, "sine", 0.06, 330); },
  message() { blip(1320, 0.06, "sine", 0.04); blip(1760, 0.06, "sine", 0.04, 2200); },
  boot() {
    [220, 330, 440, 660, 880, 1320].forEach((f, i) => setTimeout(() => blip(f, 0.12, "sine", 0.05), i * 70));
  },
};
