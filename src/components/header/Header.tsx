import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { deities } from "../../data/products";
import { useCartStore, cartCount } from "../../store/cartStore";
import { useWishlistStore } from "../../store/wishlistStore";
import { useUIStore } from "../../store/uiStore";
import { cn } from "../../utils/helpers";
import { drawerRight, overlay } from "../../utils/animations";

const shopLinks = [
  { label: "Brass Idols", to: "/shop?category=brass", desc: "Warm antique & classic finishes" },
  { label: "Silver Idols", to: "/shop?category=silver", desc: "925 hallmarked silver" },
  { label: "Premium Collection", to: "/shop?category=premium-brass", desc: "Master-artisan editions" },
  { label: "New Arrivals", to: "/shop?filter=new", desc: "The latest castings" },
  { label: "Best Sellers", to: "/shop?filter=bestsellers", desc: "Loved across 40+ countries" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<"shop" | "deities" | null>(null);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const setSearchOpen = useUIStore((s) => s.setSearchOpen);
  const mobileOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobileOpen = useUIStore((s) => s.setMobileNavOpen);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const count = cartCount(items);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled ? "bg-ivory-card/90 shadow-card backdrop-blur-md" : "bg-ivory-card"
        )}
      >
        <div className="container-shell flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          {/* mobile menu button */}
          <button className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* logo */}
          <Link to="/" className="flex items-baseline gap-2" aria-label="IDIOL home">
            <span className="font-display text-[26px] font-semibold tracking-tight lg:text-3xl">IDIOL</span>
            <span className="hidden text-[10px] font-semibold uppercase tracking-luxe text-gold-deep sm:inline">Sacred Craft</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            <div className="relative" onMouseEnter={() => setMega("shop")} onMouseLeave={() => setMega(null)}>
              <button className={cn("flex items-center gap-1 py-3 text-[13px] font-semibold uppercase tracking-[0.14em]", mega === "shop" ? "text-gold-deep" : "text-ink/70 hover:text-ink")} aria-expanded={mega === "shop"}>
                Shop <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <AnimatePresence>
                {mega === "shop" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }} className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-lift">
                    <div className="grid grid-cols-2 gap-1">
                      {shopLinks.map((l) => (
                        <Link key={l.label} to={l.to} onClick={() => setMega(null)} className="rounded-xl p-3.5 transition-colors hover:bg-ivory">
                          <p className="text-[15px] font-semibold">{l.label}</p>
                          <p className="mt-0.5 text-[13px] text-ink/55">{l.desc}</p>
                        </Link>
                      ))}
                    </div>
                    <Link to="/custom" onClick={() => setMega(null)} className="mt-2 flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-ivory transition-colors hover:bg-ink-soft">
                      <span className="text-sm font-semibold">Need something bespoke? Custom Orders</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative" onMouseEnter={() => setMega("deities")} onMouseLeave={() => setMega(null)}>
              <button className={cn("flex items-center gap-1 py-3 text-[13px] font-semibold uppercase tracking-[0.14em]", mega === "deities" ? "text-gold-deep" : "text-ink/70 hover:text-ink")} aria-expanded={mega === "deities"}>
                Deities <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <AnimatePresence>
                {mega === "deities" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.22 }} className="absolute left-1/2 top-full w-[620px] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-3 shadow-lift">
                    <div className="grid grid-cols-3 gap-1">
                      {deities.map((d) => (
                        <Link key={d.slug} to={`/deities/${d.slug}`} onClick={() => setMega(null)} className="rounded-xl p-3 transition-colors hover:bg-ivory">
                          <p className="text-[14.5px] font-semibold">{d.name}</p>
                          <p className="text-[12.5px] text-ink/55">{d.line}</p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { label: "Collections", to: "/collections" },
              { label: "Custom", to: "/custom" },
              { label: "Our Craft", to: "/craft" },
              { label: "Journal", to: "/journal" },
              { label: "About", to: "/about" },
            ].map((l) => (
              <NavLink key={l.label} to={l.to} className={({ isActive }) => cn("py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors", isActive ? "text-gold-deep" : "text-ink/70 hover:text-ink")}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button onClick={() => setSearchOpen(true)} className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <button onClick={() => navigate("/wishlist")} className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5" aria-label={`Wishlist, ${wishlistCount} items`}>
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">{wishlistCount}</span>
              )}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/5" aria-label={`Cart, ${count} items`}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-ivory">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div variants={overlay} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-[2px] lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <motion.aside variants={drawerRight} initial="hidden" animate="visible" exit="exit" className="fixed inset-y-0 right-0 z-[61] flex w-[88vw] max-w-sm flex-col bg-ivory-card lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <span className="font-display text-xl font-semibold">IDIOL</span>
                <button onClick={() => setMobileOpen(false)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
                <p className="eyebrow">Shop</p>
                <div className="mt-2 space-y-1">
                  {shopLinks.map((l) => (
                    <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 font-display text-lg hover:bg-ivory">
                      {l.label}
                    </Link>
                  ))}
                </div>
                <p className="eyebrow mt-6">Deities</p>
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {deities.map((d) => (
                    <Link key={d.slug} to={`/deities/${d.slug}`} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-2 text-[15px] font-medium hover:bg-ivory">
                      {d.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 space-y-1 border-t border-ink/10 pt-4">
                  {[
                    { label: "Collections", to: "/collections" },
                    { label: "Custom Orders", to: "/custom" },
                    { label: "Our Craft", to: "/craft" },
                    { label: "Journal", to: "/journal" },
                    { label: "About", to: "/about" },
                    { label: "Wishlist", to: "/wishlist" },
                    { label: "Cart", to: "/cart" },
                  ].map((l) => (
                    <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2.5 text-[15px] font-medium hover:bg-ivory">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="border-t border-ink/10 p-5">
                <p className="text-xs text-ink/55">Handcrafted in India · Worldwide shipping</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
