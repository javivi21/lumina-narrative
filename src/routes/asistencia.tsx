import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";

type Alumno = {
  id: string;
  nombre: string;
  grado: string;
};

type Registro = Record<string, Record<string, boolean>>;

type Datos = {
  alumnos: Alumno[];
  registro: Registro;
};

const STORAGE_KEY = "silat-asistencia-v1";

const GRADOS = ["Iniciación", "Intermedio", "Avanzado", "Instructor"] as const;

const VACIO: Datos = { alumnos: [], registro: {} };

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

function nuevoId() {
  return Math.random().toString(36).slice(2, 10);
}

function leer(): Datos {
  if (typeof window === "undefined") return VACIO;
  try {
    const crudo = window.localStorage.getItem(STORAGE_KEY);
    if (!crudo) return VACIO;
    const datos = JSON.parse(crudo) as Partial<Datos>;
    return {
      alumnos: Array.isArray(datos.alumnos) ? datos.alumnos : [],
      registro: datos.registro && typeof datos.registro === "object" ? datos.registro : {},
    };
  } catch {
    return VACIO;
  }
}

function formatoFecha(fecha: string) {
  const [a, m, d] = fecha.split("-");
  return `${d}/${m}/${a}`;
}

export const Route = createFileRoute("/asistencia")({
  head: () => ({
    meta: [
      { title: "Lista de asistencia — Silat" },
      {
        name: "description",
        content: "Control de asistencia de las clases de Silat, Kali filipino y Stick fight.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Asistencia,
});

function Asistencia() {
  const [datos, setDatos] = useState<Datos>(VACIO);
  const [cargado, setCargado] = useState(false);
  const [fecha, setFecha] = useState(hoy);
  const [nombre, setNombre] = useState("");
  const [grado, setGrado] = useState<string>(GRADOS[0]);

  useEffect(() => {
    setDatos(leer());
    setCargado(true);
  }, []);

  useEffect(() => {
    if (!cargado) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [datos, cargado]);

  const presentes = datos.registro[fecha] ?? {};

  const alumnos = useMemo(
    () => [...datos.alumnos].sort((a, b) => a.nombre.localeCompare(b.nombre, "es")),
    [datos.alumnos],
  );

  const sesiones = useMemo(() => Object.keys(datos.registro).sort().reverse(), [datos.registro]);

  const totalPresentes = alumnos.filter((a) => presentes[a.id]).length;

  const anadirAlumno = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const limpio = nombre.trim();
      if (!limpio) return;
      setDatos((prev) => ({
        ...prev,
        alumnos: [...prev.alumnos, { id: nuevoId(), nombre: limpio, grado }],
      }));
      setNombre("");
    },
    [nombre, grado],
  );

  const alternar = useCallback(
    (id: string) => {
      setDatos((prev) => {
        const dia = prev.registro[fecha] ?? {};
        return {
          ...prev,
          registro: { ...prev.registro, [fecha]: { ...dia, [id]: !dia[id] } },
        };
      });
    },
    [fecha],
  );

  const marcarTodos = useCallback(
    (valor: boolean) => {
      setDatos((prev) => ({
        ...prev,
        registro: {
          ...prev.registro,
          [fecha]: Object.fromEntries(prev.alumnos.map((a) => [a.id, valor])),
        },
      }));
    },
    [fecha],
  );

  const borrarAlumno = useCallback((id: string) => {
    setDatos((prev) => ({
      alumnos: prev.alumnos.filter((a) => a.id !== id),
      registro: Object.fromEntries(
        Object.entries(prev.registro).map(([dia, marcas]) => [
          dia,
          Object.fromEntries(Object.entries(marcas).filter(([alumnoId]) => alumnoId !== id)),
        ]),
      ),
    }));
  }, []);

  const asistenciasDe = useCallback(
    (id: string) => Object.values(datos.registro).filter((dia) => dia[id]).length,
    [datos.registro],
  );

  const exportarCsv = useCallback(() => {
    const columnas = sesiones.length ? sesiones : [fecha];
    const cabecera = ["Alumno", "Grado", ...columnas, "Total"];
    const filas = alumnos.map((a) => [
      a.nombre,
      a.grado,
      ...columnas.map((dia) => (datos.registro[dia]?.[a.id] ? "1" : "0")),
      String(asistenciasDe(a.id)),
    ]);
    const csv = [cabecera, ...filas]
      .map((fila) => fila.map((celda) => `"${celda.replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `asistencia-silat-${fecha}.csv`;
    enlace.click();
    URL.revokeObjectURL(url);
  }, [alumnos, asistenciasDe, datos.registro, fecha, sesiones]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-14 md:px-12 md:py-20">
        <header className="border-b border-border pb-8">
          <p className="eyebrow">Silat · Kali · Stick fight</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
            Lista de asistencia
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Control de clase. Los datos se guardan en este dispositivo.
          </p>
        </header>

        <section className="mt-8 flex flex-wrap items-end gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="eyebrow">Fecha de clase</span>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value || hoy())}
              className="border border-input bg-background px-3 py-2 text-sm"
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="eyebrow">Presentes</span>
            <p className="font-display text-3xl leading-none">
              {totalPresentes}
              <span className="text-lg text-muted-foreground"> / {alumnos.length}</span>
            </p>
          </div>

          <div className="ml-auto flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => marcarTodos(true)}
              disabled={!alumnos.length}
              className="border border-foreground/70 px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:bg-foreground hover:text-background disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-foreground"
            >
              Todos
            </button>
            <button
              type="button"
              onClick={() => marcarTodos(false)}
              disabled={!alumnos.length}
              className="border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:border-foreground/70 disabled:opacity-40"
            >
              Ninguno
            </button>
            <button
              type="button"
              onClick={exportarCsv}
              disabled={!alumnos.length}
              className="border border-foreground/30 px-4 py-2 text-xs uppercase tracking-[0.25em] transition-colors hover:border-foreground/70 disabled:opacity-40"
            >
              CSV
            </button>
          </div>
        </section>

        <form onSubmit={anadirAlumno} className="mt-6 flex flex-wrap gap-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del alumno"
            aria-label="Nombre del alumno"
            className="min-w-[14rem] flex-1 border border-input bg-background px-3 py-2 text-sm"
          />
          <select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            aria-label="Grado"
            className="border border-input bg-background px-3 py-2 text-sm"
          >
            {GRADOS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-foreground px-5 py-2 text-xs uppercase tracking-[0.25em] text-background transition-opacity hover:opacity-85"
          >
            Añadir
          </button>
        </form>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {alumnos.map((a) => {
            const presente = Boolean(presentes[a.id]);
            return (
              <li key={a.id} className="flex items-center gap-4 py-3">
                <button
                  type="button"
                  onClick={() => alternar(a.id)}
                  aria-pressed={presente}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center border text-sm transition-colors ${
                    presente
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/25 text-transparent hover:border-foreground/60"
                  }`}
                >
                  ✓
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`truncate text-sm ${presente ? "" : "text-muted-foreground"}`}>
                    {a.nombre}
                  </p>
                  <p className="eyebrow mt-0.5">{a.grado}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {asistenciasDe(a.id)} clases
                </span>
                <button
                  type="button"
                  onClick={() => borrarAlumno(a.id)}
                  aria-label={`Eliminar a ${a.nombre}`}
                  className="px-2 text-muted-foreground transition-colors hover:text-destructive"
                >
                  ×
                </button>
              </li>
            );
          })}
          {!alumnos.length && (
            <li className="py-10 text-center text-sm text-muted-foreground">
              Sin alumnos todavía. Añade el primero arriba.
            </li>
          )}
        </ul>

        {sesiones.length > 1 && (
          <section className="mt-10">
            <h2 className="eyebrow">Sesiones registradas</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {sesiones.map((dia) => {
                const total = Object.values(datos.registro[dia]).filter(Boolean).length;
                return (
                  <button
                    key={dia}
                    type="button"
                    onClick={() => setFecha(dia)}
                    className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                      dia === fecha
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground/60"
                    }`}
                  >
                    {formatoFecha(dia)} · {total}
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
