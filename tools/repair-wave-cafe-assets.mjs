/**
 * Audit outputs (before/after) will be pasted here after running the script.
 */

import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "projects", "branding", "wave-cafe");
const LEGACY = path.join(ROOT, "_legacy");

const expected = {
  thumbnail: path.join(ROOT, "hero", "thumbnail.png"),
  logo: path.join(ROOT, "brand", "logo.png"),
  moodboard: path.join(ROOT, "brand", "moodboard.png"),
  packaging1: path.join(ROOT, "packaging", "packaging-1.png"),
  packaging2: path.join(ROOT, "packaging", "packaging-2.png"),
  instagram: path.join(ROOT, "instagram", "instagram.png"),
};

const requiredDirs = [
  path.join(ROOT, "hero"),
  path.join(ROOT, "brand"),
  path.join(ROOT, "packaging"),
  path.join(ROOT, "instagram"),
];

async function ensureDirs() {
  for (const dir of requiredDirs) {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.mkdir(LEGACY, { recursive: true });
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function detectImageExt(buffer) {
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return ".png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return ".jpg";
  }
  return null;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function addMissingExtensions() {
  const files = await walk(ROOT);
  for (const file of files) {
    const ext = path.extname(file);
    if (ext) continue;

    const buf = await fs.readFile(file);
    const detected = detectImageExt(buf);
    if (!detected) {
      console.warn(`[skip][unknown-type] ${path.relative(ROOT, file)}`);
      continue;
    }

    const target = `${file}${detected}`;
    if (await fileExists(target)) {
      console.warn(`[skip][exists] ${path.relative(ROOT, target)}`);
      continue;
    }

    await fs.rename(file, target);
    console.log(`[rename][add-ext] ${path.relative(ROOT, file)} -> ${path.relative(ROOT, target)}`);
  }
}

async function moveRootIfExists(name, dest) {
  const src = path.join(ROOT, name);
  if (!(await fileExists(src))) return;

  const destExists = await fileExists(dest);
  if (destExists) {
    const legacyTarget = path.join(
      LEGACY,
      `${path.basename(dest, path.extname(dest))}-${Date.now()}${path.extname(src)}`,
    );
    await fs.rename(src, legacyTarget);
    console.log(
      `[move][root->legacy][exists] ${path.relative(ROOT, src)} -> ${path.relative(
        ROOT,
        legacyTarget,
      )}`,
    );
    return;
  }

  await fs.rename(src, dest);
  console.log(
    `[move][root->dest] ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)}`,
  );
}

async function renameIfPresent(src, dest, label) {
  if (!(await fileExists(src))) return;
  if (await fileExists(dest)) {
    const legacyTarget = path.join(
      LEGACY,
      `${path.basename(dest, path.extname(dest))}-${Date.now()}${path.extname(src)}`,
    );
    await fs.rename(src, legacyTarget);
    console.log(
      `[move][duplicate-${label}] ${path.relative(ROOT, src)} -> ${path.relative(
        ROOT,
        legacyTarget,
      )}`,
    );
    return;
  }
  await fs.rename(src, dest);
  console.log(
    `[rename][${label}] ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)}`,
  );
}

async function normalizeBrand() {
  // logo-primary -> logo.png
  await renameIfPresent(
    path.join(ROOT, "brand", "logo-primary.png"),
    expected.logo,
    "logo-primary",
  );

  // logo*.png* -> logo.png
  const brandFiles = await fs.readdir(path.join(ROOT, "brand"));
  for (const name of brandFiles) {
    const lower = name.toLowerCase();
    if (!lower.startsWith("logo")) continue;
    const src = path.join(ROOT, "brand", name);
    if (path.normalize(src) === path.normalize(expected.logo)) continue;
    const ext = path.extname(name) || ".png";
    await renameIfPresent(src, expected.logo, "logo");
  }

  // moodboard* -> moodboard.png
  for (const name of brandFiles) {
    const lower = name.toLowerCase();
    if (!lower.startsWith("moodboard")) continue;
    const src = path.join(ROOT, "brand", name);
    if (path.normalize(src) === path.normalize(expected.moodboard)) continue;
    const ext = path.extname(name) || ".png";
    await renameIfPresent(src, expected.moodboard, "moodboard");
  }
}

async function normalizePackaging() {
  const pkgDir = path.join(ROOT, "packaging");
  const pkgFiles = await fs.readdir(pkgDir);
  for (const name of pkgFiles) {
    const lower = name.toLowerCase();
    if (lower.startsWith("packaging-1")) {
      const src = path.join(pkgDir, name);
      await renameIfPresent(src, expected.packaging1, "packaging-1");
    } else if (lower.startsWith("packaging-2")) {
      const src = path.join(pkgDir, name);
      await renameIfPresent(src, expected.packaging2, "packaging-2");
    }
  }
}

async function normalizeInstagram() {
  const instaDir = path.join(ROOT, "instagram");
  const instaFiles = await fs.readdir(instaDir);
  for (const name of instaFiles) {
    const lower = name.toLowerCase();
    if (!lower.startsWith("instagram")) continue;
    const src = path.join(instaDir, name);
    if (path.normalize(src) === path.normalize(expected.instagram)) continue;
    await renameIfPresent(src, expected.instagram, "instagram");
  }
}

async function normalizeHero() {
  // Move hero/thumbnail.svg to legacy if thumbnail.png will replace it.
  const heroThumbSvg = path.join(ROOT, "hero", "thumbnail.svg");
  if (await fileExists(heroThumbSvg)) {
    const legacyTarget = path.join(LEGACY, `thumbnail-svg-${Date.now()}.svg`);
    await fs.rename(heroThumbSvg, legacyTarget);
    console.log(
      `[move][hero-thumbnail-svg] ${path.relative(ROOT, heroThumbSvg)} -> ${path.relative(
        ROOT,
        legacyTarget,
      )}`,
    );
  }

  // Move root thumbnail -> hero/thumbnail.png
  await moveRootIfExists("thumbnail", expected.thumbnail);
  await moveRootIfExists("thumbnail.png", expected.thumbnail);

  // Normalize hero files like hero.png.png -> hero.png (optional asset)
  const heroDir = path.join(ROOT, "hero");
  const heroFiles = await fs.readdir(heroDir);
  for (const name of heroFiles) {
    const lower = name.toLowerCase();
    if (lower.startsWith("hero") && lower.endsWith(".png.png")) {
      const src = path.join(heroDir, name);
      const dest = path.join(heroDir, "hero.png");
      await renameIfPresent(src, dest, "hero");
    }
  }
}

async function handleMissingExtensionsInPlace() {
  // After moves, re-run extension fixes in case new files without ext appear.
  await addMissingExtensions();
}

async function validateExpected() {
  const missingOrInvalid = [];
  for (const [key, full] of Object.entries(expected)) {
    const rel = path.relative(ROOT, full);
    if (!(await fileExists(full))) {
      missingOrInvalid.push(`${rel} (missing)`);
      continue;
    }
    const buf = await fs.readFile(full);
    const type = detectImageExt(buf);
    if (!type || buf.length === 0) {
      missingOrInvalid.push(`${rel} (invalid)`);
    }
  }
  return missingOrInvalid;
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`[error] wave-cafe folder not found at ${ROOT}`);
    process.exit(1);
  }

  await ensureDirs();
  await addMissingExtensions();

  // Move misplaced root files
  await moveRootIfExists("logo.png", expected.logo);
  await moveRootIfExists("logo-primary.png", expected.logo);
  await moveRootIfExists("moodboard.png", expected.moodboard);
  await moveRootIfExists("moodboard", expected.moodboard);
  await moveRootIfExists("packaging-1.png", expected.packaging1);
  await moveRootIfExists("packaging-2.png", expected.packaging2);
  await moveRootIfExists("instagram.png", expected.instagram);

  await normalizeHero();
  await normalizeBrand();
  await normalizePackaging();
  await normalizeInstagram();
  await handleMissingExtensionsInPlace();

  const issues = await validateExpected();
  if (issues.length > 0) {
    console.warn("[warn] REQUIRES MANUAL ASSET:", issues.join(" | "));
  } else {
    console.log("[ok] All expected assets are present with valid headers.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

