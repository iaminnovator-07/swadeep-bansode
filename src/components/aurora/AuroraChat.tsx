import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles, Zap, Mic, MicOff } from "lucide-react";
import { aurora } from "@/lib/audio";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_SUGGESTIONS = [
  { emoji: "👤", label: "Who is Swadeep?",   text: "Who is Swadeep Bansode?" },
  { emoji: "🔮", label: "What is SYGNIX?",   text: "What is SYGNIX?" },
  { emoji: "📡", label: "IoT Projects",      text: "Tell me about his IoT projects" },
  { emoji: "🛡️", label: "Cybersecurity",     text: "What does he know about cybersecurity and blockchain?" },
  { emoji: "🤖", label: "Robotics",          text: "Tell me about his robotics work" },
  { emoji: "🏥", label: "MediRoute",         text: "What is MediRoute AI?" },
  { emoji: "🌿", label: "AranyaSync",        text: "Tell me about AranyaSync" },
  { emoji: "🏆", label: "Achievements",      text: "What are his achievements?" },
  { emoji: "💻", label: "Tech Stack",        text: "What technologies does he use?" },
  { emoji: "📬", label: "Contact",           text: "How can I contact Swadeep?" },
];

export function AuroraChat({ open, onClose, onLoadingChange }: { open: boolean; onClose: () => void; onLoadingChange?: (l: boolean) => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Neural link engaged. I'm AURORA — Swadeep's holographic companion. Ask me about his projects, SYGNIX, or anything you're curious about." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("aurora_openai_key");
    if (saved) setApiKey(saved);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  // Show suggestions only when there's just the welcome message
  const showSuggestions = messages.length === 1 && !loading;

  const sendText = async (text: string) => {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    if (onLoadingChange) onLoadingChange(true);
    aurora.message();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-openai-key": apiKey } : {})
        },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error(await res.text());

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            const delta = j.choices?.[0]?.delta?.content ?? "";
            if (delta) setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = { role: "assistant", content: copy[copy.length - 1].content + delta };
              return copy;
            });
          } catch { /* ignore */ }
        }
      }
    } catch (e: any) {
      const msg = e.message || "Signal lost.";
      let display = "Signal lost. Try again in a moment.";
      if (msg.includes("insufficient_quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
        display = "⚠️ Rate limit hit. Please wait ~1 minute and try again.";
      } else if (msg.includes("invalid_api_key") || msg.includes("API_KEY_INVALID")) {
        display = "❌ Invalid API Key. Please verify the API key configured on the server.";
      } else if (msg.includes("429")) {
        display = "⚠️ Too many requests. Please wait a moment and try again.";
      } else if (msg.length < 200) {
        display = `Signal lost: ${msg}`;
      }
      setMessages((m) => [...m, { role: "assistant", content: display }]);
    } finally {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
      inputRef.current?.focus();
    }
  };

  const send = () => sendText(input.trim());

  const toggleListen = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (!recognition.current) {
      recognition.current = new SpeechRec();
      recognition.current.continuous = false;
      recognition.current.interimResults = true;
      recognition.current.onresult = (e: any) => {
        const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join("");
        setInput(transcript);
      };
      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
    recognition.current.start();
    setIsListening(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="fixed bottom-28 right-6 z-50 w-[min(420px,calc(100vw-2rem))] glass-strong rounded-2xl overflow-hidden flex flex-col"
          style={{ height: "min(600px, calc(100vh - 8rem))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-display text-sm tracking-widest uppercase text-gradient">AURORA</span>
              <span className="chip">online</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={onClose} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>



          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scanline relative">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                {m.role === "assistant" ? (
                  <div className="text-sm leading-relaxed text-foreground/95 max-w-[90%] whitespace-pre-wrap">
                    {m.content || <span className="opacity-60">…</span>}
                  </div>
                ) : (
                  <div className="rounded-xl bg-primary/15 border border-primary/30 px-3 py-2 text-sm text-foreground max-w-[85%] whitespace-pre-wrap">
                    {m.content}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Suggestions — shown only at start */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-primary/50">
                    <Zap className="h-3 w-3" />
                    Quick explore
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_SUGGESTIONS.map((s) => (
                      <motion.button
                        key={s.text}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => sendText(s.text)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs border border-primary/25 bg-primary/8 hover:bg-primary/18 hover:border-primary/50 text-foreground/80 hover:text-foreground transition-all"
                      >
                        <span>{s.emoji}</span>
                        <span>{s.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {loading && (
              <div className="flex gap-1 items-center text-primary/70 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "120ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: "240ms" }} />
                <span className="ml-2 tracking-widest uppercase">scanning</span>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-primary/20 p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") send(); }}
              placeholder="Ask AURORA…"
              className="flex-1 bg-background/60 border border-primary/30 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/30 transition"
            />
            <button
              onClick={toggleListen}
              className={`rounded-lg px-3 py-2 transition flex items-center justify-center ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-primary/20 text-primary hover:bg-primary/30"}`}
            >
              {isListening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </button>
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-sm font-medium disabled:opacity-40 hover:brightness-110 transition flex items-center gap-1.5"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
