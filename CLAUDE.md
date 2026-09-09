# Lista de Asistencia (Silat)

Página: `src/routes/asistencia.tsx` — clases martes y jueves 22:00, 16 plazas
(se reservan 3 por si se llena), datos guardados en `localStorage` del navegador.

## Comandos del usuario

Cuando el usuario diga cualquiera de estas frases:

- "lista de asistencia"
- "arranca la lista de asistencia"
- "saca la lista de asistencia"

→ Responder con la **estadística** de todos los alumnos (asistencias del
periodo actual: semana, mes, trimestre, semestre o año, según pida).

Cuando el usuario diga:

- "saca la lista de asistencia para marcar"
- "lista de asistencia para marcar"

→ Responder con la **lista numerada** de alumnos del día para que el
usuario diga qué números asistieron, y registrarlo.

Si no lo pide, recordárselo martes y jueves a las 22:00.
