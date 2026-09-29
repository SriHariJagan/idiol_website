import { Link, useParams } from "react-router-dom";
import { deities, getByDeity } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { ProductVisual } from "../assets/ProductVisual";
import { Reveal } from "../components/ui/Reveal";
import { Seo } from "../components/Seo";
import { inr } from "../utils/helpers";

export function DeityPage() {
  const { slug } = useParams();
  const deity = deities.find((d) => d.slug === slug);
  const list = slug ? getByDeity(deity?.name ?? slug) : [];

  if (!deity) {
    return (
      <div className="container-shell py-24 text-center">
        <p className="font-display text-3xl">Looks like this piece belongs somewhere else.</p>
        <Link to="/collections" className="link-underline mt-4 inline-block font-semibold text-gold-deep">Browse all deities →</Link>
      </div>
    );
  }

  const lowest = list.length ? Math.min(...list.map((p) => p.price)) : 0;

  return (
    <>
      <Seo
        title={`${deity.name} Idols`}
        description={`Handcrafted ${deity.name} idols in brass & silver. ${deity.line}. Authentic materials, worldwide delivery.`}
        path={`/deities/${deity.slug}`}
      />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell grid items-center gap-8 py-12 lg:grid-cols-[1fr_300px] lg:py-16">
          <div>
            <p className="eyebrow">{deity.line}</p>
            <h1 className="heading-1 mt-2">{deity.name} Idols</h1>
            <p className="body-l mt-3 max-w-xl">
              {list.length} {list.length === 1 ? "piece" : "pieces"} · from {inr(lowest)} · lost-wax cast and hand-chased in Moradabad.
            </p>
          </div>
          <Reveal className="mx-auto hidden w-full max-w-[260px] overflow-hidden rounded-2xl border border-ink/10 shadow-card lg:block">
            <div className="aspect-[4/5]">
              <ProductVisual art={list[0]?.art ?? { deity: deity.name, material: "brass", finish: "Classic", seed: deity.seed }} view="front" title={`${deity.name} idol`} />
            </div>
          </Reveal>
        </div>
      </div>
      <div className="container-shell py-10">
        {list.length === 0 ? (
          <p className="py-12 text-center text-ink/60">New {deity.name} castings are on the way. <Link to="/shop" className="font-semibold text-gold-deep">Browse all idols →</Link></p>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        <div className="mt-10 flex flex-wrap gap-2">
          <span className="text-sm text-ink/55">Explore:</span>
          {deities.filter((d) => d.slug !== deity.slug).slice(0, 6).map((d) => (
            <Link key={d.slug} to={`/deities/${d.slug}`} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-[13px] font-medium hover:border-gold hover:text-gold-deep">{d.name}</Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function Collections() {
  return (
    <>
      <Seo title="Collections & Deities" description="Browse all deity collections and curated edits — brass, silver, premium, festive and temple grade." path="/collections" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell py-12 lg:py-16">
          <p className="eyebrow">Index</p>
          <h1 className="heading-1 mt-2">Collections & Deities</h1>
        </div>
      </div>
      <div className="container-shell grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { to: "/shop?category=brass", t: "Brass Idols", d: "Warm antique & classic finishes", seed: 11, deity: "Ganesha", mat: "brass" as const },
          { to: "/shop?category=silver", t: "Silver Idols", d: "925 hallmarked silver", seed: 52, deity: "Lakshmi", mat: "silver" as const },
          { to: "/shop?category=premium-brass", t: "Premium Collection", d: "Master-artisan editions", seed: 83, deity: "Krishna", mat: "brass" as const },
          { to: "/shop?filter=new", t: "New Arrivals", d: "The latest castings", seed: 140, deity: "Durga", mat: "brass" as const },
          { to: "/shop?filter=bestsellers", t: "Best Sellers", d: "Loved across 40+ countries", seed: 180, deity: "Buddha", mat: "brass" as const },
          { to: "/custom", t: "Custom Atelier", d: "Made for your vision", seed: 155, deity: "Ram Darbar", mat: "brass" as const },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 60}>
            <Link to={c.to} className="group relative block overflow-hidden rounded-2xl border border-ink/10">
              <span className="block aspect-[16/10] transition-transform duration-700 group-hover:scale-105">
                <ProductVisual art={{ deity: c.deity, material: c.mat, finish: "Classic", seed: c.seed }} view="lifestyle" title={c.t} />
              </span>
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-14 text-ivory">
                <span className="font-display text-xl">{c.t}</span>
                <span className="block text-[13px] text-ivory/70">{c.d}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="container-shell pb-14">
        <h2 className="heading-3">All Deities</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {deities.map((d) => (
            <Link key={d.slug} to={`/deities/${d.slug}`} className="group overflow-hidden rounded-2xl border border-ink/10 bg-ivory-card">
              <span className="block aspect-[4/3] transition-transform duration-700 group-hover:scale-105">
                <ProductVisual art={{ deity: d.name, material: "brass", finish: "Classic", seed: d.seed }} view="front" title={d.name} />
              </span>
              <span className="block p-4"><span className="font-display text-[17px]">{d.name}</span><span className="block text-[13px] text-ink/55">{d.line}</span></span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
