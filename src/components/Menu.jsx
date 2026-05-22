import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU, CATEGORIES } from "../data/menu.js";

function Dish({ d, i }) {
  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 4}deg) rotateY(${px * 4}deg)`;
  };
  const onLeave = (e) => { e.currentTarget.style.transform = ""; };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="hoverable relative bg-bg p-7 sm:p-8 flex flex-col gap-3.5 overflow-hidden min-h-[240px] transition-[background] duration-500 hover:bg-bg-2"
    >
      <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-grad-flame opacity-[0.08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      <div className="relative flex items-start justify-between gap-4">
        <h3 className="font-display text-[26px] tracking-wide leading-none m-0">{d.name}</h3>
        <span className="font-serif italic text-[22px] text-gold whitespace-nowrap">{d.price}</span>
      </div>
      <p className="relative text-ink-dim text-sm leading-relaxed flex-1">{d.desc}</p>
      {d.tag && (
        <span className="relative self-start text-[10px] tracking-[0.2em] uppercase text-flame px-2.5 py-1 border border-flame rounded-full">
          {d.tag}
        </span>
      )}
    </motion.article>
  );
}

export default function Menu() {
  const [cat, setCat] = useState("burgers");
  const items = MENU[cat] || [];

  return (
    <section id="menu" className="container-x py-32">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <div>
          <div className="tag mb-5">02 — La carte</div>
          <h2 className="h-display text-[clamp(40px,6vw,84px)] m-0">
            Une carte courte.<br />
            <span className="italic-grad">Des classiques bien faits.</span>
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12 pb-5 border-b border-line">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`px-5 py-2.5 rounded-full text-[13px] tracking-wide font-medium transition-all border ${
              cat === c.key
                ? "bg-ink text-bg border-ink"
                : "bg-transparent text-ink-dim border-line-strong hover:text-ink hover:border-ink-dim"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid gap-px grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-line border border-line rounded-2xl overflow-hidden">
        <AnimatePresence mode="popLayout">
          {items.map((d, i) => (
            <Dish d={d} i={i} key={cat + d.name} />
          ))}
        </AnimatePresence>
      </div>

      <p className="mt-8 text-center text-xs text-ink-soft tracking-wide">
        Tous nos plats sont préparés à la commande. Viande halal certifiée.
        Prix indicatifs — carte définitive en magasin et sur Uber Eats / Deliveroo.
      </p>
    </section>
  );
}
