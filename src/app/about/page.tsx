import { Container } from "@/components/layout/Container";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ButtonLink } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí | Florencia Zayas Furnari",
  description:
    "Trayectoria en UX/UI, UX Writing y frontend con foco en eCommerce y marketing digital.",
};

export default function AboutPage() {
  return (
    <div className="pb-16 pt-10 md:pt-12">
      <Container className="space-y-14">
        <SectionHeader
          eyebrow="Sobre mí"
          title="Diseño para que el negocio y el usuario ganen"
          description="Combino research ligero, UX Writing, UI y desarrollo en React para lanzar rápido y aprender antes."
        />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="space-y-4 text-lg text-muted">
              <p>
                Vengo de marketing y UX Writing, y encontré en el frontend una forma
                de validar ideas sin esperar semanas. Me gusta convertir
                aprendizajes en pequeños lanzamientos medibles, siempre con una
                narrativa clara y accesible.
              </p>
              <p>
                Trabajo cerca de negocio y tecnología: priorización con datos,
                historias de usuario concretas y componentes reutilizables.
              </p>
              <p>
                Hoy me enfoco en eCommerce y servicios digitales B2C/B2B,
                acompañando lanzamientos, optimizando flujos de compra y creando
                contenido que guía sin distraer.
              </p>
              <p className="text-sm font-semibold text-[--color-accent]">
                Actualmente abierta a roles remotos o híbridos (AR).
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                Especialidades
              </p>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                  <span>Flujos críticos mobile-first y diseño de experimentos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                  <span>Microcopy, estados vacíos y mensajes de confianza.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                  <span>Frontend en React/Next con accesibilidad y performance.</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          <SectionHeader
            eyebrow="Experiencia"
            title="Recorrido"
            description="Equipos de producto, marketing y contenido trabajando juntos."
          />
          <ExperienceTimeline />
        </div>

        <div className="space-y-6">
          <SectionHeader
            eyebrow="Habilidades"
            title="Toolkit"
            description="Capas de producto, contenido y frontend para lanzar y medir."
          />
          <SkillsGrid />
        </div>

        <Reveal>
          <div className="flex flex-wrap items-center gap-3 rounded-3xl border border-[#24364d] bg-gradient-to-r from-[--color-surface] to-[#1b2a3a] p-6 shadow-lg">
            <div className="flex-1 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                Contacto
              </p>
              <p className="text-lg font-bold text-foreground">
                ¿Sumamos una conversación rápida?
              </p>
              <p className="text-sm text-muted">
                Escribime al correo o por LinkedIn y coordinamos próxima acción.
              </p>
            </div>
            <ButtonLink href="mailto:hola@florenciazayas.com" variant="primary">
              Email
            </ButtonLink>
            <ButtonLink
              href="https://www.linkedin.com/in/florencia-zayas"
              variant="outline"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

