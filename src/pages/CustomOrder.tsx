import { useState } from "react";
import { Check, UploadCloud } from "lucide-react";
import { deities } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { Reveal, SectionHeading } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { submitCustomOrder } from "../services/orderService";
import { useUIStore } from "../store/uiStore";
import { cn } from "../utils/helpers";

const requirements = ["Custom Size", "Custom Design", "Engraving", "Temple Order", "Wedding Gift", "Corporate Gift"];

export function CustomOrder() {
  const pushToast = useUIStore((s) => s.pushToast);
  const [ref, setRef] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", requirement: "Custom Size", deity: "Ganesha",
    material: "Brass", size: "", quantity: "1", message: "",
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !/.+@.+\..+/.test(form.email) || !form.message) {
      pushToast({ kind: "error", title: "Please complete name, email and message" });
      return;
    }
    setSending(true);
    const { reference } = await submitCustomOrder({ ...form });
    setSending(false);
    setRef(reference);
    pushToast({ kind: "success", title: "Request received", body: `Reference ${reference}` });
  };

  return (
    <>
      <Seo title="Custom Orders" description="Bespoke idols, temple commissions, engraving, wedding & corporate gifting. Made for your vision." path="/custom" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell grid items-center gap-8 py-12 lg:grid-cols-[1fr_300px] lg:py-16">
          <div>
            <p className="eyebrow">Custom Atelier</p>
            <h1 className="h-display mt-2">Made for your vision.</h1>
            <p className="body-l mt-4 max-w-xl">From a single heirloom to five hundred wedding favours — share a sketch, a photo, or just an idea. Our karigars take it from there.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {requirements.map((r) => <span key={r} className="chip border border-ink/15 bg-white/60 text-ink/70">{r}</span>)}
            </div>
          </div>
          <Reveal className="mx-auto hidden w-full max-w-[280px] overflow-hidden rounded-2xl border border-ink/10 shadow-card lg:block">
            <div className="aspect-[3/4]"><ProductVisual art={{ deity: "Ram Darbar", material: "brass", finish: "Premium", seed: 155 }} view="front" title="Custom commission example" /></div>
          </Reveal>
        </div>
      </div>

      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1fr_420px]">
        <div>
          <SectionHeading align="left" eyebrow="How it works" title="Sketch to shrine in four steps" />
          <ol className="mt-6 space-y-4">
            {[
              ["01 · Consultation", "A 20-minute call to understand deity, size, finish, budget and timeline."],
              ["02 · Design & Quote", "Hand sketches + exact quote within 3 working days. No advance until you approve."],
              ["03 · Casting Updates", "Photo updates at wax, casting and finishing stages. Two revision rounds included."],
              ["04 · Blessing & Delivery", "Final polish, documentation, silk-lined crating and insured worldwide delivery."],
            ].map(([t, d]) => (
              <Reveal key={t} className="rounded-2xl border border-ink/10 bg-ivory-card p-5">
                <p className="font-display text-lg">{t}</p>
                <p className="mt-1 text-sm text-ink/65">{d}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-6 grid gap-3 rounded-2xl bg-ink p-6 text-ivory sm:grid-cols-3">
            {[["2–6 weeks", "Typical timeline"], ["1–500+", "Order sizes"], ["100%", "Handmade"]].map(([v, l]) => (
              <div key={l}><p className="font-display text-2xl text-gold-light">{v}</p><p className="text-[13px] text-ivory/60">{l}</p></div>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-3xl border border-ink/10 bg-ivory-card p-6 lg:sticky lg:top-24 md:p-7">
          {ref ? (
            <div className="py-8 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-100"><Check className="h-7 w-7 text-green-700" /></span>
              <h2 className="heading-3 mt-4">Request received</h2>
              <p className="body-s mt-2">Reference <strong>{ref}</strong>. Our atelier replies within one working day. (Demo — nothing was sent.)</p>
            </div>
          ) : (
            <form onSubmit={submit} aria-label="Custom order request">
              <h2 className="font-display text-xl">Request Custom Order</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><label className="label" htmlFor="c-name">Name *</label><input id="c-name" className="input" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></div>
                <div><label className="label" htmlFor="c-email">Email *</label><input id="c-email" type="email" className="input" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" /></div>
                <div><label className="label" htmlFor="c-phone">Phone</label><input id="c-phone" type="tel" className="input" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" /></div>
                <div><label className="label" htmlFor="c-qty">Quantity</label><input id="c-qty" inputMode="numeric" className="input" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} /></div>
                <div><label className="label" htmlFor="c-req">Requirement</label>
                  <select id="c-req" className="input" value={form.requirement} onChange={(e) => set("requirement", e.target.value)}>{requirements.map((r) => <option key={r}>{r}</option>)}</select></div>
                <div><label className="label" htmlFor="c-deity">Deity</label>
                  <select id="c-deity" className="input" value={form.deity} onChange={(e) => set("deity", e.target.value)}>{deities.map((d) => <option key={d.slug}>{d.name}</option>)}</select></div>
                <div><label className="label" htmlFor="c-mat">Material</label>
                  <select id="c-mat" className="input" value={form.material} onChange={(e) => set("material", e.target.value)}><option>Brass</option><option>Silver</option><option>Not sure — advise me</option></select></div>
                <div><label className="label" htmlFor="c-size">Approx. size</label><input id="c-size" className="input" placeholder='e.g. 8 inch' value={form.size} onChange={(e) => set("size", e.target.value)} /></div>
                <div className="sm:col-span-2"><label className="label" htmlFor="c-msg">Message *</label><textarea id="c-msg" className="input min-h-[110px]" placeholder="Deity, pose, finish, occasion, deadline…" value={form.message} onChange={(e) => set("message", e.target.value)} /></div>
                <div className={cn("sm:col-span-2 rounded-2xl border border-dashed border-ink/25 p-5 text-center text-sm text-ink/60")}>
                  <UploadCloud className="mx-auto h-6 w-6 text-gold-deep" />
                  <p className="mt-2 font-medium text-ink">Reference images (placeholder)</p>
                  <p>Image upload activates with backend integration.</p>
                </div>
              </div>
              <button type="submit" disabled={sending} className="btn mt-5 w-full bg-ink py-3.5 text-sm text-ivory hover:bg-gold-deep disabled:opacity-60">
                {sending ? "Sending…" : "Request Custom Order"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
