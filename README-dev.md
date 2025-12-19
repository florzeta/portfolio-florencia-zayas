# Notas rápidas para reiniciar Next.js en Windows

- Asegurate de tener **un solo** `npm run dev` activo.
- Si queda el lock `/.next/dev/lock`:
  1) Cerrá la consola que corría `npm run dev` (Ctrl+C).
  2) Opcional: matá procesos Node colgados: `Get-Process node | Stop-Process -Force` (PowerShell).
  3) Borrá la carpeta `.next`: `Remove-Item -Recurse -Force .next` (PowerShell).
  4) Volvé a levantar: `npm run dev`.
- Si el puerto 3000 está ocupado, Next moverá el dev server (ej. 3001). Cerrá el proceso que usa 3000 si querés mantenerlo fijo.

No se cambió ningún script: el único comando para levantar dev es `npm run dev`.

