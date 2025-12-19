import { experience } from "@/data/experience";
import { Reveal } from "./motion/Reveal";

export function ExperienceTimeline() {
  return (
    <div className="space-y-6">
      {experience.map((item, idx) => (
        <Reveal key={item.company} delay={idx * 0.05}>
          <div className="relative overflow-hidden rounded-xl border border-[#24364d] bg-[--color-surface] p-5 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="space-y-1">
                <p className="text-sm uppercase tracking-[0.12em] text-muted">
                  {item.period}
                </p>
                <p className="text-lg font-bold text-foreground">{item.company}</p>
                <p className="text-sm font-semibold text-muted">{item.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
            {item.achievements ? (
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {item.achievements.map((achievement) => (
                  <li
                    key={achievement}
                    className="flex items-start gap-2 rounded-lg bg-[#1f2d3d] px-3 py-2"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-[--color-accent]" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

