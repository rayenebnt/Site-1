import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Signature() {
  return (
    <section id="signature" className="container-x py-32 text-center relative">
      <div className="tag inline-block">03 — La signature</div>

      <motion.h2
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="h-display text-[clamp(56px,12vw,180px)] m-0 mt-6 mb-8"
      >
        Méga&nbsp;Burger&nbsp;<span className="italic-grad">180</span>
      </motion.h2>

      <motion.p
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="max-w-[620px] mx-auto text-ink-dim text-[clamp(15px,1.3vw,18px)] leading-[1.7] mb-12"
      >
        Deux steaks smashés à 180 grammes, double cheddar fondu, bacon de bœuf,
        sauce maison, oignons caramélisés, pain brioché toasté. Le burger qui a fait notre réputation.
      </motion.p>

      <motion.div
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center gap-14 py-8 border-y border-line"
      >
        {[
          { s: "Poids", b: "360 g" },
          { s: "Cuisson", b: "Smash · 90 sec" },
          { s: "Servi avec", b: "Frites maison" },
        ].map((m) => (
          <div key={m.s} className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.2em] uppercase text-ink-dim">{m.s}</span>
            <b className="font-display text-3xl font-normal">{m.b}</b>
          </div>
        ))}
      </motion.div>

      <p className="mt-10 text-ink-dim text-sm">
        Disponible en magasin, sur{" "}
        <a className="text-gold border-b border-gold pb-0.5" href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg" target="_blank" rel="noopener">
          Uber Eats
        </a>{" "}
        et{" "}
        <a className="text-gold border-b border-gold pb-0.5" href="https://deliveroo.fr/fr/menu/paris/vincennes-centre/le-crousty-bonneuil-sur-marne" target="_blank" rel="noopener">
          Deliveroo
        </a>
        .
      </p>
    </section>
  );
}
