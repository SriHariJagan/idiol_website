import { Link } from "react-router-dom";
import { Eye, Heart } from "lucide-react";
import type { Product } from "../../types";
import { inr } from "../../utils/helpers";
import { ProductVisual } from "../../assets/ProductVisual";
import { ProductBadges } from "./Badge";
import { Stars } from "./Reveal";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
import { cn } from "../../utils/helpers";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  const hasFn = useWishlistStore((s) => s.has);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useUIStore((s) => s.pushToast);
  const setQuickViewId = useUIStore((s) => s.setQuickViewId);
  const wished = hasFn(product.id);

  const onAdd = () => {
    const res = addItem(product, 1);
    pushToast(
      res.ok
        ? { kind: "success", title: "Added to your collection", body: product.name }
        : { kind: "error", title: "Couldn't add", body: res.reason }
    );
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-ivory-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/product/${product.slug}`} className="relative block aspect-[1/1] overflow-hidden" aria-label={product.name}>
        <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0">
          <ProductVisual art={product.art} view="front" title={product.name} />
        </div>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <ProductVisual art={product.art} view="side" title={`${product.name} side view`} />
        </div>
        <div className="absolute left-3 top-3">
          <ProductBadges bestSeller={product.bestSeller} newArrival={product.newArrival} featured={product.featured} compareAtPrice={product.compareAtPrice} price={product.price} />
        </div>
      </Link>

      <div className="absolute right-2.5 top-2.5 flex flex-col gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 max-lg:opacity-100">
        <button
          onClick={() => {
            const added = toggle(product.id);
            pushToast(added ? { kind: "success", title: "Saved to wishlist" } : { kind: "info", title: "Removed from wishlist" });
          }}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={cn(
            "grid h-8 w-8 place-items-center rounded-full shadow-card backdrop-blur transition-colors",
            wished ? "bg-ink text-gold-light" : "bg-white/90 text-ink hover:bg-white"
          )}
        >
          <Heart className={cn("h-3.5 w-3.5", wished && "fill-current")} />
        </button>
        <button
          onClick={() => setQuickViewId(product.id)}
          aria-label={`Quick view ${product.name}`}
          className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur transition-colors hover:bg-white"
        >
          <Eye className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-3.5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
          {product.material === "silver" ? "Sterling Silver" : "Handcrafted Brass"} · {product.height}"
        </p>
        <h3 className="font-display text-[15px] font-medium leading-snug">
          <Link to={`/product/${product.slug}`} className="transition-colors hover:text-gold-deep">
            {rank != null && <span className="mr-1 text-ink/30">{String(rank).padStart(2, "0")}</span>}
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <Stars value={product.rating} />
          <span className="text-xs text-ink/50">({product.reviewCount} demo reviews)</span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[15px] font-semibold">{inr(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-[13px] text-ink/40 line-through">{inr(product.compareAtPrice)}</span>
          )}
        </div>
        <button
          onClick={onAdd}
          className="mt-2.5 w-full rounded-full bg-ink py-2 text-[12.5px] font-semibold tracking-wide text-ivory transition-colors hover:bg-gold-deep"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
