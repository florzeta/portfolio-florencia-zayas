import { Project } from "@/types/content";
import Image from "next/image";

type ProjectMediaGalleryProps = {
  mediaGallery: NonNullable<Project["mediaGallery"]>;
};

export function ProjectMediaGallery({ mediaGallery }: ProjectMediaGalleryProps) {
  if (!mediaGallery || mediaGallery.length === 0) return null;

  return (
    <div className="space-y-6">
      {mediaGallery.map((group) => (
        <section
          key={group.group}
          className="rounded-2xl border border-[#24364d] bg-[--color-surface] p-4 shadow-sm md:p-5"
        >
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
            <span className="h-2 w-2 rounded-full bg-[--color-accent]" aria-hidden />
            <span>{group.group}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((item) => (
              <figure
                key={item.src}
                className="space-y-3 rounded-xl border border-[#2f4158] bg-[#0f1823] p-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                    className="object-cover"
                    priority={false}
                  />
                </div>
                {item.caption ? (
                  <figcaption className="text-sm text-muted leading-relaxed">{item.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

