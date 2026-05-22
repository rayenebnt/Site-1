import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.6, 0.05, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-bg grid place-items-center"
        >
          <div className="text-center">
            <div className="mono text-[10px] tracking-[0.3em] text-flame mb-4">
              [LOADING / 100%]
            </div>
            <div className="font-display font-medium text-[clamp(40px,8vw,80px)] tracking-tighter leading-none">
              LE CROUSTY
            </div>
            <div className="loadbar mx-auto mt-7 h-[2px] w-[220px] bg-line overflow-hidden">
              <span className="block h-full w-0 bg-flame" />
            </div>
            <div className="mono text-[10px] tracking-[0.22em] text-ink-dim mt-5">
              BONNEUIL · 6 AV. DE PARIS
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
