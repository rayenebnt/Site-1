import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Story() {
  return (
    <section id="story" className="container-x py-28 md:py-36">
      <SectionHeader n="01" title="HISTOIRE" file="story.md" />

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 mt-12">
        <div>
          <motion.h2
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="h-display text-[clamp(36px,5.5vw,72px)] mb-8"
          >
            Ouvert en 2019.<br />
            On cuisine pour <span className="accent">Bonneuil.</span>
          </motion.h2>
          <motion.p
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="text-[clamp(15px,1.15vw,17px)] text-ink-dim mb-5 max-w-[540px] leading-relaxed"
          >
            Cuisine du quartier — généreuse, droite, sans artifice. Pain qui
            croustille, fromage qui file, frites coupées épaisses. L'obsession
            du bon produit halal et frais.
          </motion.p>
          <motion.p
            variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
            className="text-[clamp(15px,1.15vw,17px)] text-ink-dim mb-12 max-w-[540px] leading-relaxed"
          >
            On ne fait pas dans le compliqué. On fait dans le <span className="text-ink">vrai</span>.
            Et on le fait bien.
          </motion.p>
        </div>

        {/* Right column: technical data block */}
        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="border border-line"
        >
          <DataRow k="ADRESSE" v="6 Avenue de Paris" />
          <DataRow k="VILLE" v="94380 Bonneuil-sur-Marne" />
          <DataRow k="DEPUIS" v="2019" />
          <DataRow k="CERTIFICATION" v="Halal · 100%" />
          <DataRow k="CUISSON" v="À la commande" />
          <DataRow k="LIVRAISON" v="Uber · Deliveroo" last />
        </motion.div>
      </div>
    </section>
  );
}

export function SectionHeader({ n, title, file }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-4">
      <div className="flex items-baseline gap-4">
        <span className="mono text-flame text-[11px]">[{n}/04]</span>
        <h3 className="font-display font-medium text-sm tracking-[0.18em] uppercase">{title}</h3>
      </div>
      <span className="mono text-[10px] text-ink-soft hidden sm:inline">FILE: {file}</span>
    </div>
  );
}

function DataRow({ k, v, last }) {
  return (
    <div
      className={`flex items-center justify-between gap-6 px-5 py-4 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className="mono text-[10px] text-ink-dim">{k}</span>
      <span className="font-display text-[15px] text-right">{v}</span>
    </div>
  );
}
