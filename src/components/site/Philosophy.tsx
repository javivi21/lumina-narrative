const pillars = [
  { k: "Emoción", v: "El motor invisible que sostiene toda imagen verdadera." },
  { k: "Luz", v: "Lenguaje primero. Esculpe el volumen y revela el carácter." },
  { k: "Narrativa", v: "Cada fotografía es un fragmento de una historia más amplia." },
  { k: "Detalle", v: "La belleza vive en lo que casi nadie mira." },
  { k: "Autenticidad", v: "Sin artificio. Lo real, dirigido con elegancia." },
  { k: "Excelencia", v: "Disciplina técnica al servicio de la sensibilidad." },
];

export function Philosophy() {
  return (
    <section id="filosofia" className="py-16 md:py-40 bg-paper">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12">
        <div className="reveal text-center max-w-4xl mx-auto mb-12 md:mb-20">
          <span className="eyebrow">— Sala 03 / Manifiesto</span>
          <p className="mt-6 md:mt-10 font-display text-2xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] text-foreground">
            "Fotografiar es <span className="italic text-stone">detener el tiempo</span> para devolverlo, después, transformado en memoria."
          </p>
          <div className="mt-8 md:mt-10 flex items-center justify-center gap-4">
            <span className="block h-px w-12 bg-foreground/30" />
            <span className="eyebrow">Manifiesto del estudio</span>
            <span className="block h-px w-12 bg-foreground/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-12 md:mt-24">
          {pillars.map((p, i) => (
            <div
              key={p.k}
              className="reveal bg-paper p-8 md:p-14 hover:bg-pearl transition-colors duration-500"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="eyebrow">0{i + 1}</span>
              <h3 className="font-display text-2xl md:text-4xl mt-4 md:mt-5 mb-3 md:mb-4">{p.k}</h3>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">{p.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
