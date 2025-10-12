/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

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