import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "../../services/orderService";
import { useUIStore } from "../../store/uiStore";

const cols = [
  {
    title: "Shop",
    links: [
      { label: "Brass Idols", to: "/shop?category=brass" },
      { label: "Silver Idols", to: "/shop?category=silver" },
      { label: "Premium Collection", to: "/shop?category=premium-brass" },
      { label: "New Arrivals", to: "/shop?filter=new" },
      { label: "Best Sellers", to: "/shop?filter=bestsellers" },
    ],
  },
  {
    title: "Deities",
    links: [
      { label: "Ganesha", to: "/deities/ganesha" },
      { label: "Lakshmi", to: "/deities/lakshmi" },
      { label: "Krishna", to: "/deities/krishna" },
      { label: "Shiva", to: "/deities/shiva" },
      { label: "All Deities", to: "/collections" },
    ],
  },
  {
    title: "House",
    links: [
      { label: "Our Craft", to: "/craft" },
      { label: "About", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "Custom Orders", to: "/custom" },
      { label: "Gifting", to: "/gifting" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "FAQ", to: "/faq" },
      { label: "Track Order", to: "/track" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const pushToast = useUIStore((s) => s.pushToast);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      pushToast({ kind: "error", title: "Please enter a valid email" });
      return;
    }
    await subscribeNewsletter(email);
    setDone(true);
    pushToast({ kind: "success", title: "Welcome to the inner circle" });
  };

  return (
    <footer className="bg-ink text-ivory">
      {/* newsletter */}
      <div className="border-b border-ivory/10">
        <div className="container-shell grid gap-6 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow !text-gold-light">The Inner Circle</p>
            <h2 className="heading-2 mt-2 text-ivory">First access to limited castings.</h2>
            <p className="mt-2 text-[15px] text-ivory/60">One letter a month. New idols, artisan stories, care rituals. No noise.</p>
          </div>
          {done ? (
            <p className="rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-[15px] text-gold-pale">You're on the list. Your first letter arrives with the new moon.</p>
          ) : (
            <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="nl-email" className="sr-only">Email address</label>
              <input id="nl-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input !border-ivory/20 !bg-white/5 !text-ivory placeholder:!text-ivory/35 flex-1" />
              <button type="submit" className="btn bg-gold px-7 py-3.5 text-sm tracking-wide text-white hover:bg-gold-deep">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* links */}
      <div className="container-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="font-display gold-text-light text-3xl font-semibold">IDIOL</p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-luxe text-gold-light">Sacred Craftsmanship</p>
          <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-ivory/60">
            Authentic Indian craftsmanship for sacred spaces and meaningful gifts. Handcrafted in Moradabad, delivered worldwide.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-[12px] text-ivory/55">
            {["Made in India", "Handcrafted", "Secure Packaging", "Worldwide Delivery"].map((t) => (
              <span key={t} className="rounded-full border border-ivory/15 px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-ivory/45">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-underline text-[14.5px] text-ivory/75 hover:text-ivory">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-shell flex flex-col items-center justify-between gap-3 py-6 text-[13px] text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} IDIOL. All rights reserved. Demo storefront — reviews & counts are illustrative.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-ivory">Privacy</Link>
            <Link to="/terms" className="hover:text-ivory">Terms</Link>
            <Link to="/faq" className="hover:text-ivory">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
