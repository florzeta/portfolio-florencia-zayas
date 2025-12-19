# Learnings

- Tailwind v4: la personalización vive en `globals.css` con `@theme` y variables; no hay `tailwind.config.ts`, así que los colores/tipografías se mapearon a tokens (`bg-background`, `text-muted`, etc.).
- Animaciones accesibles: `useReducedMotion` se usa en `Reveal`, en el template de páginas y en cards para respetar `prefers-reduced-motion` y acortar duraciones.
- Transiciones entre páginas y layout compartido: `src/app/template.tsx` con `AnimatePresence + LayoutGroup` permite el fade/slide global y reutiliza `layoutId` entre `ProjectCard` y `ProjectHero`.
- Datos tipados: los modelos viven en `src/types/content.ts` y los seeds en `src/data/*`, así las páginas se mantienen server-friendly y fáciles de traducir/expandir.
- JSON-LD: Persona en home y CreativeWork por proyecto en detalle para mejorar SEO sin depender de librerías extra.
- Node built-ins: evitar `fs/path` en helpers de assets; si se necesitan, usarlos solo en scripts o helpers estrictamente server, pero los componentes cliente deben consumir solo utilidades string-safe.

