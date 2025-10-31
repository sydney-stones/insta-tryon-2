/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface OutfitItem {
  name: string;
  price?: number;
  shopUrl?: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  url: string;
  secondaryImageUrl?: string; // For hover/touch display
  videoUrl?: string; // Video showcase of the outfit
  folder?: string;
  gender?: 'MENS' | 'WOMENS'; // Gender category for filtering
  // E-commerce fields
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  collection?: string;
  shopUrl?: string;
  // Multiple items in an outfit
  outfitItems?: OutfitItem[];
}

export interface WardrobeFolder {
  name: string;
  items: WardrobeItem[];
}

export interface OutfitLayer {
  garment: WardrobeItem | null; // null represents the base model layer
  poseImages: Record<string, string>; // Maps pose instruction to image URL
}

export interface Product extends WardrobeItem {
  price: number;
  description: string;
  sizes: string[];
  inStock: boolean;
}