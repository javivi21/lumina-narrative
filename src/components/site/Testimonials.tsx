const quotes = [
  {
    q: "Su mirada convierte cualquier marca en una pieza editorial. Trabajar con el estudio fue una de las decisiones más acertadas de la temporada.",
    a: "Clara Vidal",
    r: "Directora creativa, Casa Lumière",
  },
  {
    q: "Capturó la energía del festival como nadie. Las imágenes son ya parte de la identidad visual del evento.",
    a: "Iván Castaño",
    r: "Director, Mad Cool Festival",
  },
  {
    q: "Una sensibilidad rara y un nivel técnico extraordinario. La portada del disco habla por sí sola.",
    a: "Lía Ferrer",
    r: "A&R, Warner Music Spain",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <header className="reveal mb-20 max-w-3xl">
          <span className="eyebrow">— Sala 04 / Voces</span>
          <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[1.05]">
            La palabra de quienes <span className="italic text-stone">han confiado</span>.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border">
          {quotes.map((t, i) => (
            <figure key={i} className="reveal bg-paper p-10 md:p-12 flex flex-col">
              <div className="font-display text-6xl text-stone/40 leading-none">"</div>
              <blockquote className="font-display text-xl md:text-2xl leading-snug mt-4 flex-1">
                {t.q}
              </blockquote>
              <figcaption className="mt-10 pt-6 border-t border-border">
                <div className="font-medium">{t.a}</div>
                <div className="text-sm text-muted-foreground mt-1">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
