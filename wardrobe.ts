/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem, WardrobeFolder } from './types';

// Default wardrobe items with folder organization
export const defaultWardrobe: WardrobeItem[] = [
  {
    id: 'GameFair-1',
    name: 'GameFair-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-1.png',
    folder: 'Game Fair',
  },
  {
    id: 'GameFair-2',
    name: 'GameFair-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-2.png',
    folder: 'Game Fair',
  },
  {
    id: 'GameFair-3',
    name: 'GameFair-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-3.png',
    folder: 'Game Fair',
  },
  {
    id: 'GameFair-4',
    name: 'GameFair-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-4.png',
    folder: 'Game Fair',
  },
  {
    id: 'GameFair-5',
    name: 'GameFair-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-5.png',
    folder: 'Game Fair',
  },
  {
    id: 'GameFair-6',
    name: 'GameFair-6',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main//outfits/Gamefair/GameFair-6.png',
    folder: 'Game Fair',
  },
  {
    id: 'Silverstone-Alpine',
    name: 'Silverstone-Alpine',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Alpine.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-AstonMartin',
    name: 'Silverstone-AstonMartin',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-AstonMartin.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-Ferrari',
    name: 'Silverstone-Ferrari',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Ferrari.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-Mclaren',
    name: 'Silverstone-Mclaren',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Mclaren.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-Mercedes',
    name: 'Silverstone-Mercedes',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Mercedes.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-RedBull',
    name: 'Silverstone-RedBull',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Redbull.png',
    folder: 'Silverstone',
  },
  {
    id: 'Silverstone-Williams',
    name: 'Silverstone-Williams',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Williams.png',
    folder: 'Silverstone',
  }
];

// Helper function to organize wardrobe items by folders
export const getWardrobeFolders = (items: WardrobeItem[]): WardrobeFolder[] => {
  const folderMap: Record<string, WardrobeItem[]> = {};

  items.forEach(item => {
    const folderName = item.folder || 'Other';
    if (!folderMap[folderName]) {
      folderMap[folderName] = [];
    }
    folderMap[folderName].push(item);
  });

  return Object.entries(folderMap).map(([name, items]) => ({
    name,
    items
  }));
};
