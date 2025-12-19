import { skills } from "@/data/skills";
import { Reveal } from "./motion/Reveal";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((group, idx) => (
        <Reveal key={group.name} delay={idx * 0.05}>
          <div className="rounded-xl border border-[#24364d] bg-[--color-surface] p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              {group.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#1f2d3d] px-3 py-1 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

