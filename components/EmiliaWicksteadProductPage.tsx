/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedModel, getSavedTryOnResult } from '../lib/tryOnLimit';
import ROICalculator from './ROICalculator';

interface EmiliaWicksteadProductPageProps {
  product: WardrobeItem;
  onTryOnClick: (product: WardrobeItem) => void;
}

const EmiliaWicksteadProductPage: React.FC<EmiliaWicksteadProductPageProps> = ({ product, onTryOnClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const savedModel = getSavedModel();
  const [tryOnResult, setTryOnResult] = useState<string | null>(getSavedTryOnResult());

  // Refresh try-on result when modal might have closed
  useEffect(() => {
    const handleFocus = () => {
      setTryOnResult(getSavedTryOnResult());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Main product item (Dress)
  const mainProduct = {
    name: 'Carita Dress in Burgundy Wind Velvet',
    price: 2100,
    image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/EmiliaWickstead/EmiliaWickstead-CARITADRESSINBURGUNDYWINDVELVET.png',
    shopUrl: 'https://go.shopmy.us/p-28351154',
    isEmiliaWickstead: true
  };

  // Complete the look items
  const completeTheLookItems = [
    {
      name: 'Katy with Jewel Buckle Shoe in Black Satin',
      price: 610,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/EmiliaWickstead/EmiliaWickstead-KATYWITHJEWELBUCKLESHOEINBLACKSATIN.png',
      shopUrl: 'https://go.shopmy.us/p-28351221',
      isEmiliaWickstead: true
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
    if (tryOnResult) {
      media.push({ url: tryOnResult, type: 'image' });
    }
    return media;
  }, [product, savedModel, tryOnResult]);


  // Handle touch swipe for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setSelectedImageIndex(prev => prev === productMedia.length - 1 ? 0 : prev + 1);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setSelectedImageIndex(prev => prev === 0 ? productMedia.length - 1 : prev - 1);
    }
  };

  const handleAddToCart = () => {
    setShowPurchaseModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-serif tracking-wider">
              EMILIA WICKSTEAD
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">NEW ARRIVALS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">READY TO WEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">MADE TO ORDER</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">ACCESSORIES</Link>
            </nav>
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="p-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
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

          {/* Main Product Image */}
          <div className="space-y-3">
            {/* Large Image/Video Display */}
            <div className="relative bg-gray-100 rounded-sm overflow-hidden">
              <div
                className="relative aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  {productMedia[selectedImageIndex]?.type === 'video' ? (
                    <motion.video
                      key="video"
                      src={productMedia[selectedImageIndex].url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  ) : (
                    <motion.img
                      key={selectedImageIndex}
                      src={productMedia[selectedImageIndex]?.url}
                      alt={mainProduct.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

      {/* "Try on this look" button overlay if viewing saved model */}
      {(savedModel || tryOnResult) && selectedImageIndex === productMedia.length - 1 && productMedia[selectedImageIndex]?.type === 'image' && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTryOnClick(product)}
            className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-xl"
          >
            Try on this look
          </motion.button>
        </div>
      )}

                {/* Navigation Arrows */}
                {productMedia.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? productMedia.length - 1 : prev - 1)}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === productMedia.length - 1 ? 0 : prev + 1)}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery - Always Visible */}
            {productMedia.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden bg-white transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-offset-0 ring-gray-900'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video src={media.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={media.url} alt="" className="w-full h-full object-cover" />
                    )}
                    {/* "You" label on saved model thumbnail */}
                    {index === productMedia.length - 1 && (savedModel || tryOnResult) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                        <span className="text-white text-xs font-semibold">You</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Column */}
          <div className="flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-serif mb-2">{mainProduct.name}</h1>
            <p className="text-xl sm:text-2xl mb-6">£{mainProduct.price.toLocaleString()}</p>


            {/* VIRTUAL TRY-ON BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTryOnClick(product)}
              className="w-full mb-4 relative overflow-hidden rounded-lg"
            >
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-3 sm:py-4 px-6 flex items-center justify-center gap-3 font-medium tracking-wide">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-semibold text-sm sm:text-base">VIRTUAL TRY-ON</span>
                <span className="ml-2 text-xs bg-black text-white px-2 py-1 rounded-full font-bold animate-pulse">NEW</span>
              </div>
            </motion.button>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 sm:py-4 px-6 mb-6 font-medium tracking-wide hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </motion.button>

            {/* Add Outfit to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-3 sm:py-4 px-6 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity mb-6"
            >
              ADD COMPLETE OUTFIT TO CART
            </motion.button>

            {/* COMPLETE THE LOOK */}
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
                Shop the complete look to recreate this styled outfit
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {completeTheLookItems.map((item, index) => (
                  <div key={index} className="group">
                    <a href={item.shopUrl} target="_blank" rel="noopener noreferrer" className="block relative">
                      <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <h4 className="text-xs sm:text-sm font-medium mb-1 line-clamp-2 group-hover:underline">
                        {item.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">£{item.price.toLocaleString()}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ROICalculator defaultRevenue={150000} />
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPurchaseModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Interested in This Technology?
                </h3>
                <p className="text-gray-600 mb-6">
                  This is a demo showcasing virtual try-on technology for e-commerce brands.
                  Want to add this to your store?
                </p>
                <div className="space-y-3">
                  <a
                    href="https://tally.so/r/mOOqZ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Join Brand Waitlist
                  </a>
                  <button
                    onClick={() => setShowPurchaseModal(false)}
                    className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Continue Exploring Demo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default EmiliaWicksteadProductPage;
