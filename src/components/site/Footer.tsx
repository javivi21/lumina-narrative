export function Footer() {
  return (
    <footer className="bg-ink text-paper/70 border-t border-paper/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          <div className="md:col-span-5">
            <div className="font-display text-3xl text-paper">Atelier <span className="italic text-sand">Studio</span></div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Estudio independiente de fotografía, diseño y creación audiovisual. Trabajamos con marcas, artistas e instituciones de todo el mundo.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="eyebrow !text-paper/40 mb-4">Navegación</div>
            <ul className="space-y-2 text-sm">
              {["Portfolio", "Servicios", "Filosofía", "Journal", "Contacto"].map((x) => (
                <li key={x}><a href={`#${x.toLowerCase()}`} className="hover:text-paper transition-colors">{x}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow !text-paper/40 mb-4">Síganos</div>
            <ul className="space-y-2 text-sm">
              {["Instagram", "Facebook", "LinkedIn", "YouTube", "WhatsApp"].map((x) => (
                <li key={x}><a href="#" className="hover:text-paper transition-colors">{x}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow !text-paper/40 mb-4">Estudio</div>
            <address className="not-italic text-sm leading-relaxed">
              Calle de la Luz 14<br />28013 Madrid<br />España
            </address>
          </div>
        </div>

        <div className="editorial-rule" />

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-paper/40">
          <div>© {new Date().getFullYear()} Atelier Studio. Todos los derechos reservados.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-paper">Privacidad</a>
            <a href="#" className="hover:text-paper">Cookies</a>
            <a href="#" className="hover:text-paper">Aviso legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
