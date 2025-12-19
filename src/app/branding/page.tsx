"use client";

import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { brandingLibrary } from "@/data/branding";
import { resolveBrandingThumbnail } from "@/lib/assets.client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const allIndustries = ["Todos", ...Array.from(new Set(brandingLibrary.map((b) => b.industry)))] as const;

export default function BrandingPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialIndustry = useMemo<(typeof allIndustries)[number]>(() => {
    const queryValue = searchParams.get("industry");
    if (!queryValue) return "Todos";
    const match = allIndustries.find(
      (value) => value.toLowerCase() === queryValue.toLowerCase(),
    );
    return match ?? "Todos";
  }, [searchParams]);

  const [industry, setIndustry] = useState<(typeof allIndustries)[number]>(initialIndustry);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const handleIndustryChange = (next: (typeof allIndustries)[number]) => {
    setIndustry(next);
    const params = new URLSearchParams(searchParams);
    if (next === "Todos") {
      params.delete("industry");
    } else {
      params.set("industry", next.toLowerCase());
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const items = useMemo(() => {
    return brandingLibrary
      .filter((item) => {
        if (onlyFeatured && !item.featured) return false;
        if (industry !== "Todos" && item.industry !== industry) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.title.localeCompare(b.title);
      });
  }, [industry, onlyFeatured]);

  return (
    <div className="pb-16 pt-10 md:pt-12">
      <Container className="space-y-6">
        <SectionHeader
          eyebrow="Branding"
          title="Sistemas de marca"
          description="Identidades consistentes listas para redes, packaging y lanzamientos digitales."
        />

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-2">
            {allIndustries.map((value) => (
              <div key={value} className="shrink-0">
                <Chip
                  label={value}
                  selected={industry === value}
                  onClick={() => handleIndustryChange(value)}
                />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOnlyFeatured((v) => !v)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              onlyFeatured
                ? "border-[--color-accent] bg-[--color-accent]/10 text-foreground"
                : "border-[#2f4158] bg-[#162131] text-muted hover:border-[--color-accent]/70"
            }`}
          >
            {onlyFeatured ? "Destacados ✓" : "Solo destacados"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/branding/${item.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#24364d] bg-[--color-surface] shadow-sm"
            >
              <div className="relative h-52 w-full overflow-hidden bg-[--color-soft]">
                <Image
                  src={resolveBrandingThumbnail(item)}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  <span className="h-2 w-2 rounded-full bg-[--color-accent]" aria-hidden />
                  <span>{item.industry}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent]">
                  Ver caso
                  <span aria-hidden className="transition group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

