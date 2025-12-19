// Projects = case studies (detalle end-to-end). No incluir piezas sueltas de branding aquí.
import { Project } from "@/types/content";

export const projects: Project[] = [
  {
    title: "Wave Café — Café de especialidad",
    slug: "wave-cafe-experiencia",
    summary:
      "Sistema visual y contenido para un café de especialidad que atrae, guía y convierte visitas en recurrencia.",
    role: "UX/UI · UX Writing · Branding aplicado · Frontend-ready",
    year: "2024",
    featured: true,
    tags: ["UX/UI", "UX Writing", "Marketing"],
    // Nota: versionar nombres (p. ej. -v2) para evitar caché de hero desactualizado.
    cover: "/projects/wave-cafe/wave-cafe__hero--desktop__v02.png",
    accent: "#7dd3fc",
    heroImage: {
      src: "/projects/wave-cafe/wave-cafe__hero--desktop__v02.png",
      alt: "Barra y mesas de Wave Café en Núñez con tonos tierra y luz cálida",
    },
    mediaGallery: [
      {
        group: "Instagram",
        items: [
          {
            src: "/projects/wave-cafe/wave-cafe-instagram-feed-grilla.png",
            alt: "Grilla de Instagram de Wave Café con promos y menú consistentes",
            caption: "Feed armado con la misma paleta y microcopy directo.",
          },
        ],
      },
      {
        group: "Packaging",
        items: [
          {
            src: "/projects/wave-cafe/wave-cafe-packaging-kit.png",
            alt: "Kit de packaging Wave Café con paleta tierra y acentos celestes",
            caption: "Kit base para escalar a e-commerce y envíos.",
          },
          {
            src: "/projects/wave-cafe/wave-cafe-packaging-bolsa-papel.png",
            alt: "Bolsa de papel Wave Café con logo y claim en celeste",
          },
          {
            src: "/projects/wave-cafe/wave-cafe-packaging-vaso-takeaway.png",
            alt: "Vaso takeaway de Wave Café con pattern y logo",
          },
          {
            src: "/projects/wave-cafe/wave-cafe-packaging-sticker-logo.png",
            alt: "Sticker redondo de Wave Café con isotipo",
          },
        ],
      },
      {
        group: "Brand",
        items: [
          {
            src: "/projects/wave-cafe/wave-cafe-branding-logo-principal.png",
            alt: "Logo principal de Wave Café en composición horizontal",
          },
          {
            src: "/projects/wave-cafe/wave-cafe-branding-moodboard.png",
            alt: "Moodboard de tonos tierra y texturas para Wave Café",
          },
          {
            src: "/projects/wave-cafe/wave-cafe-icon-set.png",
            alt: "Set de íconos de Wave Café en estilo lineal",
          },
        ],
      },
    ],
    metrics: [
      {
        label: "Consistencia de marca",
        value: "Feed y piezas alineadas — fácil de reconocer",
      },
      {
        label: "CTA claros",
        value: "Ubicación y reserva visibles — menos fricción al visitar",
      },
      {
        label: "Menú escaneable",
        value: "Lectura rápida en mobile — decide sin dudas",
      },
    ],
    sections: [
      {
        id: "contexto",
        title: "Contexto",
        body: "Café de especialidad en un barrio competitivo; comunidad de teletrabajo y vecinos, marca fuerte pero mensajes dispersos en Instagram y piezas.",
      },
      {
        id: "rol",
        title: "Rol",
        body: "End-to-end: apliqué branding, diseñé UI, escribí microcopy y dejé componentes listos para front, manteniendo tono y consistencia.",
      },
      {
        id: "problema",
        title: "Problema",
        body: "Identidad visual inconsistente y feed inspiracional sin narrativa; menú, experiencia y CTA sin jerarquía ni guía hacia la visita.",
      },
      {
        id: "decisiones",
        title: "Decisiones",
        bullets: [
          "Paleta tierra cálida + acentos propios: evitamos look genérico y mantenemos cercanía sin perder modernidad.",
          "Microcopy directo para menú, promos y ubicación: menos adjetivos, más acciones y horarios claros.",
          "Jerarquía mobile-first: bloques de menú/experiencia/CTA con títulos cortos y precios alineados para escaneo rápido.",
          "CTA visibles e integrados: ubicación y reserva destacadas sin promos agresivas ni overlays que rompan la experiencia.",
        ],
        body: "Cada decisión buscó claridad y coherencia: prioridad a la lectura rápida y a la narrativa de marca sobre recursos decorativos o promos intrusivas.",
      },
      {
        id: "solucion",
        title: "Solución",
        body: "Sistema visual completo para Instagram y piezas de marca: feed, historias, cards de productos y promos consistentes; base reusable para packaging y futura web/e-commerce liviano.",
        media: {
          src: "/projects/wave-cafe/wave-cafe-instagram-feed-grilla.png",
          alt: "Grilla de Instagram de Wave Café con promos y menú en la misma estética",
        },
      },
      {
        id: "resultados",
        title: "Resultados",
        body: "Coherencia visual y narrativa clara; menú y promos se leen rápido y el Instagram sirve como canal de atracción real, no solo inspiración.",
      },
    ],
    learnings: [
      "Una narrativa visual única entre feed y piezas reduce fricción y rework.",
      "Definir jerarquía y CTA temprano evita que el estilo opaque la conversión.",
      "Sistemas simples y reusables facilitan escalar a web/e-commerce sin rediseñar.",
    ],
  },
  {
    title: "Microcopy que reduce fricción",
    slug: "microcopy-friccion-baja",
    summary:
      "Mensajes claros en pago/recarga: errores accionables, estados vacíos útiles y tono consistente.",
    role: "UX Writing · UX/UI",
    year: "2023",
    featured: true,
    tags: ["UX Writing", "UX/UI", "Marketing"],
    cover: "/images/recargas-cover.svg",
    accent: "#f9a8d4",
    metrics: [
      {
        label: "-20% errores",
        value: "Menos errores de ingreso — menos reprocesos en soporte",
      },
      {
        label: "+10% self-service",
        value: "Más usuarios completan solos — menos intervención de agentes",
      },
      { label: "NPS +5", value: "Mejor claridad percibida — confianza mayor" },
    ],
    sections: [
      {
        id: "contexto",
        title: "Contexto",
        body: "Flujos de pago y recarga con usuarios diversos generaban tickets por mensajes ambiguos.",
      },
      {
        id: "rol",
        title: "Rol",
        body: "UX Writing y UX/UI: tono, microcopy, mensajes de error, estados vacíos y ayudas contextuales.",
      },
      {
        id: "problema",
        title: "Problema",
        body: "Usuarios se trababan en operador, montos y métodos; agentes repetían explicaciones básicas.",
      },
      {
        id: "decisiones",
        title: "Decisiones",
        bullets: [
          "Mensajes en voz activa con ejemplos concretos en lugar de descripciones largas.",
          "Errores en línea con solución inmediata (“Ingresá 10 a 500 ARS”).",
          "Resumen confirmable y terminología consistente en todo el flujo.",
          "Ayuda rápida para agentes y usuarios en la misma vista.",
        ],
        body: "El lenguaje se enfocó en acción y consistencia para evitar reinterpretaciones.",
      },
      {
        id: "solucion",
        title: "Solución",
        body: "UI con pasos cortos, validaciones tempranas y microcopy específico por campo. Estados vacíos informativos y ejemplos numéricos.",
        media: { src: "/images/recargas-flow.svg", alt: "Pantallas con microcopy guiado" },
      },
      {
        id: "resultados",
        title: "Resultados",
        body: "Menos errores, más autogestión y menos escalaciones; el tono uniforme alineó a usuarios y agentes.",
      },
    ],
    learnings: [
      "Consistencia de términos evita tickets repetidos.",
      "Errores accionables ahorran soporte más que FAQs aparte.",
      "Ayuda en el flujo se usa; fuera del flujo se ignora.",
    ],
  },
  {
    title: "Librería de UI para equipos mixtos",
    slug: "libreria-ui-react",
    summary:
      "Librería de componentes en React/Tailwind con tokens compartidos y guías de uso para squads.",
    role: "Frontend · UX/UI · Documentación",
    year: "2022",
    featured: true,
    tags: ["Frontend", "UX/UI", "Marketing"],
    cover: "/images/dashboard-cover.svg",
    accent: "#c4b5fd",
    metrics: [
      {
        label: "30+ comps",
        value: "Catálogo inicial con 30 componentes — arranque sólido",
      },
      {
        label: "-25% retrabajo",
        value: "Menos retrabajo de UI — squads alineadas",
      },
      {
        label: "Accesibilidad",
        value: "Focus states y roles listos — QA más simple",
      },
    ],
    sections: [
      {
        id: "contexto",
        title: "Contexto",
        body: "Marketing, contenido y devs de varias squads requerían una base única; antes cada landing/dashboard/auth salía con estilos distintos, foco invisible y handoffs lentos.",
      },
      {
        id: "rol",
        title: "Rol",
        body: "Diseñé componentes, los implementé en React/Tailwind y los documenté con props y ejemplos para que producto y devs trabajen sobre la misma API.",
      },
      {
        id: "problema",
        title: "Problema",
        body: "Estilos inconsistentes y accesibilidad débil (focus invisible) generaban retrabajo; cada squad rehacía botones y banners con criterios distintos.",
      },
      {
        id: "decisiones",
        title: "Decisiones",
        bullets: [
          "Tokens únicos de color/tipografía/espaciado con contraste mínimo: evitamos paletas por squad y unificamos base.",
          "Focos visibles y variantes accesibles por defecto: priorizamos esto sobre gradients decorativos que se descartaron.",
          "Ejemplos de código + guías de microcopy por componente: una sola API y tono; evitamos docs genéricas sin casos reales.",
          "Historias de QA breves y criterios claros: preferimos checks rápidos a specs extensas difíciles de mantener.",
        ],
        body: "Estandarizamos primero lo reusable y accesible, dejando afuera variantes visuales que no sumaban velocidad ni claridad.",
      },
      {
        id: "solucion",
        title: "Solución",
        body: "Librería modular con botones, inputs, cards, navegación y banners; documentación con sandbox y casos por rol para reusar sin reinterpretar.",
        media: { src: "/images/dashboard-flow.svg", alt: "Componentes documentados" },
      },
      {
        id: "resultados",
        title: "Resultados",
        body: "Menos retrabajo y handoffs más rápidos; squads lanzaron landings y dashboards con la misma base accesible, compartiendo tokens y pautas de copy.",
      },
    ],
    learnings: [
      "API clara + guías de uso evitan deuda tanto como el código.",
      "Tokens compartidos permiten que diseño y dev avancen en paralelo.",
      "Accesibilidad por defecto reduce QA y retrabajo a futuro.",
    ],
  },
];

