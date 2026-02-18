/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TryOnStep = 'idle' | 'upload' | 'loading' | 'result';

const ReallyWildDemoPage: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tryOnStep, setTryOnStep] = useState<TryOnStep>('idle');
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [fullscreenResult, setFullscreenResult] = useState(false);
  const faceInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLInputElement>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const productImages = ['/result-images/reallywild.webp', '/result-images/reallywild2.webp'];
  const tryOnResultImage = '/result-images/reallywild-tryon-1K.png';

  const sizes = ['8', '10', '12', '14', '16'];

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setSelectedImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setSelectedImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1);
    }
  };

  const handleFaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => setFacePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBodySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (ev) => setBodyPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = () => {
    if (!facePreview || !bodyPreview) return;
    setTryOnStep('loading');
    loadingTimerRef.current = setTimeout(() => {
      setTryOnStep('result');
    }, 7000);
  };

  const handleCloseTryOn = () => {
    if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    setTryOnStep('idle');
    setFacePreview(null);
    setBodyPreview(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Really Wild Header */}
      <header className="bg-[#2c2c2c] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] font-light">
              <span className="cursor-pointer hover:opacity-70 transition-opacity">CLOTHING</span>
              <span className="cursor-pointer hover:opacity-70 transition-opacity">ACCESSORIES</span>
              <span className="cursor-pointer hover:opacity-70 transition-opacity">PRESS</span>
            </nav>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-[15px] sm:text-[17px] tracking-[0.25em] font-light whitespace-nowrap">
              REALLY WILD LONDON
            </div>
            <nav className="hidden md:flex items-center gap-5 text-[10px] tracking-[0.2em] font-light">
              <span className="cursor-pointer hover:opacity-70 transition-opacity">WILD JOURNAL</span>
              <span className="cursor-pointer hover:opacity-70 transition-opacity">GUNROOM</span>
              <span className="cursor-pointer hover:opacity-70 transition-opacity">SERVICES</span>
            </nav>
            <div className="flex md:hidden items-center gap-3">
              <button className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Free shipping banner */}
      <div className="bg-[#f5f0eb] text-center py-2">
        <p className="text-[10px] tracking-[0.15em] text-[#5a5a5a]">FREE SHIPPING ON ORDERS OVER £150</p>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="hover:text-gray-900 cursor-pointer">Clothing</span>
          <span>/</span>
          <span>Jackets</span>
          <span>/</span>
          <span className="text-gray-900">Barnsley Merino Wool Jacket</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">

          {/* Left - Product Images */}
          <div className="space-y-3">
            <div className="relative bg-gray-50 overflow-hidden">
              <div
                className="relative aspect-[3/4] cursor-pointer flex justify-center"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={productImages[selectedImageIndex]}
                    alt="Barnsley Merino Wool Jacket"
                    className="w-full h-full object-cover mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                </AnimatePresence>

                {/* Nav Arrows */}
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden bg-gray-50 transition-all ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-black'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col lg:pt-0">
            <h1 className="text-[15px] tracking-[0.12em] font-normal uppercase mb-2">
              BARNSLEY MERINO WOOL JACKET
            </h1>
            <p className="text-[12px] text-gray-500 mb-4">Purple</p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-[14px] font-medium">£345</span>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-6 rounded-full bg-[#5a3d6b] ring-2 ring-black ring-offset-2 cursor-pointer" />
              <div className="w-6 h-6 rounded-full bg-[#4a6b3d] cursor-pointer hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 transition-all" />
              <div className="w-6 h-6 rounded-full bg-[#8b6b4a] cursor-pointer hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 transition-all" />
            </div>

            {/* Size Selector */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.1em] font-medium">SIZE FIT</span>
                <button className="text-[11px] underline text-gray-500">size guide</button>
              </div>
              <div className="flex gap-0">
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
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-0 mb-4 mt-4">
              <div className="flex items-center border border-gray-300">
                <button className="px-3 py-3 text-[14px] hover:bg-gray-50 transition-colors">−</button>
                <span className="px-4 py-3 text-[12px] border-x border-gray-300">1</span>
                <button className="px-3 py-3 text-[14px] hover:bg-gray-50 transition-colors">+</button>
              </div>
              <button className="flex-1 bg-black text-white py-3 px-6 text-[12px] tracking-[0.15em] font-medium hover:bg-gray-900 transition-colors ml-2">
                ADD TO CART
              </button>
            </div>

            {/* AI TRY ON Button */}
            <button
              onClick={() => setTryOnStep('upload')}
              className="w-full bg-[#444833] text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium flex items-center justify-center gap-3 mb-1 hover:bg-[#3a3d2d] transition-all shadow-[0_0_20px_rgba(68,72,51,0.4)] hover:shadow-[0_0_30px_rgba(68,72,51,0.6)]"
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

            {/* Expandable Sections */}
            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium">DESCRIPTION</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                The Barnsley Merino Wool Jacket is cut from luxuriously soft merino wool with a refined tailored silhouette. Perfect for layering in the country or wearing in town, this versatile jacket pairs beautifully with everything from jeans to dresses.
              </p>
            </details>

            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium">DETAILS</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                100% Merino Wool. Single-breasted. Two front pockets. Fully lined. Dry clean only.
              </p>
            </details>

            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium">CARE</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Professional dry clean only. Do not wash, bleach, tumble dry, or iron directly. Store in a breathable garment bag.
              </p>
            </details>

            <details className="border-t border-gray-200 py-4 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-medium">DELIVERY, RETURNS &amp; EXCHANGES</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Free UK delivery on orders over £150. International shipping available. Returns accepted within 14 days of delivery. Items must be unworn with tags attached.
              </p>
            </details>

            {/* Complimentary Gift Wrap */}
            <div className="border-t border-gray-200 py-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <span className="text-[11px] tracking-[0.05em] text-gray-600">Complimentary gift wrapping available at checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Try-On Modal */}
      <AnimatePresence>
        {tryOnStep !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={tryOnStep === 'upload' || tryOnStep === 'result' ? handleCloseTryOn : undefined}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close button */}
              <button
                onClick={handleCloseTryOn}
                className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Upload Step */}
              {tryOnStep === 'upload' && (
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-[14px] tracking-[0.1em] font-medium mb-1">AI VIRTUAL TRY-ON</h3>
                    <p className="text-[11px] text-gray-500">Upload your photos to see yourself in this item</p>
                  </div>

                  {/* Product preview */}
                  <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                    <img src={productImages[0]} alt="Product" className="w-14 h-14 object-cover rounded" />
                    <div>
                      <p className="text-[12px] font-medium">Barnsley Merino Wool Jacket</p>
                      <p className="text-[11px] text-gray-500">£345</p>
                    </div>
                  </div>

                  {/* Upload areas */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Face upload */}
                    <div>
                      <p className="text-[11px] font-medium mb-2 text-center">Face Photo</p>
                      <input
                        ref={faceInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFaceSelect}
                        className="hidden"
                      />
                      <button
                        onClick={() => faceInputRef.current?.click()}
                        className={`w-full aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden ${
                          facePreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}
                      >
                        {facePreview ? (
                          <img src={facePreview} alt="Face" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[10px] text-gray-400">Upload face</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Body upload */}
                    <div>
                      <p className="text-[11px] font-medium mb-2 text-center">Full Body Photo</p>
                      <input
                        ref={bodyInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleBodySelect}
                        className="hidden"
                      />
                      <button
                        onClick={() => bodyInputRef.current?.click()}
                        className={`w-full aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors overflow-hidden ${
                          bodyPreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}
                      >
                        {bodyPreview ? (
                          <img src={bodyPreview} alt="Body" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-[10px] text-gray-400">Upload body</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Generate button */}
                  <button
                    onClick={handleGenerate}
                    disabled={!facePreview || !bodyPreview}
                    className={`w-full py-4 text-[12px] tracking-[0.15em] font-medium transition-all ${
                      facePreview && bodyPreview
                        ? 'bg-[#444833] text-white hover:bg-[#3a3d2d] shadow-[0_0_20px_rgba(68,72,51,0.4)]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    GENERATE TRY-ON
                  </button>
                </div>
              )}

              {/* Loading Step */}
              {tryOnStep === 'loading' && (
                <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]">
                  <div className="relative mb-8">
                    {/* Hanger animation */}
                    <motion.div
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[60px]"
                    >
                      👗
                    </motion.div>
                  </div>
                  <h3 className="text-[16px] tracking-[0.15em] font-medium mb-4">GETTING DRESSED!</h3>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#444833] rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-4">This usually takes a few seconds...</p>
                </div>
              )}

              {/* Result Step */}
              {tryOnStep === 'result' && (
                <div className="p-6 sm:p-8">
                  <div className="text-center mb-4">
                    <h3 className="text-[14px] tracking-[0.1em] font-medium mb-1">YOUR VIRTUAL TRY-ON</h3>
                    <p className="text-[11px] text-gray-500">Barnsley Merino Wool Jacket — £345</p>
                  </div>
                  <div
                    className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 cursor-zoom-in"
                    onClick={() => setFullscreenResult(true)}
                  >
                    <img
                      src={tryOnResultImage}
                      alt="Try-on result"
                      className="w-full object-contain max-h-[60vh]"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseTryOn}
                      className="flex-1 border border-gray-300 py-3 text-[12px] tracking-[0.1em] font-medium hover:bg-gray-50 transition-colors"
                    >
                      CLOSE
                    </button>
                    <button
                      onClick={() => {
                        handleCloseTryOn();
                        setTryOnStep('upload');
                        setFacePreview(null);
                        setBodyPreview(null);
                      }}
                      className="flex-1 bg-[#444833] text-white py-3 text-[12px] tracking-[0.1em] font-medium hover:bg-[#3a3d2d] transition-colors"
                    >
                      TRY AGAIN
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Result Viewer */}
      <AnimatePresence>
        {fullscreenResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center cursor-zoom-out"
            onClick={() => setFullscreenResult(false)}
          >
            <button
              onClick={() => setFullscreenResult(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={tryOnResultImage}
              alt="Try-on result fullscreen"
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReallyWildDemoPage;
