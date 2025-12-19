import { Container } from "@/components/layout/Container";
import { brandingLibrary } from "@/data/branding";
import { warnMissingBrandingAssets } from "@/lib/assets";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type BrandingPageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return brandingLibrary.map((item) => ({ slug: item.slug }));
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: BrandingPageProps): Promise<Metadata> {
  const item = brandingLibrary.find((b) => b.slug === params.slug);
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

export default function BrandingDetailPage({ params }: BrandingPageProps) {
  // Debug: ensure route executes and slug is resolved
  console.log("[branding-detail] slug param:", params?.slug);

  const item = brandingLibrary.find((b) => b.slug === params.slug);
  if (!item) notFound();
  warnMissingBrandingAssets(item);

  return (
    <div className="pb-16 pt-10 md:pt-12" data-debug="branding-slug-route">
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

        {item.assets.logos && item.assets.logos.length > 0 ? (
          <AssetSection title="Logos" images={item.assets.logos} />
        ) : null}
        {item.assets.palette && item.assets.palette.length > 0 ? (
          <AssetSection title="Paleta de color" images={item.assets.palette} />
        ) : null}
        {item.assets.mockups && item.assets.mockups.length > 0 ? (
          <AssetSection title="Mockups" images={item.assets.mockups} />
        ) : null}
        {item.assets.instagram && item.assets.instagram.length > 0 ? (
          <AssetSection title="Instagram" images={item.assets.instagram} dense />
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

