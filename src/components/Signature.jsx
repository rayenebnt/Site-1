import { motion } from "framer-motion";
import { SectionHeader } from "./Story.jsx";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Signature() {
  return (
    <section id="signature" className="container-x py-28 md:py-36">
      <SectionHeader n="03" title="SIGNATURE" file="mega-180.spec" />

      <motion.h2
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="h-display text-[clamp(56px,14vw,200px)] mt-10 mb-8"
      >
        MÉGA BURGER<br />
        <span className="text-flame">180.</span>
      </motion.h2>

      <motion.p
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="max-w-[640px] text-[clamp(15px,1.3vw,18px)] text-ink-dim leading-relaxed mb-12"
      >
        Deux steaks smashés à 180 grammes. Double cheddar fondu, bacon de bœuf,
        sauce maison, oignons caramélisés, pain brioché toasté. Le burger qui a
        fait notre réputation.
      </motion.p>

      <motion.div
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-line"
      >
        {[
          { k: "POIDS", v: "360 g" },
          { k: "STEAK", v: "2 × 180 g" },
          { k: "CUISSON", v: "SMASH · 90s" },
          { k: "SERVI AVEC", v: "FRITES MAISON" },
        ].map((m) => (
          <div key={m.k} className="border-b border-r border-line p-5 sm:p-6">
            <div className="mono text-[10px] text-ink-dim mb-3">{m.k}</div>
            <div className="font-display font-medium text-[24px] sm:text-[28px] leading-none tracking-tighter">
              {m.v}
            </div>
          </div>
        ))}
      </motion.div>

      <p className="mt-10 mono text-[11px] text-ink-dim tracking-wider">
        DISPONIBLE EN MAGASIN ·{" "}
        <a
          className="text-flame underline underline-offset-4 hover:text-flame-2"
          href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg"
          target="_blank" rel="noopener"
        >
          UBER EATS
        </a>{" "}
        ·{" "}
        <a
          className="text-flame underline underline-offset-4 hover:text-flame-2"
          href="https://deliveroo.fr/fr/menu/paris/vincennes-centre/le-crousty-bonneuil-sur-marne"
          target="_blank" rel="noopener"
        >
          DELIVEROO
        </a>
      </p>
    </section>
  );
}
