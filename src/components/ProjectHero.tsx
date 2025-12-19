"use client";

import { Project } from "@/types/content";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type ProjectHeroProps = {
  project: Project;
};

function resolveHeroImage(project: Project) {
  const fallbackSrc = project.cover || "/next.svg";
  const src = project.heroImage?.src ?? fallbackSrc;
  const alt = project.heroImage?.alt ?? project.title;
  return { src, alt };
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroImage = resolveHeroImage(project);

  return (
    <div className="overflow-hidden rounded-3xl border border-[#24364d] bg-gradient-to-br from-[--color-surface] to-[#121b28] shadow-lg">
      <motion.div
        className="relative h-[320px] w-full bg-[--color-soft]"
        layoutId={`project-${project.slug}-image`}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
      </motion.div>
      <div className="grid gap-6 p-8 md:grid-cols-[2fr,1fr] md:items-center">
        <div className="space-y-3">
          <motion.h1
            layoutId={`project-${project.slug}-title`}
            className="text-3xl font-black leading-tight text-foreground md:text-4xl"
          >
            {project.title}
          </motion.h1>
          <p className="text-lg text-muted">{project.summary}</p>
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-muted">
            <span className="rounded-full bg-[#1f2d3d] px-3 py-1">
              {project.role}
            </span>
            <span className="rounded-full bg-[#1f2d3d] px-3 py-1">{project.year}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#1f2d3d] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 rounded-2xl border border-[#24364d] bg-[#1c2a3b] p-4 text-sm text-muted">
          {project.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 6 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.05 }}
              className="flex items-center justify-between rounded-lg bg-[#22354a] px-3 py-2"
            >
              <span className="font-semibold text-foreground">{metric.label}</span>
              <span>{metric.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

