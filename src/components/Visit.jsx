import { motion } from "framer-motion";
import { SectionHeader } from "./Story.jsx";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Visit() {
  return (
    <section id="visit" className="container-x py-28 md:py-36">
      <SectionHeader n="04" title="LIEU" file="coords.geo" />

      <motion.h2
        variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        className="h-display text-[clamp(40px,7vw,100px)] mt-10 mb-12"
      >
        Bonneuil.<br />
        <span className="accent">Tous les jours.</span>
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-0 border-t border-l border-line">
        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="border-b border-r border-line"
        >
          <Block k="ADRESSE">
            6 Avenue de Paris<br />
            94380 Bonneuil-sur-Marne
          </Block>
          <Block k="HORAIRES">
            DIM → JEU&nbsp;&nbsp;<span className="text-ink">11:15 — 23:30</span><br />
            VEN · SAM&nbsp;&nbsp;<span className="text-ink">11:15 — 02:00</span>
          </Block>
          <Block k="TELEPHONE">
            <a href="tel:+33953162347" className="text-flame underline underline-offset-4 hover:text-flame-2">
              09 53 16 23 47
            </a>
          </Block>
          <Block k="COMMANDER" last>
            <span className="flex flex-wrap gap-4 mono text-[12px]">
              <a className="text-flame underline underline-offset-4" href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg" target="_blank" rel="noopener">UBER EATS ↗</a>
              <a className="text-flame underline underline-offset-4" href="https://deliveroo.fr/fr/menu/paris/vincennes-centre/le-crousty-bonneuil-sur-marne" target="_blank" rel="noopener">DELIVEROO ↗</a>
              <a className="text-flame underline underline-offset-4" href="https://www.instagram.com/croustybonneuil/" target="_blank" rel="noopener">INSTAGRAM ↗</a>
            </span>
          </Block>
        </motion.div>

        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="relative border-b border-r border-line min-h-[460px] map-frame overflow-hidden"
        >
          <div className="absolute top-3 left-3 z-10 mono text-[9px] text-ink-soft tracking-wider bg-bg/80 px-2 py-1 border border-line">
            48.771°N · 2.485°E
          </div>
          <iframe
            title="Plan Le Crousty Bonneuil"
            loading="lazy"
            className="absolute inset-0 w-full h-full border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=2.475%2C48.766%2C2.495%2C48.776&layer=mapnik&marker=48.771%2C2.485"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href="https://www.openstreetmap.org/?mlat=48.771&mlon=2.485#map=17/48.771/2.485"
            target="_blank" rel="noopener"
            className="absolute bottom-3 right-3 btn btn-primary !py-2 !px-3 !text-[10px] z-10"
          >
            OUVRIR LA CARTE ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ k, children, last }) {
  return (
    <div className={`px-5 py-5 ${last ? "" : "border-b border-line"}`}>
      <div className="mono text-[10px] text-ink-dim mb-2.5">{k}</div>
      <div className="font-display text-[17px] leading-relaxed text-ink-dim">{children}</div>
    </div>
  );
}
