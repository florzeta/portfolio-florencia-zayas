/**
 * Library pattern for reusable collections (branding, UX/UI, frontend, marketing).
 *
 * Folder convention (under /public):
 *   /public/<category>/<slug>/... (e.g., /public/projects/branding/<slug>/)
 *   - Include subfolders as needed (hero/brand/social/packaging/ui) and thumbnail.png at root.
 *
 * Data convention:
 *   - One object per item in src/data/<category>.ts
 *   - Required fields: slug, title, summary, tags, featured, thumbnail
 *   - Optional: industry/domain, services, assets grouped by type
 *
 * To add a new vertical (UX/UI, Frontend, Marketing), mirror the branding data file:
 *   1) Create the public folder for the slug.
 *   2) Add an entry to the corresponding data file using these base fields.
 */
export type LibraryAssets = {
  logos?: string[];
  palette?: string[];
  mockups?: string[];
  instagram?: string[];
  packaging?: string[];
  hero?: string[];
  ui?: string[];
  docs?: string[];
  iconSet?: string;
  [key: string]: string[] | string | undefined;
};

export type LibraryItemBase = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  featured: boolean;
  thumbnail: string;
  industry?: string;
  services?: string[];
  assets?: LibraryAssets;
};

