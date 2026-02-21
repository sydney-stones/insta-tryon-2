import { BlogPost } from '../types';
import virtualTryOnShopify from './virtual-try-on-shopify';

// Add new posts here — newest first
export const allPosts: BlogPost[] = [
  virtualTryOnShopify,
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  allPosts.find(p => p.slug === slug);

export const getRelatedPosts = (currentSlug: string, count = 3): BlogPost[] =>
  allPosts.filter(p => p.slug !== currentSlug).slice(0, count);
