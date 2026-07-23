import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* BACKDROP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* MODAL WINDOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-card/90 shadow-[0_0_50px_rgba(196,113,237,0.25)]"
        >
          {/* HEADER BAR */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
              <span className="font-display font-bold text-lg">{project.title}</span>
              <span className="rounded-full bg-white/10 px-3 py-0.5 text-xs text-muted-foreground font-mono">
                {project.tag}
              </span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 hover:scale-110"
            >
              ✕
            </button>
          </div>

          {/* VIDEO DISPLAY AREA */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            {/* Simulated Animated Project Visual */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.grad} opacity-30 flex items-center justify-center`}
            />

            {/* Simulated Video Content Motion */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="h-48 w-48 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center"
            >
              <div className="h-32 w-32 rounded-full border border-white/30 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-4xl font-black">
                ▶
              </div>
            </motion.div>

            {/* PLAY / PAUSE OVERLAY */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition"
            >
              <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center text-3xl font-bold border border-white/40">
                {isPlaying ? "❚❚" : "▶"}
              </div>
            </button>

            {/* HUD STAMPS */}
            <div className="absolute top-4 left-4 font-mono text-xs text-white/70 bg-black/50 px-2.5 py-1 rounded border border-white/10 backdrop-blur">
              TIMECODE 00:01:24:08 · 4K 60FPS
            </div>
            <div className="absolute top-4 right-4 font-mono text-xs text-emerald-400 bg-black/50 px-2.5 py-1 rounded border border-emerald-500/30 backdrop-blur">
              PRORES 4444 XQ
            </div>
          </div>

          {/* PLAYER CONTROLS & TIMELINE SCRUBBER */}
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>00:01:24</span>
                <span>00:03:45</span>
              </div>
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPct = ((e.clientX - rect.left) / rect.width) * 100;
                  setProgress(clickPct);
                }}
                className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-red-500 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* PROJECT METADATA & SPECS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/10 text-xs">
              <div>
                <div className="text-muted-foreground uppercase text-[10px] tracking-widest">Role</div>
                <div className="font-semibold text-foreground mt-0.5">Lead Editor & Colorist</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-[10px] tracking-widest">Software</div>
                <div className="font-semibold text-foreground mt-0.5">Premiere Pro · DaVinci</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-[10px] tracking-widest">Duration</div>
                <div className="font-semibold text-foreground mt-0.5">03m 45s</div>
              </div>
              <div>
                <div className="text-muted-foreground uppercase text-[10px] tracking-widest">Delivery</div>
                <div className="font-semibold text-foreground mt-0.5">Master 4K + 3 Cutdowns</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
