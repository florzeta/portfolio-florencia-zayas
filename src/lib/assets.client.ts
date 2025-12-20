import { BrandingItem } from "@/data/branding";

export function resolveBrandingAsset(pathCandidates: string[]): string {
  const priority = [".png", ".jpg", ".jpeg", ".svg"];
  for (const ext of priority) {
    const match = pathCandidates.find((p) => typeof p === "string" && p.endsWith(ext));
    if (match) return match;
  }
  return pathCandidates.find((p) => typeof p === "string") ?? "/next.svg";
}

const placeholderKeywords = ["thumbnail", "logo", "mockup", "instagram"];
function isPlaceholderBrandingAsset(path?: string | null): boolean {
  if (!path || typeof path !== "string") return false;
  return path.endsWith(".svg") && placeholderKeywords.some((k) => path.includes(k));
}

function isMisplacedInstagramAsset(path: string): boolean {
  return path.includes("/social/") && path.toLowerCase().includes("instagram");
}

export function filterBrandingAssets(paths?: string[]): string[] {
  const isDev = process.env.NODE_ENV === "development";
  const misplaced: string[] = [];

  const filtered = (paths ?? [])
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter((p) => {
      if (!p) return false;
      if (isPlaceholderBrandingAsset(p)) return false;
      if (isMisplacedInstagramAsset(p)) {
        if (isDev) misplaced.push(p);
        return false;
      }
      return true;
    });

  if (isDev && misplaced.length > 0) {
    console.warn(
      `[branding-dev] Ignoring instagram assets under /social (move to /instagram): ${misplaced.join(", ")}`,
    );
  }

  return filtered;
}

export function resolveBrandingThumbnail(kit: BrandingItem): string {
  const assets = kit.assets ?? {};
  const candidates = [
    kit.thumbnail,
    assets.instagram?.[0],
    assets.mockups?.[0],
    assets.logos?.[0],
    assets.moodboard?.[0],
    "/next.svg",
  ].filter((p): p is string => Boolean(p) && !isPlaceholderBrandingAsset(p));

  return resolveBrandingAsset(candidates);
}

