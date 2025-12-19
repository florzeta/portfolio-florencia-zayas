"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { usePathname } from "next/navigation";

type TemplateProps = {
  children: React.ReactNode;
};

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <LayoutGroup>
      <AnimatePresence mode="wait">
        <motion.div key={pathname} {...motionProps}>
          {children}
        </motion.div>
      </AnimatePresence>
    </LayoutGroup>
  );
}

