import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Visit() {
  return (
    <section id="visit" className="container-x py-32">
      <div className="tag mb-5">04 — Nous trouver</div>
      <div className="grid lg:grid-cols-2 gap-14 mt-8">
        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="h-display text-[clamp(40px,6vw,72px)] m-0 mb-10">
            Bonneuil-sur-Marne.<br />
            <span className="italic-grad">Tous les jours.</span>
          </h2>

          <Block title="Adresse">
            6 Avenue de Paris<br />
            94380 Bonneuil-sur-Marne
          </Block>
          <Block title="Horaires">
            Dimanche → Jeudi · <b className="text-ink">11:15 — 23:30</b><br />
            Vendredi & Samedi · <b className="text-ink">11:15 — 02:00</b>
          </Block>
          <Block title="Téléphone">
            <a href="tel:+33953162347" className="border-b border-gold pb-0.5 hover:text-gold transition">
              09 53 16 23 47
            </a>
          </Block>
          <Block title="Commander en ligne">
            <span className="flex flex-wrap gap-6">
              <a className="text-gold border-b border-gold text-sm" href="https://www.ubereats.com/fr/store/le-crousty-bonneuil/eDWB3U_7V-mCy8cG455mQg" target="_blank" rel="noopener">Uber Eats →</a>
              <a className="text-gold border-b border-gold text-sm" href="https://deliveroo.fr/fr/menu/paris/vincennes-centre/le-crousty-bonneuil-sur-marne" target="_blank" rel="noopener">Deliveroo →</a>
              <a className="text-gold border-b border-gold text-sm" href="https://www.instagram.com/croustybonneuil/" target="_blank" rel="noopener">Instagram →</a>
            </span>
          </Block>
        </motion.div>

        <motion.div
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          className="relative rounded-2xl overflow-hidden border border-line bg-bg-2 min-h-[460px] map-frame"
        >
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
            className="absolute bottom-4 right-4 bg-ink text-bg px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide z-10"
          >
            Ouvrir la carte ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Block({ title, children }) {
  return (
    <div className="py-5 border-t border-line last:border-b last:border-line">
      <h4 className="text-[10px] tracking-[0.25em] uppercase text-ink-dim font-medium m-0 mb-2.5">
        {title}
      </h4>
      <p className="m-0 text-lg leading-relaxed">{children}</p>
    </div>
  );
}
