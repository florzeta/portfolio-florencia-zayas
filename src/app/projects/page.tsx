import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectsFilterGrid } from "@/components/ProjectsFilterGrid";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos | Florencia Zayas Furnari",
  description:
    "Casos de UX/UI, UX Writing, frontend en React y marketing/eCommerce.",
};

export default function ProjectsPage() {
  return (
    <div className="pb-16 pt-10 md:pt-12">
      <Container>
        <SectionHeader
          eyebrow="Portfolio"
          title="Proyectos"
          description="Casos end-to-end con foco en claridad, conversión y delivery rápido."
        />
        <div className="mt-8 rounded-3xl border border-[#24364d] bg-[--color-surface] p-6 shadow-lg">
          <ProjectsFilterGrid projects={projects} />
        </div>
      </Container>
    </div>
  );
}

