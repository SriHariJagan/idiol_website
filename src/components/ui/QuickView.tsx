import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { getProductById } from "../../data/products";
import { inr } from "../../utils/helpers";
import { ProductVisual } from "../../assets/ProductVisual";
import { Stars } from "./Reveal";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/cartStore";
import { useUIStore } from "../../store/uiStore";
import { overlay, scaleIn } from "../../utils/animations";
import { cn } from "../../utils/helpers";

export function QuickView() {
  const id = useUIStore((s) => s.quickViewId);
  const setId = useUIStore((s) => s.setQuickViewId);
  const product = id ? getProductById(id) : undefined;
  const has = useWishlistStore((s) => s.has);
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useUIStore((s) => s.pushToast);

  return (
    <AnimatePresence>
      {product && (
        <motion.div variants={overlay} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[72] grid place-items-center bg-ink/60 p-4 backdrop-blur-sm" onClick={() => setId(null)} aria-hidden="true">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="grid max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-ivory-card sm:grid-cols-2"
            role="dialog"
            aria-modal="true"
            aria-label={`Quick view ${product.name}`}
          >
            <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[480px]">
              <ProductVisual art={product.art} view="front" title={product.name} className="absolute inset-0" />
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto p-6 md:p-8">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">{product.deity} · {product.material === "silver" ? "Silver" : "Brass"}</p>
                <button onClick={() => setId(null)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-ink/5" aria-label="Close quick view">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <h3 className="font-display text-2xl font-medium leading-tight">{product.name}</h3>
              <div className="flex items-center gap-2">
                <Stars value={product.rating} />
                <span className="text-xs text-ink/50">{product.rating.toFixed(1)} · {product.reviewCount} demo reviews</span>
              </div>
              <p className="text-sm text-ink/65">{product.shortDescription}</p>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-2xl font-semibold">{inr(product.price)}</span>
                {product.compareAtPrice && <span className="text-ink/40 line-through">{inr(product.compareAtPrice)}</span>}
              </div>
              <div className="mt-1 flex gap-2">
                <button
                  onClick={() => {
                    const res = addItem(product, 1);
                    pushToast(res.ok ? { kind: "success", title: "Added to your collection", body: product.name } : { kind: "error", title: "Couldn't add", body: res.reason });
                    if (res.ok) setId(null);
                  }}
                  className="btn flex-1 bg-ink py-3 text-sm text-ivory hover:bg-gold-deep"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggle(product.id)}
                  aria-label="Toggle wishlist"
                  aria-pressed={has(product.id)}
                  className={cn("grid h-12 w-12 place-items-center rounded-full border transition-colors", has(product.id) ? "border-ink bg-ink text-gold-light" : "border-ink/20 hover:border-ink")}
                >
                  <Heart className={cn("h-5 w-5", has(product.id) && "fill-current")} />
                </button>
              </div>
              <Link to={`/product/${product.slug}`} onClick={() => setId(null)} className="link-underline self-start text-sm font-semibold text-gold-deep">
                View full details →
              </Link>
              <p className="mt-auto text-[12.5px] text-ink/50">Handcrafted in India · {product.shippingInfo.estimatedDays}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
