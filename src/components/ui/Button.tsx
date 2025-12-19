import Link from "next/link";
import { clsx } from "clsx";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  download?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  target,
  rel,
  download,
}: ButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      download={download}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[--outline]",
        {
          "bg-[--color-accent] text-[#0f1823] hover:bg-[--color-accent-strong]":
            variant === "primary",
          "border border-[--color-accent] text-[--color-accent] hover:bg-[--color-accent]/10":
            variant === "outline",
          "text-muted hover:text-foreground hover:-translate-y-[1px]":
            variant === "ghost",
        },
        className,
      )}
    >
      {children}
    </Link>
  );
}

