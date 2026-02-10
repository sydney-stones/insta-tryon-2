/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedTryOnResult } from '../lib/tryOnLimit';

interface CampbellsOfBeaulyProductPageProps {
  onTryOnClick: (product: WardrobeItem) => void;
}

const CampbellsOfBeaulyProductPage: React.FC<CampbellsOfBeaulyProductPageProps> = ({ onTryOnClick }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const demoProduct: WardrobeItem = useMemo(() => ({
    id: 'beaufortandblakesienna-jumper',
    name: 'Montadale Sheep Half Zip Jumper',
    url: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/outfits/beaufortandblakesienna-jumper.png',
    secondaryImageUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/beaufortandblake-sienna.png',
    videoUrl: 'https://raw.githubusercontent.com/sydney-stones/insta-tryon-2/main/Renderings/beaufortandblakevideo-sienna.mp4',
    folder: 'Demo',
    price: 170,
    description: 'Premium quality Montadale Sheep Half Zip Jumper from Beaufort & Blake.',
    collection: 'Demo',
    shopUrl: 'https://go.shopmy.us/p-31046835',
  }), []);

  const [tryOnResult, setTryOnResult] = useState<string | null>(getSavedTryOnResult(demoProduct.id));

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

  const productMedia = useMemo(() => {
    const media: Array<{ url: string; type: 'image' | 'video' }> = [
      { url: demoProduct.url, type: 'image' }
    ];
    if (tryOnResult) {
      media.push({ url: tryOnResult, type: 'image' });
    }
    return media;
  }, [tryOnResult, demoProduct.url]);

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

  const sizes = ['XXS', 'XS', 'S', 'M', 'L'];

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium">
              <Link to="/" className="hover:opacity-60 transition-opacity">WOMAN</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">MAN</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">BAGS</Link>
              <Link to="/" className="hover:opacity-60 transition-opacity">SALE</Link>
            </nav>
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl tracking-[0.05em] font-light">
              Demo Store
            </Link>
            <div className="flex items-center gap-4 text-[11px] tracking-[0.1em]">
              <button className="hidden sm:block hover:opacity-60 transition-opacity">SEARCH</button>
              <button className="hidden sm:block hover:opacity-60 transition-opacity">HELP</button>
              <button className="hidden sm:block hover:opacity-60 transition-opacity">ACCOUNT</button>
              <button className="hover:opacity-60 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <Link to="/" className="hover:text-gray-900">Clothing</Link>
          <span>/</span>
          <span>Knitwear</span>
          <span>/</span>
          <span className="text-gray-900">Half Zip Jumper</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">

          {/* Left - Product Image */}
          <div className="space-y-3">
            <div className="relative bg-gray-50 overflow-hidden">
              <div
                className="relative aspect-[3/4] cursor-pointer"
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
                      alt={demoProduct.name}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                {/* Nav Arrows */}
                {productMedia.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === 0 ? productMedia.length - 1 : prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev === productMedia.length - 1 ? 0 : prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {productMedia.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productMedia.map((media, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden bg-gray-50 transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-black'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    {media.type === 'video' ? (
                      <video src={media.url} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={media.url} alt="" className="w-full h-full object-cover" />
                    )}
                    {tryOnResult && index === productMedia.length - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                        <span className="text-white text-[10px] font-medium">You</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col lg:pt-0">
            {/* Product Name */}
            <h1 className="text-[13px] tracking-[0.15em] font-normal uppercase mb-4">
              MONTADALE SHEEP HALF ZIP JUMPER
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px] line-through text-gray-400">&pound;200</span>
              <span className="text-[13px]">&pound;170</span>
            </div>

            {/* Size Guide */}
            <div className="flex justify-end mb-3">
              <button className="text-[11px] underline text-gray-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Size guide
              </button>
            </div>

            {/* Size Selector */}
            <div className="flex gap-0 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 border py-3 text-[12px] tracking-wide transition-colors ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Out of stock */}
            <p className="text-[12px] text-gray-600 mb-6">
              Out of stock? <button className="underline font-medium">Get notified</button>
            </p>

            {/* AI TRY ON Button */}
            <button
              onClick={() => onTryOnClick(demoProduct)}
              className="w-full bg-[#1a1a1a] text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium flex items-center justify-center gap-3 mb-1 hover:bg-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              AI TRY ON
              <span className="text-[10px] border border-white/40 px-2 py-0.5 tracking-wider">New</span>
            </button>
            <p className="text-[11px] text-gray-500 text-center mb-6">
              Upload your photo and see yourself in this item
            </p>

            {/* ADD TO BAG */}
            <div className="flex gap-0 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium hover:bg-gray-900 transition-colors"
              >
                ADD TO BAG
              </button>
              <button className="bg-black text-white px-4 border-l border-gray-700 hover:bg-gray-900 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] tracking-[0.1em] font-medium underline">FREE DELIVERY &amp; RETURNS</p>
                <p className="text-[11px] text-gray-500 mt-1">Estimated delivery Jan 29th.</p>
                <p className="text-[11px] text-gray-500">Domestic shipping. Tariffs and import duties included.</p>
              </div>
              <button className="text-[11px] tracking-[0.05em] text-gray-500 underline whitespace-nowrap ml-4">ENTER POSTAL CODE</button>
            </div>

            {/* Complimentary Giftwrapping */}
            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium underline">COMPLIMENTARY GIFTWRAPPING</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Available at checkout.
              </p>
            </details>

            {/* Pick Up In Store */}
            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium underline">PICK UP IN STORE</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Buy online, pick up today.
              </p>
            </details>

            {/* Product Description */}
            <div className="border-t border-gray-200 py-6">
              <p className="text-[12px] text-gray-600 leading-relaxed">
                Premium quality half zip jumper featuring a Montadale sheep design, crafted from soft wool blend. Finished with ribbed cuffs and hem. Cut to a relaxed fit. Perfect for country living and outdoor adventures.
              </p>
              <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                Relaxed fit. Ribbed cuffs and hem. Model is 180 cm / 5'9 and wears a size S.
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-8 max-w-md w-full"
            >
              <div className="text-center">
                <h3 className="text-sm tracking-[0.15em] font-medium mb-4">
                  DEMO STORE
                </h3>
                <p className="text-[12px] text-gray-600 mb-6 leading-relaxed">
                  This is a demo showcasing Virtual Try-On technology. Experience how customers can try products before buying.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowPurchaseModal(false);
                      onTryOnClick(demoProduct);
                    }}
                    className="block w-full bg-[#1a1a1a] text-white py-3 px-6 text-[12px] tracking-[0.1em] font-medium hover:bg-black transition-colors"
                  >
                    TRY VIRTUAL TRY-ON
                  </button>
                  <a
                    href="https://tally.so/r/mOOqZ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-black text-white py-3 px-6 text-[12px] tracking-[0.1em] font-medium hover:bg-gray-900 transition-colors"
                  >
                    JOIN BRAND WAITLIST
                  </a>
                  <button
                    onClick={() => setShowPurchaseModal(false)}
                    className="block w-full border border-gray-300 text-gray-700 py-3 px-6 text-[12px] tracking-[0.1em] font-medium hover:border-gray-500 transition-colors"
                  >
                    CONTINUE EXPLORING
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampbellsOfBeaulyProductPage;
