/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from './Spinner';

type TryOnStep = 'idle' | 'upload' | 'loading' | 'result';

const WastedParisDemoPage: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tryOnStep, setTryOnStep] = useState<TryOnStep>('idle');
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [fullscreenResult, setFullscreenResult] = useState(false);
  const [resultSize, setResultSize] = useState<string | null>(null);
  const loadingTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const productImage = '/result-images/wastedparis.webp';
  const tryOnResultImage = '/result-images/wastedparis-tryon-1k.png';

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

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
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Anonymous Pro', 'Courier New', monospace" }}>
      {/* Wasted Paris Header */}
      <header className="bg-black text-white border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[66px]">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] uppercase">
              <span className="cursor-pointer hover:opacity-60 transition-opacity">New</span>
              <span className="cursor-pointer hover:opacity-60 transition-opacity">Men</span>
              <span className="cursor-pointer hover:opacity-60 transition-opacity">Women</span>
              <span className="cursor-pointer hover:opacity-60 transition-opacity">Accessories</span>
            </nav>
            <div className="absolute left-1/2 transform -translate-x-1/2 text-[18px] sm:text-[20px] tracking-[0.3em] font-bold uppercase whitespace-nowrap">
              WASTED PARIS
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:opacity-60 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="hover:opacity-60 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button className="hover:opacity-60 transition-opacity relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#fe4241] rounded-full text-[8px] flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-wide">
          <span className="hover:text-black cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:text-black cursor-pointer">Men</span>
          <span>/</span>
          <span className="hover:text-black cursor-pointer">Tops</span>
          <span>/</span>
          <span className="text-black">T-Shirt</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">

          {/* Left - Product Image */}
          <div className="space-y-3">
            <div className="relative bg-[#f5f5f5] overflow-hidden">
              <div className="relative aspect-[3/4] cursor-pointer flex justify-center">
                <img
                  src={productImage}
                  alt="Wasted Paris T-Shirt"
                  className="w-full h-full object-cover mx-auto"
                />
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col lg:pt-0">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.15em] mb-2">Wasted Paris</p>
            <h1 className="text-[16px] tracking-[0.05em] font-bold uppercase mb-4">
              WASTED PARIS T-SHIRT
            </h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-[16px] font-bold">€55.00</span>
            </div>

            {/* Size Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] tracking-[0.1em] font-bold uppercase">Size</span>
                <button className="text-[11px] underline text-gray-500 uppercase tracking-wide">Size guide</button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 border py-3 text-[11px] tracking-wide uppercase font-bold transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-black text-white py-4 px-6 text-[12px] tracking-[0.2em] font-bold uppercase hover:bg-gray-900 transition-colors mb-2">
              ADD TO CART
            </button>

            {/* AI TRY ON Button */}
            <button
              onClick={() => setTryOnStep('upload')}
              className="w-full bg-[#444833] text-white py-4 px-6 text-[12px] tracking-[0.15em] font-bold uppercase flex items-center justify-center gap-3 mb-1 hover:bg-[#3a3d2d] transition-all shadow-[0_0_20px_rgba(68,72,51,0.4)] hover:shadow-[0_0_30px_rgba(68,72,51,0.6)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              AI TRY ON
              <span className="text-[9px] border border-white/40 px-2 py-0.5 tracking-wider">New</span>
            </button>
            <p className="text-[10px] text-gray-400 text-center mb-6 uppercase tracking-wide">
              Upload your photo and see yourself in this item
            </p>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-4" />

            {/* Expandable Sections */}
            <details className="py-3 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-bold uppercase">Description</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Graphic print t-shirt from Wasted Paris. Made from 100% organic cotton with a relaxed, oversized fit. Features the brand's signature graphic on the front. Ribbed crew neck. Straight hem.
              </p>
            </details>

            <details className="border-t border-gray-100 py-3 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-bold uppercase">Composition & Care</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                100% Organic Cotton. Machine wash at 30°C. Do not bleach. Tumble dry low. Iron on low heat. Do not dry clean.
              </p>
            </details>

            <details className="border-t border-gray-100 py-3 group">
              <summary className="flex items-center justify-between cursor-pointer">
                <span className="text-[11px] tracking-[0.1em] font-bold uppercase">Shipping & Returns</span>
                <svg className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-3 text-[11px] text-gray-500 leading-relaxed">
                Free shipping on orders over €100. Standard delivery 3-5 working days. Express delivery 1-2 working days. Free returns within 14 days.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* Try-On Modal */}
      <AnimatePresence>
        {tryOnStep !== 'idle' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={tryOnStep === 'upload' || tryOnStep === 'result' ? handleCloseTryOn : undefined}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-lg"
            >
              <div className="overflow-y-auto max-h-[90vh]">
                <AnimatePresence mode="wait">
                  {/* Upload Step — Split Layout */}
                  {tryOnStep === 'upload' && (
                    <motion.div
                      key="upload"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                        <div className="hidden lg:block bg-[#f5f5f5]">
                          <img
                            src={productImage}
                            alt="Wasted Paris T-Shirt"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col">
                          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                            <div className="flex items-center gap-2 text-[13px] text-gray-700">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                                <path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7L12 2z" />
                              </svg>
                              My looks
                            </div>
                            <button
                              onClick={handleCloseTryOn}
                              className="p-1 hover:bg-gray-100 rounded transition-colors"
                            >
                              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex-1 px-5 py-6 overflow-y-auto">
                            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-6">
                              TRY IT ON, VIRTUALLY
                            </h2>

                            <div className="mb-5">
                              <p className="text-[13px] font-medium text-gray-900 mb-2">Face photo</p>
                              <label htmlFor="wp-face-upload" className="block cursor-pointer">
                                <div className={`relative border rounded-lg p-4 transition-colors ${
                                  facePreview ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}>
                                  {facePreview ? (
                                    <div className="flex items-center gap-3">
                                      <img src={facePreview} alt="Face" className="w-12 h-12 rounded object-cover" />
                                      <div>
                                        <p className="text-[13px] font-medium text-green-700">Face photo uploaded</p>
                                        <p className="text-[11px] text-green-600">Tap to change</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-start gap-3">
                                      <svg className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                        <circle cx="12" cy="8" r="5" />
                                        <path d="M9 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                        <path d="M13 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                        <path d="M10 13a2.5 2.5 0 004 0" />
                                      </svg>
                                      <div>
                                        <p className="text-[13px] font-medium text-gray-900">Upload your photo here</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </label>
                              <input
                                id="wp-face-upload"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif"
                                onChange={handleFaceSelect}
                              />
                            </div>

                            <div className="mb-5">
                              <p className="text-[13px] font-medium text-gray-900 mb-2">Full body photo</p>
                              <label htmlFor="wp-body-upload" className="block cursor-pointer">
                                <div className={`relative border rounded-lg p-4 transition-colors ${
                                  bodyPreview ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}>
                                  {bodyPreview ? (
                                    <div className="flex items-center gap-3">
                                      <img src={bodyPreview} alt="Body" className="w-12 h-12 rounded object-cover" />
                                      <div>
                                        <p className="text-[13px] font-medium text-green-700">Body photo uploaded</p>
                                        <p className="text-[11px] text-green-600">Tap to change</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-start gap-3">
                                      <svg className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                        <circle cx="12" cy="4" r="2.5" />
                                        <path d="M12 7v5" />
                                        <path d="M8 9l4 1 4-1" />
                                        <path d="M10 12l-2 8" />
                                        <path d="M14 12l2 8" />
                                      </svg>
                                      <div>
                                        <p className="text-[13px] font-medium text-gray-900">Upload your photo here</p>
                                        <p className="text-[11px] text-gray-400 mt-0.5">Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </label>
                              <input
                                id="wp-body-upload"
                                type="file"
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif"
                                onChange={handleBodySelect}
                              />
                            </div>
                          </div>

                          <div className="border-t border-gray-200 px-5 py-4">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded border border-gray-200">
                                Wasted Paris T-Shirt
                              </span>
                            </div>
                            <button
                              onClick={handleGenerate}
                              disabled={!facePreview || !bodyPreview}
                              className={`w-full py-3 px-6 rounded-lg text-[13px] font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${
                                facePreview && bodyPreview
                                  ? 'bg-[#1a1a1a] text-white hover:bg-black'
                                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                              Try on
                            </button>
                          </div>

                          <div className="border-t border-gray-100 px-5 py-2.5 text-center">
                            <p className="text-[11px] text-gray-400">
                              Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Generating Step — Split Layout */}
                  {tryOnStep === 'loading' && (
                    <motion.div
                      key="generating"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                        <div className="hidden lg:block bg-[#f5f5f5]">
                          <img
                            src={productImage}
                            alt="Wasted Paris T-Shirt"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px] relative">
                          <Spinner />
                          <h3 className="text-xl font-light tracking-wide text-gray-900 mt-6 mb-2">
                            Generating Your Try-On
                          </h3>
                          <p className="text-gray-500 text-[13px] text-center max-w-xs">
                            Our AI is creating a personalized try-on with your photos and the garment...
                          </p>
                          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-5 py-2.5 text-center">
                            <p className="text-[11px] text-gray-400">
                              Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Result Step */}
                  {tryOnStep === 'result' && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="p-6 sm:p-8">
                        <button
                          onClick={handleCloseTryOn}
                          className="absolute top-3 right-3 z-10 p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        <div className="text-center mb-4">
                          <h3 className="text-[14px] tracking-[0.1em] font-medium mb-1">YOUR VIRTUAL TRY-ON</h3>
                          <p className="text-[11px] text-gray-500">Wasted Paris T-Shirt — €55.00</p>
                        </div>
                        <div
                          className="relative bg-gray-50 rounded-lg overflow-hidden mb-6 cursor-zoom-in"
                          onClick={() => setFullscreenResult(true)}
                        >
                          <img
                            src={tryOnResultImage}
                            alt="Try-on result"
                            className="w-full object-contain max-h-[50vh]"
                          />
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] tracking-[0.1em] font-medium">SELECT SIZE</span>
                            <button className="text-[11px] underline text-gray-500">size guide</button>
                          </div>
                          <div className="flex gap-2">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setResultSize(size)}
                                className={`flex-1 border py-3 text-[12px] tracking-wide transition-colors ${
                                  resultSize === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 hover:border-gray-500'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button className="w-full bg-black text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium hover:bg-gray-900 transition-colors">
                          ADD TO CART
                        </button>

                        <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                          <p className="text-[11px] text-gray-400">
                            Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
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

export default WastedParisDemoPage;
