# Portafolio de Florencia Zayas Furnari

Sitio personal en Next.js (App Router) con tema oscuro, animaciones sutiles y foco en performance/accesibilidad. Contenido en español (es-AR).

## Stack
- Next.js 16 (App Router) + TypeScript.
- Tailwind CSS v4 con tokens en `src/app/globals.css`.
- Montserrat (next/font/google).
- Framer Motion para transiciones, reveal y layout compartido.

## Rutas
- `/` Home con hero, qué hago, proyectos destacados, certificaciones y CTA.
- `/projects` Índice con filtros por tags.
- `/projects/[slug]` Detalle con TOC sticky, métricas y learnings (layout animado).
- `/about` Narrativa, timeline de experiencia y skills.
- `/contact` Datos de contacto + formulario UI (sin backend).

## Datos
- Tipos en `src/types/content.ts`.
- Seeds en `src/data/` (proyectos, experiencia, certificaciones, skills).
- Imágenes de portada/flujo en `public/images/*`.

## Scripts
- `npm run dev` levantar en `http://localhost:3000` (usa Webpack: `next dev --webpack`).
- `npm run lint` chequear ESLint.
- `npm run build` build de producción, `npm start` para servir el build.
- `npm run validate:assets` validar que las rutas de imágenes en `src/data/projects.ts` existan en `public/`.
- `npm run check:assets` valida assets de proyectos y branding contra `/public/` (usa data en `src/data/`).

**Nota dev en Windows/Turbopack:** en Windows Turbopack puede mostrar overlays de “Invalid source map”. Este proyecto usa Webpack en dev (`next dev --webpack`) para evitarlos. Es un tema solo de desarrollo; los builds productivos no se afectan.

## Accesibilidad y animaciones
- Tema oscuro por defecto (fondo `#141e2a`, texto `#e2e2d4`, acento `#7dd3fc`).
- `prefers-reduced-motion` respetado en reveal, transiciones y hover.
- Navegación con foco visible, skip link y estructura semántica (un solo `h1` por página).
- JSON-LD: Persona en home y CreativeWork en cada proyecto.

## Deploy
- Build estático listo para Vercel u otro host Node. Recomendado: `npm run build && npm start`.

## Notas para dev
- Si reemplazás una imagen estática con el mismo nombre, Next/Image y el navegador pueden servir la versión cacheada. Versioná el nombre (ej.: `hero--v03.png`) y actualizá la ruta en `src/data/` para asegurar la invalicación.

## Convenciones de assets
- Carpetas: `/public/projects/<slug>/{hero,brand,instagram,packaging}`.
- Naming: `<project>-<asset>-<descriptor>-v<n>.<ext>` (ej.: `wave-cafe-hero-especialidad-nunez-v03.png`).
- Regla: nunca reemplazar un archivo con el mismo nombre; si cambia la imagen, subí un archivo con versión nueva y actualizá la referencia en `src/data/`.
