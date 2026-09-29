import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { getProductById } from "../../data/products";
import { inr } from "../../utils/helpers";
import { ProductVisual } from "../../assets/ProductVisual";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, useCartStore } from "../../store/cartStore";
import { drawerRight, overlay } from "../../utils/animations";

export function CartDrawer() {
  const open = useCartStore((s) => s.isOpen);
  const setOpen = useCartStore((s) => s.setOpen);
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const lines = items
    .map((i) => ({ item: i, product: getProductById(i.productId) }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product!.price * l.item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div variants={overlay} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-[2px]" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.aside
            variants={drawerRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[71] flex w-[92vw] max-w-md flex-col bg-ivory-card"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="font-display text-xl font-medium">Your Collection ({lines.reduce((n, l) => n + l.item.quantity, 0)})</h2>
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ivory"><ShoppingBag className="h-7 w-7 text-ink/40" /></span>
                <p className="font-display text-2xl">Your collection awaits.</p>
                <p className="text-sm text-ink/60">Every idol is cast to order-promise standards and crated for safe worldwide travel.</p>
                <button onClick={() => { setOpen(false); navigate("/shop"); }} className="btn bg-ink px-7 py-3 text-sm text-ivory hover:bg-ink-soft mt-2">
                  Explore Collection
                </button>
              </div>
            ) : (
              <>
                <div className="border-b border-ink/10 px-5 py-3">
                  <p className="text-[13px] text-ink/65">
                    {shipping === 0 ? "You've unlocked complimentary shipping." : `${inr(FREE_SHIPPING_THRESHOLD - subtotal)} away from complimentary shipping`}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${progress * 100}%` }} />
                  </div>
                </div>
                <ul className="flex-1 divide-y divide-ink/8 overflow-y-auto px-5">
                  {lines.map(({ item, product }) => (
                    <li key={item.productId} className="flex gap-4 py-4">
                      <Link to={`/product/${product!.slug}`} onClick={() => setOpen(false)} className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                        <ProductVisual art={product!.art} view="front" title={product!.name} />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${product!.slug}`} onClick={() => setOpen(false)} className="line-clamp-2 font-display text-[15.5px] font-medium leading-snug hover:text-gold-deep">
                          {product!.name}
                        </Link>
                        <p className="mt-0.5 text-[13px] text-ink/55">{product!.height}" · {product!.finish}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-ink/15">
                            <button onClick={() => setQuantity(item.productId, item.quantity - 1, item.variant)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5" aria-label="Decrease quantity">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold" aria-live="polite">{item.quantity}</span>
                            <button onClick={() => setQuantity(item.productId, item.quantity + 1, item.variant)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-ink/5" aria-label="Increase quantity">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[15px] font-semibold">{inr(product!.price * item.quantity)}</p>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.productId, item.variant)} className="self-start rounded-full p-1.5 text-ink/45 hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${product!.name}`}>
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-ink/10 px-5 py-4">
                  <div className="flex justify-between text-sm"><span className="text-ink/60">Subtotal</span><span className="font-semibold">{inr(subtotal)}</span></div>
                  <div className="mt-1 flex justify-between text-sm"><span className="text-ink/60">Shipping</span><span className="font-semibold">{shipping === 0 ? "Complimentary" : inr(shipping)}</span></div>
                  <p className="mt-2 text-[12.5px] text-ink/55">Carefully packaged & prepared for delivery. Taxes calculated at checkout.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button onClick={() => { setOpen(false); navigate("/cart"); }} className="btn btn-sm border border-ink/20 hover:bg-ink hover:text-ivory">View Cart</button>
                    <button onClick={() => { setOpen(false); navigate("/checkout"); }} className="btn btn-sm bg-ink text-ivory hover:bg-gold-deep">
                      Checkout <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
