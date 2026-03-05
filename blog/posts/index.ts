import { BlogPost } from '../types';
import virtualTryOnFashionBrandsGuide from './virtual-try-on-fashion-brands-guide';
import virtualTryOnShopify from './virtual-try-on-shopify';
import reduceFashionReturns from './reduce-fashion-returns-virtual-try-on';
import virtualTryOnRoi from './virtual-try-on-roi-shopify-fashion';
import aiVirtualTryOnHowItWorks from './ai-virtual-try-on-clothing-how-it-works';
import virtualTryOnAppComparison from './virtual-try-on-shopify-app-comparison';
import virtualTryOnConversionRate from './virtual-try-on-increase-conversion-rate-fashion';

// Add new posts here — newest first
export const allPosts: BlogPost[] = [
  reduceFashionReturns,
  virtualTryOnRoi,
  aiVirtualTryOnHowItWorks,
  virtualTryOnAppComparison,
  virtualTryOnConversionRate,
  virtualTryOnFashionBrandsGuide,
  virtualTryOnShopify,
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  allPosts.find(p => p.slug === slug);

export const getRelatedPosts = (currentSlug: string, count = 3): BlogPost[] =>
  allPosts.filter(p => p.slug !== currentSlug).slice(0, count);
