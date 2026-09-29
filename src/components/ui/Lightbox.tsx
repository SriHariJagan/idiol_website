import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ProductVisual } from "../../assets/ProductVisual";
import { useUIStore } from "../../store/uiStore";
import { overlay, scaleIn } from "../../utils/animations";
import type { ArtSpec } from "../../data/products";

export function Lightbox({ art }: { art: ArtSpec }) {
  const lb = useUIStore((s) => s.lightbox);
  const setLb = useUIStore((s) => s.setLightbox);
  const views = ["front", "side", "detail", "lifestyle"] as const;

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!lb) return;
      setLb({ images: lb.images, index: (lb.index + dir + lb.images.length) % lb.images.length });
    },
    [lb, setLb]
  );

  useEffect(() => {
    if (!lb) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLb(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lb, setLb, step]);

  // touch swipe
  useEffect(() => {
    if (!lb) return;
    let x0 = 0;
    const ts = (e: TouchEvent) => (x0 = e.touches[0].clientX);
    const te = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", ts, { passive: true });
    window.addEventListener("touchend", te, { passive: true });
    return () => {
      window.removeEventListener("touchstart", ts);
      window.removeEventListener("touchend", te);
    };
  }, [lb, step]);

  return (
    <AnimatePresence>
      {lb && (
        <motion.div variants={overlay} initial="hidden" animate="visible" exit="exit" className="fixed inset-0 z-[80] flex flex-col bg-ink/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between py-2 text-ivory">
            <p className="text-sm text-ivory/70">{lb.index + 1} / {lb.images.length} · {views[lb.index] ?? ""} view</p>
            <button onClick={() => setLb(null)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-white/10" aria-label="Close viewer">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative mx-auto flex w-full max-w-5xl flex-1 items-center justify-center gap-2 overflow-hidden">
            <button onClick={() => step(-1)} className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.div key={lb.index} variants={scaleIn} initial="hidden" animate="visible" className="aspect-[4/5] max-h-[72vh] w-full max-w-[560px] overflow-hidden rounded-2xl">
              <ProductVisual art={art} view={views[lb.index] ?? "front"} title={lb.images[lb.index]?.alt} />
            </motion.div>
            <button onClick={() => step(1)} className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-ivory hover:bg-white/20" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mx-auto flex w-full max-w-5xl justify-center gap-2 py-4">
            {lb.images.map((im, i) => (
              <button
                key={i}
                onClick={() => setLb({ images: lb.images, index: i })}
                aria-label={`View ${views[i] ?? i + 1}`}
                className={`h-14 w-12 overflow-hidden rounded-lg ring-2 transition-all ${i === lb.index ? "ring-gold" : "ring-transparent opacity-60 hover:opacity-100"}`}
              >
                <ProductVisual art={art} view={views[i] ?? "front"} title={im.alt} />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
