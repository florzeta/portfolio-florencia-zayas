export type ProjectTag =
  | "UX/UI"
  | "UX Writing"
  | "Frontend"
  | "Marketing";

export type ProjectSection = {
  id: string;
  title: string;
  body: string;
  bullets?: string[];
  media?: {
    src: string;
    alt: string;
  };
};

export type Project = {
  title: string;
  slug: string;
  summary: string;
  role: string;
  year: string;
  tags: ProjectTag[];
  cover: string;
  accent?: string;
  featured: boolean;
  heroImage?: {
    src: string;
    alt: string;
  };
  metrics: { label: string; value: string }[];
  sections: ProjectSection[];
  learnings: string[];
  links?: { label: string; href: string }[];
  mediaGallery?: Array<{
    group: "Instagram" | "Packaging" | "Brand";
    items: Array<{
      src: string;
      alt: string;
      caption?: string;
    }>;
  }>;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements?: string[];
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export type SkillCategory = {
  name: string;
  items: string[];
};

