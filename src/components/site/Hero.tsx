import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative h-dvh min-h-[680px] w-full overflow-hidden bg-ink">
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${y * 0.35}px, 0) scale(${1 + y * 0.0002})` }}
      >
        <img
          src={hero}
          alt="Modelo en vestido fluido, exposición artística"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/55" />
      </div>

      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: `translate3d(0, ${y * -0.12}px, 0)`, opacity: Math.max(0, 1 - y / 600) }}
      >
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 pb-16 md:pb-24 text-paper">
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px w-12 bg-paper/70" />
            <span className="eyebrow !text-paper/80">Estudio · Fotografía · 2010 — Presente</span>
          </div>
          <h1 className="font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-tight max-w-5xl">
            Fotografía. <span className="italic text-sand">Arte.</span><br />
            Narrativa Visual.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-paper/80 font-light leading-relaxed">
            Cada imagen cuenta una historia irrepetible. Una práctica fotográfica que se mueve entre la moda, el retrato, la gastronomía y los grandes escenarios.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href="#portfolio"
              className="group inline-flex items-center gap-3 bg-paper text-ink px-7 py-4 text-xs tracking-[0.3em] uppercase hover:bg-sand transition-colors"
            >
              Explorar Portfolio
              <span className="block h-px w-6 bg-ink transition-all group-hover:w-10" />
            </a>
            <a
              href="#contacto"
              className="text-xs tracking-[0.3em] uppercase text-paper/80 hover:text-paper underline-offset-8 hover:underline transition"
            >
              Encargar un proyecto
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:right-12 z-10 flex flex-col items-center gap-3 text-paper/60 animate-drift">
        <span className="eyebrow !text-paper/60 [writing-mode:vertical-rl]">Scroll</span>
        <span className="block h-12 w-px bg-paper/40" />
      </div>
    </section>
  );
}
