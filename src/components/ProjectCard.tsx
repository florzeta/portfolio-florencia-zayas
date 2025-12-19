"use client";

import { Project } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#24364d] bg-[--color-surface] shadow-sm"
      whileHover={
        prefersReducedMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
      }
    >
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col">
        <motion.div
          layoutId={`project-${project.slug}-image`}
          className="relative h-52 w-full overflow-hidden bg-[--color-soft]"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        </motion.div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            <span className="h-2 w-2 rounded-full bg-[--color-accent]" aria-hidden />
            <span>{project.year}</span>
          </div>
          <motion.h3
            layoutId={`project-${project.slug}-title`}
            className="text-xl font-bold text-foreground"
          >
            {project.title}
          </motion.h3>
          <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#1f2d3d] px-3 py-1 text-[0.78rem] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent]">
            Ver caso
            <span aria-hidden className="transition group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

