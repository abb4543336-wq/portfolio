import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ColorGradeSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const onMouseMove = (e) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-8">
        <span className="inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs uppercase tracking-widest text-purple-300">
          Color Grading Showcase
        </span>
        <h2 className="mt-3 text-3xl md:text-5xl font-black">
          From <span className="text-muted-foreground">Flat LOG</span> to <span className="text-gradient">Filmic Gold</span>.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Drag the slider below to inspect the DaVinci Resolve color transformation.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        className="group relative h-[320px] sm:h-[450px] w-full overflow-hidden rounded-3xl border border-white/15 bg-card shadow-2xl select-none cursor-ew-resize"
      >
        {/* AFTER (GRADED VERSION) BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a0b2e] via-[#3b1254] to-[#0f4c5c] flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,90,95,0.25),transparent_70%)]" />
          <div className="relative text-center z-10">
            <span className="inline-block rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/40 mb-3 backdrop-blur">
              DAVINCI RESOLVE STUDIO GRADE
            </span>
            <div className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-lg">
              CYBERPUNK NEON
            </div>
            <div className="mt-2 text-xs sm:text-sm text-cyan-200/80 font-mono">
              Rec.709 · Film Grain + Anamorphic Flare
            </div>
          </div>
        </div>

        {/* BEFORE (LOG / FLAT VERSION) OVERLAY */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-[#2a2d34] flex items-center justify-center border-r border-white/40"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center p-8 filter saturate-[0.25] contrast-[0.7] brightness-[1.1]"
            style={{ width: containerRef.current?.clientWidth || "100%" }}
          >
            <div className="relative text-center z-10">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-gray-300 border border-white/20 mb-3">
                RAW S-LOG3 / UNGRADED
              </span>
              <div className="text-4xl sm:text-6xl font-black text-gray-300 tracking-tight">
                CYBERPUNK NEON
              </div>
              <div className="mt-2 text-xs sm:text-sm text-gray-400 font-mono">
                Flat Profile · 14-stop Dynamic Range
              </div>
            </div>
          </div>
        </div>

        {/* SLIDER DIVIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-30"
          style={{ left: `${sliderPos}%` }}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 -left-5 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold text-xs shadow-2xl border-2 border-purple-600"
          >
            ◄ ►
          </motion.div>
        </div>

        {/* LABELS */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-lg bg-black/60 px-3 py-1 text-[11px] font-mono text-gray-300 backdrop-blur border border-white/10">
          UNGRADED (LOG)
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 rounded-lg bg-black/60 px-3 py-1 text-[11px] font-mono text-cyan-300 backdrop-blur border border-cyan-500/30">
          GRADED (Rec.709)
        </div>
      </div>
    </div>
  );
}
