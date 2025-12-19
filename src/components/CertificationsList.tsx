import { certifications } from "@/data/certifications";
import { Reveal } from "./motion/Reveal";

export function CertificationsList() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {certifications.map((cert, idx) => (
        <Reveal key={`${cert.title}-${cert.year}`} delay={idx * 0.04}>
          <div className="flex items-center justify-between rounded-xl border border-[#24364d] bg-[--color-surface] px-4 py-3 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-foreground">{cert.title}</p>
              <p className="text-sm text-muted">
                {cert.issuer} · {cert.year}
              </p>
            </div>
            <span className="text-xs font-semibold text-[--color-accent]">Cert.</span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

