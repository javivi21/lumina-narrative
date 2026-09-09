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

## Backup en Google Drive

Cuenta: javivi21@gmail.com. Hay una copia de la asistencia registrada en
Sheets: "Lista de Asistencia Silat"
(https://docs.google.com/spreadsheets/d/1lhe-UzLaCQm8CpMZyW94vuMP-ZWMDzNGFdL4ckmVcTA/edit).
Cuando el usuario confirme asistencia de un día, además de anotarlo aquí en
el chat, añadir esa columna/día a esa hoja.

Carpetas de proyectos en Drive (sincronización local del PC del usuario,
prefijo `C--Users-Javi-Proyectos-...`): incluye
`C--Users-Javi-Proyectos-programa-anual-silat`, entre otras. Accesibles con
las herramientas de Google Drive.

## Historial de sesión (2026-09-09)

- Creada la página `/asistencia` (PR #2:
  https://github.com/javivi21/lumina-narrative/pull/2, draft).
- Alta inicial de 16 alumnos de Silat (se quitaron de la lista original:
  Jorge Pata y Nikita, y no se incluyeron: Susana, su hermana, Irene, el
  propio usuario, Oscar Lugo y Julio — eran admins/no alumnos del grupo de
  WhatsApp).
- Asistencia registrada (solo en el chat, pendiente de marcar en la app real
  porque el dato vive en el localStorage del móvil, no accesible desde
  aquí) del martes 08-09-2026: asistieron Rut, Sergio Silat, Lau Poli Silat,
  Laura Silat, Oscar Silat V, Pedro Felipe, RBK, Alberto Silat, Diego
  Morales, Elias Crazy D. No asistieron: Alejandro Granjero, Blancrow,
  DAVID Silat Bombero Forestal, Estefania, mariosandoval69, Jana.
- Aviso cron martes/jueves 22:00 programado, pero es **solo de esta
  sesión** (caduca a los 7 días) — no sobrevive a un reinicio de sesión.
  Hay que volver a pedirlo si hace falta.
- Limitación importante: esta memoria (CLAUDE.md + este archivo) es lo
  único que persiste entre sesiones. La asistencia real que el usuario
  marca en el móvil vive en `localStorage` del navegador y Claude no tiene
  acceso a ella; solo se sabe lo que el usuario dicta aquí en el chat.
