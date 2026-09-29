import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { getProductById } from "../data/products";
import { ProductCard } from "../components/ui/ProductCard";
import { Seo } from "../components/Seo";
import { useWishlistStore } from "../store/wishlistStore";
import { products } from "../data/products";

export function Wishlist() {
  const items = useWishlistStore((s) => s.items);
  const list = items.map((i) => getProductById(i.productId)).filter(Boolean);
  const more = products.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 4);

  return (
    <>
      <Seo title="Wishlist" description="Pieces you've saved for later." path="/wishlist" />
      <div className="container-shell py-10 lg:py-14">
        <h1 className="heading-1">Wishlist ({list.length})</h1>
        {list.length === 0 ? (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-ink/10 bg-ivory-card p-10 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ivory"><Heart className="h-7 w-7 text-ink/40" /></span>
            <p className="mt-4 font-display text-2xl">Nothing saved yet.</p>
            <p className="mt-2 text-sm text-ink/60">Tap the heart on any idol to keep it here for later.</p>
            <Link to="/shop" className="btn mt-5 bg-ink px-6 py-3 text-sm text-ivory">Discover Idols</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {list.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        )}
        <h2 className="heading-3 mt-14">Keep exploring</h2>
        <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {more.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
