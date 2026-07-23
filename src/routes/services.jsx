import { createFileRoute, Link } from "@tanstack/react-router";
import ThreeBackground from "../components/ThreeBackground";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Apna.Cut Video Editing, Motion & Colour" },
      { name: "description", content: "Post-production services: narrative editing, motion graphics, colour grading, sound design and full delivery by Apna.Cut." },
      { property: "og:title", content: "Services — Apna.Cut Studio" },
      { property: "og:description", content: "Edit, motion, colour, sound. Fully managed post-production." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const services = [
  {
    n: "01",
    title: "Narrative Editing",
    body: "Long-form docs, brand films, music videos. Structure, pacing and the invisible cut.",
    tags: ["Premiere Pro", "Resolve", "Avid"],
  },
  {
    n: "02",
    title: "Motion Graphics",
    body: "Kinetic typography, lower thirds, animated brand systems and title sequences.",
    tags: ["After Effects", "Cinema 4D", "Lottie"],
  },
  {
    n: "03",
    title: "Colour Grading",
    body: "Full DaVinci grades — from log conversion to a signature filmic finish.",
    tags: ["DaVinci Resolve", "LUTs", "HDR"],
  },
  {
    n: "04",
    title: "Sound Design",
    body: "Mix, master and original sonic textures that lock picture to feeling.",
    tags: ["Pro Tools", "Ableton", "Foley"],
  },
  {
    n: "05",
    title: "Social Cut-downs",
    body: "9:16, 1:1 and 16:9 versions engineered for hook, hold, and finish.",
    tags: ["TikTok", "Reels", "Shorts"],
  },
  {
    n: "06",
    title: "Creative Direction",
    body: "Post-production strategy from script to delivery — we own the whole pipeline.",
    tags: ["Strategy", "Review", "Delivery"],
  },
];

const packages = [
  { name: "Reel", price: "Rs. 45k", desc: "Single social film · up to 60s", pop: false },
  { name: "Story", price: "Rs. 160k", desc: "Brand film 90–180s + 3 cutdowns", pop: true },
  { name: "Studio", price: "Custom", desc: "Full campaign · monthly retainer", pop: false },
];

function Services() {
  return (
    <div className="relative overflow-hidden">
      <Nav />
      <section className="relative">
        <ThreeBackground variant="services" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,var(--background)_80%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-16">
          <div className="animate-rise text-xs uppercase tracking-[0.3em] text-muted-foreground">Services</div>
          <h1 className="animate-rise mt-3 max-w-4xl text-5xl font-black leading-[1] md:text-8xl" style={{ animationDelay: "0.1s" }}>
            Post-production, <br /> end to <span className="text-gradient">end</span>.
          </h1>
          <p className="animate-rise mt-8 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            One editor. Six disciplines. Zero handoffs.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-card p-8 transition hover:-translate-y-1 hover:border-white/20"
              style={{ animation: `rise 0.7s ${i * 0.08}s both` }}
            >
              <div className="absolute -top-8 -right-4 text-[7rem] font-black leading-none text-white/5 transition group-hover:text-white/10">
                {s.n}
              </div>
              <div className="relative">
                <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Packages</div>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">Simple, honest <span className="text-gradient">pricing</span>.</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-8 ${p.pop ? "border-transparent bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-glow)]" : "border-white/10 bg-card"}`}
            >
              {p.pop && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-foreground">
                  Most booked
                </div>
              )}
              <div className="font-display text-xl font-bold">{p.name}</div>
              <div className="mt-4 text-5xl font-black">{p.price}</div>
              <div className={`mt-2 text-sm ${p.pop ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.desc}</div>
              <Link
                to="/contact"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${p.pop ? "bg-background text-foreground hover:opacity-90" : "bg-white/10 text-foreground hover:bg-white/20"}`}
              >
                Enquire
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
