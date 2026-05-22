const ITEMS = [
  "SMASH BURGER",
  "TACOS FRANÇAIS",
  "SANDWICH GRATINÉ",
  "CHEDDAR BACON FRIES",
  "TIRAMISU MAISON",
  "MÉGA BURGER 180",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative border-y border-line py-7 overflow-hidden bg-bg-2/60 backdrop-blur-md">
      <div className="marquee-track flex gap-14 whitespace-nowrap">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-14">
            <span
              className="font-display text-[clamp(28px,4vw,56px)] tracking-[0.04em] text-transparent transition-colors duration-300 hover:text-flame"
              style={{ WebkitTextStroke: "1px #241712" }}
            >
              {s}
            </span>
            <i className="text-flame text-xl not-italic">✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
