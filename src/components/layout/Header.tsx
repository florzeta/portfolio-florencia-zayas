"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ButtonLink } from "../ui/Button";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Sobre mí" },
  { href: "/contact", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-30 border-b border-[#1f2d3d] bg-[rgba(20,30,42,0.9)] backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-soft] text-[--color-accent] font-black"
            initial={prefersReducedMotion ? false : { rotate: -8, opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            aria-hidden
          >
            FZ
          </motion.div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-muted">Portafolio</p>
            <p className="text-base font-bold text-foreground">
              Florencia Zayas Furnari
            </p>
          </div>
        </Link>

        <nav
          aria-label="Principal"
          className="flex items-center gap-4 text-sm font-semibold md:gap-6"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-2 py-1"
                aria-current={active ? "page" : undefined}
              >
                <span className="transition text-muted hover:text-foreground">
                  {item.label}
                </span>
                {active ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 h-[2px] w-full rounded-full bg-[--color-accent]"
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href="https://www.linkedin.com/in/florencia-zayas"
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="hidden sm:inline-flex"
          >
            LinkedIn
          </ButtonLink>
          <ButtonLink
            href="/cv/florencia-zayas-cv.pdf"
            variant="primary"
            download
          >
            Descargar CV
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}

