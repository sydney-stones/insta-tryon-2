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
  folder?: string;
  // E-commerce fields
  price?: number;
  description?: string;
  sizes?: string[];
  colors?: string[];
  material?: string;
  brand?: string;
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