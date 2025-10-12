/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { WardrobeItem, WardrobeFolder } from './types';

// Default wardrobe items with folder organization
export const defaultWardrobe: WardrobeItem[] = [
  // Autumn Collection
  {
    id: 'Autumn-1',
    name: 'Classic Autumn Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn1.png',
    folder: 'Autumn',
    price: 89.99,
    description: 'Elegant autumn dress perfect for transitional weather. Features a flattering silhouette with warm seasonal tones.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Autumn Dress', price: 89.99, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-2',
    name: 'Cozy Cardigan Set',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn2.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Autumn2.png',
    folder: 'Autumn',
    price: 125.00,
    description: 'Luxurious cardigan paired with coordinating pieces. Perfect for layering during autumn days.',
    collection: 'Autumn Collection',
    shopUrl: 'https://shopmy.us/shop/collections/2431665',
    outfitItems: [
      { name: 'Cardigan', price: 100, shopUrl: 'https://www.ralphlauren.co.uk' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-3',
    name: 'Autumn Midi Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn3.png',
    folder: 'Autumn',
    price: 95.00,
    description: 'Flowing midi dress with autumn-inspired prints. Comfortable and stylish for any occasion.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Midi Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-4',
    name: 'Wool Blend Coat',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn4.png',
    folder: 'Autumn',
    price: 199.99,
    description: 'Sophisticated wool blend coat for crisp autumn days. Features a timeless design with modern details.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Wool Coat', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-5',
    name: 'Knitted Sweater Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn5.png',
    folder: 'Autumn',
    price: 79.99,
    description: 'Comfortable knitted sweater dress. Perfect for casual autumn outings.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Sweater Dress', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-6',
    name: 'Plaid Blazer Ensemble',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn6.png',
    folder: 'Autumn',
    price: 145.00,
    description: 'Classic plaid blazer with coordinating trousers. A sophisticated autumn wardrobe staple.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Plaid Blazer', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-7',
    name: 'Turtleneck Sweater',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn7.png',
    folder: 'Autumn',
    price: 69.99,
    description: 'Cozy turtleneck sweater in rich autumn colors. Essential for layering.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Turtleneck Sweater', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-8',
    name: 'Autumn Wrap Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn8.png',
    folder: 'Autumn',
    price: 99.99,
    description: 'Flattering wrap dress with autumn florals. Versatile for work or weekend.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Wrap Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-10',
    name: 'Tweed Jacket',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn10.png',
    folder: 'Autumn',
    price: 165.00,
    description: 'Timeless tweed jacket with elegant detailing. Perfect for smart-casual occasions.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Tweed Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-11',
    name: 'Cashmere Blend Sweater',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn11.png',
    folder: 'Autumn',
    price: 139.99,
    description: 'Luxurious cashmere blend sweater. Soft, warm, and incredibly comfortable.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Cashmere Sweater', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Autumn-12',
    name: 'Long Sleeve Maxi Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn12.png',
    folder: 'Autumn',
    price: 109.99,
    description: 'Elegant long sleeve maxi dress. Perfect for autumn events and gatherings.',
    collection: 'Autumn Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Maxi Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },

  // Badminton Collection
  {
    id: 'Badminton-1',
    name: 'Sport Performance Polo',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Badminton/Badminton1.png',
    folder: 'Badminton',
    price: 45.00,
    description: 'High-performance polo shirt designed for active sports. Breathable and moisture-wicking.',
    collection: 'Badminton Sport',
    shopUrl: '',
    outfitItems: [
      { name: 'Sport Polo', price: 0, shopUrl: '' },
      { name: 'Skort', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Badminton-2',
    name: 'Athletic Skort',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Badminton/Badminton2.png',
    folder: 'Badminton',
    price: 55.00,
    description: 'Stylish and functional athletic skort with built-in shorts. Perfect for court sports.',
    collection: 'Badminton Sport',
    shopUrl: '',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Athletic Skort', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Badminton-3',
    name: 'Sport Tank Top',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Badminton/Badminton3.png',
    folder: 'Badminton',
    price: 38.00,
    description: 'Lightweight tank top for maximum movement and comfort during intense matches.',
    collection: 'Badminton Sport',
    shopUrl: '',
    outfitItems: [
      { name: 'Sport Tank Top', price: 0, shopUrl: '' },
      { name: 'Shorts', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Badminton-4',
    name: 'Performance Dress',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Badminton/Badminton4.png',
    folder: 'Badminton',
    price: 65.00,
    description: 'Sleek athletic dress designed for competitive play. Combines style with functionality.',
    collection: 'Badminton Sport',
    shopUrl: '',
    outfitItems: [
      { name: 'Performance Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Badminton-5',
    name: 'Sport Zip-Up Jacket',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Badminton/Badminton5.png',
    folder: 'Badminton',
    price: 75.00,
    description: 'Essential warm-up jacket for pre-match preparation. Lightweight and flexible.',
    collection: 'Badminton Sport',
    shopUrl: '',
    outfitItems: [
      { name: 'Zip-Up Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Shorts', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },

  // Burghley Collection
  {
    id: 'Burghley-1',
    name: 'Burghley Classic',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Burghley/Burghley1.png',
    folder: 'Burghley',
    price: 189.00,
    description: 'Timeless equestrian-inspired outfit. Perfect for country events and outdoor occasions.',
    collection: 'Burghley Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Burghley-2',
    name: 'Burghley Heritage',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Burghley/Burghley2.png',
    folder: 'Burghley',
    price: 215.00,
    description: 'Heritage-inspired ensemble with modern touches. Sophisticated country style.',
    collection: 'Burghley Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Blazer', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Burghley-3',
    name: 'Burghley Signature',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Burghley/Burghley3.png',
    folder: 'Burghley',
    price: 245.00,
    description: 'Signature piece from the Burghley collection. Premium quality and craftsmanship.',
    collection: 'Burghley Collection',
    shopUrl: '',
    outfitItems: [
      { name: 'Coat', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },

  // Game Fair Collection
  {
    id: 'GameFair-1',
    name: 'GameFair-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-1.png',
    folder: 'Game Fair',
    price: 179.00,
    description: 'Classic country attire perfect for game fairs and outdoor events. Durable and stylish for all-day comfort.',
    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameFair-2',
    name: 'GameFair-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-2.png',
    folder: 'Game Fair',
    price: 159.00,
    description: 'Traditional countryside ensemble with modern practicality. Ideal for field sports enthusiasts.',

    shopUrl: '',
    outfitItems: [
      { name: 'Vest', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameFair-3',
    name: 'GameFair-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-3.png',
    folder: 'Game Fair',
    price: 189.00,
    description: 'Premium game fair outfit combining heritage style with contemporary design. Perfect for country pursuits.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Shirt', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameFair-4',
    name: 'GameFair-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-4.png',
    folder: 'Game Fair',
    price: 145.00,
    description: 'Versatile country wear suitable for game fairs and outdoor activities. Practical yet elegant.',

    shopUrl: '',
    outfitItems: [
      { name: 'Gilet', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameFair-5',
    name: 'GameFair-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-5.png',
    folder: 'Game Fair',
    price: 169.00,
    description: 'Sophisticated outdoor ensemble for country events. Weather-appropriate and fashionable.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Skirt', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameFair-6',
    name: 'GameFair-6',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Gamefair/GameFair-6.png',
    folder: 'Game Fair',
    price: 195.00,
    description: 'Distinguished country attire with refined details. Perfect for discerning game fair attendees.',
    outfitItems: [
      { name: 'Coat', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },

  // Game Shooting Collection
  {
    id: 'GameShooting-1',
    name: 'GameShooting-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/GameShooting/GameShooting1.png',
    folder: 'Game Shooting',
    price: 219.00,
    description: 'Professional game shooting attire with functional design. Built for comfort during long days in the field.',

    shopUrl: '',
    outfitItems: [
      { name: 'Shooting Jacket', price: 0, shopUrl: '' },
      { name: 'Vest', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameShooting-2',
    name: 'GameShooting-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/GameShooting/GameShooting2.png',
    folder: 'Game Shooting',
    price: 199.00,
    description: 'Traditional shooting outfit with practical features. Designed for serious sportsmen and sportswomen.',

    shopUrl: '',
    outfitItems: [
      { name: 'Shooting Gilet', price: 0, shopUrl: '' },
      { name: 'Shirt', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameShooting-3',
    name: 'GameShooting-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/GameShooting/GameShooting3.png',
    folder: 'Game Shooting',
    price: 235.00,
    description: 'Premium shooting ensemble combining style and functionality. Perfect for driven game shooting.',

    shopUrl: '',
    outfitItems: [
      { name: 'Shooting Coat', price: 0, shopUrl: '' },
      { name: 'Vest', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'GameShooting-4',
    name: 'GameShooting-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/GameShooting/GameShooting4.png',
    folder: 'Game Shooting',
    price: 189.00,
    description: 'Classic game shooting attire with weather-resistant properties. Timeless style for country sports.',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },

  // Goodwood Collection
  {
    id: 'Goodwood-1',
    name: 'Goodwood-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Goodwood/Goodwood1.png',
    folder: 'Goodwood',
    price: 165.00,
    description: 'Vintage-inspired ensemble perfect for Goodwood events. Combines retro elegance with modern comfort.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Goodwood-2',
    name: 'Goodwood-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Goodwood/Goodwood2.png',
    folder: 'Goodwood',
    price: 185.00,
    description: 'Classic racing attire with a nod to motorsport heritage. Stylish and sophisticated for trackside viewing.',

    shopUrl: '',
    outfitItems: [
      { name: 'Blazer', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Goodwood-3',
    name: 'Goodwood-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Goodwood/Goodwood3.png',
    folder: 'Goodwood',
    price: 149.00,
    description: 'Timeless Goodwood outfit capturing the spirit of vintage racing. Elegant and event-appropriate.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Goodwood-4',
    name: 'Goodwood-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Goodwood/Goodwood4.png',
    folder: 'Goodwood',
    price: 175.00,
    description: 'Refined racing ensemble with period-appropriate styling. Perfect for festival of speed attendees.',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Skirt', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },

  // Next Collection
  {
    id: 'Next-1',
    name: 'Next-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Next/Next1.png',
    folder: 'Next',
    price: 79.00,
    description: 'Contemporary everyday outfit with versatile styling. Perfect for modern casual wear.',

    shopUrl: '',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Next-2',
    name: 'Next-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Next/Next2.png',
    folder: 'Next',
    price: 89.00,
    description: 'Stylish and practical ensemble for everyday occasions. Comfortable and fashion-forward.',

    shopUrl: '',
    outfitItems: [
      { name: 'Sweater', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Next-3',
    name: 'Next-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Next/Next3.png',
    folder: 'Next',
    price: 95.00,
    description: 'Modern casual outfit with on-trend details. Effortlessly chic for day-to-day wear.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Next-4',
    name: 'Next-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Next/Next4.png',
    folder: 'Next',
    price: 69.00,
    description: 'Classic casual ensemble with contemporary appeal. Great value for everyday style.',

    shopUrl: '',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Skirt', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Next-5',
    name: 'Next-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Next/Next5.png',
    folder: 'Next',
    price: 85.00,
    description: 'Versatile outfit perfect for multiple occasions. Smart-casual styling at its best.',
    outfitItems: [
      { name: 'Blouse', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },

  // Race Day Collection
  {
    id: 'RaceDay-1',
    name: 'RaceDay-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RaceDay/RaceDay1.png',
    folder: 'Race Day',
    price: 139.00,
    description: 'Elegant race day ensemble with sophisticated flair. Perfect for enjoying a day at the races in style.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Fascinator', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RaceDay-2',
    name: 'RaceDay-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RaceDay/RaceDay2.png',
    folder: 'Race Day',
    price: 155.00,
    description: 'Chic and polished race day outfit. Designed to turn heads in the members enclosure.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RaceDay-3',
    name: 'RaceDay-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RaceDay/RaceDay3.png',
    folder: 'Race Day',
    price: 145.00,
    description: 'Classic racing attire with modern touches. Timeless elegance for racecourse occasions.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jumpsuit', price: 0, shopUrl: '' },
      { name: 'Fascinator', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RaceDay-4',
    name: 'RaceDay-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RaceDay/RaceDay4.png',
    folder: 'Race Day',
    price: 165.00,
    description: 'Sophisticated race day ensemble with refined details. Perfect for special racing events.',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },

  // Royal Ascot Collection
  {
    id: 'RoyalAscot-1',
    name: 'RoyalAscot-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RotalAscot/RoyalAscot1.png',
    folder: 'Royal Ascot',
    price: 225.00,
    description: 'Exquisite Royal Ascot ensemble meeting dress code requirements. Elegant and sophisticated for the royal enclosure.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Fascinator', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Clutch', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RoyalAscot-2',
    name: 'RoyalAscot-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RotalAscot/RoyalAscot2.png',
    folder: 'Royal Ascot',
    price: 249.00,
    description: 'Luxurious Royal Ascot outfit with impeccable tailoring. Perfect for making a statement at this prestigious event.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RoyalAscot-3',
    name: 'RoyalAscot-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RotalAscot/RoyalAscot3.png',
    folder: 'Royal Ascot',
    price: 215.00,
    description: 'Refined Royal Ascot attire with graceful silhouette. Designed to impress in the most formal racing environment.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Fascinator', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RoyalAscot-4',
    name: 'RoyalAscot-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RotalAscot/RoyalAscot4.png',
    folder: 'Royal Ascot',
    price: 235.00,
    description: 'Premium Royal Ascot ensemble with elegant detailing. Suitable for the most discerning racegoer.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Clutch', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'RoyalAscot-5',
    name: 'RoyalAscot-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/RotalAscot/RoyalAscot5.png',
    folder: 'Royal Ascot',
    price: 199.00,
    description: 'Classic Royal Ascot outfit with timeless appeal. Dress code compliant with stunning presence.',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Fascinator', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },

  // Schoffel Collection
  {
    id: 'Schoffel-1',
    name: 'Schoffel-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel1.png',
    folder: 'Schoffel',
    price: 189.00,
    description: 'Premium outdoor clothing with superior craftsmanship. Designed for country living and outdoor adventures.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-2',
    name: 'Schoffel-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel2.png',
    folder: 'Schoffel',
    price: 205.00,
    description: 'Technical outdoor outfit combining style and performance. Weather-resistant and exceptionally comfortable.',

    shopUrl: '',
    outfitItems: [
      { name: 'Gilet', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-3',
    name: 'Schoffel-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel3.png',
    folder: 'Schoffel',
    price: 179.00,
    description: 'Classic country attire with functional features. Perfect for walks and rural activities.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Shirt', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-4',
    name: 'Schoffel-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel4.png',
    folder: 'Schoffel',
    price: 219.00,
    description: 'Luxury outdoor ensemble with exceptional quality. Durable and stylish for countryside pursuits.',

    shopUrl: '',
    outfitItems: [
      { name: 'Coat', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-5',
    name: 'Schoffel-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel5.png',
    folder: 'Schoffel',
    price: 195.00,
    description: 'Versatile country outfit with practical design. Ideal for outdoor enthusiasts seeking quality and style.',

    shopUrl: '',
    outfitItems: [
      { name: 'Gilet', price: 0, shopUrl: '' },
      { name: 'Sweater', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-6',
    name: 'Schoffel-6',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel6.png',
    folder: 'Schoffel',
    price: 169.00,
    description: 'Comfortable outdoor attire with timeless appeal. Perfect for country walks and field sports.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-7',
    name: 'Schoffel-7',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel7.png',
    folder: 'Schoffel',
    price: 209.00,
    description: 'High-performance outdoor ensemble with refined styling. Built to withstand the elements in comfort.',

    shopUrl: '',
    outfitItems: [
      { name: 'Parka', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-8',
    name: 'Schoffel-8',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel8.png',
    folder: 'Schoffel',
    price: 185.00,
    description: 'Traditional country outfit with modern technical features. Sophisticated and functional.',

    shopUrl: '',
    outfitItems: [
      { name: 'Jacket', price: 0, shopUrl: '' },
      { name: 'Shirt', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Boots', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Schoffel-9',
    name: 'Schoffel-9',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Schoffel/Schoffel9.png',
    folder: 'Schoffel',
    price: 199.00,
    description: 'Premium country attire with elegant detailing. Perfect for countryside events and outdoor activities.',
    outfitItems: [
      { name: 'Coat', price: 0, shopUrl: '' },
      { name: 'Sweater', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
    ],
  },

  // Silverstone Collection
  {
    id: 'Silverstone-Alpine',
    name: 'Silverstone-Alpine',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Alpine.png',
    folder: 'Silverstone',
    price: 129.00,
    description: 'Alpine-inspired motorsport outfit with team colors. Perfect for Formula 1 fans at Silverstone.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Top', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-AstonMartin',
    name: 'Silverstone-AstonMartin',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-AstonMartin.png',
    folder: 'Silverstone',
    price: 149.00,
    description: 'Aston Martin team-inspired ensemble with sophisticated racing style. Show your team support in style.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Polo', price: 0, shopUrl: '' },
      { name: 'Pants', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-Ferrari',
    name: 'Silverstone-Ferrari',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Ferrari.png',
    folder: 'Silverstone',
    price: 159.00,
    description: 'Ferrari-inspired outfit in iconic team colors. Perfect for passionate Tifosi at the British Grand Prix.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Shirt', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-Mclaren',
    name: 'Silverstone-Mclaren',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Mclaren.png',
    folder: 'Silverstone',
    price: 139.00,
    description: 'McLaren team-inspired attire with vibrant papaya orange. Celebrate British racing heritage.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Top', price: 0, shopUrl: '' },
      { name: 'Shorts', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-Mercedes',
    name: 'Silverstone-Mercedes',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Mercedes.png',
    folder: 'Silverstone',
    price: 145.00,
    description: 'Mercedes-inspired motorsport outfit in silver and black. Sleek and professional racing style.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Polo', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-RedBull',
    name: 'Silverstone-RedBull',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Redbull.png',
    folder: 'Silverstone',
    price: 155.00,
    description: 'Red Bull Racing-inspired ensemble with bold team colors. Dynamic style for championship supporters.',

    shopUrl: '',
    outfitItems: [
      { name: 'Team Top', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Cap', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Silverstone-Williams',
    name: 'Silverstone-Williams',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Silverstone%20/Silverstone-Williams.png',
    folder: 'Silverstone',
    price: 135.00,
    description: 'Williams team-inspired outfit honoring legendary racing heritage. Classic British motorsport style.',
    outfitItems: [
      { name: 'Team Shirt', price: 0, shopUrl: '' },
      { name: 'Jeans', price: 0, shopUrl: '' },
      { name: 'Sneakers', price: 0, shopUrl: '' },
    ],
  },

  // Wimbledon Collection
  {
    id: 'Wimbledon-1',
    name: 'Wimbledon-1',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon1.png',
    folder: 'Wimbledon',
    price: 119.00,
    description: 'Classic Wimbledon outfit in traditional tennis whites. Elegant and appropriate for Centre Court viewing.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Accessories', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Wimbledon-2',
    name: 'Wimbledon-2',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon2.png',
    folder: 'Wimbledon',
    price: 135.00,
    description: 'Sophisticated Wimbledon ensemble with tennis-inspired details. Perfect for the prestigious tennis tournament.',

    shopUrl: '',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Skirt', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Wimbledon-3',
    name: 'Wimbledon-3',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon3.png',
    folder: 'Wimbledon',
    price: 125.00,
    description: 'Timeless Wimbledon attire capturing the spirit of tennis tradition. Refined and sport-appropriate.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
      { name: 'Hat', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Wimbledon-4',
    name: 'Wimbledon-4',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon4.png',
    folder: 'Wimbledon',
    price: 149.00,
    description: 'Premium Wimbledon outfit with polished styling. Ideal for enjoying tennis at the All England Club.',

    shopUrl: '',
    outfitItems: [
      { name: 'Blazer', price: 0, shopUrl: '' },
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Trousers', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Wimbledon-5',
    name: 'Wimbledon-5',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon5.png',
    folder: 'Wimbledon',
    price: 139.00,
    description: 'Elegant Wimbledon ensemble with classic appeal. Smart casual style for the championships.',

    shopUrl: '',
    outfitItems: [
      { name: 'Dress', price: 0, shopUrl: '' },
      { name: 'Cardigan', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  {
    id: 'Wimbledon-6',
    name: 'Wimbledon-6',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Wimbledon%20/Wimbledon6.png',
    folder: 'Wimbledon',
    price: 129.00,
    description: 'Chic Wimbledon outfit perfect for summer tennis. Comfortable and stylish for all-day viewing.',

    shopUrl: '',
    outfitItems: [
      { name: 'Top', price: 0, shopUrl: '' },
      { name: 'Skirt', price: 0, shopUrl: '' },
      { name: 'Shoes', price: 0, shopUrl: '' },
    ],
  },
  [
  {
    id: "test",
    "name": "test",
    "url": "https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn1.png",
    "secondaryImageUrl": "https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Autumn/Autumn1.png",
    "folder": "test",
    "price": 0,
    "description": "test",
    "collection": "test",
    "shopUrl": "",
    "outfitItems": []
  }
]
  //   // 30 Brands in 30 days Collection
  // {    id: 'Burberry',
  //   name: 'Burberry',
  //   url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Burberry.png',
  //   folder: '30Brands',
  // },
  // {
  //   id: 'Brora',
  //   name: 'Brora',
  //   url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Brora.png',
  //   folder: '30Brands',
  // },
  // {
  //   id: 'Purdey',
  //   name: 'Purdey',
  //   url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/30Brands/Purdey.png',
  //   folder: '30Brands',
  // }
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
