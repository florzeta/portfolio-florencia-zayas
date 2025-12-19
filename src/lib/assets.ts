import { Project } from "@/types/content";
import { BrandingItem } from "@/data/branding";
import fs from "node:fs";
import path from "node:path";

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

export function warnMissingBrandingAssets(kit: BrandingItem): void {
  if (process.env.NODE_ENV !== "development") return;

  const missing: string[] = [];
  const basePublic = path.resolve(process.cwd(), "public");

  const collect = (src?: string | null) => {
    if (!src || typeof src !== "string") return;
    if (!src.startsWith("/")) return;
    const full = path.join(basePublic, src.slice(1));
    if (!fs.existsSync(full)) missing.push(`${src} (expected at ${full})`);
  };

  collect(kit.thumbnail);
  const assets = kit.assets ?? {};
  assets.logos?.forEach(collect);
  assets.palette?.forEach(collect);
  assets.mockups?.forEach(collect);
  assets.instagram?.forEach(collect);
  if ("iconSet" in assets && assets.iconSet) {
    collect((assets as { iconSet: string }).iconSet);
  }
  const packaging = (assets as { packaging?: string[] }).packaging ?? [];
  packaging.forEach(collect);

  if (missing.length > 0) {
    console.warn(`[branding-assets] Faltan archivos para ${kit.slug}:`, missing.join(" | "));
  }
}

