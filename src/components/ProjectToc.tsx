type TocItem = {
  id: string;
  title: string;
};

type ProjectTocProps = {
  items: TocItem[];
};

export function ProjectToc({ items }: ProjectTocProps) {
  return (
    <nav
      aria-label="Tabla de contenido"
      className="sticky top-24 hidden h-fit min-w-[220px] rounded-xl border border-[#24364d] bg-[--color-surface] p-4 text-sm text-muted lg:block"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        Contenido
      </p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              className="block rounded-md px-2 py-1 hover:bg-[#1f2d3d] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--outline]"
              href={`#${item.id}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

