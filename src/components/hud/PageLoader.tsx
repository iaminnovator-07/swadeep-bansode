import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });

  return (
    <AnimatePresence>
      {isLoading && (
        <>
          {/* Top glowing scan bar */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-primary to-purple-600 origin-left z-[999] shadow-[0_0_12px_rgba(0,255,255,0.8)] pointer-events-none"
          />

          {/* Cybernetic telemetry indicator in top corner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-4 right-4 z-[999] pointer-events-none font-mono text-[9px] tracking-widest text-primary bg-background/80 border border-primary/20 rounded-md px-2 py-1 flex items-center gap-1.5 shadow-lg shadow-black/40 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYNCING SECTOR...</span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
