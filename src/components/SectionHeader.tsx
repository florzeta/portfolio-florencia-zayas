import { Reveal } from "./motion/Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div className={`space-y-3 ${className ?? ""}`}>
        {eyebrow ? (
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-lg text-muted">{description}</p>
        ) : null}
      </div>
    </Reveal>
  );
}

