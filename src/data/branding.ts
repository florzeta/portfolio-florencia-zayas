// Branding = visual library (identidad, paletas, piezas). No son case studies completos.
// Para agregar un kit: (1) crear carpeta /public/projects/branding/<slug>/ con subcarpetas /hero, /brand, /instagram, /packaging o /merch (opcional), /ui (opcional) y un thumbnail.png en /hero; (2) sumar un objeto aquí con: slug, title, industry, tags, featured, thumbnail, summary, services y assets (logos/palette/mockups/instagram/packaging/iconSet).
// Estructura de assets (bajo /public/projects/branding/<slug>/):
// - /hero: thumbnail.png (obligatorio), hero.png (opcional)
// - /brand: logos, moodboards, icon sets, paletas
// - /instagram: feeds o stories de Instagram
// - /packaging o /merch: renders/mockups de packaging o merch
// - /ui: piezas de UI si aplica
export type BrandingIndustry =
  | "Cafe"
  | "Fitness"
  | "Ecommerce"
  | "Beauty"
  | "Plants"
  | "Education";

export type BrandingCategory = "Branding" | "UX/UI" | "Marketing" | "Frontend";

type BrandingAssets = {
  logos?: string[];
  palette?: string[];
  mockups?: string[];
  instagram?: string[];
  packaging?: string[];
  iconSet?: string;
};

export type BrandingItem = {
  slug: string;
  title: string;
  industry: BrandingIndustry;
  tags: string[];
  featured: boolean;
  thumbnail: string; // Path under /public/projects/branding/<slug>/
  summary: string; // Máx. 2 líneas
  services: string[];
  assets: BrandingAssets;
  category?: BrandingCategory;
  domain?: BrandingIndustry | string;
};

const brandingAsset = (slug: string, group: string, filename: string) =>
  `/projects/branding/${slug}/${group}/${filename}`;

function warnBrandingPlaceholders(item: BrandingItem): void {
  if (process.env.NODE_ENV !== "development") return;
  const placeholderPaths: string[] = [];
  const pushIfPlaceholder = (field: string, value?: string | null) => {
    if (!value || typeof value !== "string") return;
    if (value.endsWith(".svg")) placeholderPaths.push(`${field}=${value}`);
  };

  pushIfPlaceholder("thumbnail", item.thumbnail);
  const assets = item.assets ?? {};
  assets.logos?.forEach((v) => pushIfPlaceholder("logos", v));
  assets.palette?.forEach((v) => pushIfPlaceholder("palette", v));
  assets.mockups?.forEach((v) => pushIfPlaceholder("mockups", v));
  assets.instagram?.forEach((v) => pushIfPlaceholder("instagram", v));
  assets.packaging?.forEach((v) => pushIfPlaceholder("packaging", v));
  if (assets.iconSet) pushIfPlaceholder("iconSet", assets.iconSet);

  if (placeholderPaths.length > 0) {
    console.warn(
      `[branding-dev] Placeholder assets detected for ${item.slug}: ${placeholderPaths.join(", ")}`,
    );
  }
}

const rawBrandingLibrary: BrandingItem[] = [
  {
    slug: "wave-cafe",
    title: "Wave Café",
    industry: "Cafe",
    tags: ["Café de especialidad", "Packaging", "Redes"],
    featured: true,
    thumbnail: brandingAsset("wave-cafe", "hero", "thumbnail.png"),
    summary: "Identidad cálida y sistematizada para feed y packaging reusable.",
    services: ["Branding", "Packaging", "Instagram System"],
    category: "Branding",
    domain: "Cafe",
    assets: {
      logos: [brandingAsset("wave-cafe", "brand", "logo.png")],
      palette: [brandingAsset("wave-cafe", "brand", "moodboard.png")],
      mockups: [
        brandingAsset("wave-cafe", "packaging", "packaging-1.png"),
        brandingAsset("wave-cafe", "packaging", "packaging-2.png"),
      ],
      instagram: [brandingAsset("wave-cafe", "instagram", "instagram.png")],
    },
  },
  {
    slug: "glow-fit-studio",
    title: "Glow Fit Studio",
    industry: "Fitness",
    tags: ["Entrenamiento", "Retail", "Digital"],
    featured: true,
    thumbnail: brandingAsset("glow-fit-studio", "hero", "thumbnail.png"),
    summary: "Sistema visual energético para clases híbridas y merch.",
    services: ["Branding", "Landing Kit", "Instagram System"],
    category: "Branding",
    domain: "Fitness",
    assets: {
      logos: [brandingAsset("glow-fit-studio", "brand", "logo.png")],
      palette: [brandingAsset("glow-fit-studio", "brand", "moodboard.png")],
      mockups: [
        brandingAsset("glow-fit-studio", "merch", "merch-1.png"),
        brandingAsset("glow-fit-studio", "merch", "merch-2.png"),
      ],
      instagram: [brandingAsset("glow-fit-studio", "instagram", "instagram.png")],
    },
  },
  {
    slug: "retro-shop",
    title: "Retro Shop",
    industry: "Ecommerce",
    tags: ["Vintage", "Ecommerce", "Editorial"],
    featured: false,
    thumbnail: brandingAsset("retro-shop", "hero", "thumbnail.png"),
    summary: "Identidad modular para catálogo vintage y lanzamientos semanales.",
    services: ["Branding", "Catálogo", "Instagram System"],
    category: "Branding",
    domain: "Ecommerce",
    assets: {
      logos: [brandingAsset("retro-shop", "brand", "logo.png")],
      palette: [brandingAsset("retro-shop", "brand", "moodboard.png")],
      mockups: [
        brandingAsset("retro-shop", "packaging", "packaging-1.png"),
        brandingAsset("retro-shop", "packaging", "packaging-2.png"),
      ],
      instagram: [brandingAsset("retro-shop", "instagram", "instagram.png")],
    },
  },
];

function ensureAssetsShape(item: BrandingItem): BrandingItem {
  const assets = item.assets ?? {};
  warnBrandingPlaceholders(item);
  return {
    ...item,
    assets: {
      logos: assets.logos ?? [],
      palette: assets.palette ?? [],
      mockups: assets.mockups ?? [],
      instagram: assets.instagram ?? [],
      packaging: assets.packaging ?? [],
      iconSet: assets.iconSet,
    },
  };
}

export const brandingLibrary: BrandingItem[] = rawBrandingLibrary.map(ensureAssetsShape);

