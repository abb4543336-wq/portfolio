import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import ThreeBackground from "../components/ThreeBackground";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a project with Apna.Cut Studio" },
      { name: "description", content: "Get in touch to brief a project with Apna.Cut — brand films, music videos, motion, colour and sound." },
      { property: "og:title", content: "Contact Apna.Cut Studio" },
      { property: "og:description", content: "Let's turn your footage into a story people finish." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden">
      <Nav />
      <section className="relative">
        <ThreeBackground variant="contact" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_10%,var(--background)_80%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pt-40 pb-12">
          <div className="animate-rise text-xs uppercase tracking-[0.3em] text-muted-foreground">Contact</div>
          <h1 className="animate-rise mt-3 max-w-4xl text-5xl font-black leading-[1] md:text-8xl" style={{ animationDelay: "0.1s" }}>
            Let's <span className="text-gradient">talk</span>.
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground" style={{ animationDelay: "0.2s" }}>
            Tell us about your project. We reply within 24 hours — usually with creative ideas & questions.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-32 md:grid-cols-[1.2fr_1fr]">
        <div className="glass rounded-3xl p-8 md:p-10">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-3xl text-primary-foreground glow">✓</div>
              <h3 className="mt-6 font-display text-3xl font-bold">Got it — talk soon.</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                Your brief just landed in our inbox. Expect a reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Your name" name="name" placeholder="Ali Khan" />
                <Field label="Email" name="email" type="email" placeholder="ali@agency.pk" />
              </div>
              <Field label="Project type" name="project" placeholder="Brand film, music video, doc…" />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Budget range (PKR)</label>
                <div className="flex flex-wrap gap-2">
                  {["< Rs. 50k", "Rs. 50k–1.5L", "Rs. 1.5L–5L", "Rs. 5L+"].map((b) => (
                    <label key={b} className="cursor-pointer">
                      <input type="radio" name="budget" className="peer sr-only" defaultChecked={b === "Rs. 1.5L–5L"} />
                      <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition peer-checked:border-transparent peer-checked:bg-[image:var(--gradient-hero)] peer-checked:text-primary-foreground">
                        {b}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Tell us the story</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Deadline, footage volume, references — the more the better."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[image:var(--gradient-hero)] px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition hover:scale-[1.01]"
              >
                Send brief →
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          <InfoCard title="Email" value="hello@apnacut.pk" href="mailto:hello@apnacut.pk" />
          <InfoCard title="Studio Locations" value="Lahore & Karachi, Pakistan" />
          <InfoCard title="Hours" value="Mon–Fri · 10:00–19:00 PKT" />
          <div className="glass rounded-3xl p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Follow</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Instagram", "Vimeo", "YouTube", "Behance", "LinkedIn"].map((s) => (
                <a key={s} href="#" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:bg-white/10">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function InfoCard({ title, value, href }) {
  const Comp = href ? "a" : "div";
  return (
    <Comp href={href} className="glass block rounded-3xl p-6 transition hover:bg-white/10">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <div className="mt-2 font-display text-xl font-bold">{value}</div>
    </Comp>
  );
}
