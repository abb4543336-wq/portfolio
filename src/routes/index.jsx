import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import ThreeBackground from "../components/ThreeBackground";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EditorHud from "../components/EditorHud";
import ColorGradeSlider from "../components/ColorGradeSlider";
import VideoModal from "../components/VideoModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apna.Cut — Cinematic Video Editor & Motion Studio" },
      { name: "description", content: "Portfolio & Studio of Apna.Cut, crafting stories for Pakistani & global brands, artists, and filmmakers." },
      { property: "og:title", content: "Apna.Cut — Cinematic Video Studio" },
      { property: "og:description", content: "Cinematic edits, motion design, and colour grading that make brands unforgettable." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const stats = [
  { n: "8+", l: "Years editing" },
  { n: "240+", l: "Projects delivered" },
  { n: "45M", l: "Views generated" },
  { n: "17", l: "Awards" },
];

const work = [
  { id: 1, title: "Neon Nights", tag: "Music Video · Studio Session", grad: "from-[#ff5a5f] to-[#c471ed]" },
  { id: 2, title: "Aurora Watch", tag: "Product Film · Brand Campaign", grad: "from-[#12c2e9] to-[#c471ed]" },
  { id: 3, title: "Northern Echoes", tag: "Short Doc · Hunza & Skardu", grad: "from-[#f7971e] to-[#ff5a5f]" },
  { id: 4, title: "Kinetic Type", tag: "Motion Reel · Studio Showcase", grad: "from-[#c471ed] to-[#12c2e9]" },
];

function Home() {
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTimelineTrack, setActiveTimelineTrack] = useState(0);

  return (
    <div className={`relative overflow-hidden transition-all duration-500 ${aspectRatio === "9:16" ? "max-w-md mx-auto border-x border-white/20 my-4 rounded-3xl shadow-2xl overflow-hidden" : ""}`}>
      {/* ANAMORPHIC CINEMA LETTERBOX OVERLAY */}
      {aspectRatio === "2.39:1" && (
        <>
          <div className="pointer-events-none fixed top-0 left-0 right-0 h-14 bg-black z-40 transition-all border-b border-white/10 flex items-center justify-center font-mono text-[10px] text-white/40 uppercase tracking-widest">
            2.39:1 Anamorphic Cinema Gate
          </div>
          <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-14 bg-black z-40 transition-all border-t border-white/10 flex items-center justify-center font-mono text-[10px] text-white/40 uppercase tracking-widest">
            Apna.Cut Master Deliverable
          </div>
        </>
      )}

      {/* LIVE CAMERA VIEWFINDER HUD */}
      <EditorHud aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} />

      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-screen">
        <ThreeBackground variant="hero" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,var(--background)_85%)]" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-32 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground shadow-lg backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Apna.Cut · Available for projects 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-black leading-[0.95] sm:text-7xl md:text-8xl tracking-tight"
          >
            We edit <span className="text-gradient drop-shadow-[0_0_25px_rgba(196,113,237,0.4)]">stories</span>
            <br /> that move people.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Cinematic edits, motion design, and DaVinci color grading for brands, artists,
            and filmmakers. Based in Lahore & Karachi, working worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/services"
              className="rounded-full bg-[image:var(--gradient-hero)] px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-105"
            >
              View Services & Rates
            </Link>
            <Link
              to="/contact"
              className="glass rounded-full px-8 py-3.5 text-sm font-semibold transition hover:bg-white/10 hover:border-white/30"
            >
              Book Project →
            </Link>
          </motion.div>

          {/* INTERACTIVE VIDEO EDITING TIMELINE WIDGET */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="mt-16 w-full max-w-4xl rounded-2xl border border-white/15 bg-black/60 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>SEQUENCE: MAIN_CUT_V4.prproj</span>
              </div>
              <div className="text-emerald-400">PLAYHEAD: 00:02:18:04</div>
            </div>

            {/* TIMELINE TRACKS */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-8 text-[10px] font-mono text-cyan-400">V2</span>
                <div className="h-7 flex-1 bg-white/5 rounded-lg overflow-hidden relative flex items-center px-2 gap-2 border border-white/5">
                  <div className="h-5 rounded bg-cyan-500/30 border border-cyan-400/40 text-[10px] font-mono flex items-center px-2 text-cyan-200">
                    Kinetic_Text_Overlay.aep
                  </div>
                  <div className="h-5 rounded bg-purple-500/30 border border-purple-400/40 text-[10px] font-mono flex items-center px-2 text-purple-200">
                    LowerThirds_Final.mov
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-[10px] font-mono text-purple-400">V1</span>
                <div className="h-7 flex-1 bg-white/5 rounded-lg overflow-hidden relative flex items-center px-1 gap-1 border border-white/5">
                  {work.map((w, idx) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setActiveTimelineTrack(idx);
                        setSelectedProject(w);
                      }}
                      className={`h-5 rounded px-3 text-[10px] font-mono flex items-center transition border ${
                        activeTimelineTrack === idx
                          ? "bg-gradient-to-r from-red-500 to-purple-600 text-white border-white/40 shadow-md font-bold"
                          : "bg-white/10 text-white/70 hover:bg-white/20 border-white/10"
                      }`}
                    >
                      Clip_{idx + 1}: {w.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-[10px] font-mono text-emerald-400">A1</span>
                <div className="h-6 flex-1 bg-white/5 rounded-lg overflow-hidden relative flex items-center px-2 border border-white/5">
                  <div className="w-full h-2 rounded bg-gradient-to-r from-emerald-500/40 via-teal-400/40 to-emerald-500/40 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* STATS COUNTER */}
          <div className="mt-16 grid w-full grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <motion.div
                key={s.l}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass rounded-2xl p-6 text-left border border-white/10 backdrop-blur-lg"
              >
                <div className="text-gradient text-3xl font-black md:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COLOR GRADE SHOWCASE SECTION */}
      <section className="relative py-12">
        <ColorGradeSlider />
      </section>

      {/* WORK / PROJECTS SECTION */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Selected Cuts</div>
            <h2 className="mt-3 text-4xl font-bold md:text-6xl">
              Featured <span className="text-gradient">reels</span>.
            </h2>
            <p className="mt-1 text-xs text-muted-foreground font-mono">
              Click any project card to open cinematic video preview player.
            </p>
          </div>
          <Link to="/services" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            All projects →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {work.map((w) => (
            <motion.div
              key={w.title}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setSelectedProject(w)}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-card cursor-pointer shadow-xl hover:border-white/30"
            >
              <div className={`aspect-[16/10] bg-gradient-to-br ${w.grad} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-0 grid place-items-center opacity-60 group-hover:opacity-100 transition-all group-hover:scale-110">
                  <div className="h-20 w-20 rounded-full border border-white/50 bg-black/40 backdrop-blur-md grid place-items-center text-3xl text-white shadow-2xl">
                    ▶
                  </div>
                </div>
                <div className="absolute top-4 left-4 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-mono text-emerald-400 border border-emerald-500/30 backdrop-blur">
                  4K MASTER CUT
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
              </div>
              <div className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{w.tag}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{w.title}</div>
                </div>
                <div className="rounded-full bg-white/10 p-3 text-white transition group-hover:bg-white/20">
                  ▶ Preview
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="glass rounded-[2rem] p-12 md:p-20 border border-white/20 shadow-[0_0_60px_rgba(196,113,237,0.15)]"
        >
          <h2 className="text-4xl font-bold md:text-6xl">
            Got raw footage? <span className="text-gradient">Let's cut.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether it's a launch film, a music video, or a full brand campaign —
            we turn raw hours into cinematic stories people finish.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-full bg-[image:var(--gradient-hero)] px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-105"
          >
            Start Project Brief
          </Link>
        </motion.div>
      </section>

      <Footer />

      {/* CINEMATIC VIDEO PREVIEW MODAL */}
      <VideoModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
