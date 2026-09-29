import { Link } from "react-router-dom";
import { Building2, Gift, HeartHandshake } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { Reveal, SectionHeading } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { ButtonLink } from "../components/ui/Button";

export function Gifting() {
  const picks = products.filter((p) => p.tags.includes("gifting") || p.tags.includes("wedding-gift") || p.tags.includes("diwali")).slice(0, 4);
  return (
    <>
      <Seo title="Corporate & Wedding Gifting" description="Meaningful brass & silver gifts — engraved blessings, bulk wedding favours, corporate editions." path="/gifting" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell py-12 lg:py-16">
          <p className="eyebrow">Gifting Atelier</p>
          <h1 className="heading-1 mt-2">Gifts that outlive the occasion.</h1>
          <p className="body-l mt-3 max-w-2xl">Diwali, weddings, housewarmings, milestones — idols people keep for generations, presented in silk-lined keepsake boxes with your message engraved.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink to="/custom" variant="primary">Start a Gifting Order</ButtonLink>
            <ButtonLink to="/shop?filter=bestsellers" variant="outline">Shop Gift-Ready</ButtonLink>
          </div>
        </div>
      </div>
      <div className="container-shell grid gap-4 py-12 md:grid-cols-3">
        {[
          { icon: HeartHandshake, t: "Wedding Favours", d: "Mini Ganeshas & diya pairs from 25 to 500 pieces, names & date engraved." },
          { icon: Building2, t: "Corporate Editions", d: "Festive brass & silver with company monogram, GST invoicing, pan-India dispatch." },
          { icon: Gift, t: "Personal Milestones", d: "Housewarmings, retirements, births — one heirloom, beautifully boxed." },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 70} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory text-gold-deep"><c.icon className="h-5 w-5" /></span>
            <h2 className="heading-3 mt-3">{c.t}</h2>
            <p className="body-s mt-2">{c.d}</p>
          </Reveal>
        ))}
      </div>
      <div className="container-shell pb-16">
        <SectionHeading align="left" eyebrow="Gift-Ready Picks" title="Most gifted this season" />
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {picks.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <p className="mt-6 text-sm text-ink/60">Bulk pricing from 25 pieces · <Link to="/custom" className="font-semibold text-gold-deep">Request a quote →</Link></p>
      </div>
    </>
  );
}
