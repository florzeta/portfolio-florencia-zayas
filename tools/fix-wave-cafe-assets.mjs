import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "projects", "branding", "wave-cafe");

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
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

async function fixMissingExtensions() {
  const files = await walk(ROOT);
  for (const file of files) {
    const ext = path.extname(file);
    if (ext) continue;

    const data = await fs.readFile(file);
    const detected = detectImageExt(data);
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

async function fixLogoPrimary() {
  const src = path.join(ROOT, "brand", "logo-primary.png");
  const dest = path.join(ROOT, "brand", "logo.png");
  if ((await fileExists(src)) && !(await fileExists(dest))) {
    await fs.rename(src, dest);
    console.log(`[rename][logo] ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)}`);
  }
}

async function fixMoodboardNoExt() {
  const src = path.join(ROOT, "brand", "moodboard");
  const dest = path.join(ROOT, "brand", "moodboard.png");
  if ((await fileExists(src)) && !(await fileExists(dest))) {
    await fs.rename(src, dest);
    console.log(`[rename][moodboard] ${path.relative(ROOT, src)} -> ${path.relative(ROOT, dest)}`);
  }
}

async function handleRootThumbnail() {
  const rootThumb = path.join(ROOT, "thumbnail");
  const heroThumb = path.join(ROOT, "hero", "thumbnail.png");
  if (!(await fileExists(rootThumb))) return;
  if (!(await fileExists(heroThumb))) {
    console.warn(
      `[keep][root-thumbnail] hero/thumbnail.png missing; leaving ${path.relative(ROOT, rootThumb)}`,
    );
    return;
  }

  const legacyDir = path.join(ROOT, "_legacy");
  await fs.mkdir(legacyDir, { recursive: true });
  let dest = path.join(legacyDir, "thumbnail");
  if (await fileExists(dest)) {
    dest = path.join(legacyDir, `thumbnail-${Date.now()}`);
  }

  await fs.rename(rootThumb, dest);
  console.log(
    `[move][root-thumbnail] ${path.relative(ROOT, rootThumb)} -> ${path.relative(ROOT, dest)}`,
  );
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`[error] Wave Café folder not found at ${ROOT}`);
    process.exit(1);
  }

  await fixMissingExtensions();
  await fixLogoPrimary();
  await fixMoodboardNoExt();
  await handleRootThumbnail();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

