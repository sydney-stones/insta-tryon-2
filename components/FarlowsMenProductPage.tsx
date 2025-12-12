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

interface FarlowsMenProductPageProps {
  product: WardrobeItem;
  onTryOnClick: (product: WardrobeItem) => void;
}

const FarlowsMenProductPage: React.FC<FarlowsMenProductPageProps> = ({ product, onTryOnClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const savedModel = getSavedModel();
  const [tryOnResult, setTryOnResult] = useState<string | null>(getSavedTryOnResult(product.id));

  useEffect(() => {
    const interval = setInterval(() => {
      const result = getSavedTryOnResult(product.id);
      if (result && result !== tryOnResult) {
        setTryOnResult(result);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [product.id, tryOnResult]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Main product item (Jumper)
  const mainProduct = {
    name: 'Natural Fairisle Yolk Chunky Crew Neck Jumper',
    price: 160,
    image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/farlowsmen-jumper.png',
    shopUrl: 'https://go.shopmy.us/p-35190940',
  };

  // Complete the look items
  const completeTheLookItems = [
    {
      name: 'Fine Cord Trousers',
      price: 155,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/farlowsmen-trousers.png',
      shopUrl: 'https://go.shopmy.us/p-35190799',
    },
    {
      name: 'Soft Loafer',
      price: 250,
      image: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/farlowsmen-shoes.png',
      shopUrl: 'https://go.shopmy.us/p-35289657',
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

  useEffect(() => {
    if (tryOnResult && productMedia.length > 0) {
      setTimeout(() => {
        setSelectedImageIndex(productMedia.length - 1);
      }, 100);
    }
  }, [tryOnResult, productMedia.length]);

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
      <header className="border-b border-gray-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl sm:text-2xl font-serif tracking-wider">
              FARLOWS
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm tracking-wide">
              <Link to="/" className="hover:opacity-60 transition-opacity">NEW IN</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">MENSWEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">WOMENSWEAR</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">SALE</Link>
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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-6 lg:gap-12">
          <div className="space-y-3">
            <div className="relative bg-gray-100 rounded-sm overflow-hidden">
              <div
                className="relative aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    {productMedia[selectedImageIndex]?.type === 'video' ? (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={productMedia[selectedImageIndex].url} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={productMedia[selectedImageIndex]?.url}
                        alt={mainProduct.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {productMedia.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? productMedia.length - 1 : prev - 1)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === productMedia.length - 1 ? 0 : prev + 1)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {productMedia.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {productMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[3/4] rounded-sm overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video className="w-full h-full object-cover" muted>
                        <source src={media.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={media.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide mb-2">{mainProduct.name}</h1>
              <p className="text-xl sm:text-2xl font-light">£{mainProduct.price}</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-3 sm:py-4 text-sm sm:text-base font-medium tracking-wide hover:bg-gray-800 transition-colors"
              >
                ADD TO CART
              </button>

              <button
                onClick={() => onTryOnClick(product)}
                className="w-full border-2 border-black text-black py-3 sm:py-4 text-sm sm:text-base font-medium tracking-wide hover:bg-gray-50 transition-colors"
              >
                VIRTUAL TRY-ON
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg sm:text-xl font-light tracking-wide mb-4">COMPLETE THE LOOK</h2>
              <div className="space-y-4">
                {completeTheLookItems.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="text-sm font-medium mb-1 line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-600">£{item.price}</p>
                      </div>
                      <a
                        href={item.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs underline hover:no-underline"
                      >
                        ADD TO CART
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={`https://go.shopmy.us/p-35190940,${completeTheLookItems.map(item => item.shopUrl.split('/').pop()).join(',')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full border border-black text-black py-3 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                ADD COMPLETE OUTFIT TO CART
              </a>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer text-sm font-medium tracking-wide">
                  PRODUCT DETAILS
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-gray-600 space-y-2">
                  <p>Premium quality Fairisle yolk chunky crew neck jumper from Farlows.</p>
                  <p>Natural wool blend construction for exceptional warmth and comfort.</p>
                  <p>Classic Fairisle pattern detail on the yolk.</p>
                </div>
              </details>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <ROICalculator mainProductPrice={mainProduct.price} />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPurchaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-medium mb-4">Add to Cart</h3>
              <p className="text-gray-600 mb-6">
                This will redirect you to ShopMy to complete your purchase.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPurchaseModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <a
                  href={mainProduct.shopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors text-center"
                >
                  Continue
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FarlowsMenProductPage;
