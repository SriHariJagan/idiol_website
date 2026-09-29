import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { useUIStore } from "../store/uiStore";
import { cn } from "../utils/helpers";

function Page({ title, eyebrow, path, children }: { title: string; eyebrow: string; path: string; children: React.ReactNode }) {
  return (
    <>
      <Seo title={title} description={`${title} — IDIOL support.`} path={path} />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell py-10 lg:py-14">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="heading-1 mt-2">{title}</h1>
        </div>
      </div>
      <div className="container-shell max-w-3xl py-10">{children}</div>
    </>
  );
}

export function Contact() {
  const pushToast = useUIStore((s) => s.pushToast);
  const [f, setF] = useState({ name: "", email: "", topic: "Order help", message: "" });
  return (
    <Page title="Contact Us" eyebrow="Support" path="/contact">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: Mail, t: "Email", d: "namaste@idiol.in · replies in 1 working day" },
          { icon: Phone, t: "Phone", d: "+91 98200 12345 · Mon–Sat, 10–7 IST" },
          { icon: MapPin, t: "Atelier", d: "Moradabad, Uttar Pradesh, India" },
        ].map((c) => (
          <div key={c.t} className="card p-5"><c.icon className="h-5 w-5 text-gold-deep" /><p className="mt-2 font-semibold">{c.t}</p><p className="text-sm text-ink/60">{c.d}</p></div>
        ))}
      </div>
      <form
        className="card mt-6 space-y-4 p-6"
        onSubmit={(e) => { e.preventDefault(); pushToast({ kind: "success", title: "Message sent (demo)", body: "We reply within one working day." }); setF({ name: "", email: "", topic: "Order help", message: "" }); }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="label" htmlFor="ct-n">Name</label><input id="ct-n" className="input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></div>
          <div><label className="label" htmlFor="ct-e">Email</label><input id="ct-e" type="email" className="input" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></div>
        </div>
        <div><label className="label" htmlFor="ct-t">Topic</label>
          <select id="ct-t" className="input" value={f.topic} onChange={(e) => setF({ ...f, topic: e.target.value })}>
            {["Order help", "Custom order", "Gifting", "Care advice", "Press"].map((t) => <option key={t}>{t}</option>)}
          </select></div>
        <div><label className="label" htmlFor="ct-m">Message</label><textarea id="ct-m" className="input min-h-[120px]" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} /></div>
        <button className="btn bg-ink px-7 py-3 text-sm text-ivory">Send Message</button>
      </form>
    </Page>
  );
}

export function Shipping() {
  return (
    <Page title="Shipping & Delivery" eyebrow="Support" path="/shipping">
      <div className="card space-y-3 p-6 text-[15px] text-ink/75">
        <p>· Orders ship within 48 hours from Moradabad in foam-moulded, silk-lined, double-walled crates.</p>
        <p>· Standard (4–7 days): complimentary over ₹5,000, else ₹199. Express (2–3 days): ₹499.</p>
        <p>· Worldwide insured delivery to 40+ countries; duties calculated transparently at checkout.</p>
        <p>· Every parcel is photographed before dispatch and trackable end-to-end.</p>
      </div>
    </Page>
  );
}

export function Returns() {
  return (
    <Page title="Returns & Exchanges" eyebrow="Support" path="/returns">
      <div className="card space-y-3 p-6 text-[15px] text-ink/75">
        <p>· 7-day easy returns for unused idols in original packaging — full refund to source.</p>
        <p>· Damaged in transit? Send photos within 48 hours; replacement ships priority, free.</p>
        <p>· Custom, engraved and temple commissions are final sale (they're made only for you).</p>
        <p>· Silver buyback guidance provided on request with hallmark papers.</p>
      </div>
    </Page>
  );
}

const faqs = [
  ["Are the idols solid metal?", "Yes — solid brass or solid 925 silver. Never hollow, never resin-filled. Weight is listed on every product page."],
  ["Is the silver hallmarked?", "Every silver idol carries a BIS hallmark with assay documentation and a signed artisan card."],
  ["Suitable for daily pooja?", "Absolutely. Wipe brass weekly and oil lightly; keep silver in the anti-tarnish pouch between worship."],
  ["How long does delivery take?", "48-hour dispatch; 4–7 days standard in India, 6–10 days worldwide. Express options at checkout."],
  ["Do you ship internationally?", "Yes — insured to 40+ countries with duties shown upfront. No surprise fees."],
  ["Can I customise size or engraving?", "Yes — see Custom Orders. Two revision rounds and stage-wise photos are included."],
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Page title="FAQs" eyebrow="Support" path="/faq">
      <div className="divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-ivory-card">
        {faqs.map(([q, a], i) => (
          <div key={q}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-display text-[17px]">
              {q}<ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", open === i && "rotate-180")} />
            </button>
            {open === i && <p className="px-6 pb-5 text-[14.5px] text-ink/70">{a}</p>}
          </div>
        ))}
      </div>
    </Page>
  );
}

export function Track() {
  const [id, setId] = useState("");
  const [res, setRes] = useState<string | null>(null);
  return (
    <Page title="Track Order" eyebrow="Support" path="/track">
      <form
        className="card flex flex-col gap-3 p-6 sm:flex-row"
        onSubmit={(e) => { e.preventDefault(); setRes(id.trim() ? `Demo status for ${id.trim().toUpperCase()}: packed with silk & foam, awaiting courier pickup. (Connect backend tracking API for live data.)` : "Please enter an order ID like IDL-2026-123456."); }}
      >
        <label htmlFor="tr-id" className="sr-only">Order ID</label>
        <input id="tr-id" className="input flex-1" placeholder="e.g. IDL-2026-123456" value={id} onChange={(e) => setId(e.target.value)} />
        <button className="btn bg-ink px-7 py-3 text-sm text-ivory">Track</button>
      </form>
      {res && <p className="card mt-4 p-5 text-[15px]" role="status">{res}</p>}
    </Page>
  );
}

export function Privacy() {
  return (
    <Page title="Privacy Policy" eyebrow="Legal" path="/privacy">
      <div className="card space-y-3 p-6 text-[15px] text-ink/75">
        <p>Demo policy: we collect only what checkout needs (contact + address), never store payment details, and never sell data. Analytics are anonymised. Full policy ships with backend launch.</p>
      </div>
    </Page>
  );
}

export function Terms() {
  return (
    <Page title="Terms of Service" eyebrow="Legal" path="/terms">
      <div className="card space-y-3 p-6 text-[15px] text-ink/75">
        <p>Demo terms: all pieces are handmade so minor variations are the signature of craft, not defects. Prices include GST. Custom orders are final sale. Full terms ship with backend launch.</p>
      </div>
    </Page>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="This page doesn't exist." path="/404" />
      <div className="container-shell py-24 text-center">
        <Reveal>
          <p className="eyebrow">404</p>
          <h1 className="heading-1 mt-2">Looks like this piece belongs somewhere else.</h1>
          <p className="body-l mx-auto mt-3 max-w-md">The page moved, or never existed. The collection, meanwhile, is very much here.</p>
          <div className="mt-7 flex justify-center gap-3">
            <Link to="/" className="btn bg-ink px-7 py-3 text-sm text-ivory">Back Home</Link>
            <Link to="/shop" className="btn border border-ink/20 px-7 py-3 text-sm">Explore Collection</Link>
          </div>
        </Reveal>
      </div>
    </>
  );
}
