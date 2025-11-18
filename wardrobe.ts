/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem, WardrobeFolder } from './types';

// Default wardrobe items with folder organization
export const defaultWardrobe: WardrobeItem[] = [
  // Festival of Fashion Collection - Keep at top
  // Men's Collection
  {
    id: 'Maharishi',
    name: 'Maharishi',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/maharishi.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Maharishi.png',
    folder: 'MENS',
    gender: 'MENS',
    price: 0,
    description: '',
    collection: 'MENS',
    shopUrl: '',
    outfitItems: [
      {
        name: '7115 Wool Check MA Coat',
        price: 795,
        shopUrl: 'https://go.shopmy.us/p-29365769'
      },
      {
        name: '5303 Original Snopants Straight Fit',
        price: 200,
        shopUrl: 'https://go.shopmy.us/p-29366012'
      },
      {
        name: '7281 MAHARISHI P404 OUTDOOR',
        price: 175,
        shopUrl: 'https://go.shopmy.us/p-29366033'
      }
    ]
  },
  {
    id: 'RHUDE',
    name: 'RHUDE',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RHUDE.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/rhude.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/RHUDEvideo.mp4',
    folder: 'MENS',
    gender: 'MENS',
    price: 0,
    description: '',
    collection: 'MENS',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Corduroy-Trimmed Logo-Print Distressed Cotton-Canvas Bomber Jacket',
        price: 1680,
        shopUrl: 'https://go.shopmy.us/p-28555592'
      },
      {
        name: 'DUNHILL Slim-Fit Straight-Leg Pleated Cotton-Gabardine Chinos',
        price: 430,
        shopUrl: 'https://go.shopmy.us/p-28555631'
      },
      {
        name: 'OMNI Dellow Suede Sneakers',
        price: 250,
        shopUrl: 'https://go.shopmy.us/p-28555658'
      },
      {
        name: 'BOTTEGA VENETA EYEWEAR Rectangle-Frame Acetate and Gold-Tone Sunglasses',
        price: 330,
        shopUrl: 'https://go.shopmy.us/p-28555713'
      }
    ]
  },
  {
    id: 'MassimoDutti',
    name: 'Massimo Dutti',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Massimo Dutti.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/massimodutti.png',
    folder: 'MENS',
    gender: 'MENS',
    price: 0,
    description: '',
    collection: 'MENS',
    shopUrl: '',
    outfitItems: [
      {
        name: '100% WOOL ARGYLE KNIT SWEATER',
        price: 89.95,
        shopUrl: 'https://go.shopmy.us/p-29364765'
      },
      {
        name: 'RELAXED FIT TROUSERS',
        price: 99.95,
        shopUrl: 'https://go.shopmy.us/p-29364782'
      },
      {
        name: 'NAPPA LOAFERS WITH TRACK SOLE',
        price: 139.00,
        shopUrl: 'https://go.shopmy.us/p-29364816'
      }
    ]
  },
  {
    id: 'BarbourXLevis',
    name: 'Barbour X Levi\'s',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/BarbourXLevis.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/barbourxlevis.png',
    folder: 'MENS',
    gender: 'MENS',
    price: 0,
    description: '',
    collection: 'MENS',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Barbour x Levi\'s 578™ Baggy Corduroy Trousers',
        price: 129.00,
        shopUrl: 'https://go.shopmy.us/p-29364950'
      },
      {
        name: 'Men\'s Stardan LTD in cream leather with green crocodile-print leather star and inserts',
        price: 535,
        shopUrl: 'https://go.shopmy.us/p-29365024'
      },
      {
        name: 'Pure Cashmere Crew Neck Jumper',
        price: 99,
        shopUrl: 'https://go.shopmy.us/p-29365239'
      }
    ]
  },

  // Autumn Collection
  {
    id: 'Autumn-2',
    name: 'Autumn Leather',
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
    gender: 'WOMENS',
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
    id: 'Burberry',
    name: 'Burberry',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Burberry.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Burberry.png',
    folder: '30Brands',
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: '30Brands',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Bag - SOLD OUT',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    id: 'Russellandbrombley',
    name: 'Russell and Brombley',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Russellandbromley.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Russellandbromley.png',
    folder: '30Brands',
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
    gender: 'WOMENS',
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
  },
    {
    id: 'Traitors1',
    name: 'Traitors 1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Traitors/Traitors1Flatlay.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Traitors1.png',
    folder: 'Traitors',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Traitors',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Blouse',
        price: 195,
        shopUrl: 'https://go.shopmy.us/p-27850501'
      },
      {
        name: 'Scarf',
        price: 44.95,
        shopUrl: 'https://go.shopmy.us/p-27850742'
      },
      {
        name: 'Kilt',
        price: 275,
        shopUrl: 'https://go.shopmy.us/p-27850515'
      },
      {
        name: 'Socks',
        price: 19,
        shopUrl: 'https://go.shopmy.us/p-27851010'
      },
      {
        name: 'Watch',
        price: 54.99,
        shopUrl: 'https://go.shopmy.us/p-27850684'
      }
    ]
  },

  {
    id: 'EmiliaWickstead',
    name: 'Emilia Wickstead',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/EmiliaWickstead.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/EmiliaWickstead.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/emiliawickstead.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Dress',
        price: 2100,
        shopUrl: 'https://go.shopmy.us/p-28351154'
      },
      {
        name: 'Shoes',
        price: 610,
        shopUrl: 'https://go.shopmy.us/p-28351221'
      },
      {
        name: 'Watch',
        price: 12800,
        shopUrl: 'https://go.shopmy.us/p-28351271'
      },
      {
        name: 'Earrings',
        price: 975,
        shopUrl: 'https://go.shopmy.us/p-28351287'
      }
    ]
  },
  {
    id: 'Uniqlo',
    name: 'Uniqlo',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Uniqlo.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Uniqlo.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/uniqlo.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Shoes',
        price: 540,
        shopUrl: 'https://go.shopmy.us/p-28351463'
      },
      {
        name: 'Poncho',
        price: 49.90,
        shopUrl: 'https://go.shopmy.us/p-28351494'
      },
      {
        name: 'Hat',
        price: 24.90,
        shopUrl: 'https://go.shopmy.us/p-28351508'
      },
      {
        name: 'Gloves',
        price: 19.90,
        shopUrl: 'https://go.shopmy.us/p-28351518'
      },
      {
        name: 'Bag',
        price: 12.90,
        shopUrl: 'https://go.shopmy.us/p-28351528'
      },
      {
        name: 'Trousers',
        price: 39.90,
        shopUrl: 'https://go.shopmy.us/p-28351557'
      }
    ]
  },
  {
    id: 'ReallyWild',
    name: 'Really Wild',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/ReallyWild.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/ReallyWild.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/reallywild.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Scarf',
        price: 195,
        shopUrl: 'https://go.shopmy.us/p-28351858'
      },
      {
        name: 'Trousers',
        price: 295,
        shopUrl: 'https://go.shopmy.us/p-28351872'
      },
      {
        name: 'Boots',
        price: 295,
        shopUrl: 'https://go.shopmy.us/p-28351883'
      },
      {
        name: 'Belt',
        price: 78,
        shopUrl: 'https://go.shopmy.us/p-28351891'
      },
      {
        name: 'Jacket',
        price: 625,
        shopUrl: 'https://go.shopmy.us/p-28351901'
      }
    ]
  },
  {
    id: 'Erdem',
    name: 'ERDEM',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Erdem.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Erdem.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/erdem.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Jumper',
        price: 895,
        shopUrl: 'https://go.shopmy.us/p-28352268'
      },
      {
        name: 'Shoes',
        price: 139,
        shopUrl: 'https://go.shopmy.us/p-28352262'
      },
      {
        name: 'Skirt',
        price: 1095,
        shopUrl: 'https://go.shopmy.us/p-28352299'
      },
      {
        name: 'Bag',
        price: 2195,
        shopUrl: 'https://go.shopmy.us/p-28352309'
      },
      {
        name: 'Earrings',
        price: 295,
        shopUrl: 'https://go.shopmy.us/p-28352358'
      }
    ]
  },
  {
    id: 'ManoloBlahnik',
    name: 'Manolo Blahnik',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/ManoloBlahnik.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/ManoloBlahnik.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Blahnik.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Blue Wool Tartan Pointed Toe Pumps',
        price: 675,
        shopUrl: 'https://go.shopmy.us/p-28353952'
      },
      {
        name: 'Dark Gold Glitter Jewel Buckle Clutch',
        price: 1616,
        shopUrl: 'https://go.shopmy.us/p-28353991'
      }
    ]
  },
  {
    id: 'MaisonSchiaparelli',
    name: 'Maison Schiaparelli',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/MaisonSchiaparelli.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/MaisonSchiaparellirendered.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/MaisonSchiaperalliVideo.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Snake Scale Trompe L\'Oeil Cardigan',
        price: 4345.09,
        shopUrl: 'https://go.shopmy.us/p-28554672'
      },
      {
        name: 'Wide-Leg Embroidered Pants',
        price: 4343.02,
        shopUrl: 'https://go.shopmy.us/p-28554922'
      },
      {
        name: 'Eyes Earrings',
        price: 1042.26,
        shopUrl: 'https://go.shopmy.us/p-28554964'
      },
      {
        name: 'Measuring Tape Sandals',
        price: 1650.05,
        shopUrl: 'https://go.shopmy.us/p-28555046'
      },
      {
        name: 'Mini Secret Bag',
        price: 11291.15,
        shopUrl: 'https://go.shopmy.us/p-28555071'
      }
    ]
  },
  {
    id: 'ReallyWild2',
    name: 'Really Wild Countryside',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Reallywild2.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/reallywild2.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Reallywild2video.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Windsor Tweed Country Waistcoat',
        price: 425,
        shopUrl: 'https://go.shopmy.us/p-28897841'
      },
      {
        name: 'Windsor Tweed Country Trousers',
        price: 495,
        shopUrl: 'https://go.shopmy.us/p-28897867'
      },
      {
        name: 'Kinalba Lambswool High-Neck Sweater',
        price: 175,
        shopUrl: 'https://go.shopmy.us/p-28897949'
      },
      {
        name: 'La Mancha Waterproof Spanish Boots',
        price: 395,
        shopUrl: 'https://go.shopmy.us/p-28898164'
      },
      {
        name: 'Lady Rannoch Long Socks',
        price: 55,
        shopUrl: 'https://go.shopmy.us/p-28898226'
      }
    ]
  },
  {
    id: 'ReallyWild3',
    name: 'Really Wild Luxe',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/reallywild3.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/reallywild3.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/reallywild3video.mp4',
    folder: 'Festival_Of_Fashion',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Festival_Of_Fashion',
    shopUrl: '',
    outfitItems: [
      {
        name: 'Brompton Silk Wool Puffer Jacket',
        price: 845,
        shopUrl: 'https://go.shopmy.us/p-28898013'
      },
      {
        name: 'Cadogan Silk Tie Neck Blouse',
        price: 275,
        shopUrl: 'https://go.shopmy.us/p-28898045'
      },
      {
        name: 'Mayfair Velvet Flare Trousers',
        price: 395,
        shopUrl: 'https://go.shopmy.us/p-28898097'
      },
      {
        name: 'Heritage Calf Length Leather Boots',
        price: 295,
        shopUrl: 'https://go.shopmy.us/p-28898185'
      },
      {
        name: 'Logo Baseball Cap',
        price: 35,
        shopUrl: 'https://go.shopmy.us/p-28898254'
      }
    ]
  },
  {
    id: 'Yaitt',
    name: 'Yaitte',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/yaitt-outfit.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/yaitt.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/yaitt-video.mp4',
    folder: 'Demo',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Demo',
    shopUrl: '',
    outfitItems: [
      {
        name: 'BRAEMAR - Oversized Ice Grey Plaid Flannel Shirt',
        price: 225,
        shopUrl: 'https://go.shopmy.us/p-31547859'
      },
      {
        name: 'Logo Crew Sock',
        price: 20,
        shopUrl: 'https://go.shopmy.us/p-31547914'
      },
      {
        name: 'Bella Patch Pocket Wide Leg Jeans in Mid Blue',
        price: 170,
        shopUrl: 'https://go.shopmy.us/p-31547944'
      },
      {
        name: 'Carmen Rib-Knit Socks With Cashmere in Grey',
        price: 18,
        shopUrl: 'https://go.shopmy.us/p-31547969'
      },
      {
        name: 'GEL-1130',
        price: 95,
        shopUrl: 'https://go.shopmy.us/p-31547996'
      }
    ]
  },
  {
    id: 'OnThePeg',
    name: 'On the Peg',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/onthepeg-outfit.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/onthepeg.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/onthepeg-video.mp4',
    folder: 'Demo',
    gender: 'WOMENS',
    price: 0,
    description: '',
    collection: 'Demo',
    shopUrl: '',
    outfitItems: [
      {
        name: 'ALAN PAINE WOMEN\'S COMBROOK BREEKS GROVE',
        price: 214.95,
        shopUrl: 'https://go.shopmy.us/p-31548156'
      },
      {
        name: 'Ginger & Jardine Silky Roll Neck Tattersall',
        price: 44.99,
        shopUrl: 'https://go.shopmy.us/p-31548107'
      },
      {
        name: 'On The Peg Women\'s Baker Boy Hat',
        price: 90,
        shopUrl: 'https://go.shopmy.us/p-31548200'
      },
      {
        name: 'HOUSE OF CHEVIOT LADY RANNOCH SHOOTING SOCKS BILBERRY LARGE',
        price: 30,
        shopUrl: 'https://go.shopmy.us/p-31548238'
      },
      {
        name: 'HERITAGE CALF LENGTH LEATHER BOOTS',
        price: 295,
        shopUrl: 'https://go.shopmy.us/p-31548265'
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
