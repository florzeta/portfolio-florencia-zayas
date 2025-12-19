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

export function filterBrandingAssets(paths?: string[]): string[] {
  return (paths ?? []).filter((p) => typeof p === "string" && !isPlaceholderBrandingAsset(p));
}

export function resolveBrandingThumbnail(kit: BrandingItem): string {
  const assets = kit.assets ?? {};
  const candidates = [
    kit.thumbnail,
    assets.mockups?.[0],
    assets.instagram?.[0],
    assets.logos?.[0],
    assets.palette?.[0],
    "/next.svg",
  ].filter((p): p is string => Boolean(p) && !isPlaceholderBrandingAsset(p));

  return resolveBrandingAsset(candidates);
}

