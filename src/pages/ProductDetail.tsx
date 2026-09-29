import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, ChevronDown, Heart, Minus, Plus, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { getProductBySlug, products } from "../data/products";
import type { ArtView } from "../data/products";
import { ProductVisual } from "../assets/ProductVisual";
import { ProductCard } from "../components/ui/ProductCard";
import { ProductBadges } from "../components/ui/Badge";
import { Reveal, Stars } from "../components/ui/Reveal";
import { Lightbox } from "../components/ui/Lightbox";
import { Seo } from "../components/Seo";
import { inr, cn } from "../utils/helpers";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useUIStore } from "../store/uiStore";

const views: ArtView[] = ["front", "side", "detail", "lifestyle"];

export function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [view, setView] = useState<ArtView>("front");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAcc, setOpenAcc] = useState<string | null>("story");

  const addItem = useCartStore((s) => s.addItem);
  const has = useWishlistStore((s) => s.has);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const pushToast = useUIStore((s) => s.pushToast);
  const setLightbox = useUIStore((s) => s.setLightbox);

  useEffect(() => {
    setView("front");
    setQty(1);
    setAdded(false);
    useUIStore.getState().setQuickViewId(null);
    window.scrollTo({ top: 0 });
    if (slug) {
      try {
        const prev: string[] = JSON.parse(localStorage.getItem("idiol-recent") ?? "[]");
        localStorage.setItem("idiol-recent", JSON.stringify([slug, ...prev.filter((s) => s !== slug)].slice(0, 8)));
      } catch { /* noop */ }
    }
  }, [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    const same = products.filter((p) => p.id !== product.id && p.deity === product.deity);
    const mat = products.filter((p) => p.id !== product.id && p.deity !== product.deity && p.material === product.material);
    return [...same, ...mat].slice(0, 4);
  }, [product]);

  const recent = useMemo(() => {
    try {
      const ids: string[] = JSON.parse(localStorage.getItem("idiol-recent") ?? "[]");
      return ids.map((s) => getProductBySlug(s)).filter((p) => p && p.slug !== slug).slice(0, 4);
    } catch {
      return [];
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container-shell py-24 text-center">
        <Seo title="Not Found" description="Product not found." path="/404" />
        <p className="font-display text-3xl">Looks like this piece belongs somewhere else.</p>
        <Link to="/shop" className="btn mt-6 bg-ink px-7 py-3 text-sm text-ivory">Back to Collection</Link>
      </div>
    );
  }

  const wished = has(product.id);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    material: product.material,
    offers: { "@type": "Offer", priceCurrency: "INR", price: product.price, availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount },
  };

  const doAdd = () => {
    const res = addItem(product, qty);
    if (!res.ok) {
      pushToast({ kind: "error", title: "Couldn't add", body: res.reason });
      return;
    }
    setAdded(true);
    pushToast({ kind: "success", title: "Added to your collection", body: `${qty} × ${product.name}` });
    window.setTimeout(() => setAdded(false), 2200);
  };

  const specs: [string, string][] = [
    ["Material", product.material === "silver" ? `Silver (${product.purity ?? "925"})` : "Solid brass"],
    ["Height", `${product.height} inch`],
    ["Width", `${product.width} inch`],
    ["Weight", product.material === "silver" ? `${(product.weight * 1000).toFixed(0)} g` : `${product.weight} kg`],
    ["Finish", product.finish],
    ["Technique", product.technique],
    ["Origin", product.origin],
  ];

  const accordions = [
    { id: "story", title: "Craftsmanship Story", body: `${product.description} Cast in Moradabad by fourth-generation karigars, chased by hand for over eleven hours, and inspected piece-by-piece before it earns the IDIOL monogram.` },
    { id: "receive", title: "What You Receive", body: `The idol · authenticity & material documentation · premium silk-lined packaging · GST invoice · insured shipping with tracking.` },
    { id: "care", title: "Care Instructions", body: product.careInstructions.join(" ") },
    { id: "shipping", title: "Shipping & Returns", body: `${product.shippingInfo.estimatedDays}. ${product.shippingInfo.packaging}. 7-day easy returns for unused pieces in original packaging; custom orders are final sale.` },
    { id: "faq", title: "FAQ", body: `Is this solid metal? Yes — never hollow or resin-filled. Is silver hallmarked? ${product.material === "silver" ? "Yes, BIS-hallmarked with assay papers." : "This piece is brass; our silver line is BIS-hallmarked."} Suitable for daily pooja? Yes — wipe clean and oil lightly to preserve patina.` },
  ];

  return (
    <>
      <Seo title={product.name} description={product.shortDescription} path={`/product/${product.slug}`} type="product" schema={schema} />

      <nav className="container-shell pt-6 text-[13px] text-ink/55" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1.5">
          <li><Link to="/" className="hover:text-ink">Home</Link></li><li aria-hidden="true">/</li>
          <li><Link to="/shop" className="hover:text-ink">Shop</Link></li><li aria-hidden="true">/</li>
          <li><Link to={`/deities/${product.deity.toLowerCase().replace(/ /g, "-")}`} className="hover:text-ink">{product.deity}</Link></li><li aria-hidden="true">/</li>
          <li className="text-ink" aria-current="page">{product.name.split("—")[0].trim()}</li>
        </ol>
      </nav>

      <div className="container-shell grid gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* gallery */}
        <div>
          <button
            onClick={() => setLightbox({ images: product.images, index: views.indexOf(view) })}
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-3xl border border-ink/10 shadow-card"
            aria-label="Open fullscreen viewer"
          >
            <ProductVisual key={view} art={product.art} view={view} title={product.images[views.indexOf(view)]?.alt} />
            <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-4 py-1.5 text-[12px] font-medium text-ivory backdrop-blur">Click to expand · {view}</span>
          </button>
          <div className="mt-3 grid grid-cols-4 gap-3" role="tablist" aria-label="Product views">
            {views.map((v) => (
              <button
                key={v}
                role="tab"
                aria-selected={view === v}
                onClick={() => setView(v)}
                className={cn("overflow-hidden rounded-xl border-2 transition-all", view === v ? "border-gold" : "border-ink/10 hover:border-ink/30")}
              >
                <span className="block aspect-[4/5]"><ProductVisual art={product.art} view={v} title={`${product.name} ${v} view`} /></span>
                <span className="block bg-ivory-card py-1 text-center text-[11px] font-semibold uppercase tracking-wider text-ink/60">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <ProductBadges bestSeller={product.bestSeller} newArrival={product.newArrival} featured={product.featured} compareAtPrice={product.compareAtPrice} price={product.price} />
          <h1 className="heading-1 mt-3">{product.name}</h1>
          <p className="mt-2 text-[15px] text-ink/60">{product.shortDescription}</p>
          <div className="mt-3 flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-sm text-ink/55">{product.rating.toFixed(1)} · {product.reviewCount} demo reviews</span>
          </div>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-display text-4xl font-medium">{inr(product.price)}</span>
            {product.compareAtPrice && <span className="text-lg text-ink/40 line-through">{inr(product.compareAtPrice)}</span>}
          </div>
          <p className="mt-1 text-[13px] text-ink/55">Inclusive of all taxes · EMI available at checkout</p>
          <p className={cn("mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[13px] font-semibold", product.stock > 0 ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>
            <span className={cn("heading-1.5 w-1.5 rounded-full", product.stock > 0 ? "bg-green-600" : "bg-red-600")} />
            {product.stock > 0 ? (product.stock <= 6 ? `Only ${product.stock} left` : "In stock") : "Out of stock"}
          </p>

          <dl className="mt-6 overflow-hidden rounded-2xl border border-ink/10 text-sm">
            {specs.map(([k, v], i) => (
              <div key={k} className={cn("grid grid-cols-[140px_1fr] gap-3 px-4 py-2.5", i % 2 === 0 && "bg-ivory")}>
                <dt className="text-ink/55">{k}</dt><dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          {product.material === "silver" && (
            <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-gold-deep"><ShieldCheck className="h-4 w-4" /> Authenticity, documented</p>
              <ul className="mt-2 space-y-1 text-[13.5px] text-ink/70">
                <li>· {product.purity} — BIS hallmark on the base</li>
                <li>· Assay certificate & signed artisan card included</li>
                <li>· {product.weight * 1000 > 0 ? `${(product.weight * 1000).toFixed(0)} g fine silver content` : "Fine silver content certified"}</li>
              </ul>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-ink/20" aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-ink/5" aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => toggleWish(product.id)}
              aria-pressed={wished}
              aria-label="Toggle wishlist"
              className={cn("grid h-12 w-12 place-items-center rounded-full border transition-colors", wished ? "border-ink bg-ink text-gold-light" : "border-ink/20 hover:border-ink")}
            >
              <Heart className={cn("h-5 w-5", wished && "fill-current")} />
            </button>
          </div>

          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <button onClick={doAdd} className={cn("btn py-4 text-sm", added ? "bg-green-700 text-white" : "bg-ink text-ivory hover:bg-gold-deep")}>
              {added ? <><Check className="h-4 w-4" /> Added ✓</> : "Add to Cart"}
            </button>
            <button
              onClick={() => { const r = addItem(product, qty); if (r.ok) navigate("/checkout"); else pushToast({ kind: "error", title: "Couldn't proceed", body: r.reason }); }}
              className="btn bg-gold py-4 text-sm text-white hover:bg-gold-deep"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-5 space-y-2 text-[13.5px] text-ink/65">
            <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold-deep" /> {product.shippingInfo.estimatedDays} · {product.stock > 0 ? "Ships in 48 hrs" : "Made to order"}</p>
            <p className="flex items-center gap-2"><RotateCcw className="h-4 w-4 text-gold-deep" /> 7-day easy returns ·-premium protective packaging</p>
          </div>

          <div className="mt-6 divide-y divide-ink/10 rounded-2xl border border-ink/10">
            {accordions.map((a) => (
              <div key={a.id}>
                <button onClick={() => setOpenAcc(openAcc === a.id ? null : a.id)} aria-expanded={openAcc === a.id} className="flex w-full items-center justify-between px-5 py-4 text-left font-display text-[17px] font-medium">
                  {a.title}
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openAcc === a.id && "rotate-180")} />
                </button>
                {openAcc === a.id && <p className="px-5 pb-5 text-[14.5px] leading-relaxed text-ink/70">{a.body}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* related */}
      <section className="container-shell pb-6" aria-label="Related products">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="heading-2">You may also revere</h2>
          <Link to="/shop" className="link-underline shrink-0 text-sm font-semibold text-gold-deep">View all →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="container-shell pb-16" aria-label="Recently viewed">
          <h2 className="heading-3">Recently viewed</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {recent.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <Reveal className="container-shell pb-16">
        <div className="rounded-3xl bg-ink p-8 text-ivory md:p-10">
          <p className="eyebrow !text-gold-light">What you receive</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {["The idol, hand-finished", "Authenticity documentation", "Silk-lined premium packaging", "GST invoice", "Insured shipping & tracking"].map((t) => (
              <p key={t} className="flex items-start gap-2 text-[14px] text-ivory/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" /> {t}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Lightbox art={product.art} />
    </>
  );
}
