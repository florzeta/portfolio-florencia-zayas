# Branding Assets Structure

## Folder layout
```
public/projects/branding/<slug>/
  thumbnail.png          # only file allowed at root
  brand/                 # logos, palettes, icon sets, moodboards
  hero/                  # hero visuals
  packaging/             # packaging or merch mockups
  social/                # instagram/posts/stories
  ui/                    # UI shots (optional)
  merch/                 # extra merch (optional)
```

## Naming conventions
- Use kebab-case filenames, lowercase (e.g., `logo-primary.png`, `mockup-v1.png`).
- Prefer versioned names when iterating (e.g., `logo-v2.png`) to avoid caching issues.
- Keep file extensions standard: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`.

## Root rule
- No images at the brand root except `thumbnail.png`. All other images must live in their semantic subfolder.

## Adding a new brand
1) Create `public/projects/branding/<slug>/` with subfolders `brand/`, `hero/`, `packaging/`, `social/`, `ui/`, `merch/`.
2) Add a `thumbnail.png` at the root.
3) Place assets into the appropriate subfolders using the naming conventions above.
4) Update `src/data/branding.ts` to point paths to `/projects/branding/<slug>/...`.

