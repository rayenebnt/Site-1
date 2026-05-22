import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover)").matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (e) => {
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMove);

    const onEnter = () => dot.current?.classList.add("scale-[2.5]");
    const onLeave = () => dot.current?.classList.remove("scale-[2.5]");
    const targets = document.querySelectorAll("a, button, .hoverable");
    targets.forEach((t) => {
      t.addEventListener("mouseenter", onEnter);
      t.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (!enabled) return null;
  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[99] w-2 h-2 bg-flame transition-transform duration-150 ease-out"
    />
  );
}
