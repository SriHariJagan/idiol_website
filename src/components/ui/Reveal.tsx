import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../utils/helpers";

export function Reveal({ children, className, delay = 0, as: Tag = "div" }: { children: ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "span" }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function SectionHeading({ eyebrow, title, copy, align = "center", dark = false }: { eyebrow: string; title: string; copy?: string; align?: "center" | "left"; dark?: boolean }) {
  return (
    <Reveal className={cn("max-w-xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={cn("heading-1 mt-2", dark ? "text-ivory" : "text-ink")}>{title}</h2>
      {copy && <p className={cn("mt-3 text-[15px] leading-relaxed", dark ? "text-ivory/65" : "text-ink/60")}>{copy}</p>}
    </Reveal>
  );
}

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("h-3.5 w-3.5", i < Math.round(value) ? "fill-gold" : "fill-ink/15")} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
