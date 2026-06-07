import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contacto" className="bg-ink text-paper py-16 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
        <div className="reveal lg:col-span-5">
          <span className="eyebrow !text-paper/60">— Sala 06 / Contacto</span>
          <h2 className="mt-4 font-display text-4xl md:text-7xl leading-[1]">
            Hablemos<br /><span className="italic text-sand">en privado</span>.
          </h2>
          <p className="mt-6 md:mt-8 text-paper/70 max-w-md font-light text-base md:text-lg">
            Cuéntenos su proyecto. Respondemos en menos de 24 horas, con discreción y sin compromiso.
          </p>

          <div className="mt-14 space-y-6 text-sm">
            <div>
              <div className="eyebrow !text-paper/50">Estudio</div>
              <div className="mt-2 font-display text-xl">Calle de la Luz 14, Madrid</div>
            </div>
            <div>
              <div className="eyebrow !text-paper/50">Reservas</div>
              <a href="mailto:hola@atelier.studio" className="mt-2 block font-display text-xl underline-offset-4 hover:underline">
                hola@atelier.studio
              </a>
            </div>
            <div>
              <div className="eyebrow !text-paper/50">Síganos</div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {["Instagram", "Facebook", "LinkedIn", "YouTube", "WhatsApp"].map((s) => (
                  <a key={s} href="#" className="border border-paper/20 px-4 py-2 hover:bg-paper hover:text-ink transition-colors">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form
          className="reveal lg:col-span-7 lg:pl-12 lg:border-l border-paper/10"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Field label="Nombre" name="name" />
            <Field label="Correo" name="email" type="email" />
            <Field label="Compañía / Marca" name="company" />
            <Field label="Tipo de proyecto" name="project" />
          </div>
          <div className="mt-8">
            <label className="eyebrow !text-paper/60">Mensaje</label>
            <textarea
              rows={5}
              required
              className="mt-3 w-full bg-transparent border-b border-paper/30 focus:border-paper outline-none py-3 text-paper placeholder:text-paper/30 font-light text-lg resize-none"
              placeholder="Cuéntenos su visión…"
            />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <p className="text-xs text-paper/50 max-w-xs">
              Al enviar este formulario acepta la política de privacidad del estudio.
            </p>
            <button
              type="submit"
              className="group inline-flex items-center gap-4 bg-paper text-ink px-8 py-4 text-xs tracking-[0.3em] uppercase hover:bg-sand transition-colors"
            >
              {sent ? "Mensaje enviado" : "Enviar mensaje"}
              <span className="block h-px w-6 bg-ink transition-all group-hover:w-12" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow !text-paper/60">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-3 w-full bg-transparent border-b border-paper/30 focus:border-paper outline-none py-3 text-paper placeholder:text-paper/30 font-light text-lg"
      />
    </div>
  );
}
