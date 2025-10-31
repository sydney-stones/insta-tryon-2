/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedModel, getSavedTryOnResult } from '../lib/tryOnLimit';

interface CampbellsOfBeaulyProductPageProps {
  onTryOnClick: (product: WardrobeItem) => void;
}

const CampbellsOfBeaulyProductPage: React.FC<CampbellsOfBeaulyProductPageProps> = ({ onTryOnClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Create a demo product for the virtual try-on
  const demoProduct: WardrobeItem = useMemo(() => ({
    id: 'campbells-of-beauly-jumper',
    name: 'Land Rover Defender Jumper',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Campbellsofbeauly-outfit.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/campbellsofbeauly.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/Campbellsofbeauly-video.mp4',
    folder: 'Demo',
    price: 189,
    description: 'Premium quality jumper featuring the iconic Land Rover Defender design. Perfect for country living and outdoor adventures.',
    collection: 'Demo',
    shopUrl: 'https://go.shopmy.us/p-27968843',
  }), []);

  const savedModel = getSavedModel();
  const [tryOnResult, setTryOnResult] = useState<string | null>(getSavedTryOnResult(demoProduct.id));

  // Poll for try-on result updates
  useEffect(() => {
    const interval = setInterval(() => {
      const result = getSavedTryOnResult(demoProduct.id);
      if (result && result !== tryOnResult) {
        setTryOnResult(result);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [demoProduct.id, tryOnResult]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Main product item (Jumper)
  const mainProduct = {
    name: 'Campbells of Beauly Land Rover Defender Jumper',
    price: 189,
    image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Campbellsofbeauly-landroverdefenderjumper.jpeg',
    shopUrl: 'https://go.shopmy.us/p-27968843',
  };

  const productMedia = useMemo(() => {
    const media: Array<{ url: string; type: 'image' | 'video' }> = [
      { url: mainProduct.image, type: 'image' }
    ];
    if (demoProduct.secondaryImageUrl) {
      media.push({ url: demoProduct.secondaryImageUrl, type: 'image' });
    }
    if (demoProduct.videoUrl) {
      media.push({ url: demoProduct.videoUrl, type: 'video' });
    }
    if (savedModel) {
      media.push({ url: savedModel, type: 'image' });
    }
    if (tryOnResult) {
      media.push({ url: tryOnResult, type: 'image' });
    }
    return media;
  }, [savedModel, tryOnResult, demoProduct.secondaryImageUrl, demoProduct.videoUrl]);

  // Auto-select try-on result when it's generated
  useEffect(() => {
    if (tryOnResult && productMedia.length > 0) {
      setTimeout(() => {
        setSelectedImageIndex(productMedia.length - 1);
      }, 100);
    }
  }, [tryOnResult, productMedia.length]);

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
              CAMPBELLS OF BEAULY
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">COUNTRY WEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">TWEEDS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">KILTS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">ACCESSORIES</Link>
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

      {/* "Try on this look" button overlay - only on saved model, not try-on result */}
      {savedModel && selectedImageIndex === productMedia.length - (tryOnResult ? 2 : 1) && productMedia[selectedImageIndex]?.type === 'image' && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTryOnClick(demoProduct)}
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
                    {/* "You" label on saved model and try-on result thumbnails */}
                    {savedModel && index >= productMedia.length - (tryOnResult ? 2 : 1) && (
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

            {/* VIRTUAL TRY-ON BUTTON */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTryOnClick(demoProduct)}
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
              className="w-full bg-black text-white py-3 sm:py-4 px-6 rounded-lg mb-6 font-medium tracking-wide hover:bg-gray-800 transition-colors"
            >
              ADD TO CART
            </motion.button>

            {/* Product Description */}
            <div className="mb-6 pb-6 border-b">
              <p className="text-sm text-gray-600 leading-relaxed">
                Premium quality jumper featuring the iconic Land Rover Defender design. Perfect for country living and outdoor adventures. Made from soft, durable fabric that keeps you warm and comfortable.
              </p>
            </div>
          </div>
        </div>
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

export default CampbellsOfBeaulyProductPage;
