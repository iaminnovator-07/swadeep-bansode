import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { HoloCard } from "@/components/layout/PageShell";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { aurora } from "@/lib/audio";

/**
 * ExpandableCard
 * A reusable holographic card that opens a cinematic modal with full details.
 * Drop the existing card body into `preview`; provide `title`, `subtitle`,
 * `tags`, `meta`, and optional rich `body` for the expanded view.
 */
export function ExpandableCard({
  preview,
  eyebrow,
  title,
  subtitle,
  description,
  tags = [],
  meta = [],
  body,
  accent = "primary",
  hint,
}: {
  preview: ReactNode;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: string[];
  meta?: { label: string; value: string }[];
  body?: ReactNode;
  accent?: "primary" | "accent";
  hint?: string;
}) {
  const [open, setOpen] = useState(false);
  const ring = accent === "accent" ? "text-accent" : "text-primary";
  const tagCls =
    accent === "accent"
      ? "text-accent bg-accent/10 border-accent/30"
      : "text-primary/90 bg-primary/10 border-primary/25";

  return (
    <>
      <button
        type="button"
        onClick={() => {
          aurora.click?.();
          setOpen(true);
        }}
        onMouseEnter={() => aurora.hover?.()}
        data-aurora-hint={hint}
        className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-xl"
      >
        <HoloCard className="h-full cursor-pointer group">
          {preview}
          <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-primary/60 opacity-0 group-hover:opacity-100 transition">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Tap to expand
            </span>
            <span>→</span>
          </div>
        </HoloCard>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl border-primary/30 bg-background/95 backdrop-blur-xl p-0 overflow-hidden">
          {/* Holo header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-primary/15">
            <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <div className="absolute right-3 top-3 font-mono text-[10px] tracking-widest text-primary/60">
              AURORA::FILE
            </div>
            <DialogHeader className="space-y-2 text-left">
              {eyebrow && (
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary/70">
                  {eyebrow}
                </div>
              )}
              <DialogTitle className={`font-display text-2xl md:text-3xl ${ring}`}>
                <AnimatePresence>
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="text-gradient inline-block"
                  >
                    {title}
                  </motion.span>
                </AnimatePresence>
              </DialogTitle>
              {subtitle && (
                <DialogDescription className="text-sm text-muted-foreground">
                  {subtitle}
                </DialogDescription>
              )}
            </DialogHeader>
          </div>

          {/* Body */}
          <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
            {description && (
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                {description}
              </p>
            )}

            {body}

            {meta.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {meta.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-primary/15 bg-primary/5 px-3 py-2"
                  >
                    <div className="text-[10px] tracking-widest uppercase text-primary/70">
                      {m.label}
                    </div>
                    <div className="text-sm text-foreground mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {tags.length > 0 && (
              <div className="pt-1">
                <div className="text-[10px] tracking-widest uppercase text-muted-foreground mb-2">
                  Stack / Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border ${tagCls}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-3 border-t border-primary/15 flex items-center justify-between text-[10px] font-mono tracking-widest text-primary/60">
            <span>// END OF TRANSMISSION</span>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 hover:text-primary transition"
            >
              <X className="h-3 w-3" /> CLOSE
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}