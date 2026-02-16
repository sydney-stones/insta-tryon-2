/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  productSrc: string;
  productLabel: string;
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  afterLabel: string;
  description: string;
}

const demoProducts: DemoProduct[] = [
  {
    id: 1,
    name: 'Corset Knit Midi Dress',
    brand: 'Brielle',
    price: 285,
    originalPrice: 380,
    category: 'Dresses',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    productSrc: '/result-images/brielle.webp',
    productLabel: 'Product: Corset Knit Midi Dress',
    faceSrc: '/result-images/siennaface.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/brielle-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Textured knit midi dress with sheer corset bodice and fuzzy fabric. A statement evening piece.',
  },
  {
    id: 2,
    name: 'Miffy Knit Jumper',
    brand: 'Daisy Street',
    price: 42,
    category: 'Knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    productSrc: '/result-images/daisystreet.webp',
    productLabel: 'Product: Miffy Knit Jumper',
    faceSrc: '/result-images/siennaface.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/daisystreet-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Playful Miffy character knit jumper with floral detail. Relaxed fit in cream.',
  },
  {
    id: 3,
    name: 'Distressed Wide Leg Jeans',
    brand: 'Elysian Clo',
    price: 120,
    originalPrice: 165,
    category: 'Denim',
    sizes: ['28', '30', '32', '34', '36'],
    productSrc: '/result-images/elysianclo.webp',
    productLabel: 'Product: Distressed Wide Leg Jeans',
    faceSrc: '/result-images/face.png',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/elysianclo-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Olive wash wide-leg jeans with heavy distressing. Relaxed streetwear fit.',
  },
  {
    id: 4,
    name: 'Tech Panelled Jacket',
    brand: 'Heliot Emil',
    price: 540,
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    productSrc: '/result-images/heliotemil.webp',
    productLabel: 'Product: Tech Panelled Jacket',
    faceSrc: '/result-images/face.png',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/heliotemil-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Deconstructed technical jacket with mesh panel inserts. Avant-garde hooded silhouette.',
  },
  {
    id: 5,
    name: 'Fleece Zip Hoodie',
    brand: 'Heresy',
    price: 175,
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    productSrc: '/result-images/heresy.jpg',
    productLabel: 'Product: Fleece Zip Hoodie',
    faceSrc: '/result-images/siennaface.png',
    bodySrc: '/result-images/siennaneutral--new.JPG',
    afterSrc: '/result-images/heresy-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Olive green fleece zip-up hoodie with embroidered pinwheel motif. Cosy oversized fit.',
  },
  {
    id: 6,
    name: 'Lightweight Windbreaker',
    brand: 'Mellow Clo',
    price: 95,
    originalPrice: 130,
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productSrc: '/result-images/mellowclo.webp',
    productLabel: 'Product: Lightweight Windbreaker',
    faceSrc: '/result-images/face.png',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/mellowclo-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Cropped olive windbreaker with funnel neck. Water-resistant nylon shell.',
  },
  {
    id: 7,
    name: 'Alma BB Monogram Bag',
    brand: 'Louis Vuitton',
    price: 1750,
    category: 'Bags',
    sizes: ['One Size'],
    productSrc: '/result-images/lvbag.webp',
    productLabel: 'Product: Alma BB Monogram Bag',
    faceSrc: '/result-images/siennaface.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/lvbag-tryon-4K.png',
    afterLabel: 'Try-On Result',
    description: 'Iconic Alma BB in Monogram canvas with travel sticker patches and coloured stripe.',
  },
  {
    id: 8,
    name: 'Logo Denim Hat',
    brand: 'Rhude',
    price: 215,
    category: 'Accessories',
    sizes: ['One Size'],
    productSrc: '/result-images/RHUDEcap.jpg',
    productLabel: 'Product: Logo Denim Hat',
    faceSrc: '/result-images/siennaface.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/RHPF25HA01741_RHUDE_LOGO_DENIM_HAT-OXFORD_INDIGO_1-tryon-4K.png',
    afterLabel: 'Try-On Result',
    description: 'Oxford indigo wash denim snapback with embroidered Rhude logo.',
  },
];

type ModalStep = 'upload' | 'loading' | 'result';

// Individual product demo card with try-on workflow
const ProductDemoCard: React.FC<{ product: DemoProduct }> = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<ModalStep>('upload');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timers
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  const handleTryOn = () => {
    setModalStep('upload');
    setModalOpen(true);
    // After 5 seconds, show loading screen
    timerRef.current = setTimeout(() => {
      setModalStep('loading');
      // After 7 seconds of loading, show result
      timerRef.current = setTimeout(() => {
        setModalStep('result');
      }, 7000);
    }, 5000);
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalStep('upload');
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') handleClose();
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <>
      {/* Product Card — mimics a product page */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative aspect-[3/4] bg-gray-50">
          {product.productSrc ? (
            <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs text-gray-400 text-center px-4">{product.productLabel}</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{product.brand}</p>
          <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-4">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">&pound;{product.originalPrice}</span>
            )}
            <span className="text-sm font-medium">&pound;{product.price}</span>
          </div>

          {/* AI Try On Button */}
          <button
            onClick={handleTryOn}
            className="w-full bg-[#444833] text-white py-3 px-4 text-[11px] tracking-[0.15em] font-medium flex items-center justify-center gap-2 hover:bg-[#3a3d2d] transition-all shadow-[0_0_15px_rgba(68,72,51,0.3)] hover:shadow-[0_0_25px_rgba(68,72,51,0.5)]"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            AI TRY ON
          </button>
        </div>
      </div>

      {/* Try-On Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
                  </svg>
                  My looks
                </span>
                <span className="text-[10px] bg-[#444833] text-white px-2.5 py-1 rounded-full font-medium">
                  10 credits left
                </span>
              </div>
              <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body — Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left — Product Image */}
              <div className="bg-gray-50 aspect-[3/4] lg:aspect-auto lg:min-h-[450px]">
                {product.productSrc ? (
                  <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-sm text-gray-400">{product.productLabel}</span>
                  </div>
                )}
              </div>

              {/* Right — Workflow Steps */}
              <div className="p-5 sm:p-8 flex flex-col justify-center min-h-[350px]">

                {/* Step 1: Upload — photos pre-loaded */}
                {modalStep === 'upload' && (
                  <div>
                    <h3 className="text-lg sm:text-xl font-light tracking-wide text-gray-900 mb-6 text-center">
                      TRY IT ON, VIRTUALLY
                    </h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Face photo</p>
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-[#444833]/30">
                          <img src={product.faceSrc} alt="Face photo" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Uploaded
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Full body photo</p>
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-[#444833]/30">
                          <img src={product.bodySrc} alt="Full body photo" className="w-full h-full object-cover" />
                        </div>
                        <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Uploaded
                        </p>
                      </div>
                    </div>
                    {/* Product tags + Generating indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[2]}</span>
                      </div>
                      <span className="text-[10px] text-[#444833] font-medium flex items-center gap-1">
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Starting...
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 2: Loading — "GETTING DRESSED!" */}
                {modalStep === 'loading' && (
                  <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-gray-900 mb-8">
                      GETTING DRESSED!
                    </h3>
                    {/* Hanger icon */}
                    <div className="relative mb-8">
                      <svg className="w-20 h-20 text-gray-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M32 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                        <path d="M32 16v4" />
                        <path d="M32 20 L8 40 L56 40 Z" strokeLinejoin="round" />
                      </svg>
                      {/* Animated dots */}
                      <div className="flex gap-1.5 justify-center mt-4">
                        <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[2]}</span>
                    </div>
                  </div>
                )}

                {/* Step 3: Result — try-on image with CTA */}
                {modalStep === 'result' && (
                  <div className="flex flex-col items-center">
                    {/* Result image */}
                    <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4 border border-gray-200">
                      {product.afterSrc ? (
                        <img src={product.afterSrc} alt={product.afterLabel} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-sm text-gray-400">{product.afterLabel}</span>
                        </div>
                      )}
                    </div>
                    {/* Product tags */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[2]}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">&pound;{product.price}</span>
                    </div>
                    {/* Book a Demo button instead of Add to Cart */}
                    <a
                      href="https://calendly.com/mail-renderedfits/15-minute-meeting"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#444833] text-white py-3 px-6 text-[11px] tracking-[0.15em] font-medium text-center hover:bg-[#3a3d2d] transition-colors block mb-2"
                    >
                      BOOK A DEMO
                    </a>
                    <Link
                      to="/demo"
                      onClick={handleClose}
                      className="w-full border border-gray-300 text-gray-700 py-3 px-6 text-[11px] tracking-[0.15em] font-medium text-center hover:border-gray-500 transition-colors block"
                    >
                      TRY THE LIVE DEMO
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-5 py-3 flex items-center justify-center">
              <span className="text-[10px] text-gray-400 tracking-wider">
                Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


const ResultsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#444833] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            RENDERED FITS™
          </a>
        </div>
      </header>

      {/* Section 1: Hero */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 leading-tight mb-6">
            See What Virtual Try-On Actually Looks Like
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Real customers. Real products. Generated in 20 seconds.
          </p>
        </div>
      </div>

      {/* Section 2: Product Demo Grid */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Click &ldquo;AI Try On&rdquo; on any product below to see the full virtual try-on experience.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {demoProducts.map((product) => (
              <ProductDemoCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Stats Bar */}
      <div className="bg-[#444833] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">28%</p>
              <p className="text-sm text-white/70 mt-1">fewer returns</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">20%</p>
              <p className="text-sm text-white/70 mt-1">higher conversion</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">15-25%</p>
              <p className="text-sm text-white/70 mt-1">higher AOV</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: How It Works */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-12 sm:mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 1</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer uploads photo</p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 2</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">AI generates try-on in 20 seconds</p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 3</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer selects size and adds to cart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-8">
            Want to see this on your products?
          </h2>
          <a
            href="https://calendly.com/mail-renderedfits/15-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#444833] text-white px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-medium hover:bg-[#3a3d2d] transition-colors"
          >
            Book a 15-Minute Demo
          </a>
          <div className="mt-6">
            <Link
              to="/demo"
              className="text-[#444833] font-medium hover:underline transition-colors"
            >
              Or try it yourself on our live demo &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3a3d2d] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
            Rendered Fits Ltd registered in England and Wales under the company registration number 16922551. Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
