/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem, WardrobeFolder } from './types';

// Default wardrobe items with folder organization
export const defaultWardrobe: WardrobeItem[] = [
  // Autumn Collection
  {
    id: 'Autumn-2',
    name: 'Autumn Leather Jacket',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn2.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Autumn2.png',
    folder: 'Autumn',
    price: 0,
    description: '',
    collection: 'Autumn',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jacket',
        price: 589,
        shopUrl: 'https://go.shopmy.us/p-26118888'
      },
      {
        name: 'Skirt',
        price: 379,
        shopUrl: 'https://go.shopmy.us/p-26119124'
      },
      {
        name: 'Bag',
        price: 350,
        shopUrl: 'https://go.shopmy.us/p-26119216'
      }
    ]
  },
  {
    id: 'Barbour',
    name: 'Barbour',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Barbour.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Barbour.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jacket',
        price: 249,
        shopUrl: 'https://go.shopmy.us/p-26290493'
      },
      {
        name: 'Jumper',
        price: 219,
        shopUrl: 'https://go.shopmy.us/p-26290504'
      },
      {
        name: 'Trousers',
        price: 199,
        shopUrl: 'https://go.shopmy.us/p-26290527'
      }
    ]
  },
  {
    id: 'Holland Cooper',
    name: 'Holland Cooper',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Hollandcooper.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Hollandcooper.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Wellies',
        price: 149,
        shopUrl: 'https://go.shopmy.us/p-26369466'
      },
      {
        name: 'Blazer',
        price: 449,
        shopUrl: 'https://go.shopmy.us/p-26369468'
      },
      {
        name: 'Jeans',
        price: 99,
        shopUrl: 'https://go.shopmy.us/p-26369473'
      },
      {
        name: 'Jumper',
        price: 139,
        shopUrl: 'https://go.shopmy.us/p-26369475'
      }
    ]
  },
  {
    id: 'Burberry',
    name: 'Burberry',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Burberry.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Burberry.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Trousers',
        price: 650,
        shopUrl: 'https://go.shopmy.us/p-26447026'
      },
      {
        name: 'Bag Charm',
        price: 350,
        shopUrl: 'https://go.shopmy.us/p-26447045'
      },
      {
        name: 'Shoes',
        price: 590,
        shopUrl: 'https://go.shopmy.us/p-26447052'
      },
      {
        name: 'Jacket',
        price: 1490,
        shopUrl: 'https://go.shopmy.us/p-26447113'
      }
    ]
  },
  {
    id: 'Hunter',
    name: 'Hunter',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Hunter.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Hunter.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Wellies',
        price: 160,
        shopUrl: 'https://go.shopmy.us/p-26616540'
      },
      {
        name: 'Jumper',
        price: 100,
        shopUrl: 'https://go.shopmy.us/p-26616567'
      },
      {
        name: 'Skirt',
        price: 74.99,
        shopUrl: 'https://go.shopmy.us/p-26616589'
      }
    ]
  },
  {
    id: 'Mullberry',
    name: 'Mullberry',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Mullberry.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Mullberry.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Bag',
        price: 0,
        shopUrl: 'https://go.shopmy.us/p-26708783'
      },
      {
        name: 'Belt',
        price: 58,
        shopUrl: 'https://go.shopmy.us/p-26708794'
      },
      {
        name: 'Loafers',
        price: 110,
        shopUrl: 'https://go.shopmy.us/p-26708809'
      },
      {
        name: 'Trousers',
        price: 40,
        shopUrl: 'https://go.shopmy.us/p-26708914'
      },
      {
        name: 'Socks',
        price: 48,
        shopUrl: 'https://go.shopmy.us/p-26708972'
      },
      {
        name: 'Jumper',
        price: 140,
        shopUrl: 'https://go.shopmy.us/p-26709070'
      }
    ]
  },
  {
    id: 'Lockandco',
    name: 'Lockandco',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Lockandco.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Lockandco.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Loafers',
        price: 38,
        shopUrl: 'https://go.shopmy.us/p-26777827'
      },
      {
        name: 'Jeans',
        price: 158,
        shopUrl: 'https://go.shopmy.us/p-26777836'
      },
      {
        name: 'Belt',
        price: 38,
        shopUrl: 'https://go.shopmy.us/p-26777838'
      },
      {
        name: 'Bag',
        price: 3500,
        shopUrl: 'https://go.shopmy.us/p-26777840'
      },
      {
        name: 'Shirt',
        price: 125,
        shopUrl: 'https://go.shopmy.us/p-26777843'
      },
      {
        name: 'Hat',
        price: 395,
        shopUrl: 'https://go.shopmy.us/p-26777847'
      }
    ]
  },
  {
    id: 'Penelopechilvers',
    name: 'Penelopechilvers',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Penelopechilvers.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Penelopechilvers.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Shoes',
        price: 289,
        shopUrl: 'https://go.shopmy.us/p-26949516'
      },
      {
        name: 'Bag',
        price: 329,
        shopUrl: 'https://go.shopmy.us/p-26949529'
      },
      {
        name: 'Shirt',
        price: 169,
        shopUrl: 'https://go.shopmy.us/p-26949544'
      },
      {
        name: 'Trousers',
        price: 225,
        shopUrl: 'https://go.shopmy.us/p-26949607'
      }
    ]
  },
  {
    id: 'Brora',
    name: 'Brora',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Brora.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Brora.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Wrist-warmers',
        price: 65,
        shopUrl: 'https://go.shopmy.us/p-27000989'
      },
      {
        name: 'Shoes',
        price: 135,
        shopUrl: 'https://go.shopmy.us/p-27001000'
      },
      {
        name: 'Jacket',
        price: 495,
        shopUrl: 'https://go.shopmy.us/p-27002929'
      },
      {
        name: 'Shorts',
        price: 195,
        shopUrl: 'https://go.shopmy.us/p-27002937'
      },
      {
        name: 'Brooch',
        price: 95,
        shopUrl: 'https://go.shopmy.us/p-27002942'
      },
      {
        name: 'Scarf',
        price: 159,
        shopUrl: 'https://go.shopmy.us/p-27002949'
      }
    ]
  },
  {
    id: 'Johnstonesofelgin',
    name: 'Johnstonesofelgin',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Johnstonesofelgin.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Johnstonesofelgin.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Shirt',
        price: 1250,
        shopUrl: 'https://go.shopmy.us/p-27089921'
      },
      {
        name: 'Trousers',
        price: 795,
        shopUrl: 'https://go.shopmy.us/p-27089943'
      },
      {
        name: 'Bag',
        price: 24.99,
        shopUrl: 'https://go.shopmy.us/p-27090028'
      },
      {
        name: 'Loafers',
        price: 250,
        shopUrl: 'https://go.shopmy.us/p-27090119'
      }
    ]
  },
  {
    id: 'Russelandbrombley',
    name: 'Russelandbrombley',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Russelandbrombley.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Russelandbrombley.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jumper',
        price: 110,
        shopUrl: 'https://go.shopmy.us/p-27188671'
      },
      {
        name: 'Trousers',
        price: 225,
        shopUrl: 'https://go.shopmy.us/p-27188796'
      },
      {
        name: 'Boots',
        price: 450,
        shopUrl: 'https://go.shopmy.us/p-27188953'
      },
      {
        name: 'Bag',
        price: 139,
        shopUrl: 'https://go.shopmy.us/p-27189149'
      }
    ]
  },
  {
    id: 'Purdey',
    name: 'Purdey',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Purdey.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Purdey.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Sweater',
        price: 795,
        shopUrl: 'https://go.shopmy.us/p-27289067'
      },
      {
        name: 'Breeks',
        price: 495,
        shopUrl: 'https://go.shopmy.us/p-27289296'
      },
      {
        name: 'Hat',
        price: 225,
        shopUrl: 'https://go.shopmy.us/p-27289347'
      },
      {
        name: 'Boots',
        price: 955,
        shopUrl: 'https://go.shopmy.us/p-27289395'
      },
      {
        name: 'Socks',
        price: 495,
        shopUrl: 'https://go.shopmy.us/p-27289436'
      },
      {
        name: 'Shotgun Slip',
        price: 5500,
        shopUrl: 'https://go.shopmy.us/p-27289580'
      }
    ]
  },
  {
    id: 'Fairfax',
    name: 'Fairfax',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Fairfax.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Fairfax.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Boots',
        price: 425,
        shopUrl: 'https://go.shopmy.us/p-27388295'
      },
      {
        name: 'Jacket',
        price: 375,
        shopUrl: 'https://go.shopmy.us/p-27388425'
      },
      {
        name: 'Trousers',
        price: 145,
        shopUrl: 'https://go.shopmy.us/p-27388466'
      },
      {
        name: 'Bag',
        price: 345,
        shopUrl: 'https://go.shopmy.us/p-27388487'
      }
    ]
  },
  {
    id: 'Loake',
    name: 'Loake',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Loake.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Loake.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jumper',
        price: 1700,
        shopUrl: 'https://go.shopmy.us/p-27488824'
      },
      {
        name: 'Trousers',
        price: 520,
        shopUrl: 'https://go.shopmy.us/p-27489280'
      },
      {
        name: 'Belt',
        price: 115,
        shopUrl: 'https://go.shopmy.us/p-27489628'
      },
      {
        name: 'Loafers',
        price: 260,
        shopUrl: 'https://go.shopmy.us/p-27489687'
      }
    ]
  },
  {
    id: 'Penhaligons',
    name: 'Penhaligons',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Penhaligons.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Penhaligons.png',
    folder: '30Brands',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jacket',
        price: 89.99,
        shopUrl: 'https://go.shopmy.us/p-27590391'
      },
      {
        name: 'Trousers',
        price: 49.99,
        shopUrl: 'https://go.shopmy.us/p-27590407'
      },
      {
        name: 'Scarf',
        price: 270,
        shopUrl: 'https://go.shopmy.us/p-27590809'
      },
      {
        name: 'Fragrance',
        price: 245,
        shopUrl: 'https://go.shopmy.us/p-27590813'
      },
      {
        name: 'Loafers',
        price: 269,
        shopUrl: 'https://go.shopmy.us/p-27590819'
      }
    ]
  }
  
]

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
