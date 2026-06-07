const groups = [
  {
    n: "01",
    title: "Fotografía profesional",
    items: ["Moda", "Editorial", "Retrato", "Gastronomía", "Conciertos", "Festivales", "Discográficas", "Eventos", "Bodas", "Publicidad", "Producto", "Corporativo"],
  },
  {
    n: "02",
    title: "Producción audiovisual",
    items: ["Vídeo profesional", "Videoclips", "Aftermovies", "Spots publicitarios", "Contenido para redes sociales", "Cobertura de eventos"],
  },
  {
    n: "03",
    title: "Diseño gráfico",
    items: ["Cartelería", "Posters", "Portadas musicales", "Branding", "Identidad visual", "Diseño publicitario"],
  },
  {
    n: "04",
    title: "Creación digital",
    items: ["Proyectos audiovisuales", "Contenido multimedia", "Campañas visuales", "Diseño creativo", "IA aplicada a la creatividad", "Edición avanzada de imagen y vídeo"],
  },
];

export function Services() {
  return (
    <section id="servicios" className="bg-ink text-paper py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <header className="reveal mb-20 md:mb-32 max-w-4xl">
          <span className="eyebrow !text-paper/60">— Sala 02 / Servicios</span>
          <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[1]">
            Un estudio. Cuatro <span className="italic text-sand">disciplinas</span>.
          </h2>
          <p className="mt-8 text-paper/70 max-w-2xl text-lg font-light">
            Desde la primera intención hasta la entrega final, dirigimos todas las etapas del proceso creativo bajo una misma mirada.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
          {groups.map((g) => (
            <div key={g.n} className="reveal group">
              <div className="flex items-baseline gap-6 mb-8">
                <span className="font-display text-3xl text-sand/70">{g.n}</span>
                <span className="h-px flex-1 bg-paper/15" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl mb-8">{g.title}</h3>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="text-sm text-paper/75 border-b border-paper/10 pb-2 hover:text-paper hover:border-paper/40 transition-colors"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
