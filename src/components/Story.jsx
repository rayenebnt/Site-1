import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Story() {
  return (
    <section id="story" className="container-x py-32 md:py-40">
      <div className="tag mb-6">01 — Notre histoire</div>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-20 items-center">
        <div>
          <motion.h2
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="h-display text-[clamp(40px,6vw,84px)] mb-8"
          >
            On a ouvert en 2019, avenue de Paris.<br />
            Depuis, on cuisine pour <span className="italic-grad">vous</span>.
          </motion.h2>
          <motion.p
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="text-[clamp(15px,1.2vw,17px)] text-ink-dim mb-5 max-w-[520px]"
          >
            Le Crousty, c'est une cuisine du quartier — généreuse, droite, sans artifice.
            Du pain qui croustille, du fromage qui file, des frites coupées épaisses,
            et cette obsession du bon produit halal et frais.
          </motion.p>
          <motion.p
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="text-[clamp(15px,1.2vw,17px)] text-ink-dim mb-12 max-w-[520px]"
          >
            On ne fait pas dans le compliqué. On fait dans le{" "}
            <strong className="text-ink font-medium">vrai</strong>. Et on le fait bien.
          </motion.p>
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-line max-w-[520px]">
            {[
              { b: "6", s: "Avenue de Paris" },
              { b: "94380", s: "Bonneuil-sur-Marne" },
              { b: "100%", s: "Halal certifié" },
            ].map((x) => (
              <div key={x.s}>
                <b className="block font-display text-2xl text-gold font-normal mb-1">{x.b}</b>
                <span className="text-[11px] tracking-[0.15em] uppercase text-ink-dim">{x.s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square grid place-items-center max-w-[420px] mx-auto w-full">
          <span className="absolute w-4/5 h-4/5 border border-line-strong rounded-full spin-slow" />
          <span className="absolute w-3/5 h-3/5 border border-dashed border-gold rounded-full spin-slow-rev" />
          <span className="absolute w-2/5 h-2/5 border border-flame rounded-full spin-slower" />
          <div className="relative font-display text-2xl tracking-[0.15em] px-5 py-3 bg-bg border border-gold rounded-md text-gold">
            EST. 2019
          </div>
        </div>
      </div>
    </section>
  );
}
