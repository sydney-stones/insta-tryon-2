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

  const productMedia = useMemo(() => {
    if (!product) return [];
    const media: Array<{ url: string; type: 'image' | 'video' }> = [
      { url: product.url, type: 'image' }
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

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!product.outfitItems) return 0;
    return product.outfitItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [product.outfitItems]);

  return (
    <div className="min-h-screen bg-white">
      {/* ERDEM Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-serif tracking-wider">
              ERDEM
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">NEW ARRIVALS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">READY TO WEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">BAGS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">ACCESSORIES</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">BOOK</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <span className="text-sm">GBP</span>
              <button className="p-2 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[120px_1fr_500px] gap-8">

          {/* Thumbnail Column - Left Side */}
          <div className="hidden lg:flex flex-col gap-3">
            {productMedia.map((media, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-[3/4] overflow-hidden transition-all ${
                  selectedImageIndex === index
                    ? 'ring-2 ring-black'
                    : 'ring-1 ring-gray-200 hover:ring-gray-400'
                }`}
              >
                {media.type === 'video' ? (
                  <>
                    <video
                      src={media.url}
                      muted
                      playsInline
                      className="h-full w-full object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </>
                ) : (
                  <img
                    src={media.url}
                    alt={`View ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                )}
                {savedModel && index === productMedia.length - 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                    <span className="text-white text-xs font-semibold">You</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Main Image Column - Center */}
          <div className="relative bg-gray-100">
            <div className="aspect-[3/4] lg:aspect-[2/3] relative">
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
                  alt={product.name}
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
                    className="bg-white text-black px-12 py-5 rounded-sm font-medium text-lg shadow-2xl"
                  >
                    Try on this look
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile Thumbnails */}
            <div className="lg:hidden flex gap-2 mt-4 overflow-x-auto pb-2">
              {productMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden transition-all ${
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
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Column - Right Side */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            <p className="text-2xl mb-8">£{totalPrice}</p>

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
              <div className="relative bg-black text-white py-4 px-6 flex items-center justify-center gap-3 font-medium tracking-wide">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold">VIRTUAL TRY-ON</span>
                <span className="ml-2 text-xs bg-gradient-to-r from-pink-400 to-purple-400 text-white px-2 py-1 rounded-full font-bold animate-pulse">NEW</span>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500 transition-all"></div>
            </motion.button>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex gap-2 mb-2">
                <button className="flex-1 border border-gray-300 py-3 px-4 text-left hover:border-black transition-colors">
                  Select size
                </button>
                <button className="border border-gray-300 py-3 px-4 hover:border-black transition-colors text-sm">
                  Size guide
                </button>
              </div>
              <button className="text-sm underline hover:no-underline">
                Find your size
              </button>
            </div>

            {/* Add to Bag - Unavailable */}
            <button
              disabled
              className="w-full bg-gray-400 text-white py-4 px-6 mb-8 cursor-not-allowed font-medium tracking-wide"
            >
              Unavailable
            </button>

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

            <div className="text-sm mb-6">
              <p className="font-medium mb-1">Fits true to size.</p>
              <p>Model is 5'11" (180cm) and wears size S.</p>
            </div>

            {/* Shop This Outfit */}
            {product.outfitItems && product.outfitItems.length > 0 && (
              <div className="border-t pt-6 mt-6">
                <h3 className="font-medium mb-4 tracking-wide">SHOP THIS OUTFIT</h3>
                <div className="space-y-3">
                  {product.outfitItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-gray-100"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.price !== undefined && item.price > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            £{item.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                      {item.shopUrl && (
                        <a
                          href={item.shopUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                          Shop
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Collapsible Sections */}
            <div className="border-t mt-6 pt-6 space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                  <span className="font-medium tracking-wide">Fabric & Care</span>
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
                  <span className="font-medium tracking-wide">Contact Customer Services</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="py-4 text-sm text-gray-600">
                  <p>Need help? Contact our customer service team.</p>
                </div>
              </details>

              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-200">
                  <span className="font-medium tracking-wide">Shipping & Returns</span>
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
