// Branding = visual library (identidad, paletas, piezas). No son case studies completos.
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
      logos: ["/projects/branding/wave-cafe/logo.png"],
      palette: ["/projects/branding/wave-cafe/moodboard.png"],
      mockups: [
        "/projects/branding/wave-cafe/packaging-1.png",
        "/projects/branding/wave-cafe/packaging-2.png",
      ],
      instagram: ["/projects/branding/wave-cafe/instagram.png"],
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
      logos: ["/projects/branding/glow-fit-studio/logo.png"],
      palette: ["/projects/branding/glow-fit-studio/moodboard.png"],
      mockups: [
        "/projects/branding/glow-fit-studio/packaging-1.png",
        "/projects/branding/glow-fit-studio/packaging-2.png",
      ],
      instagram: ["/projects/branding/glow-fit-studio/instagram.png"],
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
      logos: ["/projects/branding/retro-shop/logo.png"],
      palette: ["/projects/branding/retro-shop/moodboard.png"],
      mockups: [
        "/projects/branding/retro-shop/packaging-1.png",
        "/projects/branding/retro-shop/packaging-2.png",
      ],
      instagram: ["/projects/branding/retro-shop/instagram.png"],
    },
  },
];

