const stats = [
  { n: "15+", l: "Años de trayectoria" },
  { n: "820", l: "Proyectos entregados" },
  { n: "260", l: "Clientes en 14 países" },
  { n: "190", l: "Eventos y giras cubiertos" },
];

export function Stats() {
  return (
    <section className="bg-sand/50 py-14 md:py-28 border-y border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
        {stats.map((s) => (
          <div key={s.l} className="reveal text-center md:text-left">
            <div className="font-display text-5xl md:text-7xl lg:text-8xl leading-none">{s.n}</div>
            <div className="eyebrow mt-3 md:mt-4 text-[0.6rem] md:text-xs">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
