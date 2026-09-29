import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/helpers";

type Variant = "primary" | "gold" | "outline" | "ghost" | "light";
type Size = "md" | "sm";

interface Base {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-ink-soft",
  gold: "bg-gold text-white hover:bg-gold-deep shadow-gold",
  outline: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  ghost: "text-ink/70 hover:text-ink hover:bg-ink/5",
  light: "bg-white/90 text-ink hover:bg-white backdrop-blur",
};

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Base & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "btn",
        styles[variant],
        size === "md" ? "px-7 py-3.5 text-sm tracking-wide" : "btn-sm text-[13px]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({ to, variant = "primary", size = "md", className, children }: Base & { to: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "btn",
        styles[variant],
        size === "md" ? "px-7 py-3.5 text-sm tracking-wide" : "btn-sm text-[13px]",
        className
      )}
    >
      {children}
    </Link>
  );
}
