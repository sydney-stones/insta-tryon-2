import { BlogPost } from '../types';
import virtualTryOnFashionBrandsGuide from './virtual-try-on-fashion-brands-guide';
import virtualTryOnShopify from './virtual-try-on-shopify';
import reduceFashionReturns from './reduce-fashion-returns-virtual-try-on';
import virtualTryOnRoi from './virtual-try-on-roi-shopify-fashion';
import aiVirtualTryOnHowItWorks from './ai-virtual-try-on-clothing-how-it-works';
import virtualTryOnAppComparison from './virtual-try-on-shopify-app-comparison';
import virtualTryOnConversionRate from './virtual-try-on-increase-conversion-rate-fashion';
import virtualFittingRoomTechnology from './virtual-fitting-room-technology';
import aiFashionTechnologyTrends from './ai-fashion-technology-trends';
import bestVirtualTryOnApp from './best-virtual-try-on-app';
import onlineClothingReturnRateSolutions from './online-clothing-return-rate-solutions';
import eCommerceCustomerConfidence from './e-commerce-customer-confidence';
import generativeAiApparelIndustry from './generative-ai-apparel-industry';
import whatIsRenderedFits from './what-is-rendered-fits';
import shopifyFashionAppIncreaseSales from './shopify-fashion-app-increase-sales';
import aiToolsFashionEcommerce from './ai-tools-for-fashion-ecommerce';
import virtualTryOnExplained from './virtual-try-on-explained';
import fashionEcommerceConversionRateBenchmarks from './fashion-ecommerce-conversion-rate-benchmarks';

// Add new posts here — newest first
export const allPosts: BlogPost[] = [
  whatIsRenderedFits,
  shopifyFashionAppIncreaseSales,
  aiToolsFashionEcommerce,
  virtualTryOnExplained,
  fashionEcommerceConversionRateBenchmarks,
  virtualFittingRoomTechnology,
  aiFashionTechnologyTrends,
  bestVirtualTryOnApp,
  onlineClothingReturnRateSolutions,
  eCommerceCustomerConfidence,
  generativeAiApparelIndustry,
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
