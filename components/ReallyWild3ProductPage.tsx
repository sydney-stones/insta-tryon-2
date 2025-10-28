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

interface ReallyWild3ProductPageProps {
  product: WardrobeItem;
  onTryOnClick: (product: WardrobeItem) => void;
}

const ReallyWild3ProductPage: React.FC<ReallyWild3ProductPageProps> = ({ product, onTryOnClick }) => {
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

  // Main product item (Jacket)
  const mainProduct = {
    name: 'Brompton Silk Wool Puffer Jacket',
    price: 845,
    image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/Reallywild/reallywild3-jacket.png',
    shopUrl: 'https://go.shopmy.us/p-28898013',
    isReallyWild: true
  };

  // Complete the look items
  const completeTheLookItems = [
    {
      name: 'Cadogan Silk Tie Neck Blouse',
      price: 275,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/Reallywild/reallywild3-top.png',
      shopUrl: 'https://go.shopmy.us/p-28898045',
      isReallyWild: true
    },
    {
      name: 'Mayfair Velvet Flare Trousers',
      price: 395,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/Reallywild/reallywild3-trousers.png',
      shopUrl: 'https://go.shopmy.us/p-28898097',
      isReallyWild: true
    },
    {
      name: 'Heritage Calf Length Leather Boots',
      price: 295,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/Reallywild/reallywild3-boots.png',
      shopUrl: 'https://go.shopmy.us/p-28898185',
      isReallyWild: true
    },
    {
      name: 'Logo Baseball Cap',
      price: 35,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/Festival_Of_Fashion/FOF-individualitems/Reallywild/reallywild3-hat.png',
      shopUrl: 'https://go.shopmy.us/p-28898254',
      isReallyWild: true
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

  // Calculate total potential revenue
  const totalAffiliateRevenue = useMemo(() => {
    return completeTheLookItems
      .filter(item => !item.isReallyWild)
      .reduce((sum, item) => sum + (item.affiliateCommission || 0), 0);
  }, []);

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
              REALLY WILD
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">NEW ARRIVALS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">CLOTHING</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">ACCESSORIES</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">COLLECTIONS</Link>
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

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif tracking-wide mb-2">{mainProduct.name}</h1>
              <p className="text-xl sm:text-2xl font-light">£{mainProduct.price.toFixed(2)}</p>
            </div>

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
              className="w-full bg-black text-white py-3 sm:py-4 px-6 text-sm tracking-widest hover:bg-gray-900 transition-colors"
            >
              ADD TO CART
            </motion.button>

            {/* Add Outfit to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-3 sm:py-4 px-6 text-sm font-semibold tracking-wide hover:opacity-90 transition-opacity mt-4"
            >
              ADD COMPLETE OUTFIT TO CART
            </motion.button>

            {/* Complete the Look */}
            {completeTheLookItems.length > 0 && (
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h3 className="text-lg sm:text-xl font-serif tracking-wide mb-4">Complete the Look</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {completeTheLookItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="relative aspect-square bg-gray-100 rounded-sm overflow-hidden mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-xs sm:text-sm tracking-wide mb-1 line-clamp-2">{item.name}</p>
                      <p className="text-sm sm:text-base font-light">£{item.price.toFixed(2)}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <ROICalculator />

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPurchaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif mb-3">Interested in This Technology?</h3>
                <p className="text-gray-600 mb-6">
                  Join our waitlist to bring AI virtual try-on to your brand's website.
                </p>
                <a
                  href="https://tally.so/r/mOOqZ7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all mb-3"
                >
                  Join Brand Waitlist
                </a>
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReallyWild3ProductPage;
