import { Project } from "@/types/content";

const versionPattern = /-v\d+(?=\.[a-zA-Z0-9]+$)/;

function isVersioned(src?: string | null) {
  if (!src) return true;
  return versionPattern.test(src);
}

export function assertNoUnversionedProjectAssets(project: Project): void {
  if (process.env.NODE_ENV !== "development") return;

  const warnings: string[] = [];

  if (!isVersioned(project.heroImage?.src)) {
    warnings.push(`Hero sin versión: ${project.slug} -> ${project.heroImage?.src}`);
  }

  if (!isVersioned(project.cover)) {
    warnings.push(`Cover sin versión: ${project.slug} -> ${project.cover}`);
  }

  project.sections.forEach((section) => {
    if (!section.media?.src) return;
    if (!isVersioned(section.media.src)) {
      warnings.push(
        `Media sin versión: ${project.slug} / section ${section.id} -> ${section.media.src}`,
      );
    }
  });

  if (warnings.length > 0) {
    console.warn("[assets] Usa nombres versionados (-vN):", warnings.join(" | "));
  }
}

