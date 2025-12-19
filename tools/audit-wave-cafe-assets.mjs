import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "projects", "branding", "wave-cafe");

const expected = [
  "hero/thumbnail.png",
  "brand/logo.png",
  "brand/moodboard.png",
  "packaging/packaging-1.png",
  "packaging/packaging-2.png",
  "instagram/instagram.png",
];

const headerLabels = {
  png: "89 50 4E 47 0D 0A 1A 0A",
  jpg: "FF D8 FF",
};

function detectType(buf) {
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  ) {
    return "png";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "jpg";
  }
  return "unknown";
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function statInfo(relPath) {
  const full = path.join(ROOT, relPath);
  if (!(await exists(full))) return { exists: false };
  const buf = await fs.readFile(full);
  return { exists: true, size: buf.length, type: detectType(buf) };
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

function looksLikeCandidate(name) {
  return /(packaging|instagram|logo|moodboard|thumbnail)/i.test(name);
}

async function listCandidates() {
  const files = await walk(ROOT);
  const candidates = files
    .filter((f) => looksLikeCandidate(path.basename(f)))
    .map((f) => path.relative(ROOT, f))
    .sort();

  console.log("\nCandidates:");
  if (candidates.length === 0) {
    console.log("- none");
    return;
  }

  for (const rel of candidates) {
    const full = path.join(ROOT, rel);
    const buf = await fs.readFile(full);
    const type = detectType(buf);
    console.log(`- ${rel} | size=${buf.length} | type=${type}`);
  }
}

async function reportExpected() {
  console.log("Expected assets:");
  for (const rel of expected) {
    const info = await statInfo(rel);
    if (!info.exists) {
      console.log(`- ${rel}: MISSING`);
      continue;
    }
    console.log(
      `- ${rel}: size=${info.size} bytes | type=${info.type} (png=${headerLabels.png}, jpg=${headerLabels.jpg})`,
    );
  }
}

async function main() {
  try {
    await fs.access(ROOT);
  } catch {
    console.error(`[error] wave-cafe folder not found at ${ROOT}`);
    process.exit(1);
  }

  await reportExpected();
  await listCandidates();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

