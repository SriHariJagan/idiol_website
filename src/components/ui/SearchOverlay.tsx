import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { searchProducts } from "../../data/products";
import { inr } from "../../utils/helpers";
import { ProductVisual } from "../../assets/ProductVisual";
import { useUIStore } from "../../store/uiStore";
import { overlay, scaleIn } from "../../utils/animations";

const popular = ["Ganesha", "Silver Lakshmi", "Nataraja", "Buddha", "Diya", "Radha Krishna"];

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const setOpen = useUIStore((s) => s.setSearchOpen);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div variants={overlay} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[70] bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-3xl bg-ivory-card shadow-lift"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <Search className="h-5 w-5 text-ink/40" />
              <label htmlFor="site-search" className="sr-only">Search idols</label>
              <input
                ref={inputRef}
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search Ganesha, silver, Nataraja…"
                className="flex-1 bg-transparent text-lg outline-none placeholder:text-ink/35"
                autoComplete="off"
              />
              <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ink/5" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-3">
              {q.trim() === "" ? (
                <div className="p-3">
                  <p className="px-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/45">Popular right now</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {popular.map((p) => (
                      <button key={p} onClick={() => setQ(p)} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:border-gold hover:text-gold-deep">
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <p className="px-4 py-8 text-center text-[15px] text-ink/60">We couldn't find that piece. Try “Ganesha”, “silver” or “Buddha”.</p>
              ) : (
                <ul className="divide-y divide-ink/8">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link to={`/product/${p.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-ivory">
                        <span className="h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-ink/10">
                          <ProductVisual art={p.art} view="front" title={p.name} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-[16px] font-medium">{p.name}</span>
                          <span className="text-[13px] text-ink/55">{p.deity} · {p.height}" · {p.material === "silver" ? "Silver" : "Brass"}</span>
                        </span>
                        <span className="text-[15px] font-semibold">{inr(p.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {q.trim() !== "" && results.length > 0 && (
              <Link to={`/shop?search=${encodeURIComponent(q)}`} onClick={() => setOpen(false)} className="flex items-center justify-center gap-2 border-t border-ink/10 px-5 py-3.5 text-sm font-semibold text-gold-deep hover:bg-ivory">
                View all results <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
