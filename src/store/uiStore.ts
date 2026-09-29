import { create } from "zustand";

export interface ToastMsg {
  id: number;
  title: string;
  body?: string;
  kind: "success" | "info" | "error";
}

interface UIState {
  searchOpen: boolean;
  quickViewId: string | null;
  lightbox: { images: { src: string; alt: string }[]; index: number } | null;
  mobileNavOpen: boolean;
  toasts: ToastMsg[];
  setSearchOpen: (v: boolean) => void;
  setQuickViewId: (id: string | null) => void;
  setLightbox: (lb: UIState["lightbox"]) => void;
  setMobileNavOpen: (v: boolean) => void;
  pushToast: (t: Omit<ToastMsg, "id">) => void;
  dismissToast: (id: number) => void;
}

let toastId = 1;

export const useUIStore = create<UIState>((set, get) => ({
  searchOpen: false,
  quickViewId: null,
  lightbox: null,
  mobileNavOpen: false,
  toasts: [],
  setSearchOpen: (v) => set({ searchOpen: v }),
  setQuickViewId: (id) => set({ quickViewId: id }),
  setLightbox: (lb) => set({ lightbox: lb }),
  setMobileNavOpen: (v) => set({ mobileNavOpen: v }),
  pushToast: (t) => {
    const id = toastId++;
    set({ toasts: [...get().toasts.slice(-2), { ...t, id }] });
    window.setTimeout(() => get().dismissToast(id), 3200);
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
