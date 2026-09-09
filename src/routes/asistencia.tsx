import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/asistencia")({
  head: () => ({
    meta: [{ title: "Lista de Asistencia — Martes y Jueves 22:00" }],
  }),
  component: AsistenciaPage,
});

const STORAGE_KEY = "asistencia-silat";
const MAX_PLAZAS = 16;

const DEFAULT_STUDENT_NAMES = [
  "Rut",
  "Sergio Silat",
  "Alejandro Granjero",
  "Blancrow",
  "DAVID Silat Bombero Forestal",
  "Estefania",
  "Lau Poli Silat",
  "mariosandoval69",
  "Laura Silat",
  "Oscar Silat V",
  "Pedro Felipe",
  "RBK",
  "Alberto Silat",
  "Diego Morales",
  "Elias Crazy D",
  "Jana",
];

interface Student {
  id: string;
  name: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string; // YYYY-MM-DD
  present: boolean;
}

interface StoredData {
  students: Student[];
  records: AttendanceRecord[];
}

function defaultData(): StoredData {
  return {
    students: DEFAULT_STUDENT_NAMES.map((name) => ({ id: crypto.randomUUID(), name })),
    records: [],
  };
}

function loadData(): StoredData {
  if (typeof window === "undefined") return { students: [], records: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return JSON.parse(raw) as StoredData;
  } catch {
    return defaultData();
  }
}

function saveData(data: StoredData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore write errors (private mode, quota, etc.)
  }
}

// Returns the most recent Tuesday or Thursday (including today) in YYYY-MM-DD.
function lastClassDate(): string {
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const day = d.getDay(); // 2 = Tuesday, 4 = Thursday
    if (day === 2 || day === 4) {
      return d.toISOString().slice(0, 10);
    }
  }
  return today.toISOString().slice(0, 10);
}

function monthKey(date: string) {
  return date.slice(0, 7); // YYYY-MM
}

function yearKey(date: string) {
  return date.slice(0, 4); // YYYY
}

function AsistenciaPage() {
  const [data, setData] = useState<StoredData>({ students: [], records: [] });
  const [newStudentName, setNewStudentName] = useState("");
  const [selectedDate, setSelectedDate] = useState(lastClassDate());
  const [statsScope, setStatsScope] = useState<"month" | "year">("month");

  useEffect(() => {
    setData(loadData());
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const dayOfWeek = new Date(selectedDate + "T12:00:00").getDay();
  const isClassDay = dayOfWeek === 2 || dayOfWeek === 4;

  const recordsForDate = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const r of data.records) {
      if (r.date === selectedDate) map.set(r.studentId, r.present);
    }
    return map;
  }, [data.records, selectedDate]);

  function addStudent() {
    const name = newStudentName.trim();
    if (!name) return;
    const id = crypto.randomUUID();
    setData((d) => ({ ...d, students: [...d.students, { id, name }] }));
    setNewStudentName("");
  }

  function removeStudent(id: string) {
    setData((d) => ({
      students: d.students.filter((s) => s.id !== id),
      records: d.records.filter((r) => r.studentId !== id),
    }));
  }

  function togglePresent(studentId: string, present: boolean) {
    setData((d) => {
      const existing = d.records.filter(
        (r) => !(r.studentId === studentId && r.date === selectedDate)
      );
      return {
        ...d,
        records: [...existing, { studentId, date: selectedDate, present }],
      };
    });
  }

  const scopeKey = statsScope === "month" ? monthKey(selectedDate) : yearKey(selectedDate);

  const stats = useMemo(() => {
    return data.students.map((student) => {
      const studentRecords = data.records.filter((r) => {
        if (r.studentId !== student.id) return false;
        const key = statsScope === "month" ? monthKey(r.date) : yearKey(r.date);
        return key === scopeKey;
      });
      const attended = studentRecords.filter((r) => r.present).length;
      const total = studentRecords.length;
      return { student, attended, total };
    });
  }, [data.students, data.records, scopeKey, statsScope]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-foreground">Lista de Asistencia — Silat</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Clases: martes y jueves, 22:00. Marca quién asistió cada día para llevar estadística
        mensual y anual.
      </p>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">Alumnos</CardTitle>
          <span
            className={`text-sm font-medium ${
              data.students.length >= MAX_PLAZAS ? "text-red-600" : "text-muted-foreground"
            }`}
          >
            Plazas: {data.students.length}/{MAX_PLAZAS}
          </span>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Nombre del alumno"
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addStudent()}
              disabled={data.students.length >= MAX_PLAZAS}
            />
            <Button onClick={addStudent} disabled={data.students.length >= MAX_PLAZAS}>
              Añadir
            </Button>
          </div>
          {data.students.length >= MAX_PLAZAS && (
            <p className="mt-2 text-sm text-red-600">Lista completa, sin plazas libres.</p>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">Asistencia del día</CardTitle>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </CardHeader>
        <CardContent>
          {!isClassDay && (
            <p className="mb-3 text-sm text-amber-600">
              Este día no es martes ni jueves, pero puedes registrar asistencia igualmente.
            </p>
          )}
          {data.students.length === 0 ? (
            <p className="text-sm text-muted-foreground">Añade alumnos para empezar.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumno</TableHead>
                  <TableHead className="w-24 text-center">Asistió</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-center">
                      <Checkbox
                        checked={recordsForDate.get(student.id) ?? false}
                        onCheckedChange={(checked) =>
                          togglePresent(student.id, checked === true)
                        }
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStudent(student.id)}
                      >
                        Quitar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">
            Estadística {statsScope === "month" ? `mensual (${scopeKey})` : `anual (${scopeKey})`}
          </CardTitle>
          <Select value={statsScope} onValueChange={(v) => setStatsScope(v as "month" | "year")}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mensual</SelectItem>
              <SelectItem value="year">Anual</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {stats.length === 0 ? (
            <p className="text-sm text-muted-foreground">Sin datos todavía.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumno</TableHead>
                  <TableHead className="text-center">Asistencias</TableHead>
                  <TableHead className="text-center">Clases registradas</TableHead>
                  <TableHead className="text-center">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.map(({ student, attended, total }) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell className="text-center">{attended}</TableCell>
                    <TableCell className="text-center">{total}</TableCell>
                    <TableCell className="text-center">
                      {total > 0 ? Math.round((attended / total) * 100) : 0}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
