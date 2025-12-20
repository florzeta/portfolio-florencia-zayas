import { Container } from "@/components/layout/Container";
import { brandingLibrary } from "@/data/branding";
import { filterBrandingAssets } from "@/lib/assets.client";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return brandingLibrary.map((item) => ({ slug: item.slug }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const item = brandingLibrary.find((b) => b.slug === resolvedParams.slug);
  if (!item) return { title: "Branding no encontrado" };

  return {
    title: `${item.title} | Branding`,
    description: item.summary,
    openGraph: {
      title: `${item.title} | Branding`,
      description: item.summary,
      images: item.assets.logos?.length
        ? item.assets.logos.map((src) => ({ url: src }))
        : item.thumbnail
        ? [{ url: item.thumbnail }]
        : [],
    },
  };
}

export default async function BrandingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const item = brandingLibrary.find((b) => b.slug === resolvedParams.slug);
  if (!item) notFound();

  const logos = filterBrandingAssets(item.assets.logos);
  const paletteRaw = filterBrandingAssets(item.assets.palette);
  const palette = paletteRaw.filter((p) => !p.includes("/instagram/"));
  if (process.env.NODE_ENV === "development" && palette.length !== paletteRaw.length) {
    console.warn(
      `[branding-dev] Palette assets ignored because they point to /instagram: ${paletteRaw
        .filter((p) => p.includes("/instagram/"))
        .join(", ")}`,
    );
  }
  if (process.env.NODE_ENV === "development" && palette.length === 0) {
    console.warn(`[branding-dev] Palette is missing for ${item.slug}`);
  }
  const moodboard = filterBrandingAssets(item.assets.moodboard);
  const mockups = filterBrandingAssets(item.assets.mockups);
  const instagram = filterBrandingAssets(item.assets.instagram);

  return (
    <div className="pb-16 pt-10 md:pt-12">
      <Container className="space-y-10">
        <header className="space-y-3 rounded-3xl border border-[#24364d] bg-[--color-surface] p-6 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
            <span className="h-2 w-2 rounded-full bg-[--color-accent]" aria-hidden />
            <span>{item.industry}</span>
          </div>
          <h1 className="text-3xl font-black leading-tight text-foreground md:text-4xl">
            {item.title}
          </h1>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-muted">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#1f2d3d] px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <section className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">Resumen</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
        </section>

        <section className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">Servicios</h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-muted">
            {item.services.map((service) => (
              <span
                key={service}
                className="rounded-full bg-[#1f2d3d] px-3 py-1 font-semibold text-foreground"
              >
                {service}
              </span>
            ))}
          </div>
        </section>

        {logos.length > 0 ? <AssetSection title="Logos" images={logos} /> : null}
        {palette.length > 0 ? <AssetSection title="Paleta de color" images={palette} /> : null}
        {moodboard.length > 0 ? <AssetSection title="Moodboard" images={moodboard} /> : null}
        {mockups.length > 0 ? <AssetSection title="Mockups" images={mockups} /> : null}
        {instagram.length > 0 ? (
          <AssetSection title="Instagram" images={instagram} dense />
        ) : null}
      </Container>
    </div>
  );
}

function AssetSection({
  title,
  images,
  dense = false,
}: {
  title: string;
  images: string[];
  dense?: boolean;
}) {
  const gridClass = dense
    ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-6 shadow-sm">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      <div className={`mt-4 grid gap-4 ${gridClass}`}>
        {images.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#2f4158] bg-[#0f1823]"
          >
            <Image
              src={src}
              alt={`${title} asset`}
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              priority={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

