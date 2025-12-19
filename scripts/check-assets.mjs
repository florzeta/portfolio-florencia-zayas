import fs from "node:fs";
import path from "node:path";

const projectFile = path.resolve("src/data/projects.ts");
const brandingFile = path.resolve("src/data/branding.ts");
const publicDir = path.resolve("public");

function loadData(filePath, exportName) {
  const raw = fs.readFileSync(filePath, "utf8");
  const primary = raw.match(
    new RegExp(`export const ${exportName}[^=]*=\\s*(\\[[\\s\\S]*?\\]);`),
  );
  if (primary) {
    const code = primary[1];
    const fn = new Function(`return (${code});`);
    return fn();
  }

  // Fallback: allow intermediate raw* constant mapped into export (e.g., rawBrandingLibrary -> brandingLibrary)
  const rawMatch = raw.match(
    /const\s+rawBrandingLibrary[^=]*=\s*(\[[\s\S]*?\]);/m,
  );
  if (exportName === "brandingLibrary" && rawMatch) {
    const code = rawMatch[1];
    const fn = new Function(`return (${code});`);
    return fn();
  }

  throw new Error(`Cannot parse export ${exportName} in ${filePath}`);
}

function collectProjectAssets(projects) {
  const entries = [];
  projects.forEach((project) => {
    entries.push({ src: project.cover, context: `${project.slug} cover` });
    if (project.heroImage?.src) entries.push({ src: project.heroImage.src, context: `${project.slug} hero` });
    project.sections?.forEach((section) => {
      if (section?.media?.src) entries.push({ src: section.media.src, context: `${project.slug} section:${section.id}` });
    });
    project.mediaGallery?.forEach((group) => {
      group.items?.forEach((item) => {
        if (item?.src) entries.push({ src: item.src, context: `${project.slug} gallery:${group.group}` });
      });
    });
  });
  return entries;
}

function collectBrandingAssets(branding) {
  const entries = [];
  branding.forEach((kit) => {
    entries.push({ src: kit.cover, context: `${kit.slug} cover` });
    const assets = kit.assets ?? {};
    if (assets.logo) entries.push({ src: assets.logo, context: `${kit.slug} logo` });
    if (assets.moodboard) entries.push({ src: assets.moodboard, context: `${kit.slug} moodboard` });
    if (assets.instagramGrid) entries.push({ src: assets.instagramGrid, context: `${kit.slug} instagramGrid` });
    if (assets.iconSet) entries.push({ src: assets.iconSet, context: `${kit.slug} iconSet` });
    if (Array.isArray(assets.packaging)) {
      assets.packaging.forEach((src, idx) => {
        if (src) entries.push({ src, context: `${kit.slug} packaging[${idx}]` });
      });
    }
  });
  return entries;
}

function checkExists(entries) {
  const missing = [];
  entries.forEach(({ src, context }) => {
    if (!src || typeof src !== "string") return;
    if (!src.startsWith("/")) return;
    const fullPath = path.join(publicDir, src.slice(1));
    if (!fs.existsSync(fullPath)) {
      missing.push({ src, context, fullPath });
    }
  });
  return missing;
}

function main() {
  const projects = loadData(projectFile, "projects");
  const branding = loadData(brandingFile, "brandingLibrary");

  const entries = [
    ...collectProjectAssets(projects),
    ...collectBrandingAssets(branding),
  ];

  const missing = checkExists(entries);

  if (missing.length > 0) {
    console.error("Missing assets:");
    missing.forEach((m) => {
      console.error(`- ${m.context}: ${m.src} (expected at ${m.fullPath})`);
    });
    process.exit(1);
  }

  console.log("OK - all referenced assets exist in /public");
}

main();

