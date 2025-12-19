import fs from "node:fs";
import path from "node:path";

const projectFile = path.resolve("src/data/projects.ts");
const publicDir = path.resolve("public");

function loadProjects() {
  const raw = fs.readFileSync(projectFile, "utf8");
  // Remove TS-only syntax and exports, keep plain data.
  const stripped = raw
    .replace(/^import.*\n/gm, "")
    .replace(/export const projects\s*:\s*[^=]*=/, "const projects =")
    .replace(/export\s*{\s*projects\s*};?/, "");

  const loader = new Function(
    "require",
    "__filename",
    "__dirname",
    "fs",
    "path",
    `${stripped}; return projects;`,
  );

  return loader(require, projectFile, path.dirname(projectFile), fs, path);
}

function collectAssetPaths(projects) {
  const entries = [];

  projects.forEach((project) => {
    entries.push({ src: project.cover, context: `${project.slug} cover` });
    if (project.heroImage?.src) {
      entries.push({ src: project.heroImage.src, context: `${project.slug} heroImage` });
    }
    if (Array.isArray(project.gallery)) {
      project.gallery.forEach((item, idx) => {
        if (item?.src) entries.push({ src: item.src, context: `${project.slug} gallery[${idx}]` });
      });
    }
    if (Array.isArray(project.sections)) {
      project.sections.forEach((section) => {
        if (section?.media?.src) {
          entries.push({
            src: section.media.src,
            context: `${project.slug} section:${section.id}`,
          });
        }
      });
    }
  });

  return entries;
}

function checkExists(entries) {
  const missing = [];
  entries.forEach(({ src, context }) => {
    if (!src) return;
    const relative = src.startsWith("/") ? src.slice(1) : src;
    const fullPath = path.join(publicDir, relative);
    if (!fs.existsSync(fullPath)) {
      missing.push({ src, context, fullPath });
    }
  });
  return missing;
}

function main() {
  const projects = loadProjects();
  const entries = collectAssetPaths(projects);
  const missing = checkExists(entries);

  if (missing.length > 0) {
    console.error("Missing assets:");
    missing.forEach((item) => {
      console.error(`- ${item.context}: ${item.src} (expected at ${item.fullPath})`);
    });
    process.exit(1);
  }

  console.log("OK - all project asset paths exist in /public");
}

main();

