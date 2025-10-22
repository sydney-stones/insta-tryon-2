/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion } from 'framer-motion';
import { getSavedModel } from '../lib/tryOnLimit';

interface ErdemProductPageProps {
  product: WardrobeItem;
  onTryOnClick: (product: WardrobeItem) => void;
}

const ErdemProductPage: React.FC<ErdemProductPageProps> = ({ product, onTryOnClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const savedModel = getSavedModel();

  // Main product item (Jumper)
  const mainProduct = {
    name: 'Floral Detail Cable Knit Jumper',
    price: 895,
    image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Erdem-FloralDetailCableKnitJumper.png',
    shopUrl: 'https://go.shopmy.us/p-28352268',
    isErdem: true
  };

  // Complete the look items
  const completeTheLookItems = [
    {
      name: 'Tweed A-Line Midi Skirt',
      price: 1095,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Erdem-TweedALineMidiSkirt.png',
      shopUrl: 'https://go.shopmy.us/p-28352299',
      isErdem: true
    },
    {
      name: 'Large Bloom Bag',
      price: 2195,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/Erdem-LargeBloomBag.png',
      shopUrl: 'https://go.shopmy.us/p-28352309',
      isErdem: true
    },
    {
      name: 'Lolah II Suede Slingback Pump',
      brand: 'Ralph Lauren',
      price: 139,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/RalphLauren-LolahIISuedeSlingbackPump.png',
      shopUrl: 'https://go.shopmy.us/p-28352262',
      isErdem: false,
      affiliateCommission: 12 // £12 estimated commission
    }
  ];

  const productMedia = useMemo(() => {
    if (!product) return [];
    const media: Array<{ url: string; type: 'image' | 'video' }> = [
      { url: mainProduct.image, type: 'image' }
    ];
    if (product.secondaryImageUrl) {
      media.push({ url: product.secondaryImageUrl, type: 'image' });
    }
    if (product.videoUrl) {
      media.push({ url: product.videoUrl, type: 'video' });
    }
    if (savedModel) {
      media.push({ url: savedModel, type: 'image' });
    }
    return media;
  }, [product, savedModel]);

  // Calculate total potential revenue
  const totalAffiliateRevenue = useMemo(() => {
    return completeTheLookItems
      .filter(item => !item.isErdem)
      .reduce((sum, item) => sum + (item.affiliateCommission || 0), 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ERDEM Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-serif tracking-wider">
              ERDEM
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">NEW ARRIVALS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">READY TO WEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">BAGS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">ACCESSORIES</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
            </nav>
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <span className="text-xs sm:text-sm">GBP</span>
              <button className="p-2 relative">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-6 lg:gap-12">

          {/* Main Product Image - Left Side (Full Height) */}
          <div className="relative bg-gray-100 rounded-sm overflow-hidden">
            <div className="aspect-[3/4] lg:aspect-[2/3] xl:aspect-[3/4] relative">
              {productMedia[selectedImageIndex]?.type === 'video' ? (
                <video
                  src={productMedia[selectedImageIndex].url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={productMedia[selectedImageIndex]?.url}
                  alt={mainProduct.name}
                  className="h-full w-full object-cover"
                />
              )}

              {/* Navigation Arrows */}
              {productMedia.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === 0 ? productMedia.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(prev => prev === productMedia.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Try On Overlay for saved model */}
              {savedModel && selectedImageIndex === productMedia.length - 1 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTryOnClick(product)}
                    className="bg-white text-black px-8 sm:px-12 py-4 sm:py-5 rounded-sm font-medium text-base sm:text-lg shadow-2xl"
                  >
                    Try on this look
                  </motion.button>
                </div>
              )}
            </div>

            {/* Thumbnails Below Image - Mobile/Tablet Only */}
            {productMedia.length > 1 && (
              <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
                {productMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden transition-all rounded-sm ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-black'
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video src={media.url} muted playsInline className="h-full w-full object-cover pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <img src={media.url} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                    )}
                    {savedModel && index === productMedia.length - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                        <span className="text-white text-xs font-semibold">You</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column - Right Side */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-serif mb-2">{mainProduct.name}</h1>
            <p className="text-xl sm:text-2xl mb-6">£{mainProduct.price}</p>

            {/* Thumbnails - Desktop Only (Above Virtual Try-On) */}
            {productMedia.length > 1 && (
              <div className="hidden lg:flex gap-2 mb-6 overflow-x-auto pb-2">
                {productMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden transition-all rounded-sm ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-black'
                        : 'ring-1 ring-gray-200'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <>
                        <video src={media.url} muted playsInline className="h-full w-full object-cover pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </>
                    ) : (
                      <img src={media.url} alt={`View ${index + 1}`} className="h-full w-full object-cover" />
                    )}
                    {savedModel && index === productMedia.length - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                        <span className="text-white text-xs font-semibold">You</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* VIRTUAL TRY-ON BUTTON - HIGHLIGHTED */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTryOnClick(product)}
              className="w-full mb-4 relative overflow-hidden group"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>

              {/* Button content */}
              <div className="relative bg-black text-white py-3 sm:py-4 px-6 flex items-center justify-center gap-3 font-medium tracking-wide">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">VIRTUAL TRY-ON</span>
                <span className="ml-2 text-xs bg-gradient-to-r from-pink-400 to-purple-400 text-white px-2 py-1 rounded-full font-bold animate-pulse">NEW</span>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 transition-all"></div>
            </motion.button>

            {/* Size Selection */}
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <button className="flex-1 border border-gray-300 py-3 px-4 text-left text-sm hover:border-black transition-colors">
                  Select size
                </button>
                <button className="border border-gray-300 py-3 px-4 hover:border-black transition-colors text-xs sm:text-sm">
                  Size guide
                </button>
              </div>
              <button className="text-sm underline hover:no-underline">
                Find your size
              </button>
            </div>

            {/* Add to Cart Button - Links to Waitlist */}
            <Link to="/brand-waitlist">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black text-white py-3 sm:py-4 px-6 mb-6 font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                ADD TO CART
              </motion.button>
            </Link>

            {/* Product Description */}
            <div className="mb-6 text-sm leading-relaxed">
              <p className="mb-4">
                Shaped for a classic fit, this olive wool jumper showcases a cable knit design. It is detailed with a needle felt flower at the chest.
              </p>
              <ul className="space-y-1 ml-4">
                <li className="list-disc">Classic silhouette</li>
                <li className="list-disc">Dense cable knit</li>
                <li className="list-disc">Crew neck</li>
                <li className="list-disc">Long sleeves</li>
                <li className="list-disc">Ribbed cuffs and hem</li>
                <li className="list-disc">Needle Felt Flower Detail</li>
                <li className="list-disc">Product code: PF25_KT24_30023004</li>
              </ul>
            </div>

            <div className="text-sm mb-6 pb-6 border-b border-gray-200">
              <p className="font-medium mb-1">Fits true to size.</p>
              <p className="text-gray-600">Model is 5'11" (180cm) and wears size S.</p>
            </div>

            {/* COMPLETE THE LOOK - Key Revenue Feature */}
            <div className="border-t pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium tracking-wide text-base sm:text-lg">COMPLETE THE LOOK</h3>
                <div className="bg-green-50 px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold text-green-700">Boosts AOV</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Increase average order value by showcasing styled outfits
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {completeTheLookItems.map((item, index) => (
                  <div key={index} className="group">
                    <a
                      href={item.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative"
                    >
                      <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Affiliate Commission Badge */}
                        {!item.isErdem && item.affiliateCommission && (
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                            +£{item.affiliateCommission}
                          </div>
                        )}

                        {/* Brand Badge for Non-ERDEM Items */}
                        {!item.isErdem && item.brand && (
                          <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                            {item.brand}
                          </div>
                        )}
                      </div>

                      <h4 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2 group-hover:underline">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">£{item.price}</p>
                    </a>
                  </div>
                ))}
              </div>

              {/* Revenue Insight Box */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1 text-gray-900">Additional Revenue Stream</h4>
                    <p className="text-xs text-gray-600 mb-2">
                      Earn <span className="font-bold text-green-700">£{totalAffiliateRevenue} affiliate commission</span> when customers purchase partner brand items through your styled outfits.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Partner items marked with commission badge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="border-t pt-6 space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                  <span className="font-medium tracking-wide text-sm">Fabric & Care</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="py-4 text-sm text-gray-600">
                  <p>100% Wool</p>
                  <p className="mt-2">Dry clean only</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                  <span className="font-medium tracking-wide text-sm">Shipping & Returns</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="py-4 text-sm text-gray-600">
                  <p>Free UK delivery on orders over £200</p>
                  <p className="mt-2">Free returns within 28 days</p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ErdemProductPage;
