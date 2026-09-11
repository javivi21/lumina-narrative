import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { AttendanceSheet } from "@/components/asistencia/AttendanceSheet";

export const Route = createFileRoute("/asistencia")({
  head: () => ({
    meta: [
      { title: "Lista de asistencia — Clases" },
      {
        name: "description",
        content:
          "Registro de asistencia de alumnos por clase y grupo, con porcentajes y exportación a CSV.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AsistenciaPage,
});

function AsistenciaPage() {
  return (
    <main>
      <Nav />
      <AttendanceSheet />
      <Footer />
    </main>
  );
}
