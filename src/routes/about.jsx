import { createFileRoute } from "@tanstack/react-router";
import ThreeBackground from "../components/ThreeBackground";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Apna.Cut Video Studio" },
      { name: "description", content: "Meet Apna.Cut — a Pakistan-based video editing & post-production studio with 8+ years crafting cinematic stories for global brands." },
      { property: "og:title", content: "About Apna.Cut Studio" },
      { property: "og:description", content: "Editors. Storytellers. Colourists. 8+ years shaping cinematic narratives." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const timeline = [
  { y: "2018", t: "Started editing commercial videos in Lahore" },
  { y: "2020", t: "Joined a boutique post-production agency in Karachi as lead editor" },
  { y: "2022", t: "Founded Apna.Cut — independent studio & major music projects" },
  { y: "2024", t: "Lux Style / Digital Film Award — shortlist" },
  { y: "2026", t: "Expanding Apna.Cut post-production studio worldwide" },
];

const skills = [
  { name: "Premiere Pro", pct: 98 },
  { name: "DaVinci Resolve", pct: 94 },
  { name: "After Effects", pct: 90 },
  { name: "Cinema 4D", pct: 72 },
  { name: "Sound Design", pct: 80 },
];

function About() {
  return (
    <div className="relative overflow-hidden">
      <Nav />
      <section className="relative min-h-[80vh]">
        <ThreeBackground variant="about" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,var(--background)_80%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground animate-rise">About</div>
          <h1 className="animate-rise mt-3 max-w-4xl text-5xl font-black leading-[1] md:text-8xl" style={{ animationDelay: "0.1s" }}>
            The studio <br /> behind the <span className="text-gradient">cut</span>.
          </h1>
          <p className="animate-rise mt-8 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            Welcome to Apna.Cut. We've spent the last eight years turning hard drives full
            of raw footage into films that get watched all the way through. We care about
            rhythm, silence, and the tiny frame that changes everything.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold md:text-5xl">A quiet obsession with <span className="text-gradient">timing</span>.</h2>
          <p className="mt-6 text-muted-foreground">
            I grew up cutting AMVs on a laptop that overheated every ten minutes.
            That taught me patience — and that a great edit is 5% software, 95%
            listening. Today I work with brands, musicians and documentary teams
            who want their story felt, not just seen.
          </p>
          <p className="mt-4 text-muted-foreground">
            Off the timeline you'll find me chasing 35mm street shots, drinking
            too much filter coffee, and re-watching Fincher scenes frame by frame.
          </p>
        </div>
        <div className="space-y-4">
          {skills.map((s) => (
            <div key={s.name} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.name}</span>
                <span className="text-muted-foreground">{s.pct}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-[image:var(--gradient-hero)]" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Timeline</div>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">Chapters so far.</h2>
        <ol className="mt-12 relative border-l border-white/10 pl-8">
          {timeline.map((it) => (
            <li key={it.y} className="mb-10 last:mb-0">
              <span className="absolute -left-[7px] mt-1 h-3 w-3 rounded-full bg-[image:var(--gradient-hero)] glow" />
              <div className="font-display text-2xl font-bold text-gradient">{it.y}</div>
              <div className="mt-1 text-muted-foreground">{it.t}</div>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </div>
  );
}
