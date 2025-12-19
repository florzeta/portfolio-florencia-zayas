import { CertificationsList } from "@/components/CertificationsList";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { brandingLibrary } from "@/data/branding";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Florencia Zayas Furnari | UX/UI, UX Writing & Frontend",
  description:
    "Diseño experiencias claras y medibles: UX/UI, UX Writing, research y frontend en React para eCommerce y marketing digital.",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Florencia Zayas Furnari",
  url: "https://portfolio-florencia-zayas.example.com",
  jobTitle: "Product Designer · UX Writer · Frontend",
  sameAs: [
    "https://www.linkedin.com/in/florencia-zayas",
    "mailto:hola@florenciazayas.com",
  ],
  knowsAbout: [
    "UX/UI",
    "UX Writing",
    "Frontend",
    "React",
    "eCommerce",
    "Marketing digital",
  ],
};

const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
const featuredBranding = [...brandingLibrary]
  .sort((a, b) => Number(b.featured) - Number(a.featured))
  .slice(0, 6);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="space-y-20 pb-20 pt-10 md:pt-12">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                Claridad de oferta · Menos fricción · UI lista para crecer
              </p>
              <h1 className="text-4xl font-black leading-tight text-foreground md:text-5xl">
                Diseño, contenido y código para marcas con venta real: cafés, fitness, ecommerce local.
              </h1>
              <p className="max-w-2xl text-lg text-muted">
                Integro UX/UI, UX Writing y frontend en React: defino la propuesta, escribo el microcopy y
                construyo la UI para validar rápido, reducir fricción y mantener performance en productos físicos y digitales.
              </p>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[--color-accent]">
                UX + código + conversión
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects">Ver proyectos</ButtonLink>
                <ButtonLink
                  href="/cv/florencia-zayas-cv.pdf"
                  variant="outline"
                  download
                >
                  Descargar CV
                </ButtonLink>
                <ButtonLink
                  href="https://www.linkedin.com/in/florencia-zayas"
                  variant="ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-[#24364d] bg-[--color-surface] p-6 shadow-xl">
              <div className="mb-4 flex items-center gap-3 text-sm font-semibold text-muted">
                <span className="h-3 w-3 rounded-full bg-[--color-accent]" />
                Cómo trabajo
              </div>
              <ul className="space-y-4 text-sm text-muted">
                <li className="rounded-2xl bg-[#1f2d3d] p-4">
                  <p className="text-foreground font-semibold">De la hipótesis a la acción</p>
                  <p>Experimentos A/B, prototipos medibles y entregas iterativas.</p>
                </li>
                <li className="rounded-2xl bg-[#1f2d3d] p-4">
                  <p className="text-foreground font-semibold">
                    Claridad en contenido y UI
                  </p>
                  <p>Microcopy, jerarquía visual y accesibilidad sin ruido.</p>
                </li>
                <li className="rounded-2xl bg-[#1f2d3d] p-4">
                  <p className="text-foreground font-semibold">Frontend para validar</p>
                  <p>React/Next, animaciones sutiles y performance cuidada.</p>
                </li>
              </ul>
            </div>
          </Reveal>
        </Container>

        <Container>
          <SectionHeader
            eyebrow="Qué hago"
            title="Diseño listo para negocio"
            description="Conversión, contenido y UI escalable aplicados a cafés, fitness y ecommerce local."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Conversión y performance",
                body: "Landing/catalogo claros y rápidos; señal útil para marketing sin fricción.",
              },
              {
                title: "Microcopy sin fricción",
                body: "Mensajes que guían pago/recarga, reducen errores y bajan soporte.",
              },
              {
                title: "UI escalable para equipos",
                body: "Componentes accesibles, tokens compartidos y guías para escalar marcas y servicios.",
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[#24364d] bg-[--color-surface] p-5 shadow-sm">
                  <div className="space-y-3">
                    <p className="text-xl font-bold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted">{item.body}</p>
                  </div>
                  <div className="mt-6 h-1 w-16 rounded-full bg-[--color-accent]" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>

        <Container>
          <SectionHeader
            eyebrow="Proyectos"
            title="Casos destacados"
            description="Trabajo end-to-end: research ligero, UX Writing, UI y front listo para medir."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProjects
              .sort((a, b) => {
                if (a.slug === "wave-cafe-experiencia") return -1;
                if (b.slug === "wave-cafe-experiencia") return 1;
                if (a.slug === "microcopy-friccion-baja") return -1;
                if (b.slug === "microcopy-friccion-baja") return 1;
                return 0;
              })
              .map((project) => (
              <Reveal key={project.slug}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/projects" variant="outline">
              Ver todos los proyectos
            </ButtonLink>
          </div>
        </Container>

        <Container>
          <SectionHeader
            eyebrow="Branding de marcas"
            title="Identidades listas para escalar"
            description="Logos, paletas y sistemas para redes, packaging y lanzamientos."
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredBranding.map((item) => (
              <Reveal key={item.slug} delay={0.01}>
                <a
                  href={`/branding/${item.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#24364d] bg-[--color-surface] shadow-sm"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-[--color-soft]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                      <span className="h-2 w-2 rounded-full bg-[--color-accent]" aria-hidden />
                      <span>{item.industry}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted">{item.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[--color-accent]">
                      Ver branding
                      <span aria-hidden className="transition group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink href="/branding" variant="outline">
              Ver biblioteca de branding
            </ButtonLink>
          </div>
        </Container>

        <Container>
          <SectionHeader
            eyebrow="Certificaciones"
            title="Formación y avales"
            description="Aprendizaje continuo en UX, contenido y analítica."
          />
          <div className="mt-6">
            <CertificationsList />
          </div>
        </Container>

        <Container>
          <div className="rounded-3xl border border-[#24364d] bg-gradient-to-r from-[--color-surface] to-[#1b2a3a] p-8 shadow-lg md:p-10">
            <SectionHeader
              eyebrow="Contacto"
              title="¿Conversamos?"
              description="Proyectos de UX/UI, UX Writing, CRO o front-end en React. Respondo rápido."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Escribir mensaje</ButtonLink>
              <ButtonLink href="mailto:hola@florenciazayas.com" variant="outline">
                hola@florenciazayas.com
              </ButtonLink>
              <ButtonLink
                href="https://www.linkedin.com/in/florencia-zayas"
                variant="ghost"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
