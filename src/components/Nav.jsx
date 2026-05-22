import { useEffect, useState } from "react";

const LINKS = [
  { href: "#story", label: "Histoire" },
  { href: "#menu", label: "Menu" },
  { href: "#signature", label: "Signature" },
  { href: "#visit", label: "Visiter" },
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
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 lg:px-16 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-bg/70 backdrop-blur-xl backdrop-saturate-150 border-b border-line"
          : "py-5"
      }`}
    >
      <a href="#" className="flex items-center gap-3" onClick={scrollTo("#hero")}>
        <span className="w-10 h-10 rounded-xl bg-grad-flame grid place-items-center font-display text-2xl text-[#1a0a0a] shadow-[0_8px_30px_rgba(255,91,46,0.35)]">
          C
        </span>
        <span className="font-display text-lg leading-none tracking-[0.04em] flex flex-col">
          Le Crousty
          <small className="font-sans text-[9px] tracking-[0.3em] text-ink-dim mt-1">
            BONNEUIL
          </small>
        </span>
      </a>

      <nav className="hidden md:flex gap-9 text-[13px] tracking-[0.04em]">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={scrollTo(l.href)}
            className="relative text-ink-dim hover:text-ink transition-colors group"
          >
            {l.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all group-hover:w-full" />
          </a>
        ))}
      </nav>

      <a
        href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg"
        target="_blank"
        rel="noopener"
        className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-ink text-bg text-[12px] font-semibold tracking-[0.04em] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(244,184,96,0.25)] transition"
      >
        Commander
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="currentColor" d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
        </svg>
      </a>

      <button
        className="md:hidden w-10 h-10 grid place-items-center rounded-lg border border-line-strong"
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
            <a key={l.href} href={l.href} onClick={scrollTo(l.href)} className="text-ink text-lg">
              {l.label}
            </a>
          ))}
          <a
            href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg"
            target="_blank"
            rel="noopener"
            className="btn btn-primary justify-center"
          >
            Commander
          </a>
        </div>
      )}
    </header>
  );
}
