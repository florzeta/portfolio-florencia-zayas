# Branding Assets (Canonical Layout)

```
public/projects/branding/<slug>/
  hero/
    thumbnail.png   # required
    hero.png        # optional
  brand/            # logos, palettes, icon sets, moodboards
    logo.png
    moodboard.png
    icon-set.png    # optional
  instagram/        # feed/stories exports
    instagram.png
  packaging/        # optional (physical products)
    packaging-1.png
    packaging-2.png
  merch/            # optional (promos/merch for service brands)
    merch-1.png
    merch-2.png
  ui/               # optional
  social/           # optional (legacy)
```

## Naming conventions
- kebab-case, lowercase, no spaces or accents (e.g., `logo-primary.png`, `packaging-1.png`).
- Prefer `.png`/`.jpg` for rasters; `.svg` only if truly vector and not a placeholder.
- Version explicitly when iterating: `logo-v2.png`, `packaging-3.png`.

## Do / Don’t
- Do keep a single `thumbnail.png` in `/hero`.
- Do store every image inside its semantic folder (never at slug root).
- Don’t use accented characters or spaces; stick to ASCII kebab-case.
- Don’t leave placeholder `.svg` names like `logo.svg` or `thumbnail.svg`—replace with the real asset name.

## Adding a new brand
1) Create `public/projects/branding/<slug>/` with the folders above (include `packaging/` or `merch/` as relevant).
2) Add `/hero/thumbnail.png` (required) and other assets in their folders.
3) Reference assets in `src/data/branding.ts` using the `brandingAsset(slug, group, filename)` helper to avoid typos.
4) Avoid root-level images; only `thumbnail.png` lives in `/hero/`.

