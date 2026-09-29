import type { ReactNode } from "react";
import { cn } from "../../utils/helpers";

export function Badge({ children, tone = "ink", className }: { children: ReactNode; tone?: "ink" | "gold" | "silver" | "outline" | "success"; className?: string }) {
  const tones = {
    ink: "bg-ink text-ivory",
    gold: "bg-gold text-white",
    silver: "bg-silver text-ink border border-ink/10",
    outline: "border border-ink/20 text-ink/70 bg-white/60",
    success: "bg-green-700 text-white",
  };
  return <span className={cn("chip", tones[tone], className)}>{children}</span>;
}

export function ProductBadges({ bestSeller, newArrival, featured, compareAtPrice, price }: { bestSeller?: boolean; newArrival?: boolean; featured?: boolean; compareAtPrice?: number; price: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {newArrival && <Badge tone="gold">New</Badge>}
      {bestSeller && <Badge tone="ink">Best Seller</Badge>}
      {featured && !newArrival && <Badge tone="outline">Featured</Badge>}
      {compareAtPrice && compareAtPrice > price && <Badge tone="success">Save {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%</Badge>}
    </div>
  );
}
