import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { Home } from "./pages/Home";

const Shop = lazy(() => import("./pages/Shop").then((m) => ({ default: m.Shop })));
const DeityPage = lazy(() => import("./pages/Deity").then((m) => ({ default: m.DeityPage })));
const Collections = lazy(() => import("./pages/Deity").then((m) => ({ default: m.Collections })));
const ProductDetail = lazy(() => import("./pages/ProductDetail").then((m) => ({ default: m.ProductDetail })));
const Cart = lazy(() => import("./pages/Cart").then((m) => ({ default: m.Cart })));
const Checkout = lazy(() => import("./pages/Checkout").then((m) => ({ default: m.Checkout })));
const Wishlist = lazy(() => import("./pages/Wishlist").then((m) => ({ default: m.Wishlist })));
const CustomOrder = lazy(() => import("./pages/CustomOrder").then((m) => ({ default: m.CustomOrder })));
const Gifting = lazy(() => import("./pages/Gifting").then((m) => ({ default: m.Gifting })));
const Craft = lazy(() => import("./pages/Craft").then((m) => ({ default: m.Craft })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Journal = lazy(() => import("./pages/Journal").then((m) => ({ default: m.Journal })));
const JournalArticle = lazy(() => import("./pages/Journal").then((m) => ({ default: m.JournalArticle })));
const Contact = lazy(() => import("./pages/Support").then((m) => ({ default: m.Contact })));
const Shipping = lazy(() => import("./pages/Support").then((m) => ({ default: m.Shipping })));
const Returns = lazy(() => import("./pages/Support").then((m) => ({ default: m.Returns })));
const Faq = lazy(() => import("./pages/Support").then((m) => ({ default: m.Faq })));
const Track = lazy(() => import("./pages/Support").then((m) => ({ default: m.Track })));
const Privacy = lazy(() => import("./pages/Support").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Support").then((m) => ({ default: m.Terms })));
const NotFound = lazy(() => import("./pages/Support").then((m) => ({ default: m.NotFound })));

function Fallback() {
  return (
    <div className="container-shell flex min-h-[50vh] items-center justify-center" aria-label="Loading" role="status">
      <div className="text-center">
        <p className="font-display text-3xl">IDIOL</p>
        <p className="mt-2 text-[12px] font-semibold uppercase tracking-luxe text-gold-deep">Preparing the gallery…</p>
      </div>
    </div>
  );
}

const lazyEl = (el: React.ReactNode) => <Suspense fallback={<Fallback />}>{el}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: lazyEl(<Shop />) },
      { path: "collections", element: lazyEl(<Collections />) },
      { path: "deities/:slug", element: lazyEl(<DeityPage />) },
      { path: "product/:slug", element: lazyEl(<ProductDetail />) },
      { path: "cart", element: lazyEl(<Cart />) },
      { path: "checkout", element: lazyEl(<Checkout />) },
      { path: "wishlist", element: lazyEl(<Wishlist />) },
      { path: "custom", element: lazyEl(<CustomOrder />) },
      { path: "gifting", element: lazyEl(<Gifting />) },
      { path: "craft", element: lazyEl(<Craft />) },
      { path: "about", element: lazyEl(<About />) },
      { path: "journal", element: lazyEl(<Journal />) },
      { path: "journal/:slug", element: lazyEl(<JournalArticle />) },
      { path: "contact", element: lazyEl(<Contact />) },
      { path: "shipping", element: lazyEl(<Shipping />) },
      { path: "returns", element: lazyEl(<Returns />) },
      { path: "faq", element: lazyEl(<Faq />) },
      { path: "track", element: lazyEl(<Track />) },
      { path: "privacy", element: lazyEl(<Privacy />) },
      { path: "terms", element: lazyEl(<Terms />) },
      { path: "*", element: lazyEl(<NotFound />) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
