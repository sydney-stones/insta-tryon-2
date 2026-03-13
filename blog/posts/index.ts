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
import virtualTryOnStatistics from './virtual-try-on-statistics';
import virtualTryOnVsSizeRecommendation from './virtual-try-on-vs-size-recommendation';
import howToSetUpVirtualTryOnShopify from './how-to-set-up-virtual-try-on-shopify';
import isVirtualTryOnWorthIt from './is-virtual-try-on-worth-it';
import virtualTryOnFaq from './virtual-try-on-faq';
import virtualTryOnOccasionwearBrands from './virtual-try-on-occasionwear-brands';
import virtualTryOnWomenswearShopify from './virtual-try-on-womenswear-shopify';
import virtualTryOnBridalWeddingFashion from './virtual-try-on-bridal-wedding-fashion';
import virtualTryOnActivewearBrands from './virtual-try-on-activewear-brands';
import virtualTryOnSwimwearBrands from './virtual-try-on-swimwear-brands';
import virtualTryOnKnitwearBrands from './virtual-try-on-knitwear-brands';
import virtualTryOnStreetwearBrands from './virtual-try-on-streetwear-brands';
import virtualTryOnMenswearBrands from './virtual-try-on-menswear-brands';
import virtualTryOnLuxuryFashionBrands from './virtual-try-on-luxury-fashion-brands';
import virtualTryOnSustainableFashionBrands from './virtual-try-on-sustainable-fashion-brands';
import virtualTryOnPlusSizeFashion from './virtual-try-on-plus-size-fashion';

// Add new posts here — newest first
export const allPosts: BlogPost[] = [
  virtualTryOnPlusSizeFashion,
  virtualTryOnSustainableFashionBrands,
  virtualTryOnLuxuryFashionBrands,
  virtualTryOnMenswearBrands,
  virtualTryOnStreetwearBrands,
  virtualTryOnKnitwearBrands,
  virtualTryOnSwimwearBrands,
  virtualTryOnActivewearBrands,
  virtualTryOnBridalWeddingFashion,
  virtualTryOnWomenswearShopify,
  virtualTryOnOccasionwearBrands,
  virtualTryOnStatistics,
  virtualTryOnVsSizeRecommendation,
  howToSetUpVirtualTryOnShopify,
  isVirtualTryOnWorthIt,
  virtualTryOnFaq,
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
