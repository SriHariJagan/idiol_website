/**
 * Backend-ready service layer.
 * Today these resolve against local mock data with realistic latency.
 * Tomorrow: swap the internals to fetch(`${API_BASE}/...`) — call signatures stay identical.
 */
import { products, getProductBySlug, getProductById, getByDeity, searchProducts } from "../data/products";
import type { Product } from "../types";

const LATENCY = 120;
const wait = (ms = LATENCY) => new Promise((r) => setTimeout(r, ms));

export interface ProductQuery {
  category?: "brass" | "silver" | "premium-brass" | "all";
  deity?: string;
  material?: "brass" | "silver";
  finish?: string;
  maxPrice?: number;
  minPrice?: number;
  inStockOnly?: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  search?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
  limit?: number;
}

export async function listProducts(q: ProductQuery = {}): Promise<Product[]> {
  await wait();
  let out = [...products];
  if (q.category && q.category !== "all") out = out.filter((p) => p.category === q.category);
  if (q.deity) out = out.filter((p) => p.deity.toLowerCase() === q.deity!.toLowerCase());
  if (q.material) out = out.filter((p) => p.material === q.material);
  if (q.finish) out = out.filter((p) => p.finish.toLowerCase().includes(q.finish!.toLowerCase()));
  if (q.minPrice != null) out = out.filter((p) => p.price >= q.minPrice!);
  if (q.maxPrice != null) out = out.filter((p) => p.price <= q.maxPrice!);
  if (q.inStockOnly) out = out.filter((p) => p.stock > 0);
  if (q.featured) out = out.filter((p) => p.featured);
  if (q.bestSeller) out = out.filter((p) => p.bestSeller);
  if (q.newArrival) out = out.filter((p) => p.newArrival);
  if (q.search) {
    const ids = new Set(searchProducts(q.search).map((p) => p.id));
    out = out.filter((p) => ids.has(p.id));
  }
  switch (q.sort) {
    case "price-asc": out.sort((a, b) => a.price - b.price); break;
    case "price-desc": out.sort((a, b) => b.price - a.price); break;
    case "rating": out.sort((a, b) => b.rating - a.rating); break;
    case "newest": out.sort((a, b) => Number(b.newArrival) - Number(a.newArrival)); break;
    default: out.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
  if (q.limit) out = out.slice(0, q.limit);
  return out;
}

export async function getProduct(slug: string): Promise<Product | null> {
  await wait();
  return getProductBySlug(slug) ?? null;
}

export function getProductSync(idOrSlug: string): Product | undefined {
  return getProductById(idOrSlug) ?? getProductBySlug(idOrSlug);
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  await wait(60);
  const sameDeity = products.filter((p) => p.id !== product.id && p.deity === product.deity);
  const sameMaterial = products.filter((p) => p.id !== product.id && p.deity !== product.deity && p.material === product.material);
  return [...sameDeity, ...sameMaterial].slice(0, limit);
}

export async function getDeityProducts(deity: string): Promise<Product[]> {
  await wait();
  return getByDeity(deity);
}
