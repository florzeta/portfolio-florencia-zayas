"use client";

import { Project } from "@/types/content";
import { useMemo, useState } from "react";
import { Reveal } from "./motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import { Chip } from "./ui/Chip";

const allTags = ["Todos", "UX/UI", "UX Writing", "Frontend", "Marketing"] as const;

type ProjectsFilterGridProps = {
  projects: Project[];
};

export function ProjectsFilterGrid({ projects }: ProjectsFilterGridProps) {
  const [selected, setSelected] = useState<(typeof allTags)[number]>("Todos");

  const filtered = useMemo(() => {
    if (selected === "Todos") return projects;
    return projects.filter((project) => project.tags.includes(selected));
  }, [projects, selected]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {allTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            selected={selected === tag}
            onClick={() => setSelected(tag)}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

