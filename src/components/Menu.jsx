import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU, CATEGORIES } from "../data/menu.js";
import { SectionHeader } from "./Story.jsx";

function Dish({ d, i, n }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-r border-b border-line p-6 sm:p-7 group hover:bg-bg-2/40 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="mono text-[10px] text-flame">[{n}]</span>
        {d.tag && (
          <span className="mono text-[9px] text-ink-dim border border-line px-2 py-0.5">
            {d.tag.toUpperCase()}
          </span>
        )}
      </div>
      <h3 className="font-display font-medium text-[22px] tracking-tighter leading-tight m-0 mb-3">
        {d.name}
      </h3>
      <p className="text-ink-dim text-[13px] leading-relaxed m-0 mb-5 min-h-[3em]">{d.desc}</p>
      <div className="flex items-end justify-between pt-3 border-t border-line">
        <span className="mono text-[10px] text-ink-soft">PRICE</span>
        <span className="font-display text-[20px] text-flame">{d.price}</span>
      </div>
    </motion.article>
  );
}

export default function Menu() {
  const [cat, setCat] = useState("burgers");
  const items = MENU[cat] || [];

  return (
    <section id="menu" className="container-x py-28 md:py-36">
      <SectionHeader n="02" title="CARTE" file="menu.json" />

      <h2 className="h-display text-[clamp(40px,7vw,100px)] mt-10 mb-12">
        Carte courte.<br />
        <span className="accent">Classiques bien faits.</span>
      </h2>

      <div className="flex flex-wrap gap-0 mb-px border border-line border-b-0">
        {CATEGORIES.map((c, i) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`mono text-[11px] tracking-[0.14em] px-5 py-3 transition-all border-r border-line ${
              i === CATEGORIES.length - 1 ? "border-r-0 sm:border-r" : ""
            } ${
              cat === c.key
                ? "bg-flame text-bg"
                : "bg-transparent text-ink-dim hover:text-ink hover:bg-bg-2/50"
            }`}
          >
            {c.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-line">
        <AnimatePresence mode="popLayout">
          {items.map((d, i) => (
            <Dish d={d} i={i} n={String(i + 1).padStart(2, "0")} key={cat + d.name} />
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-8 mono text-[10px] text-ink-soft tracking-wider">
        * PRIX INDICATIFS — CARTE DÉFINITIVE EN MAGASIN ET UBER / DELIVEROO
      </p>
    </section>
  );
}
