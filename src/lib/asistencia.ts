export type Alumno = {
  id: string;
  nombre: string;
  grupo: string;
  activo: boolean;
};

export type Estado = "presente" | "ausente" | "justificada";

export type Sesion = {
  fecha: string; // YYYY-MM-DD
  nota: string;
  registro: Record<string, Estado>; // alumnoId -> estado
};

export type Asistencia = {
  alumnos: Alumno[];
  sesiones: Sesion[];
};

export const STORAGE_KEY = "lumina:asistencia:v1";

export const GRUPOS = ["Silat", "Kali", "Stick Fight", "General"] as const;

export const ESTADOS: { valor: Estado; etiqueta: string; corto: string }[] = [
  { valor: "presente", etiqueta: "Presente", corto: "P" },
  { valor: "ausente", etiqueta: "Ausente", corto: "A" },
  { valor: "justificada", etiqueta: "Justificada", corto: "J" },
];

export const vacio: Asistencia = { alumnos: [], sesiones: [] };

export function hoy(): string {
  const d = new Date();
  const mes = `${d.getMonth() + 1}`.padStart(2, "0");
  const dia = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function id(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function fechaCorta(fecha: string): string {
  const [a, m, d] = fecha.split("-");
  return `${d}/${m}/${a.slice(2)}`;
}

export function cargar(): Asistencia {
  if (typeof window === "undefined") return vacio;
  try {
    const bruto = window.localStorage.getItem(STORAGE_KEY);
    if (!bruto) return vacio;
    const datos = JSON.parse(bruto) as Partial<Asistencia>;
    return {
      alumnos: Array.isArray(datos.alumnos) ? datos.alumnos : [],
      sesiones: Array.isArray(datos.sesiones) ? datos.sesiones : [],
    };
  } catch {
    return vacio;
  }
}

export function guardar(datos: Asistencia): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(datos));
  } catch {
    /* almacenamiento no disponible */
  }
}

export function ordenarSesiones(sesiones: Sesion[]): Sesion[] {
  return [...sesiones].sort((a, b) => (a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0));
}

export function porcentaje(alumnoId: string, sesiones: Sesion[]): number | null {
  const computadas = sesiones.filter((s) => s.registro[alumnoId]);
  if (computadas.length === 0) return null;
  const presentes = computadas.filter((s) => s.registro[alumnoId] === "presente").length;
  return Math.round((presentes / computadas.length) * 100);
}

export function aCsv(datos: Asistencia): string {
  const sesiones = ordenarSesiones(datos.sesiones);
  const escapar = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const cabecera = ["Alumno", "Grupo", ...sesiones.map((s) => s.fecha), "% asistencia"];
  const filas = datos.alumnos.map((al) => [
    al.nombre,
    al.grupo,
    ...sesiones.map((s) => s.registro[al.id] ?? ""),
    `${porcentaje(al.id, sesiones) ?? ""}`,
  ]);
  return [cabecera, ...filas].map((fila) => fila.map(escapar).join(",")).join("\n");
}
