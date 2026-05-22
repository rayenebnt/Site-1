import { motion } from "framer-motion";

const wordRise = {
  hidden: { y: "110%", opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fade = {
  hidden: { y: 20, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  const scrollTo = (href) => (e) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center container-x pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex w-fit items-center gap-2.5 px-3.5 py-2 mb-9 rounded-full border border-line text-[11px] tracking-[0.25em] uppercase text-ink-dim backdrop-blur-md"
      >
        <span className="w-2 h-2 rounded-full bg-[#56e08a] shadow-[0_0_12px_#56e08a] pulse-dot" />
        Ouvert · 11:15 → 23:30
      </motion.div>

      <h1 className="h-display text-[clamp(64px,14vw,220px)] m-0 mb-8">
        <span className="block overflow-hidden">
          <motion.span variants={wordRise} initial="hidden" animate="show" custom={0} className="inline-block">
            Le
          </motion.span>{" "}
          <motion.span variants={wordRise} initial="hidden" animate="show" custom={1} className="inline-block italic-grad pr-1">
            goût
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span variants={wordRise} initial="hidden" animate="show" custom={2} className="inline-block">
            de
          </motion.span>{" "}
          <motion.span variants={wordRise} initial="hidden" animate="show" custom={3} className="inline-block">
            Bonneuil.
          </motion.span>
        </span>
      </h1>

      <motion.p
        variants={fade} initial="hidden" animate="show" custom={0}
        className="max-w-[560px] text-[clamp(15px,1.4vw,18px)] text-ink-dim mb-10 leading-relaxed"
      >
        Burgers smashés, tacos français généreux et sandwichs gratinés au four.
        Depuis 2019, six avenue de Paris.{" "}
        <em className="font-serif italic text-ink">100% halal, 100% maison.</em>
      </motion.p>

      <motion.div
        variants={fade} initial="hidden" animate="show" custom={1}
        className="flex flex-wrap gap-4 mb-20"
      >
        <a href="#menu" onClick={scrollTo("#menu")} className="btn btn-primary">
          Découvrir le menu
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path fill="currentColor" d="M5 12h12.2l-4.6-4.6L14 6l7 7-7 7-1.4-1.4 4.6-4.6H5z" />
          </svg>
        </a>
        <a href="#visit" onClick={scrollTo("#visit")} className="btn btn-ghost">
          Nous trouver
        </a>
      </motion.div>

      <motion.div
        variants={fade} initial="hidden" animate="show" custom={2}
        className="flex flex-wrap gap-x-14 gap-y-6 pt-8 border-t border-line"
      >
        {[
          { big: "4.8", small: "★ 1 200+ avis Google" },
          { big: "2019", small: "Année du premier Crousty" },
          { big: "02h", small: "Vendredi & Samedi" },
        ].map((m) => (
          <div key={m.big} className="flex flex-col gap-1">
            <strong className="font-display text-[36px] font-normal tracking-wide">{m.big}</strong>
            <span className="text-ink-dim text-xs tracking-[0.1em]">{m.small}</span>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ink-dim">
        <span className="relative w-px h-10 bg-ink-soft overflow-hidden scroll-line" />
        scroll
      </div>
    </section>
  );
}
