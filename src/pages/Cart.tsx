import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getProductById, products } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { ProductCard } from "../components/ui/ProductCard";
import { Seo } from "../components/Seo";
import { inr } from "../utils/helpers";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, useCartStore } from "../store/cartStore";

export function Cart() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const lines = items.map((i) => ({ item: i, product: getProductById(i.productId) })).filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product!.price * l.item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = subtotal - discount + shipping;
  const suggestions = products.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 4);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "IDIOL10") {
      setDiscount(Math.round(subtotal * 0.1));
    } else {
      setDiscount(0);
    }
  };

  return (
    <>
      <Seo title="Your Cart" description="Review your collection before checkout." path="/cart" />
      <div className="container-shell py-10 lg:py-14">
        <h1 className="heading-1">Your Cart</h1>
        <p className="body-s mt-2">Your order will be carefully packaged and prepared for delivery.</p>

        {lines.length === 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-ink/10 bg-ivory-card p-10 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ivory"><ShoppingBag className="h-7 w-7 text-ink/40" /></span>
            <p className="mt-4 font-display text-2xl">Your collection awaits.</p>
            <p className="mt-2 text-sm text-ink/60">Begin with a best seller — or commission something entirely yours.</p>
            <div className="mt-5 flex justify-center gap-2">
              <Link to="/shop" className="btn bg-ink px-6 py-3 text-sm text-ivory">Explore Collection</Link>
              <Link to="/custom" className="btn border border-ink/20 px-6 py-3 text-sm">Custom Order</Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <ul className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-ivory-card px-5">
                {lines.map(({ item, product }) => (
                  <li key={item.productId} className="flex gap-4 py-5">
                    <Link to={`/product/${product!.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                      <ProductVisual art={product!.art} view="front" title={product!.name} />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <Link to={`/product/${product!.slug}`} className="font-display text-[17px] font-medium leading-snug hover:text-gold-deep">{product!.name}</Link>
                        <button onClick={() => removeItem(item.productId, item.variant)} className="rounded-full p-1.5 text-ink/45 hover:bg-red-50 hover:text-red-700" aria-label={`Remove ${product!.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-[13px] text-ink/55">{product!.height}" · {product!.finish} · Handcrafted in India</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-ink/15">
                          <button onClick={() => setQuantity(item.productId, item.quantity - 1, item.variant)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button onClick={() => setQuantity(item.productId, item.quantity + 1, item.variant)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
                        </div>
                        <p className="font-semibold">{inr(product!.price * item.quantity)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/shop" className="text-sm font-semibold text-gold-deep hover:underline">← Continue Shopping</Link>
                <button onClick={clear} className="text-sm text-ink/50 hover:text-ink hover:underline">Clear cart</button>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-ink/10 bg-ink p-6 text-ivory lg:sticky lg:top-24" aria-label="Order summary">
              <h2 className="font-display text-xl">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ivory/65">Subtotal</dt><dd className="font-semibold">{inr(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ivory/65">Shipping</dt><dd className="font-semibold">{shipping === 0 ? "Complimentary" : inr(shipping)}</dd></div>
                {discount > 0 && <div className="flex justify-between text-green-300"><dt>Discount (IDIOL10)</dt><dd>−{inr(discount)}</dd></div>}
                <div className="flex justify-between border-t border-ivory/15 pt-3 text-base"><dt>Estimated Total</dt><dd className="font-display text-xl">{inr(total)}</dd></div>
              </dl>
              <div className="mt-4 flex gap-2">
                <label htmlFor="coupon" className="sr-only">Discount code</label>
                <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Discount code (try IDIOL10)" className="input !border-ivory/20 !bg-white/5 !py-2.5 !text-ivory placeholder:!text-ivory/35 flex-1 text-sm" />
                <button onClick={applyCoupon} className="rounded-xl bg-white/10 px-4 text-sm font-semibold hover:bg-white/15">Apply</button>
              </div>
              <button onClick={() => navigate("/checkout")} className="btn mt-4 w-full bg-gold py-3.5 text-sm text-white hover:bg-gold-deep">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-[12.5px] text-ivory/55">Secure placeholder checkout · no payment is processed</p>
            </aside>
          </div>
        )}

        <section className="mt-14" aria-label="You may also like">
          <h2 className="heading-3">You may also like</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {suggestions.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </div>
    </>
  );
}
