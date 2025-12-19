// Branding = visual library (identidad, paletas, piezas). No son case studies completos.
// Estructura de assets (bajo /public/projects/branding/<slug>/):
// - /hero: imágenes hero del kit
// - /brand: logos, moodboards, icon sets, paletas
// - /social: feeds o stories de Instagram
// - /packaging: renders/mockups de packaging o merch
// - /ui: piezas de UI si aplica
// - thumbnail.png en la raíz del slug
export type BrandingIndustry = "Cafe" | "Fitness" | "Ecommerce" | "Beauty" | "Plants" | "Education";

export type BrandingItem = {
  slug: string;
  title: string;
  industry: BrandingIndustry;
  tags: string[];
  featured: boolean;
  thumbnail: string; // Path under /public/branding
  summary: string; // Máx. 2 líneas
  services: string[];
  assets: {
    logos?: string[];
    palette?: string[];
    mockups?: string[];
    instagram?: string[];
  };
};

export const brandingLibrary: BrandingItem[] = [
  {
    slug: "wave-cafe",
    title: "Wave Café",
    industry: "Cafe",
    tags: ["Café de especialidad", "Packaging", "Redes"],
    featured: true,
    thumbnail: "/projects/branding/wave-cafe/thumbnail.png",
    summary: "Identidad cálida y sistematizada para feed y packaging reusable.",
    services: ["Branding", "Packaging", "Instagram System"],
    assets: {
      logos: ["/projects/branding/wave-cafe/brand/logo.png"],
      palette: ["/projects/branding/wave-cafe/brand/moodboard.png"],
      mockups: [
        "/projects/branding/wave-cafe/packaging/packaging-1.png",
        "/projects/branding/wave-cafe/packaging/packaging-2.png",
      ],
      instagram: ["/projects/branding/wave-cafe/social/instagram.png"],
    },
  },
  {
    slug: "glow-fit-studio",
    title: "Glow Fit Studio",
    industry: "Fitness",
    tags: ["Entrenamiento", "Retail", "Digital"],
    featured: true,
    thumbnail: "/projects/branding/glow-fit-studio/thumbnail.png",
    summary: "Sistema visual energético para clases híbridas y merch.",
    services: ["Branding", "Landing Kit", "Instagram System"],
    assets: {
      logos: ["/projects/branding/glow-fit-studio/brand/logo.png"],
      palette: ["/projects/branding/glow-fit-studio/brand/moodboard.png"],
      mockups: [
        "/projects/branding/glow-fit-studio/packaging/packaging-1.png",
        "/projects/branding/glow-fit-studio/packaging/packaging-2.png",
      ],
      instagram: ["/projects/branding/glow-fit-studio/social/instagram.png"],
    },
  },
  {
    slug: "retro-shop",
    title: "Retro Shop",
    industry: "Ecommerce",
    tags: ["Vintage", "Ecommerce", "Editorial"],
    featured: false,
    thumbnail: "/projects/branding/retro-shop/thumbnail.png",
    summary: "Identidad modular para catálogo vintage y lanzamientos semanales.",
    services: ["Branding", "Catálogo", "Instagram System"],
    assets: {
      logos: ["/projects/branding/retro-shop/brand/logo.png"],
      palette: ["/projects/branding/retro-shop/brand/moodboard.png"],
      mockups: [
        "/projects/branding/retro-shop/packaging/packaging-1.png",
        "/projects/branding/retro-shop/packaging/packaging-2.png",
      ],
      instagram: ["/projects/branding/retro-shop/social/instagram.png"],
    },
  },
];

