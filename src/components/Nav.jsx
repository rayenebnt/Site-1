import { useEffect, useState } from "react";

const LINKS = [
  { href: "#story", n: "01", label: "Histoire" },
  { href: "#menu", n: "02", label: "Menu" },
  { href: "#signature", n: "03", label: "Signature" },
  { href: "#visit", n: "04", label: "Visiter" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-14 transition-all duration-300 ${
        scrolled ? "py-3 bg-bg/80 backdrop-blur-xl border-b border-line" : "py-5"
      }`}
    >
      <a href="#" className="flex items-center gap-3" onClick={scrollTo("#hero")}>
        <span className="w-9 h-9 bg-flame grid place-items-center font-display text-bg font-bold text-lg leading-none">
          C
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display font-semibold text-[15px] tracking-tighter">
            Le Crousty
          </span>
          <span className="mono text-[9px] tracking-[0.22em] text-ink-dim mt-1">
            BONNEUIL · EST. 2019
          </span>
        </span>
      </a>

      <nav className="hidden md:flex gap-7 mono text-[11px]">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={scrollTo(l.href)}
            className="group flex items-center gap-2 text-ink-dim hover:text-ink transition-colors"
          >
            <span className="text-flame">{l.n}</span>
            <span>{l.label}</span>
          </a>
        ))}
      </nav>

      <a
        href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg"
        target="_blank"
        rel="noopener"
        className="hidden md:inline-flex btn btn-primary !py-2.5 !px-4"
      >
        Commander
        <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
          <path fill="currentColor" d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
        </svg>
      </a>

      <button
        className="md:hidden w-9 h-9 border border-line-strong grid place-items-center"
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex flex-col gap-1.5">
          <span className={`block w-4 h-px bg-ink transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`block w-4 h-px bg-ink transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="absolute top-full inset-x-0 md:hidden bg-bg/95 backdrop-blur-xl border-b border-line py-6 px-5 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={scrollTo(l.href)}
              className="flex items-baseline gap-3 text-ink"
            >
              <span className="mono text-flame text-xs">{l.n}</span>
              <span className="font-display text-lg">{l.label}</span>
            </a>
          ))}
          <a
            href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg"
            target="_blank"
            rel="noopener"
            className="btn btn-primary justify-center mt-2"
          >
            Commander
          </a>
        </div>
      )}
    </header>
  );
}
