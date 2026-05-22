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
    <div className="relative border-y border-line py-5 overflow-hidden bg-bg-2/60 backdrop-blur-md">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="mono text-[14px] sm:text-[16px] tracking-[0.18em] text-ink">{s}</span>
            <span className="text-flame">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
