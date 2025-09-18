/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem } from './types';

// Default wardrobe items hosted for easy access
// This is the ONLY place where wardrobe items are defined.
export const defaultWardrobe: WardrobeItem[] = [
  {
    id: 'country-outfit',
    name: 'Country Outfit',
    // This URL must be a direct link to the raw image file.
    // Make sure your GitHub repository is PUBLIC for the link to work.
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/country.png',
  }

  // HOW TO ADD YOUR OWN OUTFITS:
  // 1. Upload an image from your "outfit folder" to a public host like GitHub.
  // 2. Get the direct raw image URL.
  // 3. Copy the format below and paste it here, inside the square brackets [].
  /*
  , // <-- Don't forget the comma after the item above!
  {
    id: 'a-unique-id-for-your-item', // e.g., 'blue-denim-jacket'
    name: 'The Name You Want to Display', // e.g., 'Blue Denim Jacket'
    url: 'paste-your-public-image-url-here', // e.g., 'https://raw.githubusercontent.com/...'
  }
  */
];
