import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | Florencia Zayas Furnari",
  description:
    "Hablemos de UX/UI, UX Writing, frontend y optimización para eCommerce.",
};

export default function ContactPage() {
  return (
    <div className="pb-16 pt-10 md:pt-12">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Contacto"
          title="Hablemos"
          description="Proyectos, consultoría o talleres para equipos de producto y marketing."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-[#24364d] bg-[--color-surface] p-6 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                Datos de contacto
              </p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                <p>
                  <span className="font-semibold text-foreground">Email: </span>
                  <a
                    className="underline-offset-4 hover:text-foreground hover:underline"
                    href="mailto:hola@florenciazayas.com"
                  >
                    hola@florenciazayas.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">LinkedIn: </span>
                  <a
                    className="underline-offset-4 hover:text-foreground hover:underline"
                    href="https://www.linkedin.com/in/florencia-zayas"
                  >
                    /florencia-zayas
                  </a>
                </p>
                <p>
                  Prefiero mensajes breves con contexto de negocio y objetivos. Respondo
                  en menos de 24 hs hábiles.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="mailto:hola@florenciazayas.com">
                  Enviar email
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
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form
              className="space-y-4 rounded-3xl border border-[#24364d] bg-[--color-surface] p-6 shadow-lg"
              aria-describedby="contact-help"
            >
              <div className="grid gap-3">
                <label className="text-sm font-semibold text-foreground" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  className="rounded-xl border border-[#2f4158] bg-[#0f1823] px-4 py-3 text-sm text-foreground placeholder:text-[#52637a] focus:border-[--color-accent] focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-semibold text-foreground" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nombre@ejemplo.com"
                  className="rounded-xl border border-[#2f4158] bg-[#0f1823] px-4 py-3 text-sm text-foreground placeholder:text-[#52637a] focus:border-[--color-accent] focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                <label
                  className="text-sm font-semibold text-foreground"
                  htmlFor="mensaje"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Proyecto, objetivos, plazos..."
                  className="rounded-xl border border-[#2f4158] bg-[#0f1823] px-4 py-3 text-sm text-foreground placeholder:text-[#52637a] focus:border-[--color-accent] focus:outline-none"
                />
              </div>
              <p id="contact-help" className="text-xs text-muted">
                Formulario de ejemplo sin backend. Enviá un mail directo para coordinar.
              </p>
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-full bg-[--color-accent] px-4 py-3 text-sm font-semibold text-[#0f1823] transition hover:bg-[--color-accent-strong] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--outline]"
                disabled
              >
                Enviar (solo UI)
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}

