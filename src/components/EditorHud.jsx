import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function EditorHud({ aspectRatio, setAspectRatio }) {
  const [timecode, setTimecode] = useState("00:04:12:00");
  const [audioLevels, setAudioLevels] = useState([60, 75, 40, 85, 90, 50]);

  useEffect(() => {
    let frame = 0;
    let sec = 12;
    let min = 4;
    let hrs = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame >= 24) {
        frame = 0;
        sec++;
        if (sec >= 60) {
          sec = 0;
          min++;
          if (min >= 60) {
            min = 0;
            hrs++;
          }
        }
      }
      const pad = (n) => String(n).padStart(2, "0");
      setTimecode(`${pad(hrs)}:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 41); // ~24fps ticker

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audioInt = setInterval(() => {
      setAudioLevels([
        Math.floor(Math.random() * 50) + 40,
        Math.floor(Math.random() * 60) + 35,
        Math.floor(Math.random() * 70) + 25,
        Math.floor(Math.random() * 55) + 45,
        Math.floor(Math.random() * 40) + 50,
        Math.floor(Math.random() * 65) + 30,
      ]);
    }, 120);

    return () => clearInterval(audioInt);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-4 md:p-8">
      {/* TOP HUD */}
      <div className="flex items-start justify-between text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/70">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-red-400 border border-red-500/30 font-semibold backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            REC
          </span>
          <span className="hidden sm:inline-block rounded-md bg-white/5 px-2.5 py-1 border border-white/10 backdrop-blur-md">
            4K RAW · 60 FPS
          </span>
          <span className="hidden md:inline-block rounded-md bg-white/5 px-2.5 py-1 border border-white/10 backdrop-blur-md">
            PRORES 422 HQ
          </span>
        </div>

        {/* TIMECODE DISPLAY */}
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-black/60 px-3 py-1.5 font-mono text-xs sm:text-sm font-bold text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.2)] backdrop-blur-md">
            TC {timecode}
          </div>
        </div>
      </div>

      {/* VIEWFINDER CORNER RETICLES */}
      <div className="absolute top-12 left-8 h-12 w-12 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-12 right-8 h-12 w-12 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-16 left-8 h-12 w-12 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-16 right-8 h-12 w-12 border-b-2 border-r-2 border-white/20" />

      {/* BOTTOM HUD CONTROLS */}
      <div className="pointer-events-auto flex items-end justify-between text-xs font-mono text-white/70">
        {/* AUDIO METERS */}
        <div className="hidden sm:flex items-end gap-1.5 rounded-xl bg-black/50 p-2.5 border border-white/10 backdrop-blur-md">
          <span className="text-[10px] text-muted-foreground mr-1">AUDIO L/R</span>
          {audioLevels.map((lvl, idx) => (
            <div key={idx} className="h-8 w-1.5 rounded-full bg-white/10 overflow-hidden flex items-end">
              <motion.div
                className={`w-full ${lvl > 80 ? "bg-red-400" : lvl > 60 ? "bg-amber-400" : "bg-emerald-400"}`}
                animate={{ height: `${lvl}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          ))}
        </div>

        {/* ASPECT RATIO SWITCHER */}
        <div className="flex items-center gap-1.5 rounded-full bg-black/60 p-1.5 border border-white/10 backdrop-blur-md shadow-2xl">
          <span className="px-2 text-[10px] text-muted-foreground font-sans hidden md:inline">FRAME ASPECT:</span>
          {[
            { id: "16:9", label: "16:9 Wide" },
            { id: "9:16", label: "9:16 Reel" },
            { id: "2.39:1", label: "2.39:1 Cinema" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setAspectRatio(mode.id)}
              className={`rounded-full px-3 py-1 text-[11px] font-sans transition-all ${
                aspectRatio === mode.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg font-semibold"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
