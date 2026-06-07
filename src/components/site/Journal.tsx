import moda from "@/assets/cat-moda.jpg";
import gastro from "@/assets/cat-gastro.jpg";
import arte from "@/assets/cat-arte.jpg";

const posts = [
  {
    cat: "Fotografía",
    title: "La luz natural como dramaturgia: un manifiesto",
    date: "Mayo 2026",
    read: "8 min",
    img: arte,
  },
  {
    cat: "Gastronomía",
    title: "Plato, sombra y materia: el bodegón contemporáneo",
    date: "Abril 2026",
    read: "6 min",
    img: gastro,
  },
  {
    cat: "Moda",
    title: "Editoriales de temporada: dirigir sin ruido",
    date: "Marzo 2026",
    read: "10 min",
    img: moda,
  },
];

export function Journal() {
  return (
    <section id="journal" className="py-24 md:py-40 bg-pearl/50">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <header className="reveal flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <span className="eyebrow">— Sala 05 / Journal</span>
            <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[1]">
              Diario del <span className="italic text-stone">estudio</span>.
            </h2>
          </div>
          <a href="#" className="eyebrow underline-offset-8 hover:underline">Ver todos los artículos →</a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {posts.map((p) => (
            <article key={p.title} className="reveal group hover-zoom">
              <div className="relative overflow-hidden aspect-[4/5] bg-stone/20">
                <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3 eyebrow">
                  <span>{p.cat}</span>
                  <span className="text-foreground/30">·</span>
                  <span>{p.date}</span>
                  <span className="text-foreground/30">·</span>
                  <span>{p.read}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl mt-4 leading-tight group-hover:text-stone transition-colors">
                  {p.title}
                </h3>
                <span className="inline-block mt-5 text-xs tracking-[0.3em] uppercase border-b border-foreground pb-1">
                  Leer artículo
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
