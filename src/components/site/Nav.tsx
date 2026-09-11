import { useEffect, useState } from "react";

const links = [
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#filosofia", label: "Filosofía" },
  { href: "/#journal", label: "Journal" },
  { href: "/#contacto", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "py-6 bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 flex items-center justify-between">
        <a href="/#top" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl tracking-tight">Atelier</span>
          <span className="eyebrow hidden sm:inline">Studio</span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide text-foreground/70 hover:text-foreground transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-foreground after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contacto"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border border-foreground/70 px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
        >
          Reservar sesión
        </a>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
        >
          <div className="w-6 space-y-1.5">
            <span
              className={`block h-px bg-foreground transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`block h-px bg-foreground transition-all ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px bg-foreground transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden glass mt-3 mx-5 p-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl text-foreground/90"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase bg-foreground text-background px-5 py-4"
          >
            Reservar sesión
          </a>
        </div>
      )}
    </header>
  );
}
