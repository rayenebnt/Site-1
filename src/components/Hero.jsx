import { motion } from "framer-motion";

const fade = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } },
});

export default function Hero() {
  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen container-x pt-32 pb-16 flex flex-col justify-center">
      {/* Top meta bar */}
      <div className="flex items-center justify-between mono text-[10px] tracking-[0.22em] text-ink-dim mb-12 sm:mb-20">
        <span>FR · 94380 BONNEUIL · 48.771°N 2.485°E</span>
        <span className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-flame rounded-full pulse-dot" />
          OPEN · 11:15 → 23:30
        </span>
      </div>

      {/* Title block */}
      <motion.h1
        variants={fade(0.1)} initial="hidden" animate="show"
        className="h-display text-[clamp(56px,14vw,220px)] mb-8"
      >
        <span className="block overflow-hidden">
          <span className="inline-block">Burgers,</span>
        </span>
        <span className="block overflow-hidden">
          <span className="inline-block">tacos,</span>{" "}
          <span className="inline-block text-flame italic">gratinés.</span>
        </span>
      </motion.h1>

      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end">
        <motion.p
          variants={fade(0.45)} initial="hidden" animate="show"
          className="max-w-[540px] text-[clamp(15px,1.3vw,17px)] text-ink-dim leading-relaxed"
        >
          Fast food halal à Bonneuil-sur-Marne depuis 2019. Smash burgers,
          tacos français pressés, sandwichs gratinés au four. Préparé à la
          commande, 6 avenue de Paris.
        </motion.p>

        <motion.div variants={fade(0.6)} initial="hidden" animate="show" className="flex flex-wrap gap-3">
          <a href="#menu" onClick={scrollTo("#menu")} className="btn btn-primary">
            Voir le menu
            <svg viewBox="0 0 24 24" width="14" height="14"><path fill="currentColor" d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" /></svg>
          </a>
          <a href="#visit" onClick={scrollTo("#visit")} className="btn btn-ghost">
            Nous trouver
          </a>
        </motion.div>
      </div>

      {/* Stats grid */}
      <motion.div
        variants={fade(0.8)} initial="hidden" animate="show"
        className="mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-l border-line"
      >
        {[
          { k: "01", b: "4.8/5", s: "1 200+ AVIS" },
          { k: "02", b: "2019", s: "DEPUIS" },
          { k: "03", b: "02H00", s: "VEN · SAM" },
          { k: "04", b: "100%", s: "HALAL CERTIFIÉ" },
        ].map((m) => (
          <div key={m.k} className="border-b border-r border-line p-5 sm:p-6">
            <div className="mono text-[10px] text-flame mb-3">[{m.k}]</div>
            <div className="font-display font-medium text-[32px] sm:text-[40px] leading-none tracking-tighter">
              {m.b}
            </div>
            <div className="mono text-[10px] text-ink-dim mt-2">{m.s}</div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 mono text-[9px] tracking-[0.3em] text-ink-soft">
        <span className="relative w-px h-8 bg-ink-soft overflow-hidden scroll-line" />
        SCROLL
      </div>
    </section>
  );
}
