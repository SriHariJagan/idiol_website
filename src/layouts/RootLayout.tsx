import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../components/header/Header";
import { AnnouncementBar } from "../components/header/AnnouncementBar";
import { Footer } from "../components/footer/Footer";
import { CartDrawer } from "../components/ui/CartDrawer";
import { SearchOverlay } from "../components/ui/SearchOverlay";
import { QuickView } from "../components/ui/QuickView";
import { Toasts } from "../components/ui/Toasts";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory-card text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:text-ivory">
        Skip to content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toasts />
      <ScrollRestoration />
    </div>
  );
}

export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);
  return null;
}
