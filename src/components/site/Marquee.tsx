const words = [
  "Vogue España",
  "Sony Music",
  "El Bulli Foundation",
  "Mad Cool Festival",
  "Loewe",
  "Warner Music",
  "Primavera Sound",
  "ICEX",
  "Mandarin Oriental",
  "Universal",
];

export function Marquee() {
  const items = [...words, ...words];
  return (
    <section className="border-y border-border py-8 overflow-hidden bg-pearl/60">
      <div className="flex gap-16 marquee-track whitespace-nowrap">
        {items.map((w, i) => (
          <span key={i} className="font-display text-2xl md:text-3xl text-foreground/50 flex items-center gap-16">
            {w}
            <span className="text-foreground/20">◆</span>
          </span>
        ))}
      </div>
    </section>
  );
}
