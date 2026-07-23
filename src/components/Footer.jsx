import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-display text-xl font-bold">
          APNA<span className="text-gradient">.CUT</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/services" className="hover:text-foreground">Services</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
        </div>
        <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} Apna.Cut · Video Editing & Post-Production Studio</div>
      </div>
    </footer>
  );
}
