import { useEffect, useMemo, useState } from "react";
import {
  aCsv,
  cargar,
  ESTADOS,
  fechaCorta,
  GRUPOS,
  guardar,
  hoy,
  id,
  ordenarSesiones,
  porcentaje,
  vacio,
  type Asistencia,
  type Estado,
} from "@/lib/asistencia";

const siguienteEstado: Record<Estado, Estado> = {
  presente: "ausente",
  ausente: "justificada",
  justificada: "presente",
};

const colorEstado: Record<Estado, string> = {
  presente: "bg-foreground text-background border-foreground",
  ausente: "bg-transparent text-foreground/40 border-foreground/20",
  justificada: "bg-foreground/15 text-foreground border-foreground/40",
};

export function AttendanceSheet() {
  const [datos, setDatos] = useState<Asistencia>(vacio);
  const [listo, setListo] = useState(false);
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState<string>(GRUPOS[0]);
  const [filtro, setFiltro] = useState<string>("Todos");
  const [fecha, setFecha] = useState(hoy());

  useEffect(() => {
    setDatos(cargar());
    setListo(true);
  }, []);

  useEffect(() => {
    if (listo) guardar(datos);
  }, [datos, listo]);

  const sesiones = useMemo(() => ordenarSesiones(datos.sesiones), [datos.sesiones]);
  const alumnos = useMemo(
    () => datos.alumnos.filter((a) => filtro === "Todos" || a.grupo === filtro),
    [datos.alumnos, filtro],
  );
  const sesionActiva = sesiones.find((s) => s.fecha === fecha) ?? null;

  const presentesHoy = sesionActiva
    ? alumnos.filter((a) => sesionActiva.registro[a.id] === "presente").length
    : 0;

  function agregarAlumno(e: React.FormEvent) {
    e.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) return;
    setDatos((d) => ({
      ...d,
      alumnos: [...d.alumnos, { id: id(), nombre: limpio, grupo, activo: true }],
    }));
    setNombre("");
  }

  function borrarAlumno(alumnoId: string) {
    setDatos((d) => ({
      alumnos: d.alumnos.filter((a) => a.id !== alumnoId),
      sesiones: d.sesiones.map((s) => {
        const { [alumnoId]: _, ...resto } = s.registro;
        return { ...s, registro: resto };
      }),
    }));
  }

  function abrirSesion() {
    setDatos((d) =>
      d.sesiones.some((s) => s.fecha === fecha)
        ? d
        : { ...d, sesiones: [...d.sesiones, { fecha, nota: "", registro: {} }] },
    );
  }

  function borrarSesion(fechaSesion: string) {
    setDatos((d) => ({ ...d, sesiones: d.sesiones.filter((s) => s.fecha !== fechaSesion) }));
  }

  function marcar(alumnoId: string, estado?: Estado) {
    setDatos((d) => {
      const existe = d.sesiones.some((s) => s.fecha === fecha);
      const base = existe ? d.sesiones : [...d.sesiones, { fecha, nota: "", registro: {} }];
      return {
        ...d,
        sesiones: base.map((s) => {
          if (s.fecha !== fecha) return s;
          const actual = s.registro[alumnoId];
          const nuevo = estado ?? (actual ? siguienteEstado[actual] : "presente");
          return { ...s, registro: { ...s.registro, [alumnoId]: nuevo } };
        }),
      };
    });
  }

  function marcarTodos(estado: Estado) {
    if (alumnos.length === 0) return;
    setDatos((d) => {
      const existe = d.sesiones.some((s) => s.fecha === fecha);
      const base = existe ? d.sesiones : [...d.sesiones, { fecha, nota: "", registro: {} }];
      return {
        ...d,
        sesiones: base.map((s) => {
          if (s.fecha !== fecha) return s;
          const registro = { ...s.registro };
          alumnos.forEach((a) => (registro[a.id] = estado));
          return { ...s, registro };
        }),
      };
    });
  }

  function anotar(nota: string) {
    setDatos((d) => ({
      ...d,
      sesiones: d.sesiones.map((s) => (s.fecha === fecha ? { ...s, nota } : s)),
    }));
  }

  function exportar() {
    const blob = new Blob([aCsv(datos)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = `asistencia-${hoy()}.csv`;
    enlace.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-28 md:py-32">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b border-foreground/15 pb-8">
        <div>
          <span className="eyebrow">Registro de clases</span>
          <h1 className="font-display text-4xl md:text-6xl mt-3">Lista de asistencia</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value || hoy())}
            className="border border-foreground/25 bg-transparent px-4 py-2.5 text-sm"
            aria-label="Fecha de la clase"
          />
          <button
            onClick={abrirSesion}
            className="text-xs tracking-[0.2em] uppercase border border-foreground/70 px-5 py-2.5 hover:bg-foreground hover:text-background transition-colors"
          >
            Abrir clase
          </button>
          <button
            onClick={exportar}
            className="text-xs tracking-[0.2em] uppercase border border-foreground/25 px-5 py-2.5 hover:border-foreground transition-colors"
          >
            Exportar CSV
          </button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-[2fr_1fr] mt-10">
        <form onSubmit={agregarAlumno} className="flex flex-wrap gap-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del alumno"
            className="flex-1 min-w-[12rem] border border-foreground/25 bg-transparent px-4 py-2.5 text-sm"
          />
          <select
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            className="border border-foreground/25 bg-transparent px-4 py-2.5 text-sm"
            aria-label="Grupo"
          >
            {GRUPOS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="text-xs tracking-[0.2em] uppercase bg-foreground text-background px-5 py-2.5"
          >
            Añadir
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-start md:justify-end gap-3">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-foreground/25 bg-transparent px-4 py-2.5 text-sm"
            aria-label="Filtrar por grupo"
          >
            <option value="Todos">Todos los grupos</option>
            {GRUPOS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            onClick={() => marcarTodos("presente")}
            className="text-xs tracking-[0.2em] uppercase border border-foreground/25 px-4 py-2.5 hover:border-foreground transition-colors"
          >
            Todos presentes
          </button>
          <button
            onClick={() => marcarTodos("ausente")}
            className="text-xs tracking-[0.2em] uppercase border border-foreground/25 px-4 py-2.5 hover:border-foreground transition-colors"
          >
            Limpiar
          </button>
        </div>
      </section>

      <p className="mt-6 text-sm text-foreground/60">
        Clase {fechaCorta(fecha)} · {presentesHoy}/{alumnos.length} presentes · toca la casilla para
        alternar presente / ausente / justificada.
      </p>

      {!listo ? (
        <p className="mt-16 text-sm text-foreground/50">Cargando registro…</p>
      ) : datos.alumnos.length === 0 ? (
        <p className="mt-16 text-sm text-foreground/50">
          Sin alumnos todavía. Añade el primero arriba.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-foreground/20">
                <th className="text-left font-normal eyebrow py-3 pr-4">Alumno</th>
                <th className="text-left font-normal eyebrow py-3 pr-4">Grupo</th>
                <th className="text-center font-normal eyebrow py-3 px-2">{fechaCorta(fecha)}</th>
                {sesiones
                  .filter((s) => s.fecha !== fecha)
                  .slice(0, 8)
                  .map((s) => (
                    <th key={s.fecha} className="text-center font-normal eyebrow py-3 px-2">
                      <span className="block">{fechaCorta(s.fecha)}</span>
                      <button
                        onClick={() => borrarSesion(s.fecha)}
                        className="text-[0.6rem] text-foreground/40 hover:text-foreground"
                        aria-label={`Borrar clase ${s.fecha}`}
                      >
                        borrar
                      </button>
                    </th>
                  ))}
                <th className="text-right font-normal eyebrow py-3 pl-4">%</th>
                <th className="sr-only">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((al) => {
                const pct = porcentaje(al.id, sesiones);
                return (
                  <tr key={al.id} className="border-b border-foreground/10">
                    <td className="py-3 pr-4 font-display text-lg">{al.nombre}</td>
                    <td className="py-3 pr-4 text-foreground/60">{al.grupo}</td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => marcar(al.id)}
                        className={`h-9 w-9 border text-xs transition-colors ${
                          colorEstado[sesionActiva?.registro[al.id] ?? "ausente"]
                        }`}
                        aria-label={`Asistencia de ${al.nombre}`}
                      >
                        {
                          ESTADOS.find(
                            (e) => e.valor === (sesionActiva?.registro[al.id] ?? "ausente"),
                          )?.corto
                        }
                      </button>
                    </td>
                    {sesiones
                      .filter((s) => s.fecha !== fecha)
                      .slice(0, 8)
                      .map((s) => (
                        <td key={s.fecha} className="py-3 px-2 text-center text-foreground/50">
                          {ESTADOS.find((e) => e.valor === s.registro[al.id])?.corto ?? "·"}
                        </td>
                      ))}
                    <td className="py-3 pl-4 text-right tabular-nums">
                      {pct === null ? "—" : `${pct}%`}
                    </td>
                    <td className="py-3 pl-4 text-right">
                      <button
                        onClick={() => borrarAlumno(al.id)}
                        className="text-xs text-foreground/40 hover:text-foreground transition-colors"
                        aria-label={`Eliminar a ${al.nombre}`}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sesionActiva && (
        <div className="mt-10 max-w-2xl">
          <label className="eyebrow block mb-3" htmlFor="nota-clase">
            Nota de la clase
          </label>
          <textarea
            id="nota-clase"
            value={sesionActiva.nota}
            onChange={(e) => anotar(e.target.value)}
            rows={3}
            placeholder="Técnicas trabajadas, incidencias, material…"
            className="w-full border border-foreground/25 bg-transparent px-4 py-3 text-sm"
          />
        </div>
      )}

      <p className="mt-16 text-xs text-foreground/40">
        Los datos se guardan en este navegador (localStorage). Exporta a CSV para conservarlos.
      </p>
    </div>
  );
}
