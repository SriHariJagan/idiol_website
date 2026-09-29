import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { Seo } from "../components/Seo";
import { cn, inr } from "../utils/helpers";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const finishes = ["Antique", "Classic", "Premium", "High polish"];

export function Shop() {
  const [params, setParams] = useSearchParams();
  const [mobileFilters, setMobileFilters] = useState(false);

  const category = params.get("category") ?? "all";
  const filter = params.get("filter") ?? "";
  const search = params.get("search") ?? "";
  const material = params.get("material") ?? "all";
  const finish = params.get("finish") ?? "all";
  const maxPrice = Number(params.get("max") ?? 60000);
  const sort = (params.get("sort") ?? "featured") as Sort;
  const inStock = params.get("stock") === "1";

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (!v || v === "all" || v === "") next.delete(k);
    else next.set(k, v);
    setParams(next, { preventScrollReset: true });
  };

  const filtered = useMemo(() => {
    let out = [...products];
    if (category === "brass") out = out.filter((p) => p.category === "brass");
    if (category === "silver") out = out.filter((p) => p.category === "silver");
    if (category === "premium-brass") out = out.filter((p) => p.category === "premium-brass");
    if (filter === "new") out = out.filter((p) => p.newArrival);
    if (filter === "bestsellers") out = out.filter((p) => p.bestSeller);
    if (material !== "all") out = out.filter((p) => p.material === material);
    if (finish !== "all") out = out.filter((p) => p.finish.toLowerCase().includes(finish.toLowerCase()));
    if (search) {
      const s = search.toLowerCase();
      out = out.filter((p) => [p.name, p.deity, p.material, p.finish, ...(p.tags ?? [])].join(" ").toLowerCase().includes(s));
    }
    out = out.filter((p) => p.price <= maxPrice);
    if (inStock) out = out.filter((p) => p.stock > 0);
    switch (sort) {
      case "price-asc": out.sort((a, b) => a.price - b.price); break;
      case "price-desc": out.sort((a, b) => b.price - a.price); break;
      case "rating": out.sort((a, b) => b.rating - a.rating); break;
      default: out.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
    return out;
  }, [category, filter, search, material, finish, maxPrice, sort, inStock]);

  const activeCount = [category !== "all", filter !== "", material !== "all", finish !== "all", search !== "", inStock, maxPrice < 60000].filter(Boolean).length;

  const title =
    category === "brass" ? "Brass Idols" :
    category === "silver" ? "Silver Idols" :
    category === "premium-brass" ? "Premium Collection" :
    filter === "new" ? "New Arrivals" :
    filter === "bestsellers" ? "Best Sellers" : "All Idols";

  const filtersUI = (
    <div className="space-y-6">
      <div>
        <p className="label">Category</p>
        <div className="space-y-1">
          {[["all", "All Idols"], ["brass", "Brass"], ["silver", "Silver"], ["premium-brass", "Premium Brass"]].map(([v, l]) => (
            <button key={v} onClick={() => set("category", v === "all" ? "" : v)} className={cn("block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors", (category === v || (v === "all" && category === "all")) ? "bg-ink font-semibold text-ivory" : "hover:bg-ink/5")} aria-pressed={category === v}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="label">Material</p>
        <div className="flex gap-2">
          {[["all", "All"], ["brass", "Brass"], ["silver", "Silver"]].map(([v, l]) => (
            <button key={v} onClick={() => set("material", v === "all" ? "" : v)} className={cn("flex-1 rounded-full border px-3 py-2 text-sm font-medium transition-colors", material === v ? "border-ink bg-ink text-ivory" : "border-ink/15 hover:border-ink")} aria-pressed={material === v}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="label">Finish</p>
        <div className="flex flex-wrap gap-2">
          {["all", ...finishes].map((f) => (
            <button key={f} onClick={() => set("finish", f === "all" ? "" : f)} className={cn("rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors", (finish === f || (f === "all" && finish === "all")) ? "border-ink bg-ink text-ivory" : "border-ink/15 hover:border-ink")} aria-pressed={finish === f}>
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="label">Up to {inr(maxPrice)}</p>
        <input type="range" min={3000} max={60000} step={1000} value={maxPrice} onChange={(e) => set("max", e.target.value)} className="w-full accent-[#B98A2F]" aria-label="Maximum price" />
        <div className="flex justify-between text-xs text-ink/50"><span>{inr(3000)}</span><span>{inr(60000)}</span></div>
      </div>
      <label className="flex cursor-pointer items-center gap-3 text-sm font-medium">
        <input type="checkbox" checked={inStock} onChange={(e) => set("stock", e.target.checked ? "1" : "")} className="h-4 w-4 accent-[#B98A2F]" />
        In stock only
      </label>
      {activeCount > 0 && (
        <button onClick={() => setParams({})} className="text-sm font-semibold text-gold-deep hover:underline">Clear all filters ({activeCount})</button>
      )}
    </div>
  );

  return (
    <>
      <Seo title={title} description={`Shop ${title.toLowerCase()} — handcrafted brass & silver idols, authentic materials, worldwide delivery.`} path="/shop" />
      <div className="bg-gallery border-b border-ink/10">
        <div className="container-shell py-12 lg:py-16">
          <p className="eyebrow">The Collection</p>
          <h1 className="heading-1 mt-2">{title}</h1>
          <p className="body-l mt-3 max-w-xl">{search ? `Results for “${search}”` : "Every piece is lost-wax cast, hand-chased and inspected before crating."}</p>
        </div>
      </div>

      <div className="container-shell grid gap-8 py-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 rounded-2xl border border-ink/10 bg-ivory-card p-5">{filtersUI}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink/60" aria-live="polite">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setMobileFilters(true)} className="btn btn-sm border border-ink/20 lg:hidden">
                <SlidersHorizontal className="h-4 w-4" /> Filters{activeCount > 0 && ` (${activeCount})`}
              </button>
              <label htmlFor="sort" className="sr-only">Sort products</label>
              <select id="sort" value={sort} onChange={(e) => set("sort", e.target.value)} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-medium">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-ink/10 bg-ivory-card p-12 text-center">
              <p className="font-display text-2xl">We couldn't find that piece.</p>
              <p className="mt-2 text-sm text-ink/60">Try widening the price range or clearing a filter.</p>
              <button onClick={() => setParams({})} className="btn mt-5 bg-ink px-6 py-3 text-sm text-ivory">Clear filters</button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* mobile filter sheet */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileFilters(false)} aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-ivory-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setMobileFilters(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Close filters"><X className="h-5 w-5" /></button>
            </div>
            {filtersUI}
            <button onClick={() => setMobileFilters(false)} className="btn mt-6 w-full bg-ink py-3.5 text-sm text-ivory">Show {filtered.length} pieces</button>
          </div>
        </div>
      )}
    </>
  );
}
