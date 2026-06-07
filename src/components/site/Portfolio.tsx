import moda from "@/assets/cat-moda.jpg";
import retrato from "@/assets/cat-retrato.jpg";
import gastro from "@/assets/cat-gastro.jpg";
import concierto from "@/assets/cat-concierto.jpg";
import disco from "@/assets/cat-disco.jpg";
import evento from "@/assets/cat-evento.jpg";
import boda from "@/assets/cat-boda.jpg";
import publi from "@/assets/cat-publi.jpg";
import corp from "@/assets/cat-corp.jpg";
import arte from "@/assets/cat-arte.jpg";

type Item = {
  n: string;
  title: string;
  desc: string;
  img: string;
  span?: string; // grid span classes
  dark?: boolean;
  ratio?: string;
};

const items: Item[] = [
  {
    n: "I",
    title: "Moda",
    desc: "Editorial atemporal. Cuerpo, tejido y luz como vocabulario.",
    img: moda,
    span: "md:col-span-7 md:row-span-2",
    ratio: "aspect-[4/5]",
  },
  {
    n: "II",
    title: "Retrato",
    desc: "Presencia y silencio. La mirada como territorio.",
    img: retrato,
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
    dark: true,
  },
  {
    n: "III",
    title: "Gastronomía",
    desc: "Alta cocina, oficio y materia. Bodegones contemporáneos.",
    img: gastro,
    span: "md:col-span-5",
    ratio: "aspect-[5/4]",
    dark: true,
  },
  {
    n: "IV",
    title: "Conciertos",
    desc: "Energía cruda capturada con precisión cinematográfica.",
    img: concierto,
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
    dark: true,
  },
  {
    n: "V",
    title: "Discográficas",
    desc: "Portadas, campañas y artwork para artistas y sellos.",
    img: disco,
    span: "md:col-span-4",
    ratio: "aspect-square",
    dark: true,
  },
  {
    n: "VI",
    title: "Eventos & Festivales",
    desc: "Aftermovies, fotografía y dirección de cobertura integral.",
    img: evento,
    span: "md:col-span-4",
    ratio: "aspect-square",
    dark: true,
  },
  {
    n: "VII",
    title: "Bodas",
    desc: "Documental emocional. La elegancia del instante real.",
    img: boda,
    span: "md:col-span-4",
    ratio: "aspect-square",
  },
  {
    n: "VIII",
    title: "Publicidad",
    desc: "Campañas comerciales con dirección de arte autoral.",
    img: publi,
    span: "md:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    n: "IX",
    title: "Corporativo",
    desc: "Retrato ejecutivo, branding visual y comunicación interna.",
    img: corp,
    span: "md:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    n: "X",
    title: "Fotografía Artística",
    desc: "Obra personal. Estudios de luz, espacio y abstracción.",
    img: arte,
    span: "md:col-span-12",
    ratio: "aspect-[21/9]",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-16 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-12">
        <header className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-24">
          <div>
            <span className="eyebrow">— Sala 01 / Portfolio</span>
            <h2 className="mt-4 font-display text-4xl md:text-7xl leading-[1] tracking-tight">
              Exposición<br /><span className="italic text-stone">permanente</span>.
            </h2>
          </div>
          <p className="max-w-md text-foreground/70 leading-relaxed text-sm md:text-base">
            Diez salas, una misma sensibilidad. Recorra cada disciplina como quien atraviesa las galerías de un museo contemporáneo: con tiempo, en silencio, con la mirada despierta.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">
          {items.map((it) => (
            <article
              key={it.n}
              className={`reveal group relative overflow-hidden hover-zoom ${it.span ?? ""}`}
            >
              <div className={`relative overflow-hidden ${it.ratio} ${it.dark ? "bg-ink" : "bg-pearl"}`}>
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/0 md:from-black/60 md:via-black/0 md:to-black/0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-4 left-4 text-paper/90 font-display text-sm tracking-[0.3em]">
                  {it.n}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-700">
                  <div className="text-paper">
                    <h3 className="font-display text-2xl md:text-3xl">{it.title}</h3>
                    <p className="mt-2 text-sm text-paper/80 max-w-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {it.desc}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 hidden md:flex items-center justify-between text-xs">
                <span className="font-display text-lg">{it.title}</span>
                <span className="eyebrow">Ver galería →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
