import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.2, 1] }}
          className="fixed inset-0 z-[100] bg-bg grid place-items-center"
        >
          <div className="text-center">
            <div className="font-display text-[clamp(36px,8vw,72px)] tracking-[0.08em]">
              LE&nbsp;CROUSTY
            </div>
            <div className="loadbar mx-auto mt-6 h-[2px] w-[220px] bg-line rounded-full overflow-hidden">
              <span className="block h-full w-0 bg-grad-flame" />
            </div>
            <div className="mt-4 text-[12px] tracking-[0.2em] uppercase text-ink-dim">
              Bonneuil-sur-Marne · depuis 2019
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
