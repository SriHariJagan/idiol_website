export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'brass' | 'silver' | 'premium-brass';
  deity: string;
  material: 'brass' | 'silver';
  purity?: string;
  price: number;
  compareAtPrice?: number;
  currency: 'INR';
  images: ProductImage[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  height: number;
  width: number;
  depth: number;
  weight: number;
  finish: string;
  technique: string;
  origin: string;
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  tags: string[];
  careInstructions: string[];
  shippingInfo: ShippingInfo;
  videoUrl?: string;
  art: { deity: string; material: "brass" | "silver"; finish: string; seed: number };
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  type: 'front' | 'back' | 'side' | 'detail' | 'lifestyle' | 'packaging' | 'workshop' | string;
}

export interface ShippingInfo {
  freeShipping: boolean;
  estimatedDays: string;
  packaging: string;
  worldwideDelivery: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: ProductVariant;
  addedAt: number;
}

export interface ProductVariant {
  size?: string;
  finish?: string;
  purity?: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Deity {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  helpful: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  text: string;
  productName?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
}

export interface CustomOrderRequest {
  name: string;
  email: string;
  phone: string;
  requirement: 'custom-size' | 'custom-design' | 'engraving' | 'temple-order' | 'wedding-gift' | 'corporate-gift';
  deity?: string;
  material?: 'brass' | 'silver';
  approximateSize?: string;
  quantity: number;
  message: string;
  referenceImages?: File[];
}

export interface CheckoutFormData {
  contact: {
    email: string;
    phone: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  delivery: {
    method: 'standard' | 'express';
    instructions?: string;
  };
  payment: {
    method: 'card' | 'upi' | 'netbanking' | 'wallet';
  };
}

export interface SEOData {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

export interface AnimationConfig {
  duration: number;
  ease: string | number[];
  delay?: number;
}

export interface BreakpointConfig {
  mobile: string;
  tablet: string;
  desktop: string;
  wide: string;
}