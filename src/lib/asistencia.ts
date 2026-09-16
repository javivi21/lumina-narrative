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
    if (!bruto) return semillaSilat();
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

// Grupo de Silat importado de "Lista de Asistencia Silat (actualizada)" en
// Drive, con las clases del 03-09 (jueves), 08-09 (martes) y 15-09 (martes)
// de 2026. Ese archivo es la fuente de referencia: no incluye una clase el
// 10-09, así que esa fecha no se siembra aquí (ver conversación).
const ALUMNOS_SILAT: [string, string, Estado, Estado, Estado][] = [
  ["rut", "Rut", "ausente", "presente", "presente"],
  ["sergio", "Sergio Silat", "presente", "presente", "ausente"],
  ["alejandro", "Alejandro Granjero", "ausente", "ausente", "ausente"],
  ["blancrow", "Blancrow", "ausente", "ausente", "presente"],
  ["david", "DAVID Silat Bombero Forestal", "presente", "ausente", "presente"],
  ["estefania", "Estefania", "presente", "ausente", "ausente"],
  ["lau", "Lau Poli Silat", "presente", "presente", "ausente"],
  ["mario", "mariosandoval69", "presente", "ausente", "ausente"],
  ["laura", "Laura Silat", "presente", "presente", "presente"],
  ["oscar", "Oscar Silat V", "presente", "presente", "presente"],
  ["pedro", "Pedro Felipe", "presente", "presente", "ausente"],
  ["rbk", "RBK", "presente", "presente", "ausente"],
  ["alberto", "Alberto Silat", "presente", "presente", "ausente"],
  ["diego", "Diego Morales", "ausente", "presente", "ausente"],
  ["elias", "Elias Crazy D", "ausente", "presente", "presente"],
  ["jana", "Jana", "ausente", "ausente", "ausente"],
];

const FECHAS_SILAT = ["2026-09-03", "2026-09-08", "2026-09-15"];

export function semillaSilat(): Asistencia {
  const alumnos: Alumno[] = ALUMNOS_SILAT.map(([clave, nombre]) => ({
    id: `silat-${clave}`,
    nombre,
    grupo: "Silat",
    activo: true,
  }));
  const sesiones: Sesion[] = FECHAS_SILAT.map((fecha, indice) => ({
    fecha,
    nota: "",
    registro: Object.fromEntries(
      ALUMNOS_SILAT.map(([clave, , ...estados]): [string, Estado] => [
        `silat-${clave}`,
        estados[indice],
      ]),
    ),
  }));
  return { alumnos, sesiones };
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
