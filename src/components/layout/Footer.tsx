import Link from "next/link";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-[#1f2d3d] bg-[--color-surface]">
      <Container className="flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-foreground">Florencia Zayas Furnari</p>
          <p>UX/UI · UX Writing · Frontend · eCommerce</p>
        </div>
        <div className="flex gap-4">
          <Link
            className="hover:text-foreground underline-offset-4 hover:underline"
            href="mailto:hola@florenciazayas.com"
          >
            hola@florenciazayas.com
          </Link>
          <Link
            className="hover:text-foreground underline-offset-4 hover:underline"
            href="https://www.linkedin.com/in/florencia-zayas"
          >
            LinkedIn
          </Link>
        </div>
      </Container>
    </footer>
  );
}

