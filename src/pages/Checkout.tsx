import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, CreditCard, Landmark, Lock, Smartphone, Wallet } from "lucide-react";
import { getProductById } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { Seo } from "../components/Seo";
import { inr, cn } from "../utils/helpers";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, useCartStore } from "../store/cartStore";
import { submitOrder } from "../services/orderService";
import { useUIStore } from "../store/uiStore";

const steps = ["Contact", "Shipping", "Delivery", "Payment", "Review"];

const payments = [
  { id: "card", label: "Card", desc: "Credit / Debit", icon: CreditCard },
  { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", desc: "All major banks", icon: Landmark },
  { id: "wallet", label: "Wallet", desc: "Mobikwik, Amazon Pay", icon: Wallet },
];

export function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const pushToast = useUIStore((s) => s.pushToast);
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "", phone: "", firstName: "", lastName: "", address: "", city: "", state: "", pincode: "", country: "India",
    method: "standard" as "standard" | "express", instructions: "",
    pay: "upi",
  });

  const lines = items.map((i) => ({ item: i, product: getProductById(i.productId) })).filter((l) => l.product);
  const subtotal = lines.reduce((n, l) => n + l.product!.price * l.item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : form.method === "express" ? 499 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const tax = Math.round(subtotal * 0.03);
  const total = subtotal + shipping + tax;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validStep = () => {
    if (step === 0) return /.+@.+\..+/.test(form.email) && form.phone.replace(/\D/g, "").length >= 10;
    if (step === 1) return form.firstName && form.lastName && form.address && form.city && form.state && /^\d{6}$/.test(form.pincode);
    return true;
  };

  const place = async () => {
    setPlacing(true);
    try {
      const { orderId } = await submitOrder(
        {
          contact: { email: form.email, phone: form.phone },
          shipping: { firstName: form.firstName, lastName: form.lastName, address: form.address, city: form.city, state: form.state, pincode: form.pincode, country: form.country },
          delivery: { method: form.method, instructions: form.instructions },
          payment: { method: form.pay as "card" | "upi" | "netbanking" | "wallet" },
        },
        {
          items: lines.map((l) => ({ productId: l.product!.id, name: l.product!.name, quantity: l.item.quantity, price: l.product!.price })),
          subtotal, shipping, tax, total,
        }
      );
      setDone(orderId);
      clear();
      pushToast({ kind: "success", title: "Order placed (demo)", body: orderId });
    } finally {
      setPlacing(false);
    }
  };

  if (done) {
    return (
      <>
        <Seo title="Order Confirmed" description="Your demo order is confirmed." path="/checkout" />
        <div className="container-shell py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100"><Check className="h-8 w-8 text-green-700" /></span>
          <h1 className="heading-1 mt-5">Thank you — order {done}</h1>
          <p className="body-l mx-auto mt-3 max-w-lg">This is a frontend demo, so no payment was processed and nothing will ship. When Razorpay / Stripe is connected, confirmation, GST invoice and tracking arrive by email & SMS.</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link to="/shop" className="btn bg-ink px-7 py-3 text-sm text-ivory">Continue Shopping</Link>
            <Link to="/" className="btn border border-ink/20 px-7 py-3 text-sm">Back Home</Link>
          </div>
        </div>
      </>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-shell py-16 text-center">
        <Seo title="Checkout" description="Checkout." path="/checkout" />
        <h1 className="heading-1">Your cart is empty</h1>
        <Link to="/shop" className="btn mt-6 bg-ink px-7 py-3 text-sm text-ivory">Explore Collection</Link>
      </div>
    );
  }

  return (
    <>
      <Seo title="Checkout" description="Secure demo checkout — contact, shipping, delivery, payment, review." path="/checkout" />
      <div className="bg-ivory">
        <div className="container-shell py-10">
          <p className="eyebrow">Secure Checkout · Demo — no real payment</p>
          <h1 className="heading-1 mt-2">Checkout</h1>

          <ol className="mt-6 flex flex-wrap gap-2" aria-label="Checkout steps">
            {steps.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold", i === step ? "bg-ink text-ivory" : i < step ? "bg-green-100 text-green-800" : "bg-white text-ink/55 border border-ink/10")}>
                <span className="grid h-5 w-5 place-items-center rounded-full text-[11px]" aria-hidden="true">{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span> {s}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-ink/10 bg-ivory-card p-6 md:p-8">
              {step === 0 && (
                <fieldset>
                  <legend className="font-display text-xl">Where do we send updates?</legend>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div><label className="label" htmlFor="co-email">Email</label><input id="co-email" type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
                    <div><label className="label" htmlFor="co-phone">Phone</label><input id="co-phone" type="tel" className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98200 12345" autoComplete="tel" /></div>
                  </div>
                </fieldset>
              )}
              {step === 1 && (
                <fieldset>
                  <legend className="font-display text-xl">Shipping address</legend>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div><label className="label" htmlFor="co-fn">First name</label><input id="co-fn" className="input" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" /></div>
                    <div><label className="label" htmlFor="co-ln">Last name</label><input id="co-ln" className="input" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" /></div>
                    <div className="sm:col-span-2"><label className="label" htmlFor="co-addr">Address</label><input id="co-addr" className="input" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Flat, street, landmark" autoComplete="street-address" /></div>
                    <div><label className="label" htmlFor="co-city">City</label><input id="co-city" className="input" value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" /></div>
                    <div><label className="label" htmlFor="co-state">State</label><input id="co-state" className="input" value={form.state} onChange={(e) => set("state", e.target.value)} autoComplete="address-level1" /></div>
                    <div><label className="label" htmlFor="co-pin">Pincode</label><input id="co-pin" inputMode="numeric" className="input" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} placeholder="6 digits" autoComplete="postal-code" /></div>
                    <div><label className="label" htmlFor="co-country">Country</label><input id="co-country" className="input" value={form.country} onChange={(e) => set("country", e.target.value)} autoComplete="country-name" /></div>
                  </div>
                </fieldset>
              )}
              {step === 2 && (
                <fieldset>
                  <legend className="font-display text-xl">Delivery speed</legend>
                  <div className="mt-4 grid gap-3">
                    {[
                      { id: "standard", t: form.method === "standard" && shipping === 0 ? "Standard · Complimentary (4–7 days)" : `Standard · ${inr(SHIPPING_FLAT)} (4–7 days)`, d: "Museum-grade crating, insured, tracked" },
                      { id: "express", t: `Express · ${inr(499)} (2–3 days)`, d: "Priority casting queue + air freight" },
                    ].map((o) => (
                      <label key={o.id} className={cn("flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors", form.method === o.id ? "border-gold bg-gold/5" : "border-ink/15 hover:border-ink/40")}>
                        <input type="radio" name="delivery" checked={form.method === o.id} onChange={() => set("method", o.id)} className="mt-1 h-4 w-4 accent-[#B98A2F]" />
                        <span><span className="block font-semibold">{o.t}</span><span className="text-sm text-ink/60">{o.d}</span></span>
                      </label>
                    ))}
                    <div><label className="label" htmlFor="co-notes">Delivery instructions (optional)</label><textarea id="co-notes" className="input min-h-[90px]" value={form.instructions} onChange={(e) => set("instructions", e.target.value)} placeholder="Gate code, preferred time…" /></div>
                  </div>
                </fieldset>
              )}
              {step === 3 && (
                <fieldset>
                  <legend className="font-display text-xl">Payment method</legend>
                  <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink/60"><Lock className="h-3.5 w-3.5" /> Demo UI — Razorpay / Stripe plugs in here. No details are collected or stored.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {payments.map((p) => (
                      <label key={p.id} className={cn("flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-colors", form.pay === p.id ? "border-gold bg-gold/5" : "border-ink/15 hover:border-ink/40")}>
                        <input type="radio" name="pay" checked={form.pay === p.id} onChange={() => set("pay", p.id)} className="h-4 w-4 accent-[#B98A2F]" />
                        <p.icon className="h-5 w-5 text-gold-deep" />
                        <span><span className="block font-semibold">{p.label}</span><span className="text-[13px] text-ink/60">{p.desc}</span></span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 4 && (
                <div>
                  <h2 className="font-display text-xl">Review & place order</h2>
                  <ul className="mt-4 space-y-3">
                    {lines.map(({ item, product }) => (
                      <li key={item.productId} className="flex items-center gap-3 rounded-2xl border border-ink/10 p-3">
                        <span className="heading-14 w-12 shrink-0 overflow-hidden rounded-lg border border-ink/10"><ProductVisual art={product!.art} view="front" title={product!.name} /></span>
                        <span className="flex-1 text-sm font-medium">{product!.name} <span className="text-ink/55">× {item.quantity}</span></span>
                        <span className="text-sm font-semibold">{inr(product!.price * item.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-ink/60">{form.firstName} {form.lastName} · {form.address}, {form.city} {form.pincode} · {form.email}</p>
                </div>
              )}

              {!validStep() && (step === 0 || step === 1) && (
                <p className="mt-3 text-[13px] text-red-700" role="alert">
                  {step === 0 ? "Please add a valid email and 10-digit phone number." : "Please complete name, address, city, state and a 6-digit pincode."}
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {step > 0 && <button onClick={() => setStep(step - 1)} className="btn border border-ink/20 px-6 py-3 text-sm"><ArrowLeft className="h-4 w-4" /> Back</button>}
                {step < 4 && <button onClick={() => validStep() && setStep(step + 1)} disabled={!validStep()} className="btn bg-ink px-6 py-3 text-sm text-ivory hover:bg-ink-soft">Continue <ArrowRight className="h-4 w-4" /></button>}
                {step === 4 && (
                  <button onClick={place} disabled={placing} className="btn bg-gold px-8 py-3.5 text-sm text-white hover:bg-gold-deep">
                    {placing ? "Placing order…" : `Place Order · ${inr(total)}`}
                  </button>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-ink/10 bg-ink p-6 text-ivory lg:sticky lg:top-24" aria-label="Summary">
              <h2 className="font-display text-xl">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ivory/65">Subtotal</dt><dd>{inr(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-ivory/65">Shipping</dt><dd>{shipping === 0 ? "Complimentary" : inr(shipping)}</dd></div>
                <div className="flex justify-between"><dt className="text-ivory/65">Taxes (demo 3%)</dt><dd>{inr(tax)}</dd></div>
                <div className="flex justify-between border-t border-ivory/15 pt-3 text-base font-semibold"><dt>Total</dt><dd className="font-display text-xl">{inr(total)}</dd></div>
              </dl>
              <button onClick={() => navigate("/cart")} className="mt-4 w-full rounded-full border border-ivory/25 py-2.5 text-sm hover:bg-white/5">Edit cart</button>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
