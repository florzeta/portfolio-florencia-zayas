"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";

type ChipProps = {
  label: string;
  selected?: boolean;
  onClick?: () => void;
};

export function Chip({ label, selected, onClick }: ChipProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold transition",
        selected
          ? "border-[--color-accent] text-foreground"
          : "border-[#2f4158] text-muted hover:text-foreground",
      )}
      aria-pressed={selected}
    >
      {selected && (
        <motion.span
          layoutId="chip-active"
          className="absolute inset-0 -z-10 rounded-full bg-[--color-accent]/15"
          transition={{ type: "spring", stiffness: 180, damping: 20 }}
        />
      )}
      {label}
    </motion.button>
  );
}

