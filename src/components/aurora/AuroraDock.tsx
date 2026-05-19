import { useEffect, useState } from "react";
import { AuroraOrb } from "./AuroraOrb";
import { AuroraChat } from "./AuroraChat";
import { aurora } from "@/lib/audio";

// Persistent dock — orb floats bottom-right; tapping opens chat.
export function AuroraDock() {
  const [open, setOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [thinking, setThinking] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { aurora.boot(); setBooted(true); }, 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <div style={{ opacity: booted ? 1 : 0, transition: "opacity 600ms" }}>
          <AuroraOrb onClick={() => setOpen((o) => !o)} expanded={open} thinking={thinking} />
        </div>
      </div>
      <AuroraChat open={open} onClose={() => setOpen(false)} onLoadingChange={setThinking} />
    </>
  );
}
