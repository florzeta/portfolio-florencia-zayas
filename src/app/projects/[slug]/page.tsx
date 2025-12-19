import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectMediaGallery } from "@/components/ProjectMediaGallery";
import { ProjectToc } from "@/components/ProjectToc";
import { ButtonLink } from "@/components/ui/Button";
import { projects } from "@/data/projects";
import { assertNoUnversionedProjectAssets } from "@/lib/assets.server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

type ProjectPageProps = {
  params: { slug: string | string[] } | string | string[];
};

function normalizeSlug(input: string | string[] | undefined): string | null {
  const raw = Array.isArray(input) ? input[0] : input;
  if (!raw) return null;
  const trimmed = raw.trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return null;
  try {
    return decodeURIComponent(trimmed).toLowerCase();
  } catch {
    return trimmed.toLowerCase();
  }
}

async function resolveSlug(inputParams: unknown): Promise<string | null> {
  const resolvedParams = await Promise.resolve(inputParams);
  if (typeof resolvedParams === "string" || Array.isArray(resolvedParams)) {
    return normalizeSlug(resolvedParams);
  }
  if (
    resolvedParams &&
    typeof resolvedParams === "object" &&
    "slug" in (resolvedParams as Record<string, unknown>)
  ) {
    const slugValue = (resolvedParams as { slug: unknown }).slug;
    if (typeof slugValue === "string" || Array.isArray(slugValue)) {
      return normalizeSlug(slugValue);
    }
  }
  return null;
}

function getProjectByResolvedSlug(slug: string | null) {
  if (!slug) return undefined;
  if (process.env.NODE_ENV === "development" && (!projects || projects.length === 0)) {
    throw new Error("projects data is empty or undefined; cannot resolve slugs.");
  }
  return projects.find((p) => p.slug.toLowerCase() === slug);
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const slug = await resolveSlug(params);
  const project = getProjectByResolvedSlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.title} | Florencia Zayas Furnari`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Florencia Zayas Furnari`,
      description: project.summary,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const slug = await resolveSlug(params);
  const project = getProjectByResolvedSlug(slug);

  if (!project) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        `Slug mismatch: params=${JSON.stringify(
          params,
        )}, resolvedSlug=${slug}, available=${projects.map((p) => p.slug).join(",")}`,
      );
    }
    notFound();
  }

  assertNoUnversionedProjectAssets(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `https://portfolio-florencia-zayas.example.com/projects/${project.slug}`,
    author: { "@type": "Person", name: "Florencia Zayas Furnari" },
    inLanguage: "es-AR",
    keywords: project.tags,
    dateCreated: project.year,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pb-16 pt-8 md:pt-10">
        <Container className="space-y-10">
          {project ? <ProjectHero project={project} /> : null}

          <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
            <div className="space-y-10">
              {project.sections.map((section, idx) => (
                <Reveal key={section.id} delay={idx * 0.03}>
                  <section
                    id={section.id}
                    className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm"
                    aria-labelledby={`${section.id}-title`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2
                        id={`${section.id}-title`}
                        className="text-2xl font-bold text-foreground"
                      >
                        {section.title}
                      </h2>
                      <span className="text-xs uppercase tracking-[0.12em] text-muted">
                        {idx + 1}/{project.sections.length}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {section.body}
                    </p>
                    {section.bullets ? (
                      <ul className="mt-4 space-y-2 text-sm text-muted">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 rounded-lg bg-[#1f2d3d] px-3 py-2"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.media ? (
                      <div className="mt-5 overflow-hidden rounded-xl border border-[#2f4158] bg-[#0f1823]">
                        <Image
                          src={section.media.src}
                          alt={section.media.alt}
                          width={900}
                          height={520}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    ) : null}
                    {section.id === "solucion" && project.mediaGallery ? (
                      <div className="mt-6">
                        <ProjectMediaGallery mediaGallery={project.mediaGallery} />
                      </div>
                    ) : null}
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-foreground">Learnings</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted">
                    {project.learnings.map((learning) => (
                      <li
                        key={learning}
                        className="flex items-start gap-2 rounded-lg bg-[#1f2d3d] px-3 py-2"
                      >
                        <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                        <span>{learning}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              <Reveal>
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#24364d] bg-gradient-to-r from-[--color-surface] to-[#1b2a3a] p-6 shadow-lg">
                  <div className="flex-1 space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                      Próximo paso
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ¿Querés un flujo similar para tu producto?
                    </p>
                    <p className="text-sm text-muted">
                      UX/UI, UX Writing y front listo para medir en producción.
                    </p>
                  </div>
                  <ButtonLink href="/contact">Coordinar</ButtonLink>
                  <ButtonLink href="/projects" variant="outline">
                    Ver más proyectos
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <ProjectToc
              items={project.sections.map((section) => ({
                id: section.id,
                title: section.title,
              }))}
            />
          </div>
        </Container>
      </div>
    </>
  );
}

